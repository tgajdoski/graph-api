import { auth } from "./Mutation/auth";

const { approvals } = require("./Query/approvals");

const {
  organization_user_connections
} = require("./Query/organization_user_connection");

const {
  allownotifications_mutation
} = require("./Mutation/allownotifications");
const {
  boarding_connections_mutation
} = require("./Mutation/boardingconnection");
const { allowsms_mutation } = require("./Mutation/allowsms");

export default {
  Query: {
    ...approvals,
    ...organization_user_connections
  },
  Mutation: {
    ...auth,
    ...allownotifications_mutation,
    ...allowsms_mutation,
    ...boarding_connections_mutation
  }
  // Subscription,
  // AuthPayload,
};
