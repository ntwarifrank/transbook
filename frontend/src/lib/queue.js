import { Queue } from 'bullmq';

const redisConnection = {
  host: process.env.UPSTASH_REDIS_HOST || 'gusc1-generous-caiman-30315.upstash.io',
  port: process.env.UPSTASH_REDIS_PORT || 30315,
  password: process.env.UPSTASH_REDIS_PASSWORD || '65eb166f579f4fd98190ab6682436118',
};

// A single connection for all queues
const connection = {
    connection: redisConnection,
};

export const translationQueue = new Queue('translation-queue', connection);
