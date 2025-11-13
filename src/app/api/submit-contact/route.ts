import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Save to Firestore (server-side)
    await db.collection('messages').add({
      ...data,
      timestamp: new Date(),
    });

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = 'Portfolio <onboarding@resend.dev>';
    const toEmail = process.env.CONTACT_TO_EMAIL || 'siddharth200517@gmail.com';

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Contact Message from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API submit-contact error:', error?.message ?? error);
    return NextResponse.json({ success: false, error: 'Failed to send message.' }, { status: 500 });
  }
}
