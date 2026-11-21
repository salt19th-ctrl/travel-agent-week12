import test from 'node:test';
import assert from 'node:assert/strict';
import {SPOTS,DOMESTIC_CITIES,CITY_LABELS,searchPlaces,estimateBudget,makeDemoPlan} from '../lib/tools.js';

test('서울·부산·제주만 지원하고 해외 도시 요청을 거절한다',()=>{
 assert.deepEqual(Object.keys(SPOTS).sort(),['busan','jeju','seoul']);
 assert.deepEqual(Array.from(DOMESTIC_CITIES).sort(),['busan','jeju','seoul']);
 assert.equal(Object.keys(CITY_LABELS).length,3);
 assert.match(searchPlaces({city:'unknown'}).error,/국내/);
 assert.match(estimateBudget({city:'unknown'}).error,/지원하지/);
});
test('세 국내 도시에서 최소 8개 이상 장소를 제공한다',()=>{
 for(const city of DOMESTIC_CITIES){
  const r=searchPlaces({city,focus:'산책',limit:12});
  assert.ok(r.places.length>=8);
  assert.ok(r.places.every(x=>x.id&&x.address));
  const uniq=new Set(r.places.map(x=>x.id));
  assert.equal(uniq.size,r.places.length);
 }
});
test('우천 실내 대안에는 실내 관광지만 포함된다',()=>{
 for(const city of DOMESTIC_CITIES){
  const r=searchPlaces({city,focus:'전시',indoorsOnly:true,limit:12});
  assert.ok(r.places.length>=2);
  assert.ok(r.places.every(p=>p.indoor));
 }
});
test('국내 예산의 현지 체류비만 합산하며 항공편 비용을 만들지 않는다',()=>{
 for(const city of DOMESTIC_CITIES){
  const b=estimateBudget({city,days:4,travelers:3,budgetPerPerson:650000});
  assert.equal(b.estimatedGroup,b.estimatedPerPerson*3);
  assert.deepEqual(Object.keys(b.perPerson),['lodging','food','localTransit','activities']);
  assert.match(b.warning,/왕복 교통비/);
  assert.ok(b.estimatedPerPerson>0);
 }
});
test('데모 일정은 국내 데이터만 사용하며 실제 AI 호출이라고 주장하지 않는다',()=>{
 const p=makeDemoPlan({city:'busan',days:3,travelers:2,interests:['산책']});
 assert.equal(p.mode,'demo');
 assert.equal(p.days.length,3);
 assert.match(p.disclaimer,/AI API를 호출하지 않은/);
 const ids=p.days.flatMap(d=>[d.morning?.id,d.afternoon?.id,d.evening?.id]).filter(Boolean);
 assert.equal(new Set(ids).size,ids.length);
 assert.ok(ids.every(id=>SPOTS.busan.some(place=>place.id===id)));
});
test('일정이 긴 경우 장소를 무리하게 반복하지 않고 자유 일정으로 둔다',()=>{
 const p=makeDemoPlan({city:'jeju',days:6,travelers:2,interests:['문화']});
 const ids=p.days.flatMap(d=>[d.morning?.id,d.afternoon?.id,d.evening?.id]).filter(Boolean);
 assert.equal(ids.length,new Set(ids).size);
 assert.equal(ids.length,SPOTS.jeju.length);
 assert.ok(p.days.some(d=>!d.evening));
});
