import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { Paddle, Environment } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY, {
  environment: Environment.sandbox // Change to Environment.production when ready
});

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { amount, currency, description, documentId, planType = 'basic' } = await req.json();

    // Use predefined price IDs for subscription plans
    let priceId;
    if (planType === 'basic') {
      priceId = process.env.PADDLE_BASIC_PRICE_ID;
    } else if (planType === 'pro') {
      priceId = process.env.PADDLE_PRO_PRICE_ID;
    } else if (planType === 'business') {
      priceId = process.env.PADDLE_BUSINESS_PRICE_ID;
    }

    let checkoutData;

    if (priceId) {
      // For subscription plans, use predefined price ID
      checkoutData = {
        line_items: [
          {
            price_id: priceId,
            quantity: 1,
          },
        ],
        custom_data: {
          user_id: userId,
          document_id: documentId,
          plan_type: planType,
        },
      };
    } else {
      // For one-time payments (credits), create dynamic price
      checkoutData = {
        line_items: [
          {
            price: {
              amount: (amount * 100).toString(), // Paddle expects amount in cents
              currency_code: currency,
              product: {
                name: description,
              },
            },
            quantity: 1,
          },
        ],
        custom_data: {
          user_id: userId,
          document_id: documentId,
          payment_type: 'credits',
        },
      };
    }

    const checkout = await paddle.checkouts.create(checkoutData);

    return NextResponse.json({ 
      success: true, 
      checkoutUrl: checkout.url,
      planType: planType 
    });
  } catch (error) {
    console.error('Paddle checkout error:', error);
    return new NextResponse('Payment system temporarily unavailable.', { status: 503 });
  }
}
