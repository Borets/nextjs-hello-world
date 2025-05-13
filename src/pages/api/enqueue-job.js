import { Queue } from 'bullmq';

const queue = new Queue('default', { connection: process.env.REDIS_URL });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { data } = req.body;
  const job = await queue.add('my-task', data || { foo: 'bar' });
  res.status(200).json({ status: 'enqueued', jobId: job.id });
} 