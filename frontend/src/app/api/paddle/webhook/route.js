import { NextResponse } from 'next/server';
import redis from '@/lib/redis'; // Assuming you have a Redis client setup

// This is a simplified webhook handler. In a production environment, you should
// verify the webhook signature to ensure it's from Paddle.

export async function POST(req) {
  try {
    const event = await req.json();

    // Check if the event is a successful checkout
    if (event.event_type === 'checkout.completed') {
      const { custom_data } = event.data;
      const { user_id, document_id } = custom_data;

      if (user_id && document_id) {
        // Mark the document as paid in Redis. We'll store this for 24 hours.
        await redis.set(`payment:${document_id}`, 'paid', 'EX', 86400);
        console.log(`Payment successful for document: ${document_id}`);
      }
    }

    return new NextResponse('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Paddle webhook error:', error);
    return new NextResponse('Webhook processing failed', { status: 500 });
  }
}
