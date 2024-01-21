import { Request, Response } from "express";
import { httpResponses } from "@tonictech/common"
import { getPB } from "../lib/pocketbase";
import UserPGService from "../dao/postgres/user.pg";
import SettingsPGService from "../dao/postgres/settings.pg";
import UserPBService from "../dao/pocketbase/user.pb";
import { ParseError, parsePhoneNumberWithError, PhoneNumber } from "libphonenumber-js";
import { generateTokens } from "../utils/helpers/jwt.utils";
import { config } from "../utils/config";
import CacheService from "../dao/cache";

export const emailLoginHandler = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const us = new UserPGService();
  const pbs = new UserPBService();
  const cs = new CacheService();
  if(!(await us.findUserByEmail({email})).user) {
    const sr = httpResponses.NotFound({message: 'This email is not registered'})
    return res.status(sr.statusCode).send(sr);
  }
  let {response: sr } = await pbs.authenticateUser({identity: email, password});
  sr = !sr ? 
    httpResponses.BadRequest({message: 'Error authenticating user'}) : 
    sr.statusCode < 299 ? sr : 
    httpResponses.BadRequest({message: 'Invalid email or password', error: sr.error as string, errMessage: sr.errMessage});
  if (sr.statusCode > 299) return res.status(sr.statusCode).send(sr);
  const {record: user, token} = sr.data;
  const {data: newSession} = await us.createUserSession({userId: user.id, data: {token}})
  if(!newSession){
    const sr = httpResponses.InternalServerError({message: 'Error generating session'})
    return res.status(sr.statusCode).send(sr);
  }
  const {error: tokenError, data: tokens} = await generateTokens({userId: user.id, sessionId: newSession.id})
  if(!tokens){
    const sr = httpResponses.InternalServerError({error: tokenError, message: 'Error generating auth Tokens'})
    return res.status(sr.statusCode).send(sr)
  }
  const {data: loggedInUser} = (await us.getUserDetails({userId: user.id})).response || {data: null};
  if(!loggedInUser) {
    const sr = httpResponses.InternalServerError({error: tokenError, message: 'Error generating auth Tokens'})
    return res.status(sr.statusCode).send(sr)
  }
  
  loggedInUser.roles = loggedInUser.roles.map((x: any) => x.name);
  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    maxAge: parseInt(config.self.refreshTokenTTLMS || '86400000', 10),
  })
  const sessionData = {userId: loggedInUser.id, sessionId: newSession.id, data: newSession.data, loggedInUser}
  await cs
    .formatKey({resource: 'session', identifier: `${loggedInUser.id}_${newSession.id}`})
    .setKey({key: cs.formattedKey as string, data: sessionData, expiration: Number(+(config.self.accessTokenTTLMS || 3600000) / 1000)})
  const rs = httpResponses.OK({message: 'Logged In Successfully', data: {user: loggedInUser, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, pbToken: token, session: newSession}})
  return res.status(rs.statusCode).send(rs)
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
  const us = new UserPGService();
  const {
    phone, countryCode, username, password, confirmPassword
  } = req.body;
  if ((await us.findUserByUsername({username: username})).user){
    const sr = httpResponses.BadRequest({message: 'username already taken'})
    return res.status(sr.statusCode).send(sr);
  }
  let parsedNumber: PhoneNumber | undefined;
  try {
    parsedNumber = parsePhoneNumberWithError(phone, countryCode);
  } catch (error: any) {
    console.log({error})
    if (error instanceof ParseError) {
      const sr = httpResponses.ExpectationFailed({message: 'Error parsing phone number', fix: 'Check phone number and country code'})      
      return res.status(sr.statusCode).send(sr);
    }
    const sr = httpResponses.BadRequest({message: 'Invalid phone number', fix: 'Check phone number and country code'})      
    return res.status(sr.statusCode).send(sr);
  }
  if(!parsedNumber || !parsedNumber.isValid()) {
    const sr = httpResponses.BadRequest({message: 'Invalid phone number'})
    return res.status(sr.statusCode).send(sr);
  }
  if((await us.findUserByPhoneNumber({phone: parsedNumber.number})).user) {
    const sr = httpResponses.BadRequest({message: 'This phone number is already registered'})
    return res.status(sr.statusCode).send(sr);
  };
  const roles = (await new SettingsPGService().filterRoles({isDefault: true})).roles.map(r => r.id);
  const pbs = new UserPBService();
  const userData = {
    username,
    phone: parsedNumber.number,
    phoneData: parsedNumber,
    emailVisibility: true,
    password,
    passwordConfirm: confirmPassword,
    name: username,
    roles
  }
  const sr = (await pbs.createUser({userData})).response || httpResponses.BadRequest({message: 'Something went wrong'})
  return res.status(sr.statusCode).send(sr);
}

export const logoutHandler = async (req: Request, res: Response) => {
  const sr = httpResponses.OK({message: 'Not yet implemented'});
  return res.status(sr.statusCode).send(sr);
}