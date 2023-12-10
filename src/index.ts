import http from 'http';
import { app } from './app';
import { serviceEvents } from './events';
import { getChannel, setChannel } from './lib/rabbitmq';
import { config } from './utils/config';

const { self, rabbitMQConfig: {url, exchange, exqueue}, redisConfig } = config;
const PORT = self.port;

const httpServer = http.createServer(app);

httpServer.listen(PORT, async () => {
  await setChannel(url as string, exqueue as string, exchange as string, self.serviceName as string)
  // await seedBankData();
  serviceEvents(getChannel())
  console.log(`Server running on port ${PORT}`);
});
