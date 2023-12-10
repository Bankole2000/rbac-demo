import { Request, Response } from "express";
import { httpResponses } from "../utils/helpers/apiResponses"

export const defaultHandler = async (_req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const routeNotFoundHandler = async (_req: Request, res: Response) => {
  const sr = httpResponses.NotFound({message: 'Route not found', fix: null});
  return res.status(sr.statusCode).send(sr);
}