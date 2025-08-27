import { JobOptions } from 'bull';

export const jobOptions: JobOptions = {
  attempts: 5,
  removeOnComplete: false,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
};
