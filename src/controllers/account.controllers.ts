import { httpResponses } from "@tonictech/common";
import { Request, Response } from "express";

export const getAccountDetailsHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'})
  return res.status(sr.statusCode).send(sr);
}

export const findUserAccountHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'})
  return res.status(sr.statusCode).send(sr);
}

export const getAccountTransactionsHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'})
  return res.status(sr.statusCode).send(sr);
}

export const accountDepositHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'})
  return res.status(sr.statusCode).send(sr);
}

export const accountWithdrawalHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'})
  return res.status(sr.statusCode).send(sr);
}

export const transferHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'})
  return res.status(sr.statusCode).send(sr);
}

