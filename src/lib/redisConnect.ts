import { createClient } from 'redis';

export const redisConnect = (url: string) => {
  const client = createClient({url});
  return client;
};

export type RedisConnection = ReturnType<typeof redisConnect>