import { ServiceResponse } from "../../@types/ServiceResponse"

enum StatusTypes {
  OK = 'OK',
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  NotFound = 'NotFound',
  TimeoutError = 'TimeoutError',
  TooManyRequests = 'TooManyRequests',
  MethodNotAllowed = 'MethodNotAllowed',
  ExpectationFailed = 'ExpectationFailed',
  InternalServerError = 'InternalServerError',
  UnProcessableEntity = 'UnProcessableEntity',
  UnSupportedMediaType = 'UnSupportedMediaType'
}

const httpStatus: {[key: string]: {statusCode: number, message: string}} = {
  [StatusTypes.OK]: {statusCode: 200, message: 'OK'},
  [StatusTypes.BadRequest]: {statusCode: 400, message: 'Bad Request'},
  [StatusTypes.Unauthorized]: {statusCode: 401, message: 'Unauthorized'},
  [StatusTypes.Forbidden]: {statusCode: 403, message: 'Forbidden'},
  [StatusTypes.NotFound]: {statusCode: 404, message: 'Not found'},
  [StatusTypes.TimeoutError]: {statusCode: 408, message: 'Request timeout'},
  [StatusTypes.TooManyRequests]: {statusCode: 429, message: 'Too many requests'},
  [StatusTypes.MethodNotAllowed]: {statusCode: 405, message: 'Method Not Allowed'},
  [StatusTypes.ExpectationFailed]: {statusCode: 417, message: 'Expectation Failed'},
  [StatusTypes.InternalServerError]: {statusCode: 500, message: 'Internal Server Error'},
  [StatusTypes.UnProcessableEntity]: {statusCode: 422, message: 'Unprocessable Entity'},
  [StatusTypes.UnSupportedMediaType]: {statusCode: 415, message: 'Unsupported Media Type'}
}

let httpResponses : {
  [key: string]: ({ 
    message,
    data,
    success,
    error,
    errMessage,
    fix,
    newAccessToken
  }: { 
    message?: string | undefined;
    data?: any | undefined;
    success?: boolean | undefined;
    error?: string | null | undefined;
    errMessage?: any | undefined;
    fix?: string | null | undefined;
    newAccessToken?: string | undefined; 
  }) => ServiceResponse
} = {};

Object.keys(StatusTypes).forEach(status => {
  httpResponses[status] = ({
    message = httpStatus[status].message,
    data = {},
    success = true,
    error = httpStatus[status].statusCode < 300 ? null : httpStatus[status].message,
    errMessage = httpStatus[status].statusCode < 300 ? null : status,
    fix = httpStatus[status].statusCode < 300 ? null : 'please contact support',
    newAccessToken = null
  }) => {
    return new ServiceResponse(
      message,
      data,
      success,
      httpStatus[status].statusCode,
      error,
      errMessage,
      fix,
      newAccessToken
    );
  }
});

export {httpResponses, httpStatus}