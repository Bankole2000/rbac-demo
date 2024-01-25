import { httpResponses } from "@tonictech/common";
import { Request, Response } from "express";

export const getBanksHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const getAppSettingsHandler = async (req: Request, res: Response) => {
  console.log({user: res.locals.user, settings: res.locals.settings, scope: res.locals.scope})
  const sr = httpResponses.OK({message: 'Not yet implemented', newAccessToken: res.locals.newAccessToken});
  return res.status(sr.statusCode).send(sr);
}

export const getUserRolesHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}