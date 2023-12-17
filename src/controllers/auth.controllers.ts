import { Request, Response } from "express";
import { httpResponses } from "@tonictech/common"
import { getPB } from "../lib/pocketbase";
import UserPGService from "../dao/postgres/user.pg";
import SettingsPGService from "../dao/postgres/settings.pg";
import UserPBService from "../dao/pocketbase/user.pb";

export const emailLoginHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const currentUserHandler = async(req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const phoneLoginHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}

export const emailRegisterHandler = async (req: Request, res: Response) => {
  const us = new UserPGService();
  if((await us.findUserByEmail({email: req.body.email})).user) {
    const sr = httpResponses.BadRequest({message: 'email already registered'})
    return res.status(sr.statusCode).send(sr);
  }
  if ((await us.findUserByUsername({username: req.body.username})).user){
    const sr = httpResponses.BadRequest({message: 'username already taken'})
    return res.status(sr.statusCode).send(sr);
  }
  const {email, username, password, confirmPassword} = req.body;
  const roles = (await new SettingsPGService().filterRoles({isDefault: true})).roles.map(r => r.id);
  const pbs = new UserPBService();
  const userData = {
    username,
    email,
    emailVisibility: true,
    password,
    passwordConfirm: confirmPassword,
    name: username,
    roles
  }
  const sr = (await pbs.createUser({userData})).response || httpResponses.InternalServerError({message: 'Something went wrong'})
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