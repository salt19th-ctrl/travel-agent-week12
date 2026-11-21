'use client';
import {useState} from 'react';
import LegacyNaverMap from '../components/LegacyNaverMap.js';
const cities=[{key:'tokyo',label:'도쿄',short:'Tokyo'},{key:'osaka',label:'오사카',short:'Osaka'},{key:'fukuoka',label:'후쿠오카',short:'Fukuoka'},{key:'seoul',label:'서울',short:'Seoul'},{key:'busan',label:'부산',short:'Busan'},{key:'jeju',label:'제주',short:'Jeju'}];
const topics=['맛집','쇼핑','문화','산책','전시','사진'];
const INITIAL={city:'tokyo',startDate:'2026-12-10',departAirport:'인천',days:4,travelers:2,budgetPerPerson:1000000,pace:'여유롭게',interests:['맛집','쇼핑'],refine:'',previousSummary:''};
const won=n=>Number(n||0).toLocaleString('ko-KR')+'원';
const slots=[['morning','오전','01'],['afternoon','오후','02'],['evening','저녁','03']];
export default function Home(){
 const [form,setForm]=useState(INITIAL),[mode,setMode]=useState('ai'),[plan,setPlan]=useState(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const [drive,setDrive]=useState(null),[driveError,setDriveError]=useState(''),[driveBusy,setDriveBusy]=useState(false);
 const domestic=['seoul','busan','jeju'].includes(plan?.cityKey);
 const update=(key,value)=>setForm(f=>({...f,[key]:value}));
 const toggle=(tag)=>setForm(f=>({...f,interests:f.interests.includes(tag)?f.interests.filter(x=>x!==tag):[...f.interests,tag]}));
 async function submit(e){
  e?.preventDefault();setBusy(true);setError('');setDrive(null);setDriveError('');
  try{
   const r=await fetch('/api/plan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,mode})});
   const data=await r.json();if(!r.ok)throw new Error(data.error||'일정 생성에 실패했습니다.');
   setPlan(data);setForm(f=>({...f,previousSummary:JSON.stringify(data.days.map(d=>({day:d.day,spots:[d.morning?.name,d.afternoon?.name,d.evening?.name]}))).slice(0,450)}));
   setTimeout(()=>document.querySelector('#results')?.scrollIntoView({behavior:'smooth'}),100);
  }catch(err){setError(err.message);}finally{setBusy(false);}
 }
 async function showRoute(){
  if(!plan||!domestic)return;setDriveBusy(true);setDriveError('');setDrive(null);
  try{const first=plan.days?.[0]?.morning?.id,second=plan.days?.[0]?.afternoon?.id;
   const r=await fetch('/api/map',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({city:plan.cityKey,fromId:first,toId:second})});
   const data=await r.json();if(!r.ok)throw new Error(data.error||'네이버 경로 검색 오류');setDrive(data);
  }catch(e){setDriveError(e.message)}finally{setDriveBusy(false)}
 }
 const budget=plan?.budget;
 return <main className="site">
  <header className="top"><a className="logo" href="#top"><span className="logoIcon">✦</span> TravelLoop <span className="logoSub">AGENT LAB</span></a><span className="topRight">WEEK 12 · 바이브 코딩 실습</span></header>
  <section id="top" className="hero"><div className="heroInner"><span className="eyebrow">PLAN · ACT · OBSERVE · REFINE</span><h1>여행의 시작은<br/><em>한 문장</em>이면 충분해요.</h1><p>목적지와 취향을 알려주면 AI Agent가 장소 검색과 예산 계산 도구를 사용해 여행 계획을 구성합니다.</p><div className="heroPills"><span>Tool Calling</span><span>Agent Loop</span><span>예산 검토</span><span>재추천</span><span>네이버지도(국내)</span></div></div><div className="heroArt" aria-hidden="true"><div className="sun"></div><div className="orbit orbit1"></div><div className="orbit orbit2"></div><div className="planet">TOKYO<br/><small>TRIP</small></div><div className="floatLabel floatA">✦ FIND</div><div className="floatLabel floatB">◈ PLAN</div></div></section>
  <section className="layout"><div className="editor"><div className="sectionHead"><span className="stepNum">01</span><div><h2>나의 여행 조건</h2><p>선택한 정보를 바탕으로 일정을 작성합니다.</p></div></div><form onSubmit={submit}>
   <div className="field"><label>목적지</label><div className="cityGrid">{cities.map(c=><button type="button" key={c.key} className={'cityButton '+(form.city===c.key?'active':'')} onClick={()=>update('city',c.key)}><b>{c.label}</b><small>{c.short}</small></button>)}</div></div>
   <div className="fieldGrid"><div className="field"><label htmlFor="startDate">출발일</label><input id="startDate" type="date" value={form.startDate} onChange={e=>update('startDate',e.target.value)}/></div><div className="field"><label htmlFor="airport">출발 공항</label><select id="airport" value={form.departAirport} onChange={e=>update('departAirport',e.target.value)}><option>인천</option><option>김포</option><option>김해</option></select></div></div>
   <div className="fieldGrid"><div className="field"><label htmlFor="days">여행 일수</label><select id="days" value={form.days} onChange={e=>update('days',Number(e.target.value))}>{[2,3,4,5,6].map(n=><option value={n} key={n}>{n}일 {n-1}박</option>)}</select></div><div className="field"><label htmlFor="people">여행 인원</label><select id="people" value={form.travelers} onChange={e=>update('travelers',Number(e.target.value))}>{[1,2,3,4,5,6,7,8].map(n=><option value={n} key={n}>{n}명</option>)}</select></div></div>
   <div className="fieldGrid"><div className="field"><label htmlFor="budget">1인당 총예산 (원)</label><input id="budget" type="number" min="100000" step="50000" max="10000000" value={form.budgetPerPerson} onChange={e=>update('budgetPerPerson',Number(e.target.value))}/></div><div className="field"><label htmlFor="pace">여행 스타일</label><select id="pace" value={form.pace} onChange={e=>update('pace',e.target.value)}><option>여유롭게</option><option>알차게</option></select></div></div>
   <div className="field"><label>관심사 <span className="muted">(여러 개 선택 가능)</span></label><div className="chips">{topics.map(t=><button type="button" key={t} aria-pressed={form.interests.includes(t)} onClick={()=>toggle(t)} className={'chip '+(form.interests.includes(t)?'on':'')}>{form.interests.includes(t)?'✓ ':''}{t}</button>)}</div></div>
   <div className="field"><label htmlFor="refine">추가 요청 또는 재계획</label><textarea id="refine" rows="3" value={form.refine} maxLength={300} onChange={e=>update('refine',e.target.value)} placeholder="예: 둘째 날 비가 온다고 가정하고 실내 장소 중심으로 바꿔 줘. 쇼핑보다 문화를 더 즐기고 싶어."/></div>
   <div className="field"><label>실행 모드</label><div className="modeSelect"><label><input type="radio" checked={mode==='ai'} onChange={()=>setMode('ai')}/> 실제 AI Agent <small>OpenAI API 키 필요</small></label><label><input type="radio" checked={mode==='demo'} onChange={()=>setMode('demo')}/> 무료 데모 <small>AI API 호출 없음</small></label></div></div>
   {error&&<div className="error" role="alert">{error}</div>}
   <button className="submit" type="submit" disabled={busy}>{busy?'도구 실행 및 일정 작성 중…':mode==='ai'?'AI Agent로 여행 계획 만들기 →':'데모 일정 살펴보기 →'}</button>
   <p className="help">데모 모드는 실제 Agent 호출이 아닙니다. 실제 Agent의 도구 실행 기록은 AI 모드에서 확인할 수 있습니다.</p>
  </form></div>
  <aside className="aside"><div className="asideBox"><span className="asideEyebrow">HOW IT WORKS</span><h3>AI가 여행을<br/>설계하는 방법</h3><div className="flowSteps"><div><b>01</b><span>목표·조건 파악</span></div><div><b>02</b><span>장소 검색 도구 선택</span></div><div><b>03</b><span>예산 계산 함수 실행</span></div><div><b>04</b><span>결과 검토 및 일정 구성</span></div><div><b>05</b><span>조건 변경 시 재검색</span></div></div><p className="asideNote">실습용 관광지 목록과 예시 예산을 사용합니다. 실시간 항공권·호텔 검색이나 예약·결제는 지원하지 않습니다.</p></div><div className="asideLight"><b>수업 핵심</b><p>AI Agent는 답변만 생성하지 않습니다. 실제 도구를 호출하고 그 결과를 바탕으로 후속 작업을 결정합니다.</p></div></aside></section>
  <section id="results" className="results">{plan? <><div className="resultsHeader"><div><span className="eyebrow">YOUR TRIP PLAN</span><h2>{plan.title}</h2><p>{plan.summary}</p></div><span className={'modeBadge '+(plan.mode==='demo'?'demo':'real')}>{plan.mode==='demo'?'데모 · 비AI':'AI Agent 실행'}</span></div>
   {budget&&<div className="budgetBar"><div><small>1인당 예산</small><strong>{won(budget.budgetPerPerson)}</strong></div><div><small>예시 지출 추정</small><strong>{won(budget.estimatedPerPerson)}</strong></div><div><small>예산 차이</small><strong>{budget.difference>=0?'+':''}{won(budget.difference)}</strong></div></div>}
   <div className="daysGrid">{plan.days.map((day,i)=><article key={i} className="dayCard"><div className="dayLabel">DAY {String(day.day).padStart(2,'0')}<span>{day.label}</span></div>{slots.map(([key,label,n])=>{const p=day[key];return <div className="place" key={key}><span className="slot">{label}</span><div><b>{p?.name||'장소 미정'}</b><small>{p?.district||''}</small><p>{p?.summary||''}</p></div></div>})}<div className="dayTip">{day.tip}</div></article>)}</div>
   {domestic&&<section className="mapsSection"><h3>네이버지도 자동차 경로 (첫날 오전 → 오후)</h3><p className="help">기존 AI·NAVER API 지도 서비스를 실제 호출합니다. 도보·대중교통 경로가 아닌 자동차 이동 기준이며, API 종료 후에는 작동하지 않습니다.</p><button type="button" className="printButton" disabled={driveBusy} onClick={showRoute}>{driveBusy?'실제 경로 조회 중…':'네이버지도 실제 경로 조회'}</button>{driveError&&<p className="error">{driveError}</p>}{drive&&<><p><b>{drive.from.name} → {drive.to.name}: {drive.distanceKm}km / 약 {drive.durationMinutes}분 (자동차)</b></p><LegacyNaverMap route={drive}/><p className="help">출처: {drive.source} · 실제 API 조회 성공</p></>}</section>}
   <div className="trace"><h3>도구 실행 기록</h3>{plan.trace?.map((t,i)=><div key={i}><code>{t.tool}</code><span>{t.status}</span><small>{t.info}</small></div>)}</div>
   <p className="disclaimer">{plan.disclaimer}</p><button className="printButton" onClick={()=>window.print()}>일정 인쇄 / PDF 저장</button>
  </>:<div className="empty"><span>✦</span><h3>아직 생성된 일정이 없습니다.</h3><p>왼쪽에서 여행 조건을 입력하고 일정을 만들어 보세요.</p></div>}</section>
  <footer><strong>TravelLoop</strong><span>생성형 AI와 바이브 코딩 · 12주차 Agent 실습</span></footer>
 </main>;
}
