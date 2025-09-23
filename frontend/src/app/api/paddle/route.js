import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { Paddle } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY);

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { amount, currency, description, documentId } = await req.json();

    const checkout = await paddle.checkouts.create({
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
      },
    });

    return NextResponse.json({ success: true, checkoutUrl: checkout.url });
  } catch (error) {
    console.error('Paddle checkout error:', error);
    return new NextResponse('Payment system temporarily unavailable.', { status: 503 });
  }
}
