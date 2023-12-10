import { configDotenv } from "dotenv";

const { parsed } = configDotenv()

export const config = {
  self: {
    port: parsed?.PORT,
    serviceName: parsed?.SERVICE_NAME ,
    serviceHost: parsed?.SERVICE_HOST,
    basePath: parsed?.BASE_PATH,
    queue: parsed?.RABBITMQ_QUEUE,
    jwtSecret: parsed?.JWT_SECRET,
    emoji: parsed?.EMOJI,
    accessTokenTTL: parsed?.ACCESS_TOKEN_TTL,
    accessTokenTTLMS: parsed?.ACCESS_TOKEN_TTL_MS,
    refreshTokenTTL: parsed?.REFRESH_TOKEN_TTL,
    refreshTokenTTLMS: parsed?.REFRESH_TOKEN_TTL_MS,
    env: parsed?.ENVIRONMENT,
  },
  redisConfig: {
    url: parsed?.REDIS_CACHE_URL,
    scope: parsed?.REDIS_PUBSUB_SCOPE,
  },
  rabbitMQConfig: {
    url: parsed?.RABBITMQ_URL,
    exchange: parsed?.RABBITMQ_EX,
    exqueue: parsed?.RABBITMQ_X_QUEU
  },
  pocketbase: {
    url: parsed?.POCKETBASE_URL,
    adminEmail: parsed?.PB_ADMIN_EMAIL,
    adminPassword: parsed?.PB_ADMIN_PASSWORD,
  }
};