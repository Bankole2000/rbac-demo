import { NextFunction, Request, Response } from "express";
import CacheService from "../dao/cache";
import UserPGService from "../dao/postgres/user.pg";
import {verifyToken} from "../utils/helpers/jwt.utils"

export const getUserIfLoggedIn = async(req: Request, res: Response, next: NextFunction) => {
  const cs = new CacheService();
  const us = new UserPGService();

  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const refreshToken = req.cookies?.refreshToken ? req.cookies.refreshToken : req.headers['x-refresh-token'];

    if (!refreshToken) {
      res.locals.user = null;
      return next();
    }
    return next();
  }

  const { decoded: accessDecoded } = await verifyToken(accessToken);

  if (!accessDecoded) {
    res.locals.user = null;
    return next();
  }

  // Get session Data from cache
  const sessionData = (await cs
    .formatKey({resource: 'session', identifier: accessDecoded.sessionId})
    .getKey({key: cs.formattedKey as string})).result;

  // if(!sessionData)
  // For a valid access token
  // if (payload) {
  //   // @ts-ignore
  //   req.user = payload;
  //   return next();
  // }

  // // expired but valid access token

  // const { payload: refresh } =
  //   expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  // if (!refresh) {
  //   return next();
  // }

  // // @ts-ignore
  // // const session = getSession(refresh.sessionId);

  // if (!session) {
  //   return next();
  // }

  // const newAccessToken = signJWT(session, "5s");

  // res.cookie("accessToken", newAccessToken, {
  //   maxAge: 300000, // 5 minutes
  //   httpOnly: true,
  // });

  // // @ts-ignore
  // req.user = verifyJWT(newAccessToken).payload;

  // return next();
}

export const requireAuth = async(req: Request, res: Response, next: NextFunction) => {

}