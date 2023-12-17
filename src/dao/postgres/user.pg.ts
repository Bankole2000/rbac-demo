import { PrismaClient, User, Prisma } from "@prisma/client";
import { ServiceResponse } from "../../@types/ServiceResponse";
import { httpResponses as responses } from "../../utils/helpers/apiResponses";
// import { ServiceResponse } from "@tonictech/common";
import prisma from "../../lib/prisma";

export default class UserPGService {
  
  prisma: PrismaClient;
  
  user: User | null;

  userFields: string[];

  response: ServiceResponse | null;
  
  constructor() {
    this.prisma = prisma;
    this.user = null;
    this.response = null;
    this.userFields = [
      'id',
      'email',
      'verified',
      'username',
      'name',
      'created',
      'updated'
    ]
  }

    /**
   * @description Find user in postgres by Id
   * @method function
   * @param {Object} userId - id string to find user by
   * @return returns instance of user postgres dao class
   * */
  async findUserById({userId}: {userId: string}) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId
        }
      })
      if (!user){
        this.response = responses.NotFound({message: 'User not found'})
        this.user = null
      }
      this.user = user;
      this.response = responses.OK({data: user})
    } catch (error: any) {
      console.log({error})
      this.user = null
      this.response = responses.InternalServerError({});
    }
    return this
  }

  async findUserByEmail({email}: {email: string}) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email
        }
      })
      if (!user){
        this.response = responses.NotFound({message: 'User not found'})
        this.user = null
      }
      this.user = user;
      this.response = responses.OK({data: user})
    } catch (error: any) {
      console.log({error})
      this.user = null
      this.response = responses.InternalServerError({});
    }
    return this
  }

  async findUserByUsername({username}: {username: string}) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username
        }
      })
      if (!user){
        this.response = responses.NotFound({message: 'User not found'})
        this.user = null
      }
      this.user = user;
      this.response = responses.OK({data: user})
    } catch (error: any) {
      console.log({error})
      this.user = null
      this.response = responses.InternalServerError({});
    }
    return this
  }

/**
 * @description Creates new user record in postgres
 * @method function
 * @param {Object} userData - data to create user with
 * @return returns instance of user postgres dao class
 * */
  async createUser({userData}: {userData: Prisma.UserCreateInput}) {
    try {
      const createdUser = await this.prisma.user.create({
        data: { ...userData },
      });
      this.user = createdUser
      this.response = responses.OK({data: createdUser})
    } catch (error: any) {
      console.log({error})
      this.user = null;
      this.response = responses.InternalServerError({errMessage: error.message, error})
    }
    return this
  }

/**
 * @description Updates existing user record in postgres
 * @method function
 * @param {Object} userData - data to create user with
 * @return returns instance of user postgres dao class
 * */
  async updateUser({userId, userData}: {userId: string, userData: Prisma.UserUpdateInput}) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          ...userData
        }
      })
      this.user = updatedUser
      this.response = responses.OK({data: updatedUser, message: 'User Updated'});
    } catch (error: any) {
      console.log({error})
      this.user = null;
      this.response = responses.InternalServerError({errMessage: error.message, error})
    }
    return this
  }

/**
 * @description Deletes existing user record in postgres
 * @method function
 * @param {Object} userId - data to create user with
 * @return returns instance of user postgres dao class
 * */
  async deleteUser({userId}: {userId: string}) {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id: userId,
        }
      })
      this.user = null;
      this.response = responses.OK({data: deletedUser, message: 'User deleted'});
    } catch (error: any) {
      console.log({error});
      this.response = responses.InternalServerError({message: 'Error deleting user', errMessage: error.message, error});
    }
    return this
  }
}