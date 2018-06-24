import { auth } from './Mutation/auth'

const { approvals } = require('./Query/approvals')
const { groups } = require('./Query/groups')
const { organizations } = require('./Query/organizations')
const { devices } = require('./Query/devices')
const { connections } = require('./Query/connections')
const { organization_user_approvals } = require('./Query/organization_user_approval')
const { organization_user_connections } = require('./Query/organization_user_connection')
const { notifications } = require('./Query/notifications')
const { user_notifications } = require('./Query/user_notification')
const { organization_users } = require('./Query/organization_user')

const { approvals_mutation } = require('./Mutation/approvals')
const { groups_mutation } = require('./Mutation/groups')
const { organizations_mutation } = require('./Mutation/organizations')
const { devices_mutation } = require('./Mutation/devices')
const { connections_mutation } = require('./Mutation/connections')
const { organization_user_approvals_mutation } = require('./Mutation/organization_user_approval')
const { notifications_mutation } = require('./Mutation/notifications')
const { organization_user_connections_mutation } = require('./Mutation/organization_user_connection')
const { user_notifications_mutation } = require('./Mutation/user_notification')
const { organization_users_mutation } = require('./Mutation/organization_user')
const { allownotifications_mutation } = require('./Mutation/allownotifications')
const { boarding_connections_mutation } = require('./Mutation/boardingconnection')
const { allowsms_mutation } = require('./Mutation/allowsms')
const { sendevents_mutation  } = require('./Mutation/sendevent')

export default {
  Query: {
    ...approvals,
    ...organizations,
    ...organization_user_approvals,
    ...organization_user_connections,
    ...groups,
    ...devices,
    ...connections,
    ...notifications,
    ...user_notifications,
    ...organization_users
  },
  Mutation: {
    ...auth,
    ...approvals_mutation,
    ...organizations_mutation,
    ...organization_user_approvals_mutation,
    ...organization_user_connections_mutation,
    ...groups_mutation,
    ...devices_mutation,
    ...connections_mutation,
    ...notifications_mutation,
    ...user_notifications_mutation,
    ...organization_users_mutation,
    ...allownotifications_mutation,
    ...allowsms_mutation,
    ...boarding_connections_mutation,
    ...sendevents_mutation,
  }
  // Subscription,
  // AuthPayload,

}
