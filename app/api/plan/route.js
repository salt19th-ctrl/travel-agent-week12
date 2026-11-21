import { NextResponse } from 'next/server';
import {SPOTS,CITY_LABELS,DOMESTIC_CITIES,searchPlaces,estimateBudget,makeDemoPlan} from '../../../lib/tools.js';
import {getDrivingRoute} from '../../../lib/naverLegacy.js';

export const runtime='nodejs';
export const maxDuration=60;

const CITY_ENUM=['tokyo','osaka','fukuoka','seoul','busan','jeju'];
const TOOLS=[
 {type:'function',name:'search_places',description:'정해진 실습용 관광지 데이터에서 여행 조건에 맞는 관광지 목록을 검색한다. 실시간 장소 검색이 아니다.',strict:true,
  parameters:{type:'object',properties:{city:{type:'string',enum:CITY_ENUM},focus:{type:'string'},indoorsOnly:{type:'boolean'},limit:{type:'integer'}},required:['city','focus','indoorsOnly','limit'],additionalProperties:false}},
 {type:'function',name:'estimate_budget',description:'가상 단가를 사용하여 여행 예산을 계산한다. 실제 항공권·호텔 요금이 아니다.',strict:true,
  parameters:{type:'object',properties:{city:{type:'string',enum:CITY_ENUM},days:{type:'integer'},travelers:{type:'integer'},budgetPerPerson:{type:'integer'},pace:{type:'string'}},required:['city','days','travelers','budgetPerPerson','pace'],additionalProperties:false}},
 {type:'function',name:'get_driving_route',description:'국내여행 관광지 2곳 사이 자동차 이동 거리와 시간을 실제 네이버 AI·NAVER API로 조회한다. 반드시 search_places가 반환한 ID를 사용한다. 지도 API 키가 없다면 호출 실패를 명확히 보고한다.',strict:true,parameters:{type:'object',properties:{fromId:{type:'string'},toId:{type:'string'}},required:['fromId','toId'],additionalProperties:false}}
];
const SYSTEM=`너는 대학 수업에서 구현하는 AI 여행 일정 설계 Agent이다.
사용자 조건을 보고 다음 행동과 도구를 선택한다. 먼저 search_places 도구를 반드시 실행하고, estimate_budget 도구도 반드시 실행한다.
도구 결과를 관찰한 뒤 조건이 맞지 않으면 search_places를 추가 호출하여 대안을 찾을 수 있다.
장소는 search_places가 반환한 id만 선택하며, 도구에 없는 관광지·가격·영업시간·예약 상태를 만들어 내지 않는다.
날씨, 항공권, 호텔 실시간 API가 없으므로 실제 확인했다고 말하지 않는다. 국내 도시(seoul,busan,jeju)의 경우 get_driving_route로 반드시 장소 두 곳 사이 자동차 경로를 한 번 이상 조회하되, 도구 호출 실패 시 경로 확인 불가라고 표시한다. 도보·대중교통 경로를 조회했다고 말하지 않는다. '비가 오면' 요청은 indoorsOnly=true 검색을 활용한다.
실제 get_driving_route 도구가 성공한 구간 이외에는 이동거리·이동시간·동선 최적화를 주장하지 않는다. 취향에 맞는 실습용 초안임을 고지한다.
최종 결과는 마크다운이나 코드블록 없이 아래 JSON 객체 하나로 출력한다:
{"title":"여행 일정 제목","summary":"사용자 요구를 반영한 2문장 설명","days":[{"day":1,"morning":"t1","afternoon":"t4","evening":"t8","tip":"하루 주의사항"}]}
날짜 수는 사용자 days에 맞게, 각 장소값에는 도구가 반환한 id 문자열만 넣는다. 도구가 제공하지 않은 사실은 추측하지 않는다.`;

