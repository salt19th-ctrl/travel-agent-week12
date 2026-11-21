import test from 'node:test';
import assert from 'node:assert/strict';
import {validPair} from '../lib/naverMaps.js';
import {searchPlaces,estimateBudget} from '../lib/tools.js';
test('국내 도시 3곳 관광지 검색',()=>{
 for(const city of ['seoul','busan','jeju']){
  assert.ok(searchPlaces({city,limit:5}).places.length>=3);
  assert.ok(estimateBudget({city,days:3,travelers:2}).estimatedPerPerson>0);
 }
});
test('국내 경로 도구 인수 검증',()=>{
 assert.equal(validPair('seoul','s1','s2').from.name,'경복궁');
 assert.throws(()=>validPair('tokyo','t1','t2'));
 assert.throws(()=>validPair('seoul','s1','b1'));
 assert.throws(()=>validPair('seoul','s1','s1'));
});

test('신규 Maps API 실제 호출 구조와 응답 파싱을 모의 검증',async()=>{
 const {getDrivingRoute}=await import('../lib/naverMaps.js');
 const oldFetch=globalThis.fetch, id=process.env.NAVER_MAPS_CLIENT_ID,secret=process.env.NAVER_MAPS_CLIENT_SECRET;
 const calls=[];
 process.env.NAVER_MAPS_CLIENT_ID='mock-id';process.env.NAVER_MAPS_CLIENT_SECRET='mock-secret';
 globalThis.fetch=async (url,opts)=>{
  calls.push({url,headers:opts.headers});
  if(url.includes('map-geocode')){
   const i=calls.filter(c=>c.url.includes('map-geocode')).length;
   return {ok:true,json:async()=>({status:'OK',addresses:[{x:String(127.0+i/100),y:String(37.0+i/100),roadAddress:'모의 주소'}]})};
  }
  if(url.includes('map-direction'))return {ok:true,json:async()=>({code:0,route:{traoptimal:[{summary:{distance:3250,duration:600000},path:[[127.01,37.01],[127.02,37.02]]}]}})};
  throw new Error('예상하지 않은 호출');
 };
 try{
  const r=await getDrivingRoute({city:'seoul',fromId:'s1',toId:'s2'});
  assert.equal(r.distanceKm,3.3);assert.equal(r.durationMinutes,10);
  assert.equal(calls.length,3);
  assert.ok(calls[0].url.includes('https://maps.apigw.ntruss.com/map-geocode/v2/geocode'));
  assert.equal(calls[0].headers['x-ncp-apigw-api-key-id'],'mock-id');
  assert.ok(calls[2].url.includes('maps.apigw.ntruss.com/map-direction/v1/driving'));
  assert.equal(calls[2].headers['x-ncp-apigw-api-key'],'mock-secret');
 }finally{globalThis.fetch=oldFetch;
   if(id===undefined)delete process.env.NAVER_MAPS_CLIENT_ID;else process.env.NAVER_MAPS_CLIENT_ID=id;
   if(secret===undefined)delete process.env.NAVER_MAPS_CLIENT_SECRET;else process.env.NAVER_MAPS_CLIENT_SECRET=secret;
 }
});
