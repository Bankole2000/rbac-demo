import { httpResponses, ServiceResponse } from "@tonictech/common";
import { NextFunction, Request, Response } from "express";
import CacheService from "../dao/cache";
import UserPGService from "../dao/postgres/user.pg";
import { config } from "../utils/config";
import {verifyToken, generateTokens} from "../utils/helpers/jwt.utils"

const getSessionFromAccessToken = async (token: any) => {
  const cs = new CacheService();
  const {
    decoded, valid, expired
  } = await verifyToken(token);
  if(!decoded || !valid || expired) return {sessionData: null, expired};
  const sessionData = JSON.parse((await cs
    .formatKey({resource: 'session', identifier: `${decoded.userId}_${decoded.sessionId}`})
    .getKey({key: cs.formattedKey as string})).result)
  const result =  {sessionData: sessionData?.userId === decoded.userId ? sessionData : null, expired}
  console.log(`==================== From Access Token =================`)
  console.log(sessionData)
  console.log(`==================== Access Token End =================`)
  return result
}

const getSessionFromRefreshToken = async(refreshToken: any) => {
  const us = new UserPGService();
  const {
    decoded, valid, expired
  } = await verifyToken(refreshToken);
  if(!decoded || !valid) return {sessionData: null, expired, newAccessToken: null};
  const {userId, sessionId} = decoded;
  const {data: sessionData, error} = await us.findUserSession({userId, sessionId})
  const result = {sessionData: sessionData?.userId === decoded.userId ? sessionData : null, expired: !Boolean(sessionData?.isValid || error)}
  console.log(`==================== From Refresh Token =================`)
  console.log(sessionData)
  console.log(`==================== Refresh Token End =================`)
  return result
}

export const getUserIfLoggedIn = async(req: Request, res: Response, next: NextFunction) => {
  const cs = new CacheService();
  const us = new UserPGService();

  const authToken = req.headers.authorization;
  const accessToken = authToken ? authToken.split(' ')[1] : null;
  const refreshToken = req.cookies?.refreshToken ? req.cookies.refreshToken : req.headers['x-refresh-token'];

  console.log({accessToken, refreshToken});

  if (!accessToken) {
    res.locals.user = null
    return next();
  }

  const { sessionData, expired } = await getSessionFromAccessToken(accessToken);
  console.log({sessionData, expired})
  if (sessionData){
    const {data: userData} = (await us.findUserById({userId: sessionData.userId})).response as ServiceResponse
    if(userData.roles) {
      userData.roles = userData.roles.map((x: any) => x.name);
    }
    res.locals.user = userData;
    return next()
  }
  if (!refreshToken) {
    res.locals.user = null;
    return next();
  }
  if(expired && refreshToken){
    const { sessionData } = await getSessionFromRefreshToken(refreshToken);
    console.log({sessionData})
    if (sessionData){
      const {data: userData} = (await us.findUserById({userId: sessionData.userId})).response as ServiceResponse

      if(userData.roles) {
        userData.roles = userData.roles.map((x: any) => x.name);
      }
      const {data} = sessionData
      const newSessionData = {userId: userData.id, sessionId: sessionData.id, data, loggedInUser: userData}
      await cs
        .formatKey({resource: 'session', identifier: `${userData.id}_${sessionData.id}`})
        .setKey({key: cs.formattedKey as string, data: newSessionData, expiration: Number(+(config.self.accessTokenTTLMS || 3600000) / 1000)})
      const {data: tokens} = await generateTokens({userId: userData.id, sessionId: sessionData.id})
      console.log({tokens})
      res.locals.user = userData;
      res.locals.newAccessToken = tokens?.accessToken
      return next()
    }
    console.log('line 86')
    return next();
  }
}

export const requireAuth = async(req: Request, res: Response, next: NextFunction) => {
  if(res.locals.user) return next();
  const sr = httpResponses.Unauthorized({message: 'You need to be logged in to perform this action'})
  return res.status(sr.statusCode).send(sr);
}