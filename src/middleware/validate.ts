import { httpResponses } from '@tonictech/common';
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject, schemaName = 'Input') => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error: any) {
    const sr = httpResponses.BadRequest(
      {
        message: `${schemaName} validation failed`,
        data: null,
        errMessage: `Invalid ${schemaName} Data`,
        error,
        fix: 'Check data in request body, query params and path params'
      }
    );
    return res.status(sr.statusCode).send(sr);
  }
};
