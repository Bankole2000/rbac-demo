import { httpResponses } from "@tonictech/common";
import { NextFunction, Request, Response } from "express";
import AccountPGService from "../dao/postgres/account.pg";

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

export const loadAccount = async (req: Request, res: Response, next: NextFunction, accountId: string) => {
  const as = new AccountPGService()
  const {account, response: sr} = await as.getAccountDetailsById({accountId})
  if (!account){
    return res.status(sr ? sr.statusCode : 404).send(sr);
  }
  res.locals.params.account = account;
  next()
}

