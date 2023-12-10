import { AppResponse } from './AppInterface';

export class ServiceResponse implements AppResponse {
  message: string;

  success: boolean;

  data?: any;

  error?: unknown;

  fix?: string | undefined | null;

  newAccessToken?: string | undefined | null;

  errMessage: string | undefined | null;

  statusCode: number;

  constructor(
    message: string,
    data: any,
    success: boolean,
    statusCode: number,
    errMessage: string | undefined | null,
    error?: any,
    fix?: string | undefined | null,
    newAccessToken?: string | undefined | null
  ) {
    this.message = message;
    this.success = success;
    this.data = data;
    this.error = error;
    this.errMessage = errMessage;
    this.fix = fix;
    this.statusCode = statusCode;
    this.newAccessToken = newAccessToken;
  }
}
