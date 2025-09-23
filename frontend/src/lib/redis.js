import { Redis } from 'ioredis';

// Configure Redis with proper error handling and retry logic
const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  connectTimeout: 10000,
  commandTimeout: 5000,
});

// Handle connection errors gracefully
redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});

redis.on('connect', () => {
  console.log('✅ Connected to Redis');
});

export default redis;
