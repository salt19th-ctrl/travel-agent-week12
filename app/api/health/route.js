import {NextResponse} from 'next/server';
export async function GET(){return NextResponse.json({ok:true,service:'Travel Agent Week 12',aiReady:Boolean(process.env.OPENAI_API_KEY)});}
