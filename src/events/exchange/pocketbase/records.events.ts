import { APP_SETTING_EVENTS, FEATURE_EVENTS, FEATURE_FLAG_EVENTS, RESOURCE_EVENTS, ROLE_EVENTS, ROLE_PERMISSION_EVENTS, SCOPE_EVENTS } from "./settings.events";
import { USER_EVENTS } from "./users.events"

const collections = {
  // FEATUREFLAGS: 'FEATUREFLAGS',
  USERS: 'USERS',
  APPSETTINGS: 'APPSETTINGS',
  SCOPES: 'SCOPES',
  ROLES: 'ROLES',
  ROLEPERMISSIONS: 'ROLEPERMISSIONS',
  RESOURCES: 'RESOURCES',
  FEATURES: 'FEATURES',
  FEATUREFLAGS: 'FEATUREFLAGS',
}

const recordsEventHandlers = {
  [collections.USERS]: USER_EVENTS,
  [collections.APPSETTINGS]: APP_SETTING_EVENTS,
  [collections.SCOPES]: SCOPE_EVENTS,
  [collections.FEATURES]: FEATURE_EVENTS,
  [collections.FEATUREFLAGS]: FEATURE_FLAG_EVENTS,
  [collections.RESOURCES]: RESOURCE_EVENTS,
  [collections.ROLES]: ROLE_EVENTS,
  [collections.ROLEPERMISSIONS]: ROLE_PERMISSION_EVENTS,
}

export const RECORDS_EVENTS = async (message: any) => {
  const {data} = message;
  if(Object.keys(collections).includes(data.collection)) {
    await recordsEventHandlers[data.collection](message)
  }
}