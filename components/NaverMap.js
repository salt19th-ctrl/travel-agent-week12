"use client";
import {useEffect,useRef,useState} from 'react';
export default function NaverMap({route}) {
 const div=useRef(null);const [error,setError]=useState('');
 const id=process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;
 useEffect(()=>{
   if(!route||!div.current||!id)return;
   let active=true;
   const draw=()=>{
    if(!active||!div.current||!window.naver?.maps)return;
    const M=window.naver.maps;
    const center=new M.LatLng(route.from.lat,route.from.lng);
    const map=new M.Map(div.current,{center,zoom:12});
    const a=new M.LatLng(route.from.lat,route.from.lng),b=new M.LatLng(route.to.lat,route.to.lng);
    new M.Marker({map,position:a,title:route.from.name});
    new M.Marker({map,position:b,title:route.to.name});
    const bounds=new M.LatLngBounds(a,b);
    if(Array.isArray(route.path)&&route.path.length>1){
     const coords=route.path.map(([lng,lat])=>new M.LatLng(lat,lng));
     new M.Polyline({map,path:coords,strokeColor:'#147c6a',strokeWeight:5,strokeOpacity:0.9});
     coords.forEach(c=>bounds.extend(c));
    }
    map.fitBounds(bounds,{top:45,bottom:45,left:45,right:45});
   };
   window.navermap_authFailure=()=>active&&setError('네이버지도 인증 실패: 서비스 URL 또는 Client ID를 확인하세요.');
   if(window.naver?.maps){draw();return()=>{active=false};}
   let script=document.querySelector('script[data-newmaps="true"]');
   if(!script){script=document.createElement('script');script.dataset.newmaps='true';script.src=`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(id)}`;script.async=true;document.head.appendChild(script);}
   script.addEventListener('load',draw);script.addEventListener('error',()=>active&&setError('네이버 Maps SDK를 불러오지 못했습니다. Dynamic Map 권한과 등록 도메인을 확인하세요.'));
   return()=>{active=false;script.removeEventListener('load',draw)};
 },[route,id]);
 if(!id)return <p className="help">지도표시용 NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID 설정이 없습니다. 경로 조회 결과 텍스트는 표시할 수 있습니다.</p>;
 return <><div ref={div} className="naverMap" role="img" aria-label="네이버지도 자동차 경로"/>{error&&<p className="error">{error}</p>}</>;
}
