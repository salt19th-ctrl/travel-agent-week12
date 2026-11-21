// 국내 여행 전용 예시 관광지 데이터입니다. 실시간 영업정보·예약 가능 여부를 제공하지 않습니다.
// 주소는 네이버 Geocoding으로 조회할 때 사용합니다. 조회되지 않는 경우 경로를 임의 계산하지 않습니다.
export const SPOTS = {
  seoul: [
    {id:'s1',name:'경복궁',district:'종로',address:'서울특별시 종로구 사직로 161',tags:['문화','산책','사진'],indoor:false,summary:'궁궐과 전통 건축을 살펴보는 명소'},
    {id:'s2',name:'동대문디자인플라자',district:'동대문',address:'서울특별시 중구 을지로 281',tags:['전시','쇼핑','사진'],indoor:true,summary:'전시와 디자인 관련 공간이 있는 복합문화시설'},
    {id:'s3',name:'서울역사박물관',district:'종로',address:'서울특별시 종로구 새문안로 55',tags:['문화','전시'],indoor:true,summary:'서울의 도시 역사를 소개하는 박물관'},
    {id:'s4',name:'국립중앙박물관',district:'용산',address:'서울특별시 용산구 서빙고로 137',tags:['문화','전시'],indoor:true,summary:'한국의 역사와 문화를 관람할 수 있는 박물관'},
    {id:'s5',name:'서울숲',district:'성동',address:'서울특별시 성동구 뚝섬로 273',tags:['자연','산책','사진'],indoor:false,summary:'도심에서 넓은 녹지를 경험할 수 있는 공원'},
    {id:'s6',name:'남산서울타워',district:'용산',address:'서울특별시 용산구 남산공원길 105',tags:['사진','도시','산책'],indoor:false,summary:'서울 도심을 바라볼 수 있는 남산의 전망 명소'},
    {id:'s7',name:'코엑스',district:'강남',address:'서울특별시 강남구 영동대로 513',tags:['쇼핑','맛집','전시'],indoor:true,summary:'전시 공간과 상업시설이 모여 있는 복합 공간'},
    {id:'s8',name:'서울식물원',district:'강서',address:'서울특별시 강서구 마곡동로 161',tags:['자연','전시','산책'],indoor:true,summary:'식물을 주제로 온실과 정원을 둘러보는 공간'},
    {id:'s9',name:'덕수궁',district:'중구',address:'서울특별시 중구 세종대로 99',tags:['문화','산책','사진'],indoor:false,summary:'도심의 궁궐과 역사적인 건축을 만나는 장소'},
    {id:'s10',name:'여의도한강공원',district:'영등포',address:'서울특별시 영등포구 여의동로 330',tags:['산책','자연','사진'],indoor:false,summary:'한강 주변에서 휴식과 산책을 즐기는 공원'}
  ],
  busan: [
    {id:'b1',name:'부산시립미술관',district:'해운대',address:'부산광역시 해운대구 APEC로 58',tags:['전시','문화'],indoor:true,summary:'전시 관람을 위한 부산의 문화 공간'},
    {id:'b2',name:'해운대 해수욕장',district:'해운대',address:'부산광역시 해운대구 해운대해변로 264',tags:['산책','자연','사진'],indoor:false,summary:'부산의 대표적인 해변과 산책 공간'},
    {id:'b3',name:'영화의전당',district:'센텀시티',address:'부산광역시 해운대구 수영강변대로 120',tags:['문화','전시','사진'],indoor:true,summary:'영화 상영과 문화 행사를 위한 시설'},
    {id:'b4',name:'감천문화마을',district:'사하',address:'부산광역시 사하구 감내2로 203',tags:['문화','산책','사진'],indoor:false,summary:'언덕길의 마을 풍경과 골목 문화를 둘러보는 곳'},
    {id:'b5',name:'광안리 해수욕장',district:'수영',address:'부산광역시 수영구 광안해변로 219',tags:['산책','사진','맛집'],indoor:false,summary:'바다와 광안대교 풍경을 볼 수 있는 해변'},
    {id:'b6',name:'국립해양박물관',district:'영도',address:'부산광역시 영도구 해양로301번길 45',tags:['전시','문화'],indoor:true,summary:'해양문화와 역사에 관한 전시 공간'},
    {id:'b7',name:'태종대',district:'영도',address:'부산광역시 영도구 전망로 24',tags:['자연','산책','사진'],indoor:false,summary:'해안 절경과 숲길을 즐길 수 있는 명소'},
    {id:'b8',name:'부산타워',district:'중구',address:'부산광역시 중구 용두산길 37-55',tags:['사진','도시'],indoor:true,summary:'부산 중심부를 조망할 수 있는 전망 명소'},
    {id:'b9',name:'해운대블루라인파크',district:'해운대',address:'부산광역시 해운대구 달맞이길62번길 13',tags:['자연','사진','산책'],indoor:false,summary:'해안 풍경을 따라 이동하는 관광 시설'},
    {id:'b10',name:'부산근현대역사관',district:'중구',address:'부산광역시 중구 대청로 112',tags:['전시','문화'],indoor:true,summary:'부산 근현대사를 살펴보는 전시 공간'}
  ],
  jeju: [
    {id:'j1',name:'제주도립미술관',district:'제주시',address:'제주특별자치도 제주시 1100로 2894-78',tags:['문화','전시'],indoor:true,summary:'제주 관련 미술 작품과 전시를 만나는 공간'},
    {id:'j2',name:'한라수목원',district:'제주시',address:'제주특별자치도 제주시 수목원길 72',tags:['자연','산책'],indoor:false,summary:'다양한 식물과 산책길을 즐길 수 있는 수목원'},
    {id:'j3',name:'제주민속촌',district:'표선',address:'제주특별자치도 서귀포시 표선면 민속해안로 631-34',tags:['문화','사진','산책'],indoor:false,summary:'제주 전통생활과 민속문화를 소개하는 장소'},
    {id:'j4',name:'오설록 티뮤지엄',district:'안덕',address:'제주특별자치도 서귀포시 안덕면 신화역사로 15',tags:['전시','카페','사진'],indoor:true,summary:'차 문화를 주제로 한 공간과 차밭 주변 풍경'},
    {id:'j5',name:'성산일출봉',district:'성산',address:'제주특별자치도 서귀포시 성산읍 일출로 284-12',tags:['자연','산책','사진'],indoor:false,summary:'제주의 독특한 화산 지형과 해안 경관'},
    {id:'j6',name:'여미지식물원',district:'중문',address:'제주특별자치도 서귀포시 중문관광로 93',tags:['자연','전시','산책'],indoor:true,summary:'여러 식물을 관찰할 수 있는 중문 지역 식물원'},
    {id:'j7',name:'제주항공우주박물관',district:'안덕',address:'제주특별자치도 서귀포시 안덕면 녹차분재로 218',tags:['전시','문화'],indoor:true,summary:'항공과 우주 관련 전시 및 교육 공간'},
    {id:'j8',name:'제주돌문화공원',district:'조천',address:'제주특별자치도 제주시 조천읍 남조로 2023',tags:['문화','산책','자연'],indoor:false,summary:'제주의 돌 문화와 설화를 소개하는 공원'}
  ]
};
export const CITY_LABELS={seoul:'서울',busan:'부산',jeju:'제주'};
export const DOMESTIC_CITIES=new Set(Object.keys(CITY_LABELS));

