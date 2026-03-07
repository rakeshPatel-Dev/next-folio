import { NextResponse } from 'next/server';
import { techQuotes } from '@/data/techQuotes';



export async function GET() {
  const randomIndex = Math.floor(Math.random() *techQuotes .length);
  const quote = techQuotes[randomIndex];
  
  return NextResponse.json(quote);
}

