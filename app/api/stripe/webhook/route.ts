import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';
import { stripe } from '@/lib/stripe';
import { ulid } from 'ulid';

const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function sendToN8n(session: Stripe.Checkout.Session) {
  if (!n8nWebhookUrl) {
    throw new Error('Missing n8n webhook URL environment variable.');
  }

  if (!session.metadata || !session.customer_details) {
    throw new Error('Missing required session data.');
  }

  const orderId = ulid();

  const payload = {
    orderId,
    name: session.metadata.name,
    dob: session.metadata.dob,
    birthplace: session.metadata.birthplace,
    q1: session.metadata.q1,
    q2: session.metadata.q2 || '',
    q3: session.metadata.q3 || '',
    lang: session.metadata.lang,
    cardPulls: session.metadata.cardPulls || '',
    product: session.metadata.product,
    email: session.customer_details.email,
    amount: session.amount_total,
    currency: session.currency,
  };

  const payloadString = JSON.stringify(payload);

  // Fire-and-forget POST to n8n
  fetch(n8nWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payloadString,
  }).then(response => {
    if (!response.ok) {
      console.error(`n8n webhook call failed with status: ${response.status} ${response.statusText}`);
    } else {
      console.log(`Successfully sent order ${orderId} to n8n.`);
    }
  }).catch(error => {
    console.error(`Error sending data to n8n for order ${orderId}:`, error);
  });
}

export async function POST(req: Request) {
  if (!stripeWebhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook secret is not configured.' }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, stripeWebhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Webhook signature verification failed: ${errorMessage}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await sendToN8n(session);
    } catch (error) {
      // Log the error but don't block the response to Stripe
      console.error("Error preparing to send data to n8n:", error);
    }
  }

  return NextResponse.json({ received: true });
}
