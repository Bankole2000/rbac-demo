import UserPGService from "../../../dao/postgres/user.pg"
import SettingsPGService from "../../../dao/postgres/settings.pg";
import { sanitizeData } from "@tonictech/common"
import { Prisma } from "@prisma/client"

const userPg = new UserPGService()
const settingsPg = new SettingsPGService();

const USER_CREATED = async (data: any) => {
  console.log('User created');
  console.log({user: userPg.user, data})
  let userData = sanitizeData(userPg.userFields, data.record)
  if (data.record.roles){
    const roles = (await settingsPg.getRoles({field: 'id', values: data.record.roles})).roles;
    console.log({roles})
    userData.roles = roles.map(x => x.name);
  }
  if(!(await userPg.findUserById({userId: data.record.id})).user){
    await userPg.createUser({userData: userData as unknown as Prisma.UserCreateInput});
  } else {
    await userPg.updateUser({userId: data.record.id, userData})
  }
  console.log({user: userPg.user})
}

const USER_UPDATED = async (data: any) => {
  console.log({user: userPg.user, data})
  let userData = sanitizeData(userPg.userFields, data.record)
  if((await userPg.findUserById({userId: data.record.id})).user){
    if (data.record.roles){
      const roles = (await settingsPg.getRoles({field: 'id', values: data.record.roles})).roles;
      console.log({roles})
      userData.roles = roles.length ? {connect: roles.map(x => ({name: x.name}))} : {set: []};
    }
    await userPg.updateUser({userId: data.record.id, userData})
  } else {
    if (data.record.roles){
      const roles = (await settingsPg.getRoles({field: 'id', values: data.record.roles})).roles;
      console.log({roles})
      userData.roles = roles.length ? {connect: roles.map(x => ({name: x.name}))} : {connect: []};
    }
    await userPg.createUser({userData: userData as unknown as Prisma.UserCreateInput});
  }
}

const USER_DELETED = async (data: any) => {
  if((await userPg.findUserById({userId: data.record.id})).user){
    console.log({user: userPg.user})
    await userPg.deleteUser({userId: data.record.id})
  }
  console.log({user: userPg.user})
}

const userEventTypes = {
  CREATED: 'CREATED',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED',
}

const userEventHandlers = {
  [userEventTypes.CREATED]: USER_UPDATED,
  [userEventTypes.UPDATED]: USER_UPDATED,
  [userEventTypes.DELETED]: USER_DELETED
}

export const USER_EVENTS = async (message: any) => {
  const {data} = message;
  if(Object.keys(userEventTypes).includes(data.action)){
    await userEventHandlers[data.action](data);
  }
}