import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { orderSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = orderSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, dob, birthplace, q1, q2, q3, cardPulls, lang, product } = parsedData.data;

    const priceId = process.env.STRIPE_PRICE_3CARD;
    const siteUrl = process.env.SITE_URL;

    if (!priceId || !siteUrl) {
      throw new Error('Missing required environment variables for Stripe checkout.');
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        name,
        dob,
        birthplace,
        q1,
        q2: q2 || '',
        q3: q3 || '',
        cardPulls: cardPulls || '',
        lang,
        product,
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Checkout API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Failed to create checkout session: ${errorMessage}` }, { status: 500 });
  }
}
