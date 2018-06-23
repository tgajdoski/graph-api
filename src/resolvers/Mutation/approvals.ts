const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');
// const { create_mutation, update_mutation, delete_mutation } = require("../query");

import { create_mutation, update_mutation, delete_mutation } from '../query-helper';
const approvalsRef = admin.database().ref('approvals');
export const  approvals_mutation = {
   createApproval(_, {input }, ctx) {
    return create_mutation({input}, ctx, approvalsRef)
  },
   updateApproval(_, {input }, ctx) {
    return update_mutation({input}, ctx, approvalsRef)
  },
   deleteApproval(_, { input }, ctx) {
    return delete_mutation({input}, ctx, approvalsRef)
  },
}
