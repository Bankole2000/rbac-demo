import { createClient } from 'redis';
import { config } from '../utils/config';

export const redisConnect = () => {
  const client = createClient({url: config.redisConfig.url});
  return client;
};

export type RedisConnection = ReturnType<typeof redisConnect>