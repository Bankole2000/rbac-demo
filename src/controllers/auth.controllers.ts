import { Request, Response } from "express";
import { httpResponses } from "@tonictech/common"

export const emailLoginHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const phoneLoginHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const emailRegisterHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const phoneRegisterHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const logoutHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}