'use client';

import type { TailorAboutMeInput } from '@/ai/flows/tailor-about-me';

// Client-side wrappers that call server API routes.
export async function generateTailoredAboutMe(input: TailorAboutMeInput) {
  try {
    const res = await fetch('/api/generate-tailored-about-me', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('generateTailoredAboutMe failed:', text);
      return { success: false, error: 'Failed to generate tailored about me.' };
    }

    return await res.json();
  } catch (error) {
    console.error('Error calling generateTailoredAboutMe API:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

export async function submitContactForm(data: { name: string; email: string; message: string }) {
  try {
    const res = await fetch('/api/submit-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('submitContactForm failed:', text);
      return { success: false, error: 'Failed to send message.' };
    }

    return await res.json();
  } catch (error) {
    console.error('Error calling submitContactForm API:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
