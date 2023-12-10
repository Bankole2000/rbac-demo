import { httpResponses as responses, ServiceResponse } from "@tonictech/common";
import { PrismaClient, AppSetting, FeatureFlag, Feature, Resource, Role, RolePermission, Prisma, Scope } from "@prisma/client";

import prisma from "../../lib/prisma";

export default class SettingsPGService {
  prisma: PrismaClient;
  appSettings: AppSetting[];
  featureFlags: FeatureFlag[];
  features: Feature[];
  resources: Resource[];
  roles: Role[];
  rolePermissions: RolePermission[];
  scopes: Scope[];
  response: ServiceResponse | null;

  appSettingFields: string[];
  featureFlagFields: string[];
  featureFields: string[];
  resourceFields: string[];
  roleFields: string[];
  rolePermissionFields: string[];
  scopeFields: string[];
  
  constructor(){
    this.prisma = prisma;
    this.appSettings = [];
    this.featureFlags = [];
    this.features = [];
    this.rolePermissions = [];
    this.roles = [];
    this.scopes = [];
    this.resources = [];
    this.response = null;

    this.appSettingFields = [
      'id',
      'name',
      'type',
      'boolean',
      'number',
      'string',
      'list',
      'object',
      'objectList'
    ];
    this.featureFlagFields = [
      'id',
      'name',
      'description',
      'feature',
      'service',
      'active'
    ];
    this.featureFields = [
      'id',
      'name',
      'description',
      'active'
    ];
    this.resourceFields = [
      'id',
      'name',
      'description',
    ];
    this.roleFields = [
      'id',
      'name',
      'description',
    ];
    this.scopeFields = [
      'id',
      'name',
      'description',
      'active'
    ];
    this.rolePermissionFields = [
      'id',
      'role',
      'resource',
      'create',
      'readOwn',
      'readAny',
      'updateOwn',
      'updateAny',
      'deleteOwn',
      'deleteAny'
    ]
  }

  async getAppSettings({field = '', values = []}: {field?: string, values?: string[]}){
    try {
      this.appSettings = !field && !values.length ? 
        await this.prisma.appSetting.findMany({}) :
        await this.prisma.appSetting.findMany({
          where: {
            [field]: {
              in: values
            }
          },
        })
    } catch (error: any) {
      console.log({error});
      this.appSettings = []
    }
    return this
  }

