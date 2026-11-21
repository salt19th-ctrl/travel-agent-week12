import {DOMESTIC_CITIES,SPOTS} from './tools.js';

const BASE = 'https://maps.apigw.ntruss.com';
const cache = new Map(); // 서버 인스턴스 내 일시 캐시; 배포 간 영속되지 않음

export function hasNaverMapsKey() {
  return Boolean(process.env.NAVER_MAPS_CLIENT_ID && process.env.NAVER_MAPS_CLIENT_SECRET);
}
function headers() {
  if(!hasNaverMapsKey()) throw new Error('신규 NAVER Maps 인증정보가 설정되지 않았습니다.');
  return {'x-ncp-apigw-api-key-id':process.env.NAVER_MAPS_CLIENT_ID,
     'x-ncp-apigw-api-key':process.env.NAVER_MAPS_CLIENT_SECRET,'Accept':'application/json'};
}
export function validPair(city,fromId,toId){
  if(!DOMESTIC_CITIES.has(city))throw new Error('국내 도시만 지원합니다.');
  const places = SPOTS[city] || [];
  const from=places.find(p=>p.id===fromId), to=places.find(p=>p.id===toId);
  if(!from || !to || from.id===to.id)throw new Error('유효하고 서로 다른 국내 장소 ID가 필요합니다.');
  return {from,to};
}
async function request(url, stage){
  let r;
  try {
    r=await fetch(url,{headers:headers(),signal:AbortSignal.timeout(8500),cache:'no-store'});
  } catch(e) {
    throw new Error(`네이버 Maps ${stage} 요청 실패(네트워크 또는 시간 초과).`);
  }
  const data=await r.json().catch(()=>null);
  if(!r.ok){
    const hint=r.status===429?'호출 한도 또는 요금제 확인':r.status===401?'Client ID·Secret 확인':r.status===403?'Maps 애플리케이션 API 사용 권한 확인':`HTTP ${r.status}`;
    // 비밀키, 인증 헤더, 서버의 전체 오류 본문을 브라우저에 반환하지 않음
    throw new Error(`네이버 Maps ${stage} 오류: ${hint} (HTTP ${r.status})`);
  }
  return data;
}
export async function geocodeAddress(address) {
  if(cache.has(address))return cache.get(address);
  // 지리적 좌표를 임의 생성하지 않고 네이버 Geocoding 응답만 사용한다.
  const data=await request(`${BASE}/map-geocode/v2/geocode?query=${encodeURIComponent(address)}&count=1`,'Geocoding');
  const item=data?.addresses?.[0];
  if(data?.status!=='OK'||!item)throw new Error('해당 장소의 주소 좌표를 확인할 수 없습니다.');
  const lng=Number(item.x),lat=Number(item.y);
  if(!Number.isFinite(lng)||!Number.isFinite(lat))throw new Error('올바르지 않은 좌표 응답입니다.');
  const point={lat,lng,address:item.roadAddress || item.jibunAddress || address};
  cache.set(address,point);return point;
}
export async function getDrivingRoute({city,fromId,toId}){
  const {from,to}=validPair(city,fromId,toId);
  const [start,goal]=await Promise.all([geocodeAddress(from.address),geocodeAddress(to.address)]);
  const params=new URLSearchParams({start:`${start.lng},${start.lat}`,goal:`${goal.lng},${goal.lat}`,option:'traoptimal'});
  const data=await request(`${BASE}/map-direction/v1/driving?${params.toString()}`,'Directions 5');
  if(data?.code!==0)throw new Error(data?.message||'자동차 경로가 반환되지 않았습니다.');
  const route=data?.route?.traoptimal?.[0];
  if(!route?.summary)throw new Error('자동차 경로 결과가 없습니다.');
  const {distance,duration}=route.summary;
  if(!Number.isFinite(distance)||!Number.isFinite(duration))throw new Error('거리/시간 값이 누락되었습니다.');
  return {from:{id:from.id,name:from.name,...start},to:{id:to.id,name:to.name,...goal},
    distanceKm:Math.round(distance/100)/10,durationMinutes:Math.round(duration/60000),
    path:Array.isArray(route.path)?route.path.slice(0,2000):[],source:'NAVER Cloud Maps Directions 5 (자동차 경로)',verified:true};
}
