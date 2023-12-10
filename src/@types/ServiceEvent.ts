// import config from 'config';
import { AppEvent } from './AppInterface';

export class ServiceEvent implements AppEvent {
  type: string;

  data: any;

  origin: string;

  idToken: string | null;

  accessToken: string | null;

  serviceQueues: string[];

  constructor(
    type: string,
    data: any,
    idToken: string | null,
    accessToken: string | null,
    origin = process.env.SERVICE_NAME || 'UNKNOWN',
    serviceQueues: string[] = [],
  ) {
    this.type = type;
    this.data = data;
    this.origin = origin;
    this.idToken = idToken;
    this.accessToken = accessToken;
    this.serviceQueues = serviceQueues;
  }
}
