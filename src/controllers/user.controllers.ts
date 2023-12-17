import {Request, Response} from "express";
import { httpResponses } from "@tonictech/common"
import UserPGService from "../dao/postgres/user.pg";

export const getUserAccountsHandler = async(req: Request, res: Response) => {
  const sr = httpResponses.OK({message: "Not yet implemented"});
  return res.status(sr.statusCode).send(sr);
}

export const createNewAccountHandler = async(req: Request, res: Response) => {
  const sr = httpResponses.OK({message: "Not yet implemented"});
  return res.status(sr.statusCode).send(sr);
}

export const deleteAccountHandler = async(req: Request, res: Response) => {
  const sr = httpResponses.OK({message: "Not yet implemented"});
  return res.status(sr.statusCode).send(sr);
}

export const getBeneficiariesHandler = async(req: Request, res: Response) => {
  const sr = httpResponses.OK({message: "Not yet implemented"});
  return res.status(sr.statusCode).send(sr);
}

export const removeBeneficiariesHandler = async(req: Request, res: Response) => {
  const sr = httpResponses.OK({message: "Not yet implemented"});
  return res.status(sr.statusCode).send(sr);
}

export const updateUserProfileHanlder = async(req: Request, res: Response) => {
  const sr = httpResponses.OK({message: "Not yet implemented"});
  return res.status(sr.statusCode).send(sr);
}

export const getUserTransactionsHandler = async(req: Request, res: Response) => {
  const sr = httpResponses.OK({message: "Not yet implemented"});
  return res.status(sr.statusCode).send(sr);
}