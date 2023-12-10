import SettingsPGService from "../../../dao/postgres/settings.pg";
import { sanitizeData } from "../../../utils/helpers/validators";
import { Prisma } from "@prisma/client";

const settingsPg = new SettingsPGService();

const eventTypes = {
  CREATED: 'CREATED',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED',
}

const APP_SETTING_CREATED = async (data: any) => {
  console.log('App Settings created');
  let settingData = sanitizeData(settingsPg.appSettingFields, data.record);
  const existingSetting = (await settingsPg.getAppSettings({field: 'id', values: [data.record.id]})).appSettings
  console.log({settingData, existingSetting})
  if (existingSetting.length){
    await settingsPg.updateAppSetting({id: settingData.id, data: settingData});
  } else {
    await settingsPg.createAppSetting({settingData: settingData as unknown as Prisma.AppSettingCreateInput});
  }
}

const APP_SETTING_UPDATED = async (data: any) => {
  console.log('App Settings updated', data);
  let settingData = sanitizeData(settingsPg.appSettingFields, data.record);
  const existingSetting = (await settingsPg.getAppSettings({field: 'id', values: [data.record.id]})).appSettings
  console.log({settingData, existingSetting})
  if (existingSetting.length){
    await settingsPg.updateAppSetting({id: settingData.id, data: settingData});
  } else {
    await settingsPg.createAppSetting({settingData: settingData as unknown as Prisma.AppSettingCreateInput});
  }
}

const APP_SETTING_DELETED = async (data: any) => {
  console.log('App Settings deleted', data);
  const existingSetting = (await settingsPg.getAppSettings({field: 'id', values: [data.record.id]})).appSettings
  if(existingSetting.length){
    await settingsPg.deleteAppSetting({id: data.record.id});
  }
}

const SCOPE_CREATED = async (data: any) => {
  console.log('scope created', data);
  let scopeData = sanitizeData(settingsPg.scopeFields, data.record);
  const existingSetting = (await settingsPg.getScopes({field: 'id', values: [data.record.id]})).scopes
  console.log({scopeData, existingSetting})
  if (existingSetting.length){
    await settingsPg.updateScope({id: scopeData.id, data: scopeData});
  } else {
    await settingsPg.createScope({scopeData: scopeData as unknown as Prisma.ScopeCreateInput});
  }
}

const SCOPE_UPDATED = async (data: any) => {
  console.log('scope updated', data);
  console.log('scope created', data);
  let scopeData = sanitizeData(settingsPg.scopeFields, data.record);
  const existingScope = (await settingsPg.getScopes({field: 'id', values: [data.record.id]})).scopes
  console.log({scopeData, existingScope})
  if (existingScope.length){
    await settingsPg.updateScope({id: scopeData.id, data: scopeData});
  } else {
    await settingsPg.createScope({scopeData: scopeData as unknown as Prisma.ScopeCreateInput});
  }
}

const SCOPE_DELETED = async (data: any) => {
  console.log('scope deleted', data);
  const existingScope = (await settingsPg.getScopes({field: 'id', values: [data.record.id]})).scopes
  if (existingScope.length){
    await settingsPg.deleteScope({id: data.record.id});
  }
}

const ROLE_CREATED = async (data: any) => {
  console.log('role created', data);
  let roleData = sanitizeData(settingsPg.roleFields, data.record);
  const existingRoles = (await settingsPg.getRoles({field: 'id', values: [data.record.id]})).roles
  console.log({roleData, existingRoles})
  if (existingRoles.length){
    await settingsPg.updateRole({id: roleData.id, data: roleData});
  } else {
    await settingsPg.createRole({roleData: roleData as unknown as Prisma.RoleCreateInput});
  }
}

const ROLE_UPDATED = async (data: any) => {
  console.log('role updated', data);
  let roleData = sanitizeData(settingsPg.roleFields, data.record);
  const existingRoles = (await settingsPg.getRoles({field: 'id', values: [data.record.id]})).roles
  console.log({roleData, existingRoles})
  if (existingRoles.length){
    await settingsPg.updateRole({id: roleData.id, data: roleData});
  } else {
    await settingsPg.createRole({roleData: roleData as unknown as Prisma.RoleCreateInput});
  }
}

const ROLE_DELETED = async (data: any) => {
  console.log('role deleted', data);
}

const FEATURE_CREATED = async (data: any) => {
  console.log('feature created', data);
  let featureData = sanitizeData(settingsPg.featureFields, data.record);
  const existingFeatures = (await settingsPg.getFeatures({field: 'id', values: [data.record.id]})).features
  if (data.record.scope){
    const scopes = (await settingsPg.getScopes({field: 'id', values: [data.record.scope]})).scopes;
    featureData.scope = scopes[0].name
  }
  console.log({featureData, existingFeatures})
  if (existingFeatures.length){
    await settingsPg.updateFeature({id: featureData.id, data: featureData});
  } else {
    await settingsPg.createFeature({featureData: featureData as unknown as Prisma.FeatureCreateInput});
  }
}

