const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');
const { create_mutation_key, update_mutation, delete_mutation } = require("../query-helper");

const orgsusrRef = admin.database().ref('organization_users');

export const organization_users_mutation = {
  createOrganizationUser(_, { input }, ctx) {
    const orgRef = orgsusrRef.child(`${input.oid}/${input.id}`);
    return create_mutation_key({input}, ctx, orgRef);
  },
  updateOrganizationUser(_, { input }, ctx) {
    const orgRef = orgsusrRef.child(`${input.oid}`);
    return update_mutation({input}, ctx, orgRef);
  },
  deleteOrganizationUser(_, { input }, ctx) {
   // const orgRef = orgsusrappRef.child(`${input.oid}/${input.uid}/${input.id}`);
    const orgRef = orgsusrRef.child(`${input.oid}`);
    return delete_mutation({input}, ctx, orgRef);
  },
}

