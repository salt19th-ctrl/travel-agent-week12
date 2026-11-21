// 12주차 실습을 위한 정적 관광지 데이터: 실시간 가격·영업·예약 정보를 제공하지 않음.
export const SPOTS = {
  tokyo: [
    { id:'t1',name:'아사쿠사 센소지',district:'아사쿠사',tags:['문화','산책','사진'],indoor:false,summary:'전통적인 도쿄 분위기를 느낄 수 있는 지역' },
    { id:'t2',name:'우에노 공원',district:'우에노',tags:['산책','자연','문화'],indoor:false,summary:'공원과 박물관이 모여 있는 지역' },
    { id:'t3',name:'도쿄 국립박물관',district:'우에노',tags:['문화','전시'],indoor:true,summary:'일본의 미술·역사 유물을 살펴볼 수 있는 박물관' },
    { id:'t4',name:'시부야 스크램블 교차로',district:'시부야',tags:['쇼핑','사진','도시'],indoor:false,summary:'도쿄의 도시 분위기를 경험하는 장소' },
    { id:'t5',name:'시부야 스크램블 스퀘어',district:'시부야',tags:['쇼핑','도시'],indoor:true,summary:'시부야 지역의 복합 상업 공간' },
    { id:'t6',name:'메이지 신궁',district:'하라주쿠',tags:['문화','산책'],indoor:false,summary:'도심 속 신사와 숲길을 함께 둘러볼 수 있는 곳' },
    { id:'t7',name:'오모테산도',district:'하라주쿠',tags:['쇼핑','카페','산책'],indoor:false,summary:'패션 매장과 카페가 모여 있는 거리' },
    { id:'t8',name:'긴자 식당가',district:'긴자',tags:['맛집','쇼핑'],indoor:true,summary:'다양한 식당과 백화점이 모여 있는 지역' },
    { id:'t9',name:'도쿄역 일번가',district:'마루노우치',tags:['쇼핑','맛집'],indoor:true,summary:'실내 상점과 음식점이 많은 도쿄역 인근 공간' },
    { id:'t10',name:'팀랩 플래닛 도쿄',district:'도요스',tags:['전시','사진'],indoor:true,summary:'몰입형 디지털 아트를 체험할 수 있는 전시 공간' },
    { id:'t11',name:'츠키지 장외시장',district:'츠키지',tags:['맛집','문화'],indoor:false,summary:'시장 음식과 상점을 구경할 수 있는 곳' },
    { id:'t12',name:'아키하바라 전자상가',district:'아키하바라',tags:['쇼핑','문화'],indoor:true,summary:'전자제품·애니메이션 관련 매장이 모여 있는 지역' }
  ],
  osaka: [
    { id:'o1',name:'도톤보리',district:'난바',tags:['맛집','쇼핑','사진'],indoor:false,summary:'오사카의 대표적인 번화가와 음식 거리' },
    { id:'o2',name:'구로몬 시장',district:'닛폰바시',tags:['맛집','문화'],indoor:true,summary:'다양한 먹거리와 시장 상점을 즐기는 장소' },
    { id:'o3',name:'오사카성 공원',district:'오사카성',tags:['문화','산책'],indoor:false,summary:'역사 유적과 공원을 둘러볼 수 있는 곳' },
    { id:'o4',name:'오사카 역사박물관',district:'다니마치',tags:['전시','문화'],indoor:true,summary:'오사카의 도시 역사 관련 전시 공간' },
    { id:'o5',name:'우메다 스카이 빌딩',district:'우메다',tags:['도시','사진'],indoor:true,summary:'오사카 도심의 전망을 감상할 수 있는 건물' },
    { id:'o6',name:'한큐 우메다 본점',district:'우메다',tags:['쇼핑','맛집'],indoor:true,summary:'실내 쇼핑과 식당을 이용하기 좋은 지역' },
    { id:'o7',name:'신세카이',district:'덴노지',tags:['맛집','사진','문화'],indoor:false,summary:'오사카의 오래된 상점가 분위기를 경험하는 곳' },
    { id:'o8',name:'오사카 시립과학관',district:'나카노시마',tags:['전시','문화'],indoor:true,summary:'과학 전시와 체험을 즐길 수 있는 박물관' },
    { id:'o9',name:'나카노시마 공원',district:'나카노시마',tags:['산책','자연'],indoor:false,summary:'강변을 따라 산책하기 좋은 도심 공원' }
  ],
  seoul: [
    {id:'s1',name:'경복궁',district:'종로',address:'서울특별시 종로구 사직로 161',tags:['문화','산책','사진'],indoor:false,summary:'조선 시대 궁궐과 전통 건축을 둘러보는 장소'},
    {id:'s2',name:'동대문디자인플라자',district:'동대문',address:'서울특별시 중구 을지로 281',tags:['전시','쇼핑','사진'],indoor:true,summary:'전시와 디자인 공간이 있는 복합문화시설'},
    {id:'s3',name:'서울역사박물관',district:'종로',address:'서울특별시 종로구 새문안로 55',tags:['문화','전시'],indoor:true,summary:'서울의 도시 역사를 살펴보는 박물관'}
  ],
  busan: [
    {id:'b1',name:'부산시립미술관',district:'해운대',address:'부산광역시 해운대구 APEC로 58',tags:['전시','문화'],indoor:true,summary:'부산의 대표적인 미술 전시 공간'},
    {id:'b2',name:'해운대 해수욕장',district:'해운대',address:'부산광역시 해운대구 해운대해변로 264',tags:['산책','자연','사진'],indoor:false,summary:'부산의 대표적인 해변 산책 장소'},
    {id:'b3',name:'영화의전당',district:'센텀시티',address:'부산광역시 해운대구 수영강변대로 120',tags:['문화','전시','사진'],indoor:true,summary:'영화 상영과 문화 행사가 열리는 시설'}
  ],
  jeju: [
    {id:'j1',name:'제주도립미술관',district:'제주시',address:'제주특별자치도 제주시 1100로 2894-78',tags:['문화','전시'],indoor:true,summary:'제주의 미술 작품과 전시를 둘러보는 장소'},
    {id:'j2',name:'한라수목원',district:'제주시',address:'제주특별자치도 제주시 수목원길 72',tags:['자연','산책'],indoor:false,summary:'수목과 산책길을 즐길 수 있는 공간'},
    {id:'j3',name:'제주민속촌',district:'표선',address:'제주특별자치도 서귀포시 표선면 민속해안로 631-34',tags:['문화','사진','산책'],indoor:false,summary:'제주 전통생활과 민속문화를 살펴볼 수 있는 장소'}
  ],
  fukuoka: [
    { id:'f1',name:'하카타역 상업시설',district:'하카타',tags:['쇼핑','맛집'],indoor:true,summary:'교통 중심지의 실내 쇼핑·식당 공간' },
    { id:'f2',name:'캐널시티 하카타',district:'하카타',tags:['쇼핑','맛집','사진'],indoor:true,summary:'상점과 식당이 있는 복합 쇼핑 공간' },
    { id:'f3',name:'구시다 신사',district:'하카타',tags:['문화','산책'],indoor:false,summary:'하카타 지역의 대표적인 신사' },
    { id:'f4',name:'오호리 공원',district:'오호리',tags:['산책','자연'],indoor:false,summary:'호수를 따라 산책할 수 있는 공원' },
    { id:'f5',name:'후쿠오카시 미술관',district:'오호리',tags:['문화','전시'],indoor:true,summary:'미술 작품을 감상할 수 있는 공간' },
    { id:'f6',name:'텐진 지하상가',district:'텐진',tags:['쇼핑','맛집'],indoor:true,summary:'날씨와 관계없이 둘러보기 좋은 지하상가' },
    { id:'f7',name:'후쿠오카 타워',district:'모모치',tags:['사진','도시'],indoor:true,summary:'바닷가 인근의 전망 시설' },
    { id:'f8',name:'모모치 해변',district:'모모치',tags:['산책','자연'],indoor:false,summary:'해변을 따라 걸을 수 있는 지역' },
    { id:'f9',name:'나카스 주변 식당가',district:'나카스',tags:['맛집','도시'],indoor:true,summary:'다양한 식당을 찾을 수 있는 번화가' }
  ]
};
export const CITY_LABELS={tokyo:'도쿄',osaka:'오사카',fukuoka:'후쿠오카',seoul:'서울',busan:'부산',jeju:'제주'};
export const DOMESTIC_CITIES = new Set(['seoul','busan','jeju']);
export function searchPlaces({city='tokyo',focus='산책',indoorsOnly=false,limit=9}={}) {
  if(!SPOTS[city]) return {error:'지원하지 않는 도시',supported:Object.values(CITY_LABELS)};
  const words=String(focus).split(/[\s,·/]+/).filter(Boolean);
  const ranked=SPOTS[city].filter(p=>!indoorsOnly||p.indoor).map(p=>({p,score:words.reduce((sum,w)=>sum+(p.tags.some(t=>t.includes(w)||w.includes(t))?2:0),0)}));
  ranked.sort((a,b)=>b.score-a.score);
  return {city:CITY_LABELS[city],source:'실습용 사전등록 장소 데이터(실시간 장소 검색 아님)',places:ranked.slice(0,Math.min(12,Math.max(1,Number(limit)||9))).map(x=>x.p)};
}
export function estimateBudget({city='tokyo',days=4,travelers=2,budgetPerPerson=1000000,pace='여유롭게'}={}) {
  if(!SPOTS[city]) return {error:'지원하지 않는 도시'};
  days=Math.max(2,Math.min(6,Number(days)||4));travelers=Math.max(1,Math.min(8,Number(travelers)||2));
  const domestic=DOMESTIC_CITIES.has(city);
  const flights={tokyo:350000,osaka:300000,fukuoka:260000,jeju:180000,seoul:0,busan:0}[city];
  const perPerson={transport:flights,lodging:(days-1)*(domestic?70000:85000),food:days*(pace==='알차게'?60000:50000),localTransit:days*(domestic?14000:17000),activities:days*23000};
  const total=Object.values(perPerson).reduce((a,b)=>a+b,0);
  return {city:CITY_LABELS[city],days,travelers,currency:'KRW',perPerson,estimatedPerPerson:total,estimatedGroup:total*travelers,budgetPerPerson:Number(budgetPerPerson)||1000000,difference:(Number(budgetPerPerson)||1000000)-total,warning:'임의 가정 단가를 사용한 학습용 계산입니다. transport는 항공/도시간 교통의 예시 비용이며 실제 항공·숙박·교통 요금 또는 예약 가능 여부가 아닙니다.'};
}
export function makeDemoPlan(request) {
  const spots=searchPlaces({city:request.city,focus:(request.interests||[]).join(' '),indoorsOnly:/비|우천/.test(request.refine||''),limit:12}).places;
  const budget=estimateBudget(request);
  const days=Math.min(5,Math.max(2,Number(request.days)||4));
  const items=Array.from({length:days},(_,i)=>({day:i+1,label:`${i+1}일 차`,morning:spots[(i*3)%spots.length],afternoon:spots[(i*3+1)%spots.length],evening:spots[(i*3+2)%spots.length],tip:i===0?'도착 시간과 숙소 이동을 고려해 첫날은 가볍게 시작하세요.':i===days-1?'귀국편 출발 시각을 확인하고 공항 이동 여유를 확보하세요.':'동선·운영시간·예약 필요 여부는 방문 전에 별도 확인하세요.'}));
  return {cityKey:request.city,title:`${CITY_LABELS[request.city]||'도쿄'} ${days}일 추천 일정`,summary:'실습용 장소 목록으로 구성한 예시 일정입니다. 실제 동선·예약·가격을 확인하지 않았습니다.',mode:'demo',budget,days:items,trace:[{tool:'search_places',status:'모의 실행',info:'실습용 장소 목록 조회'},{tool:'estimate_budget',status:'모의 실행',info:'학습용 비용 가정 계산'}],disclaimer:'이 결과는 AI API를 호출하지 않은 데모입니다. 실제 AI Agent 검증은 OPENAI_API_KEY 등록 후 AI 모드에서 확인하세요.'};
}
