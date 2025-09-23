import { Queue } from 'bullmq';

// Use the same Redis configuration as the main redis.js file
const redisConnection = {
  connection: {
    host: 'gusc1-generous-caiman-30315.upstash.io',
    port: 30315,
    password: '65eb166f579f4fd98190ab6682436118',
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    connectTimeout: 10000,
    commandTimeout: 5000,
  }
};

export const translationQueue = new Queue('translation-queue', redisConnection);
