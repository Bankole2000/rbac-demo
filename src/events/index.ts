import { Channel } from "amqplib";
import { config } from "../utils/config";
import { RedisConnection } from "../lib/redisConnect";
import { exchangeEventHandlers } from "./exchange";

export const serviceEvents = async (channel: Channel): Promise<void> => {
  try {
    await channel.assertExchange(config.rabbitMQConfig.exchange as string, 'fanout');
    const { emoji, serviceName } = config.self;
    const q = await channel.assertQueue(config.rabbitMQConfig.exqueue as string, { exclusive: true });
    // const j = await channel.assertQueue(config.self.queue as string, { durable: true });
    await channel.bindQueue(q.queue, config.rabbitMQConfig.exchange as string, '');
    await channel.consume(q.queue, async (msg: any) => {
      const message = JSON.parse(msg.content.toString());
      console.log(`${emoji}📨 ${serviceName?.toUpperCase()} - exchange message: ${message.type} from ${message.origin.toUpperCase()}`);
      if(Object.keys(exchangeEventHandlers).includes(message.origin)){
        await exchangeEventHandlers[message.origin](message)
      }
      channel.ack(msg);
    });
    // await channel.consume(j.queue, async (msg: any) => {
    //   const { type, origin } = JSON.parse(msg.content.toString());
    //   console.log(`${emoji}📩 ${serviceName?.toUpperCase()} - queue job: ${type} from ${origin.toUpperCase()}`);
    //   // queueEventHandlers(msg, channel);
    // }, { noAck: false });
  } catch (error) {
    console.log(error);
  }
};
