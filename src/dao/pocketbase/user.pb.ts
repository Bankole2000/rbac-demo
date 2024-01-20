// import { httpResponses, ServiceResponse } from "@tonictech/common";
import { getPB } from "../../lib/pocketbase";
import { ServiceResponse } from "../../@types/ServiceResponse";
import { httpResponses } from "../../utils/helpers/apiResponses";

export default class UserPBService {
  pb: ReturnType<typeof getPB>;
  records: any;
  user: any;
  response?: ServiceResponse;

  constructor() {
    this.pb = getPB()
    this.records = [];
    this.user = null;
  }

  async findUserById({userId}: {userId: string}) {
    try {
      const record = await this.pb.collection('users').getOne(userId, {
        expand: 'roles, authDevices'
      })
      console.log({record});
      this.user = record;
      this.response = httpResponses.OK({data: record});
    } catch (error: any) {
      console.log({error});
      this.user = null;
      this.response = httpResponses.InternalServerError({errMessage: error.message, error});
    }
    return this
  }

  async findUsersByFields(data: {[key: string]: string}, page = 1, limit = 20) {
    let filter = ""
    const fields = Object.keys(data);
    fields.forEach((f, i) => {
      filter += `${i > 0 ? ' && ': ''}${f}="${data[f]}"`
    });
    try {
      const records = await this.pb.collection('users').getList(page, limit, {
        filter
      })
      console.log({records});
      this.records = records;
      this.response = httpResponses.OK({data: records});
    } catch (error: any) {
      console.log({error})
      this.records = null;
      this.response = httpResponses.InternalServerError({errMessage: error.message, error});
    }
    return this
  }

  async findUserByField(field: string, value: string){
    try {
      const record = await this.pb.collection('users').getFirstListItem(`${field}="${value}"`, {
        expand: 'roles,authDevices'
      });
      console.log({record})
      this.user = record;
      this.response = httpResponses.OK({data: record});
    } catch (error: any) {
      console.log({error});
      this.user = null;
      this.response = httpResponses.InternalServerError({errMessage: error.message, error});
    }
    return this
  }

  async createUser({userData}: {[key: string]: any}){
    try {
      const record = await this.pb.collection('users').create(userData);
      console.log({record});
      this.user = record;
      this.response = httpResponses.OK({message: 'User created', data: record});
    } catch (error: any) {
      console.log({error});
      this.user = null;
      this.response = httpResponses.InternalServerError({message: error.message, errMessage: error.message, error});
    }
    return this
  }

  async authenticateUser({identity, password}: {identity: string, password: string}) {
    try {
      const authData = await this.pb.collection('users').authWithPassword(identity, password);
      console.log(this.pb.authStore.isValid);
      console.log(this.pb.authStore.token);
      console.log(this.pb.authStore.model.id);
      this.user = this.pb.authStore.model;
      this.response = httpResponses.OK({message: 'Logged in successfully', data: authData});
    } catch (error: any) {
      console.log({error})
      this.user = null;
      this.response = httpResponses.BadRequest({message: 'Error logging in', errMessage: error.message, error})
    }
    return this
  }
}