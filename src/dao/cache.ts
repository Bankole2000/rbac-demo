import { redisConnect, RedisConnection } from "../lib/redisConnect";
import { config } from "../utils/config";

export default class CacheService {
  client: RedisConnection;
  result: any;
  scope: string;
  formattedKey?: string;

  constructor(){
    this.client = redisConnect()
    this.scope = config.redisConfig.scope || 'demo';
  }

  formatKey({resource, identifier}: {resource: string, identifier: string}){
    this.formattedKey = `${this.scope}:${resource}:${identifier}`
    return this;
  }

  async getKey({key}: {key: string}) {
    await this.client.connect();
    this.result = await this.client.get(key) ;
    await this.client.disconnect()
    return this;
  }

  async setKey({key, data, expiration = -1}: {key: string, data: any, expiration?: number}) {
    await this.client.connect();
    this.result = await this.client.setEx(key, expiration, JSON.stringify(data)) ;
    await this.client.disconnect()
    return this;
  }
}