export function searchPlaces({city='busan',focus='산책',indoorsOnly=false,limit=9}={}){
  if(!DOMESTIC_CITIES.has(city))return {error:'국내 지원 지역(서울·부산·제주)만 선택할 수 있습니다.',supported:Object.values(CITY_LABELS)};
  const words=String(focus).split(/[\s,·/]+/).filter(Boolean);
  const ranked=SPOTS[city].filter(p=>!indoorsOnly||p.indoor).map(p=>({p,score:words.reduce((sum,w)=>sum+(p.tags.some(t=>t.includes(w)||w.includes(t))?2:0),0)}));
  ranked.sort((a,b)=>b.score-a.score);
  return {city:CITY_LABELS[city],source:'국내 관광지 사전등록 참고 데이터(실시간 관광지 검색 아님)',places:ranked.slice(0,Math.min(12,Math.max(1,Number(limit)||9))).map(x=>x.p)};
}

export function estimateBudget({city='busan',days=3,travelers=2,budgetPerPerson=600000,pace='여유롭게'}={}){
  if(!DOMESTIC_CITIES.has(city))return {error:'지원하지 않는 국내 여행지입니다.'};
  days=Math.max(2,Math.min(6,Number(days)||3));
  travelers=Math.max(1,Math.min(8,Number(travelers)||2));
  // 아래 값은 실측 요금이 아닌 실습용 임의 단가이다. 출발지-목적지 교통은 포함하지 않는다.
  const perPerson={lodging:(days-1)*70000,food:days*(pace==='알차게'?60000:50000),localTransit:days*14000,activities:days*23000};
  const total=Object.values(perPerson).reduce((a,b)=>a+b,0);
  const budget=Number(budgetPerPerson)||600000;
  return {city:CITY_LABELS[city],days,travelers,currency:'KRW',perPerson,estimatedPerPerson:total,estimatedGroup:total*travelers,budgetPerPerson:budget,difference:budget-total,excluded:['출발지에서 여행지까지의 왕복 교통비','차량 렌트·주유·주차 등 실제 비용','개인 쇼핑비'],warning:'임의 가정 단가를 사용한 학습용 예산입니다. 출발 지역의 왕복 교통비, 실제 숙박·식비·교통 요금과 예약 가능 여부는 반영하지 않습니다.'};
}

