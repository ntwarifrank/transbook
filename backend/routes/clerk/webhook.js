import express from 'express';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import User from '../../models/users.js';

const router = express.Router();

// You can find this in your Clerk dashboard's webhooks settings
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

router.post('/', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return res.status(500).send('Server configuration error');
  }

  // Get the headers
  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).send('Error occurred -- no svix headers');
  }

  // Get the body
  const payload = req.body;
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).send('Error occurred');
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with an ID of ${id} and type of ${eventType} received`);

  // Handle the event
  if (eventType === 'user.created') {
    const { id, email_addresses, username } = evt.data;

    try {
      const newUser = new User({
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username,
        // Initialize with default subscription values
        subscriptionPlan: 'FREE',
        subscriptionStatus: 'active',
        wordCredit: 5000,
      });

      await newUser.save();
      console.log(`Successfully created new user in DB with Clerk ID: ${id}`);
    } catch (dbError) {
      console.error('Error saving user to database:', dbError);
      return res.status(500).send('Error saving user');
    }
  }

  res.status(200).send('OK');
});

export default router;
