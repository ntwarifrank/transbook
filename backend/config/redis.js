import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Redis(process.env.UPSTASH_REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: {
    rejectUnauthorized: false // Required for Upstash
  }
});

connection.on('connect', () => {
  console.log('✅ Connected to Redis successfully!');
});

connection.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export default connection;