export function makeDemoPlan(request){
  const list=searchPlaces({city:request.city,focus:(request.interests||[]).join(' '),indoorsOnly:/비|우천|실내/.test(request.refine||''),limit:12});
  if(list.error)return {error:list.error};
  const spots=list.places;
  const budget=estimateBudget(request);
  const days=Math.min(6,Math.max(2,Number(request.days)||3));
  // 중복 여행지를 무조건 채우지 않고, 데이터 소진 후에는 자유 일정으로 남긴다.
  const items=Array.from({length:days},(_,i)=>({
    day:i+1,label:`${i+1}일 차`,morning:spots[i*3]||null,afternoon:spots[i*3+1]||null,evening:spots[i*3+2]||null,
    tip:i===0?'출발 지역에서 여행지까지 이동하는 시간을 고려해 첫날 일정은 여유롭게 구성하세요.':i===days-1?'귀가 교통편과 체크아웃 시각을 확인하고 여유를 확보하세요.':'실제 이동경로와 운영시간은 방문 전에 확인하세요.'
  }));
  return {cityKey:request.city,title:`${CITY_LABELS[request.city]} ${days}일 추천 일정`,summary:'국내 참고 관광지 목록으로 구성한 예시 일정입니다. 빈 시간은 자유 일정으로 남겼으며 실제 운영시간·예약 여부는 확인하지 않았습니다.',mode:'demo',budget,days:items,trace:[{tool:'search_places',status:'모의 실행',info:'국내 사전등록 장소 목록 사용'},{tool:'estimate_budget',status:'모의 실행',info:'국내 예산 가정 계산'}],disclaimer:'이 결과는 AI API를 호출하지 않은 데모입니다. 실제 AI Agent 검증은 OPENAI_API_KEY 설정 후 AI 모드에서 확인하세요. 출발지 왕복 교통비는 예산에서 제외됩니다.'};
}
