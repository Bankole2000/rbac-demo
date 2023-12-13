import { httpResponses } from "@tonictech/common";
import { Request, Response } from "express";

export const getBanksHanlder = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const getAppSettings = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const getUserRoles = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}