function validateRequest(v){
 if(!v||typeof v!=='object'||!SPOTS[v.city]) throw new Error('도시를 선택해 주세요.');
 const days=Number(v.days),travelers=Number(v.travelers),budgetPerPerson=Number(v.budgetPerPerson);
 if(!Number.isInteger(days)||days<2||days>6) throw new Error('여행 일수는 2~6일로 입력하세요.');
 if(!Number.isInteger(travelers)||travelers<1||travelers>8) throw new Error('인원은 1~8명으로 입력하세요.');
 if(!Number.isFinite(budgetPerPerson)||budgetPerPerson<100000||budgetPerPerson>10000000) throw new Error('1인당 예산은 10만~1천만 원으로 입력하세요.');
 const strings=['startDate','departAirport','pace','refine'];
 for(const f of strings)if(v[f]&&String(v[f]).length>300)throw new Error('입력 내용이 너무 깁니다.');
 const interests=Array.isArray(v.interests)?v.interests.slice(0,6).map(String).map(s=>s.slice(0,25)):[];
 const previous=typeof v.previousSummary==='string'?v.previousSummary.slice(0,500):'';
 return {city:v.city,startDate:String(v.startDate||''),departAirport:String(v.departAirport||'인천'),days,travelers,budgetPerPerson,interests,pace:String(v.pace||'여유롭게'),refine:String(v.refine||'').slice(0,300),previousSummary:previous,mode:v.mode==='demo'?'demo':'ai'};
}
function outputText(response){return (response.output||[]).filter(o=>o.type==='message').flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('\n').trim();}
async function callOpenAI(input){
 const r=await fetch('https://api.openai.com/v1/responses',{
  method:'POST',headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},
  body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',instructions:SYSTEM,input,tools:TOOLS,max_output_tokens:1800,store:false}),
  signal:AbortSignal.timeout(25000)
 });
 const data=await r.json().catch(()=>({}));
 if(!r.ok){const msg=r.status===401?'OpenAI API 키를 확인해 주세요.':r.status===429?'API 호출 한도 또는 잔액을 확인해 주세요.':`AI 호출 오류(${r.status})`;
  throw new Error(msg);}
 return data;
}
async function runTool(call,request){
 const args=JSON.parse(call.arguments||'{}');
 // 모델이 사용자 입력 조건을 임의로 바꿀 수 없도록 원본 요청값으로 중요한 필드를 고정한다.
 if(call.name==='search_places')return searchPlaces({city:request.city,focus:String(args.focus||request.interests.join(' ')).slice(0,100),indoorsOnly:Boolean(args.indoorsOnly),limit:Math.min(12,Math.max(1,Number(args.limit)||9))});
 if(call.name==='estimate_budget')return estimateBudget(request);
 if(call.name==='get_driving_route'){
  if(!DOMESTIC_CITIES.has(request.city))return {error:'국내 여행지만 지원합니다.'};
  try{return await getDrivingRoute({city:request.city,fromId:String(args.fromId||''),toId:String(args.toId||'')});}
  catch(e){return {error:String(e.message||e),verified:false};}
 }
 return {error:'허용하지 않은 도구'};
}
function parseFinal(text){
 const clean=text.replace(/^```(?:json)?\s*/,'').replace(/```$/,'').trim();
 const parsed=JSON.parse(clean);
 if(!parsed||!Array.isArray(parsed.days))throw new Error('AI가 일정 구조를 완성하지 못했습니다. 다시 시도해 주세요.');
 return parsed;
}
function sanitizePlan(raw,request,trace,seenIds){
 const fallback=searchPlaces({city:request.city,focus:request.interests.join(' '),limit:12}).places;
 const allowed=new Map(SPOTS[request.city].filter(p=>seenIds.has(p.id)).map(p=>[p.id,p]));
 const getSpot=(id,i)=>allowed.get(id)||fallback[i%fallback.length];
 const days=Array.from({length:request.days},(_,i)=>{
  const d=(raw.days||[])[i]||{};
  return {day:i+1,label:`${i+1}일 차`,morning:getSpot(d.morning,i*3),afternoon:getSpot(d.afternoon,i*3+1),evening:getSpot(d.evening,i*3+2),tip:String(d.tip||'운영시간과 이동 경로는 방문 전 확인해 주세요.').slice(0,190)};
 });
 return {cityKey:request.city,mode:'ai',title:String(raw.title||`${CITY_LABELS[request.city]} 여행 일정`).slice(0,100),summary:String(raw.summary||'실습용 관광지 데이터를 이용한 AI 일정입니다.').slice(0,340),days,budget:estimateBudget(request),trace,disclaimer:'장소 목록과 예산은 실습용입니다. 국내 자동차 구간의 이동시간은 별도 네이버지도 경로 조회에 성공했을 때만 표시합니다. 항공권·숙박료·예약·영업시간은 실시간 조회하지 않습니다.'};
}
export async function POST(req){
 try{
  const input=validateRequest(await req.json());
  if(input.mode==='demo')return NextResponse.json(makeDemoPlan(input));
  if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:'AI 모드 사용 전 Vercel 환경변수 OPENAI_API_KEY를 설정해야 합니다. 데모 모드로 먼저 확인할 수 있습니다.'},{status:503});
  const messages=[{role:'user',content:JSON.stringify({trip:input,notice:'최신 실시간 가격·예약 조회 기능은 없음'})}];
  const trace=[],seenIds=new Set();let response,rawText='';
  for(let step=0;step<5;step++){
   response=await callOpenAI(messages);
   const calls=(response.output||[]).filter(x=>x.type==='function_call');
   if(!calls.length){rawText=outputText(response);break;}
   messages.push(...response.output);
   for(const call of calls){
    const result=await runTool(call,input);
    if(call.name==='search_places')for(const s of result.places||[])seenIds.add(s.id);
    trace.push({tool:call.name,status:result.error?'오류(조회 실패)':'실제 함수 실행',info:call.name==='search_places'?`${result.places?.length||0}개 장소 조회`:call.name==='get_driving_route'?(result.error?result.error:`네이버 실제 경로: ${result.distanceKm} km / ${result.durationMinutes} 분`):'예산 산식 실행'});
    messages.push({type:'function_call_output',call_id:call.call_id,output:JSON.stringify(result)});
   }
  }
  if(!trace.some(t=>t.tool==='search_places')||!trace.some(t=>t.tool==='estimate_budget'))throw new Error('필수 데이터 도구 호출이 완료되지 않았습니다. 다시 시도해 주세요.');
  if(!rawText){
   messages.push({role:'user',content:'필수 도구 호출은 끝났습니다. 지금 JSON 형식으로 최종 여행 일정만 출력해 주세요.'});
   response=await callOpenAI(messages);rawText=outputText(response);
  }
  return NextResponse.json(sanitizePlan(parseFinal(rawText),input,trace,seenIds));
 }catch(err){return NextResponse.json({error:String(err.message||err)},{status:400});}
}
