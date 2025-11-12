'use server';

import { tailorAboutMe, type TailorAboutMeInput } from '@/ai/flows/tailor-about-me';
import { db } from '@/lib/firebase-admin';
import { Resend } from 'resend';

export async function generateTailoredAboutMe(input: TailorAboutMeInput) {
  try {
    const result = await tailorAboutMe(input);
    return { success: true, tailoredAboutMe: result.tailoredAboutMe };
  } catch (error) {
    console.error('Error tailoring about me:', error);
    return { success: false, error: 'An unexpected error occurred while tailoring the bio.' };
  }
}

export async function submitContactForm(data: { name: string; email: string; message: string }) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // 1️⃣ Save to Firestore
    await db.collection('messages').add({
      ...data,
      timestamp: new Date(),
    });
    
    // 2️⃣ Send email with Resend
    const fromEmail = 'Portfolio <onboarding@resend.dev>'; 
    const toEmail = 'siddharthbejadi.com@gmail.com'; 

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

    return { success: true };
  } catch (error: any) {
    console.error('Error submitting contact form:', error.message);
    return { success: false, error: 'Failed to send message. Please try again later.' };
  }
}
