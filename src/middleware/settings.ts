import { Prisma, Scope } from "@prisma/client";
import { httpResponses } from "@tonictech/common";
import { NextFunction, Request, Response } from "express";
import SettingsPGService from "../dao/postgres/settings.pg";

export const getAppSettings = async(req: Request, res: Response, next: NextFunction) => {
  const settingsPG = new SettingsPGService();
  const {appSettings: items} = await settingsPG.getAppSettings({});
  let settings: {[key: string]: any} = {}
  items.forEach((i: any) => {
    settings[i.name] = i[i.type]
  })
  res.locals.settings = settings;
  res.locals.ss = settingsPG;

  next();
}

export const featureFlag = async({feature, flag, ss}: {feature: string, flag: string, ss: SettingsPGService}) => {
  const {response} = await ss.getFeatureFlag({feature, flag})
  if (!response || !response.data){
    return {allow: false, message: 'Feature is unavailable'}
  }
  const ff = response.data
  const feat = ff.featureData
  const service = feat.scopeData;
  if(!ff.active) return {message: 'This action is currently disabled', allow: ff.active};
  if(!feat.active) return {message: 'This feature is currently disabled', allow: feat.active}
  if(!service.active) return {message: 'This service is currently unavailable', allow: service.active}
  return {allow: true, message: ''};
}

// export const checkfeatureFlag = ({feature, flag}: {feature: string, flag: string}) => async (_req: Request, res: Response, next: NextFunction) => {
//   const result = await featureFlag({ feature, flag, ss: res.locals.ss });
//   console.log({result})
//   if(result.allow) return next();
//   const sr = httpResponses.Forbidden({message: result.message, data: {feature, flag}})
//   return res.status(sr.statusCode).send(sr);
// }

export const getScopes = ({scopes}: {scopes: string[]}) => async (_req: Request, res: Response, next: NextFunction) => {
  const settingsPG = new SettingsPGService();
  const {scopes: appScopes} = await settingsPG.getScopes({field: 'name', values: scopes});
  res.locals.scopes = appScopes[0]
  if(appScopes.length){
    return res.status(200).send(appScopes[0]);
  }
  next();
}

export const getScope = ({scope}: {scope: string}) => async (_req: Request, res: Response, next: NextFunction) => {
  const settingsPG = new SettingsPGService();
  const sr = (await settingsPG.getScopeDetails({name: scope})).response;
  if(!sr || !sr.data){
    const ms = httpResponses.Forbidden({message: 'Service unavailable', fix: 'Please try again later'})
    return res.status(ms.statusCode).send(ms)
  }
  res.locals.scope = sr.data;
  if (!res.locals.scope.active) {
    const ms = httpResponses.Forbidden({message: 'Service unavailable', fix: 'Please try again later'})
    return res.status(ms.statusCode).send(ms)
  }
  next()
}

export const checkFeatureFlag = ({feature, flag}: {feature: string, flag: string}) => async (_req: Request, res: Response, next: NextFunction) => {
  // const feat = res.locals.scope['features'][feature];
  // const ff = feat['featureFlags'][flag];
  // if(!ff.active) return {message: 'This action is currently disabled', allow: ff.active};
  // if(!feat.active) return {message: 'This feature is currently disabled', allow: feat.active}
  // return {allow: true, message: ''};
  const result = featFlag({feature, flag, scope: res.locals.scope});
  console.log({result})
  if(result.allow) return next();
  const sr = httpResponses.Forbidden({message: result.message, data: {feature, flag}})
  return res.status(sr.statusCode).send(sr);
}

export const featFlag = ({feature, flag, scope}: {feature: string, flag: string, scope: any}) => {
  const feat = scope['features'][feature];
  if(!feat) return {message: 'This feature is not registered', allow: false}
  if(!feat.active) return {message: 'This feature is currently disabled', allow: feat.active}
  const ff = feat['featureFlags'][flag];
  if(!ff) return {message: 'This action is not registered', allow: false}
  if(!ff.active) return {message: 'This action is currently disabled', allow: ff.active};
  return {allow: true, message: ''};
}