  async createAppSetting({settingData}: {settingData : Prisma.AppSettingCreateInput}) {
    try {
      const newAppSetting = await this.prisma.appSetting.create({
        data: {
          ...settingData
        }
      })
      this.response = responses.OK({data: newAppSetting});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async updateAppSetting({id, data}: {id: string, data: Prisma.AppSettingUpdateInput}) {
    try {
      const updatedAppSetting = await this.prisma.appSetting.update({
        where: {
          id
        },
        data: {
          ...data
        }
      })
      this.response = responses.OK({data: updatedAppSetting});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async deleteAppSetting({id}: {id: string}) {
    try {
      const deletedAppSetting = await this.prisma.appSetting.delete({
        where: {
          id
        }
      })
      this.response = responses.OK({data: deletedAppSetting});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async getScopes({field = '', values = []}: {field?: string, values?: string[]}){
    try {
      this.scopes = !field || !values ? 
        await this.prisma.scope.findMany({}) :
        await this.prisma.scope.findMany({
          where: {
            [field]: {
              in: values
            }
          }
        })
    } catch (error: any) {
      console.log({error});
      this.scopes = []
    }
    return this
  }

  async createScope({scopeData}: {scopeData : Prisma.ScopeCreateInput}) {
    try {
      const newScope = await this.prisma.scope.create({
        data: {
          ...scopeData
        }
      })
      this.response = responses.OK({data: newScope});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async updateScope({id, data}: {id: string, data: Prisma.ScopeUpdateInput}) {
    try {
      const updatedScope = await this.prisma.scope.update({
        where: {
          id
        },
        data: {
          ...data
        }
      })
      this.response = responses.OK({data: updatedScope});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async deleteScope({id}: {id: string}) {
    try {
      const deletedScope = await this.prisma.scope.delete({
        where: {
          id
        }
      })
      this.response = responses.OK({data: deletedScope});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async getFeatures({field = '', values = []}: {field?: string, values?: string[]}){
    try {
      this.features = !field || !values ? 
        await this.prisma.feature.findMany({}) :
        await this.prisma.feature.findMany({
          where: {
            [field]: {
              in: values
            }
          }
        })
    } catch (error: any) {
      console.log({error});
      this.features = []
    }
    return this
  }

  async createFeature({featureData}: {featureData : Prisma.FeatureCreateInput}) {
    try {
      const newFeature = await this.prisma.feature.create({
        data: {
          ...featureData
        }
      })
      this.response = responses.OK({data: newFeature});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async updateFeature({id, data}: {id: string, data: Prisma.FeatureUpdateInput}) {
    try {
      const updatedFeature = await this.prisma.feature.update({
        where: {
          id
        },
        data: {
          ...data
        }
      })
      this.response = responses.OK({data: updatedFeature});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async deleteFeature({id}: {id: string}) {
    try {
      const deletedFeature = await this.prisma.feature.delete({
        where: {
          id
        }
      })
      this.response = responses.OK({data: deletedFeature});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async getFeatureFlag({feature = '', flag = ''}: {feature: string, flag: string}) {
    try {
      const featureFlag = await this.prisma.featureFlag.findUnique({
        where: {
          name_feature: {
            feature,
            name: flag
          }
        },
        include: {
          featureData: {
            include: {
              scopeData: true
            }
          }
        }
      })
      this.response = responses.OK({data: featureFlag})
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null})
    }
    return this
  }

  async getFeatureFlags({field = '', values = []}: {field?: string, values?: string[]}){
    try {
      this.featureFlags = !field || !values.length ? 
        await this.prisma.featureFlag.findMany({
          include: {
            featureData: {
              include: {
                scopeData: true
              }
            }
          }
        }) :
        await this.prisma.featureFlag.findMany({
          where: {
            [field]: {
              in: values
            }
          },
          include: {
            featureData: {
              include: {
                scopeData: true
              }
            }
          }
        })
    } catch (error: any) {
      console.log({error});
      this.featureFlags = []
    }
    return this
  }

  async createFeatureFlag({featureFlagData}: {featureFlagData : Prisma.FeatureFlagCreateInput}) {
    try {
      const newFeatureFlag = await this.prisma.featureFlag.create({
        data: {
          ...featureFlagData
        }
      })
      this.response = responses.OK({data: newFeatureFlag});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async updateFeatureFlag({id, data}: {id: string, data: Prisma.FeatureFlagUpdateInput}) {
    try {
      const updatedFeatureFlag = await this.prisma.featureFlag.update({
        where: {
          id
        },
        data: {
          ...data
        }
      })
      this.response = responses.OK({data: updatedFeatureFlag});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async deleteFeatureFlag({id}: {id: string}) {
    try {
      const deletedFeatureFlag = await this.prisma.featureFlag.delete({
        where: {
          id
        }
      })
      this.response = responses.OK({data: deletedFeatureFlag});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async getRoles({field = '', values = []}: {field?: string, values?: string[]}){
    try {
      this.roles = !field && !values.length ? 
        await this.prisma.role.findMany({}) :
        await this.prisma.role.findMany({
          where: {
            [field]: {
              in: values
            }
          }
        })
    } catch (error: any) {
      console.log({error});
      this.roles = []
    }
    return this
  }

  async createRole({roleData}: {roleData : Prisma.RoleCreateInput}) {
    try {
      const newRole = await this.prisma.role.create({
        data: {
          ...roleData
        }
      })
      this.response = responses.OK({data: newRole});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async updateRole({id, data}: {id: string, data: Prisma.RoleUpdateInput}) {
    try {
      const updatedRole = await this.prisma.role.update({
        where: {
          id
        },
        data: {
          ...data
        }
      })
      this.response = responses.OK({data: updatedRole});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async deleteRole({id}: {id: string}) {
    try {
      const deletedRole = await this.prisma.role.delete({
        where: {
          id
        }
      })
      this.response = responses.OK({data: deletedRole});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async getResources({field = '', values = []}: {field?: string, values?: string[]}){
    try {
      this.resources = !field || !values.length ? 
        await this.prisma.resource.findMany({}) :
        await this.prisma.resource.findMany({
          where: {
            [field]: {
              in: values
            }
          }
        })
    } catch (error: any) {
      console.log({error});
      this.resources = []
    }
    return this
  }

  async createResource({resourceData}: {resourceData : Prisma.ResourceCreateInput}) {
    try {
      const newResource = await this.prisma.resource.create({
        data: {
          ...resourceData
        }
      })
      this.response = responses.OK({data: newResource});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async updateResource({id, data}: {id: string, data: Prisma.ResourceUpdateInput}) {
    try {
      const updatedResource = await this.prisma.resource.update({
        where: {
          id
        },
        data: {
          ...data
        }
      })
      this.response = responses.OK({data: updatedResource});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async deleteResource({id}: {id: string}) {
    try {
      const deletedResource = await this.prisma.resource.delete({
        where: {
          id
        }
      })
      this.response = responses.OK({data: deletedResource});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async getRolePermissions({field = '', values = []}: {field?: string, values?: string[]}){
    try {
      this.rolePermissions = !field || !values.length ? 
        await this.prisma.rolePermission.findMany({}) :
        await this.prisma.rolePermission.findMany({
          where: {
            [field]: {
              in: values
            }
          }
        })
    } catch (error: any) {
      console.log({error});
      this.rolePermissions = []
    }
    return this
  }

  async createRolePermission({rolePermissionData}: {rolePermissionData : Prisma.RolePermissionCreateInput}) {
    try {
      const newRolePermission = await this.prisma.rolePermission.create({
        data: {
          ...rolePermissionData
        }
      })
      this.response = responses.OK({data: newRolePermission});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async updateRolePermission({id, data}: {id: string, data: Prisma.RolePermissionUpdateInput}) {
    try {
      const updatedRolePermission = await this.prisma.rolePermission.update({
        where: {
          id
        },
        data: {
          ...data
        }
      })
      this.response = responses.OK({data: updatedRolePermission});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }

  async deleteRolePermission({id}: {id: string}) {
    try {
      const deletedRolePermission = await this.prisma.rolePermission.delete({
        where: {
          id
        }
      })
      this.response = responses.OK({data: deletedRolePermission});
    } catch (error: any) {
      console.log({error})
      this.response = responses.InternalServerError({data: null, errMessage: error.message, error})
    }
    return this
  }
}