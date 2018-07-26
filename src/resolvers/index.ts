import { auth } from "./Mutation/auth";
const { approvals } = require("./Query/approvals");
const { organizationUserConnections} = require("./Query/organizationUserConnections");
const { organizationAdmins} = require("./Query/organizationAdmins");
const { organizationUser} = require("./Query/organizationUser");

const { approvals_mutation } = require("./Mutation/approvals");
const { allownotifications_mutation} = require("./Mutation/allownotifications");
const {  boarding_connections_mutation} = require("./Mutation/boardingconnection");
const { allowsms_mutation } = require("./Mutation/allowsms");
const { message_mutations } = require("./Mutation/message");

export default {
  Query: {
    ...approvals,
    ...organizationUserConnections,
    ...organizationAdmins,
    ...organizationUser
  },
  Mutation: {
    ...auth,
    ...approvals_mutation,
    ...allownotifications_mutation,
    ...allowsms_mutation,
    ...boarding_connections_mutation,
    ...message_mutations
  }
  // Subscription,
  // AuthPayload,
};
