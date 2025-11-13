import { NextResponse } from 'next/server';
import { tailorAboutMe, type TailorAboutMeInput } from '@/ai/flows/tailor-about-me';

export async function POST(req: Request) {
  try {
    const input = (await req.json()) as TailorAboutMeInput;
    const result = await tailorAboutMe(input);
    return NextResponse.json({ success: true, tailoredAboutMe: result.tailoredAboutMe });
  } catch (error) {
    console.error('API generate-tailored-about-me error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate tailored about me.' }, { status: 500 });
  }
}
