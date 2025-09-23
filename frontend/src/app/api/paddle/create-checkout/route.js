import { NextResponse } from 'next/server';
import { Paddle, Environment } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY, {
  environment: Environment.sandbox, // or Environment.production
});

export async function POST(req) {
  try {
    const { planName, userEmail, customData } = await req.json();

    // Map your plan names to Paddle Price IDs
    const priceIds = {
      'BASIC': process.env.PADDLE_BASIC_PRICE_ID,
      'PRO': process.env.PADDLE_PRO_PRICE_ID,
      // Add other plans as needed
    };

    const priceId = priceIds[planName];

    if (!priceId) {
      return new NextResponse('Invalid plan name', { status: 400 });
    }

    const checkout = await paddle.checkouts.create({
      items: [{ price_id: priceId, quantity: 1 }],
      customer: { email: userEmail },
      custom_data: customData,
      // You can add more checkout options here, like a success URL
      // success_url: 'http://localhost:3000/thank-you',
    });

    return NextResponse.json({ success: true, checkoutData: checkout });

  } catch (error) {
    console.error('Error creating Paddle checkout:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