const FEATURE_UPDATED = async (data: any) => {
  console.log('feature updated', data);
  let featureData = sanitizeData(settingsPg.featureFields, data.record);
  const existingFeatures = (await settingsPg.getFeatures({field: 'id', values: [data.record.id]})).features
  if (data.record.scope){
    const scopes = (await settingsPg.getScopes({field: 'id', values: [data.record.scope]})).scopes;
    console.log({scopes})
    featureData.scope = scopes[0].name
  }
  console.log({featureData, existingFeatures})
  if (existingFeatures.length){
    await settingsPg.updateFeature({id: featureData.id, data: featureData});
  } else {
    await settingsPg.createFeature({featureData: featureData as unknown as Prisma.FeatureCreateInput});
  }
}

const FEATURE_DELETED = async (data: any) => {
  console.log('feature deleted', data);
}

const FEATURE_FLAG_CREATED = async (data: any) => {
  console.log('feature flag created', data);
  let featureFlagData = sanitizeData(settingsPg.featureFlagFields, data.record);
  const existingFeatureFlags = (await settingsPg.getFeatureFlags({field: 'id', values: [data.record.id]})).featureFlags
  console.log({featureFlagData, existingFeatureFlags})
  if (data.record.feature){
    const features = (await settingsPg.getFeatures({field: 'id', values: [data.record.feature]})).features;
    console.log({features})
    featureFlagData.feature = features[0].name
  }
  if (existingFeatureFlags.length){
    await settingsPg.updateFeatureFlag({id: featureFlagData.id, data: featureFlagData});
  } else {
    await settingsPg.createFeatureFlag({featureFlagData: featureFlagData as unknown as Prisma.FeatureFlagCreateInput});
  }
}

const FEATURE_FLAG_UPDATED = async (data: any) => {
  console.log('feature flag updated', data);
  let featureFlagData = sanitizeData(settingsPg.featureFlagFields, data.record);
  const existingFeatureFlags = (await settingsPg.getFeatureFlags({field: 'id', values: [data.record.id]})).featureFlags
  console.log({featureFlagData, existingFeatureFlags})
  if (data.record.feature){
    const features = (await settingsPg.getFeatures({field: 'id', values: [data.record.feature]})).features;
    console.log({features})
    featureFlagData.feature = features[0].name
  }
  if (existingFeatureFlags.length){
    await settingsPg.updateFeatureFlag({id: featureFlagData.id, data: featureFlagData});
  } else {
    await settingsPg.createFeatureFlag({featureFlagData: featureFlagData as unknown as Prisma.FeatureFlagCreateInput});
  }
}

const FEATURE_FLAG_DELETED = async (data: any) => {
  console.log('feature flag deleted', data);
}

const RESOURCE_CREATED = async (data: any) => {
  console.log('resource created', data);
  let resourceData = sanitizeData(settingsPg.resourceFields, data.record);
  const existingResources = (await settingsPg.getResources({field: 'id', values: [data.record.id]})).resources
  console.log({resourceData, existingResources})
  if (existingResources.length){
    await settingsPg.updateResource({id: resourceData.id, data: resourceData});
  } else {
    await settingsPg.createResource({resourceData: resourceData as unknown as Prisma.ResourceCreateInput});
  }
}

const RESOURCE_UPDATED = async (data: any) => {
  console.log('resource updated', data);
  let resourceData = sanitizeData(settingsPg.resourceFields, data.record);
  const existingResources = (await settingsPg.getResources({field: 'id', values: [data.record.id]})).resources
  console.log({resourceData, existingResources})
  if (existingResources.length){
    await settingsPg.updateResource({id: resourceData.id, data: resourceData});
  } else {
    await settingsPg.createResource({resourceData: resourceData as unknown as Prisma.ResourceCreateInput});
  }
}

const RESOURCE_DELETED = async (data: any) => {
  console.log('resource deleted', data);
}

const ROLE_PERMISSION_CREATED = async (data: any) => {
  console.log('role permission created', data);
  let rolePermissionData = sanitizeData(settingsPg.rolePermissionFields, data.record);
  const existingRolePermissions = (await settingsPg.getRolePermissions({field: 'id', values: [data.record.id]})).rolePermissions
  if (data.record.role){
    const roles = (await settingsPg.getRoles({field: 'id', values: [data.record.role]})).roles;
    console.log({roles})
    rolePermissionData.role = roles[0].name
  }
  if (data.record.resource){
    const resources = (await settingsPg.getResources({field: 'id', values: [data.record.resource]})).resources;
    console.log({resources})
    rolePermissionData.resource = resources[0].name
  }
  console.log({rolePermissionData, existingRolePermissions})
  if (existingRolePermissions.length){
    await settingsPg.updateRolePermission({id: rolePermissionData.id, data: rolePermissionData});
  } else {
    await settingsPg.createRolePermission({rolePermissionData: rolePermissionData as unknown as Prisma.RolePermissionCreateInput});
  }
}

