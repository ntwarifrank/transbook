import { Queue } from 'bullmq';
import connection from '../config/redis.js';

const queueName = 'translation';

const translationQueue = new Queue(queueName, {
  connection,
  defaultJobOptions: {
    attempts: 3, // Retry failed jobs up to 3 times
    backoff: {
      type: 'exponential',
      delay: 5000, // Start with a 5-second delay
    },
    removeOnComplete: true, // Remove job from queue when it's successfully completed
    removeOnFail: { 
      age: 24 * 3600 // Keep failed jobs for 24 hours
    },
  },
});

translationQueue.on('waiting', (jobId) => {
  console.log(`⏳ A job with ID ${jobId} is waiting.`);
});

translationQueue.on('active', (job) => {
  console.log(`🚀 A job with ID ${job.id} has started.`);
});

translationQueue.on('completed', (job) => {
  console.log(`✅ A job with ID ${job.id} has completed.`);
});

translationQueue.on('failed', (job, err) => {
  console.error(`❌ A job with ID ${job.id} has failed with error: ${err.message}`);
});

export default translationQueue;
