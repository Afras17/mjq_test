import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const sql = getDb();

    // Check for duplicate
    const existing = await sql`
      SELECT id FROM newsletter_emails WHERE email = ${email.toLowerCase().trim()}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'This email is already subscribed.' },
        { status: 409 }
      );
    }

    // Insert new email
    await sql`
      INSERT INTO newsletter_emails (email, created_at)
      VALUES (${email.toLowerCase().trim()}, NOW())
    `;

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Newsletter subscription error:', error);

    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    if (errMsg.includes('does not exist')) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