const ROLE_PERMISSION_UPDATED = async (data: any) => {
  console.log('rolePermission permission updated', data);
  let rolePermissionData = sanitizeData(settingsPg.rolePermissionFields, data.record);
  const existingRolePermissions = (await settingsPg.getRolePermissions({field: 'id', values: [data.record.id]})).rolePermissions
  console.log({rolePermissionData, existingRolePermissions})
  if (data.record.role){
    const roles = (await settingsPg.getRoles({field: 'id', values: [data.record.role]})).roles;
    console.log({roles})
    rolePermissionData.role = roles[0].name
  }
  if (data.record.resource){
    const resources = (await settingsPg.getResources({field: 'id', values: [data.record.resource]})).resources;
    console.log({resources})
    rolePermissionData.resource = resources[0].name
  }
  if (existingRolePermissions.length){
    await settingsPg.updateRolePermission({id: rolePermissionData.id, data: rolePermissionData});
  } else {
    await settingsPg.createRolePermission({rolePermissionData: rolePermissionData as unknown as Prisma.RolePermissionCreateInput});
  }
}

const ROLE_PERMISSION_DELETED = async (data: any) => {
  console.log('role permission deleted', data);
}

const appSettingEventHandlers = {
  [eventTypes.CREATED]: APP_SETTING_CREATED,
  [eventTypes.UPDATED]: APP_SETTING_UPDATED,
  [eventTypes.DELETED]: APP_SETTING_DELETED
}

const scopeEventHandlers = {
  [eventTypes.CREATED]: SCOPE_CREATED,
  [eventTypes.UPDATED]: SCOPE_UPDATED,
  [eventTypes.DELETED]: SCOPE_DELETED
}

const featureEventHandlers = {
  [eventTypes.CREATED]: FEATURE_CREATED,
  [eventTypes.UPDATED]: FEATURE_UPDATED,
  [eventTypes.DELETED]: FEATURE_DELETED,
}

const featureFlagEventHandlers = {
  [eventTypes.CREATED]: FEATURE_FLAG_CREATED,
  [eventTypes.UPDATED]: FEATURE_FLAG_UPDATED,
  [eventTypes.DELETED]: FEATURE_FLAG_DELETED,
}

const roleEventHandlers = {
  [eventTypes.CREATED]: ROLE_CREATED,
  [eventTypes.UPDATED]: ROLE_UPDATED,
  [eventTypes.DELETED]: ROLE_DELETED,
}

const resourceEventHandlers = {
  [eventTypes.CREATED]: RESOURCE_CREATED,
  [eventTypes.UPDATED]: RESOURCE_UPDATED,
  [eventTypes.DELETED]: RESOURCE_DELETED
}

const rolePermissionEventHandlers = {
  [eventTypes.CREATED]: ROLE_PERMISSION_CREATED,
  [eventTypes.UPDATED]: ROLE_PERMISSION_UPDATED,
  [eventTypes.DELETED]: ROLE_PERMISSION_DELETED,
}

export const APP_SETTING_EVENTS = async (message: any) => {
  const {data} = message;
  if(Object.keys(eventTypes).includes(data.action)){
    await appSettingEventHandlers[data.action](data);
  }
}

export const SCOPE_EVENTS = async (message: any) => {
  const {data} = message;
  if(Object.keys(eventTypes).includes(data.action)){
    await scopeEventHandlers[data.action](data);
  }
}

export const FEATURE_EVENTS = async (message: any) => {
  const {data} = message;
  if(Object.keys(eventTypes).includes(data.action)){
    await featureEventHandlers[data.action](data);
  }
}

export const FEATURE_FLAG_EVENTS = async (message: any) => {
  const {data} = message;
  if(Object.keys(eventTypes).includes(data.action)){
    await featureFlagEventHandlers[data.action](data);
  }
}

export const ROLE_EVENTS = async (message: any) => {
  const {data} = message;
  if(Object.keys(eventTypes).includes(data.action)){
    await roleEventHandlers[data.action](data);
  }
}

export const RESOURCE_EVENTS = async (message: any) => {
  const {data} = message;
  if(Object.keys(eventTypes).includes(data.action)){
    await resourceEventHandlers[data.action](data);
  }
}

export const ROLE_PERMISSION_EVENTS = async (message: any) => {
  const {data} = message;
  if(Object.keys(eventTypes).includes(data.action)){
    await rolePermissionEventHandlers[data.action](data);
  }
}