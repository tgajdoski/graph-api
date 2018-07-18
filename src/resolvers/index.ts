import { auth } from "./Mutation/auth";
const { approvals } = require("./Query/approvals");
const { organizationUserConnections} = require("./Query/organizationUserConnections");
const { organizationAdmins} = require("./Query/organizationAdmins");


const { approvals_mutation } = require("./Mutation/approvals");
const { allownotifications_mutation} = require("./Mutation/allownotifications");
const {  boarding_connections_mutation} = require("./Mutation/boardingconnection");
const { allowsms_mutation } = require("./Mutation/allowsms");

export default {
  Query: {
    ...approvals,
    ...organizationUserConnections,
    ...organizationAdmins
  },
  Mutation: {
    ...auth,
    ...approvals_mutation,
    ...allownotifications_mutation,
    ...allowsms_mutation,
    ...boarding_connections_mutation
  }
  // Subscription,
  // AuthPayload,
};
