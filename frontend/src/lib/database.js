import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URL) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// ===============================================
// User and Credit Management Functions
// ===============================================

const DB_NAME = 'transbookdb'; // Your database name
const USERS_COLLECTION = 'users';

/**
 * Gets the user collection from the database.
 * @returns {Promise<import('mongodb').Collection>}
 */
async function getUsersCollection() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(USERS_COLLECTION);
}

/**
 * Finds a user by their Clerk User ID and ensures they exist in the database.
 * If the user doesn't exist, they are created with a default credit balance.
 * @param {string} userId - The Clerk User ID.
 * @returns {Promise<Object>} The user document.
 */
export async function findOrCreateUser(userId) {
  const users = await getUsersCollection();
  let user = await users.findOne({ clerkId: userId });

  if (!user) {
    const newUser = {
      clerkId: userId,
      credits: 5000, // Initial free credits
      plan: 'free',
      createdAt: new Date(),
      lastCreditRefresh: new Date(), // Set the initial refresh date
    };
    const result = await users.insertOne(newUser);
    user = { ...newUser, _id: result.insertedId };
    console.log(`New user created in DB with clerkId: ${userId} on a free plan.`);
  }

  return user;
}

/**
 * Gets the credit balance for a given user.
 * @param {string} userId - The Clerk User ID.
 * @returns {Promise<number>} The user's credit balance.
 */
export async function getUserCredits(userId) {
  const user = await findOrCreateUser(userId);
  return user.credits;
}

/**
 * Deducts a specified number of credits from a user's balance.
 * @param {string} userId - The Clerk User ID.
 * @param {number} amount - The number of credits to deduct.
 * @returns {Promise<Object>} The result of the update operation.
 */
export async function deductUserCredits(userId, amount) {
  const users = await getUsersCollection();
  return users.updateOne(
    { clerkId: userId },
    { $inc: { credits: -amount } }
  );
}

/**
 * Adds a specified number of credits to a user's balance.
 * @param {string} userId - The Clerk User ID.
 * @param {number} amount - The number of credits to add.
 * @returns {Promise<Object>} The result of the update operation.
 */
export async function addUserCredits(userId, amount) {
  const users = await getUsersCollection();
  return users.updateOne(
    { clerkId: userId },
    { $inc: { credits: amount } }
  );
}
