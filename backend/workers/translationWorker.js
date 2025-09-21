import { Worker } from 'bullmq';
import connection from '../config/redis.js';
import { performTranslation } from '../routes/translation/translation.js'; // We will move the logic here

const queueName = 'translation';

const worker = new Worker(queueName, async (job) => {
  console.log(`🚀 [Worker] Processing job ${job.id}`);
  
  try {
    // The performTranslation function contains the core translation logic
    await performTranslation(job);
    return { success: true };
  } catch (error) {
    console.error(`❌ [Worker] Error processing job ${job.id}:`, error);
    throw error; // Throwing the error will cause BullMQ to retry the job
  }
}, {
  connection,
  concurrency: 5, // Process up to 5 jobs at a time
  limiter: {
    max: 10, // Max 10 jobs
    duration: 60000, // per 60 seconds
  },
});

worker.on('completed', (job) => {
  console.log(`✅ Worker completed job ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Worker failed job ${job.id} with error: ${err.message}`);
});

console.log('🚀 Translation worker is running...');

export default worker;
