const { Worker } = require('bullmq');

const connection = process.env.REDIS_URL;

const worker = new Worker(
  'default',
  async job => {
    console.log('Processing job:', job.id, job.data);
    // Add your job processing logic here
  },
  { connection }
);

worker.on('completed', job => {
  console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} has failed with error:`, err);
}); 