import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required.' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || !session.metadata) {
      return NextResponse.json({ error: 'Session not found or metadata is missing.' }, { status: 404 });
    }

    // We only want to expose a sanitized version of the data to the client.
    const summary = {
      name: session.metadata.name,
      dob: session.metadata.dob,
      birthplace: session.metadata.birthplace,
      q1: session.metadata.q1,
      q2: session.metadata.q2,
      q3: session.metadata.q3,
    };

    return NextResponse.json(summary);

  } catch (error) {
    console.error('Order Summary API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Failed to retrieve session data: ${errorMessage}` }, { status: 500 });
  }
}
