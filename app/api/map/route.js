import {NextResponse} from 'next/server';
import {getDrivingRoute} from '../../../lib/naverLegacy.js';
export const runtime='nodejs';
export async function POST(req){
 try {
  const {city,fromId,toId}=await req.json();
  const result=await getDrivingRoute({city,fromId,toId});
  return NextResponse.json(result);
 } catch(e) {return NextResponse.json({error:String(e.message||e),verified:false},{status:400});}
}
