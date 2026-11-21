import test from 'node:test';
import assert from 'node:assert/strict';
import {searchPlaces,estimateBudget,makeDemoPlan} from '../lib/tools.js';

test('도시별 관광지 검색과 우천 대안',()=>{
 const a=searchPlaces({city:'tokyo',focus:'쇼핑',indoorsOnly:true,limit:4});
 assert.equal(a.places.length,4);
 assert.ok(a.places.every(p=>p.indoor));
});
test('예산은 여행자 수를 반영하고 실제 가격이라고 주장하지 않는다',()=>{
 const b=estimateBudget({city:'tokyo',days:4,travelers:2,budgetPerPerson:1000000});
 assert.equal(b.estimatedGroup,b.estimatedPerPerson*2);
 assert.match(b.warning,/학습용/);
});
test('데모는 실제 AI가 아닌 것을 밝히며 일정 일수를 지킨다',()=>{
 const p=makeDemoPlan({city:'osaka',days:3,travelers:2,interests:['맛집']});
 assert.equal(p.mode,'demo'); assert.equal(p.days.length,3);assert.match(p.disclaimer,/AI API를 호출하지 않은/);
});
