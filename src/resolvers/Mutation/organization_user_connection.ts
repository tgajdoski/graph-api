const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');
const { create_mutation, update_mutation, delete_mutation } = require("../query");

const orgsusrconnRef = admin.database().ref('organization_user_connections');

export const organization_user_connections_mutation = {
  createOrganizationUserConnection(_, { input }, ctx) {
    console.log('input', input);
    input["created_at"] = admin.database.ServerValue.TIMESTAMP;

    console.log('inputAFTER', input);
    const orgRef = orgsusrconnRef.child(`${input.oid}/${input.uid}`);
    return create_mutation({input}, ctx, orgRef);
  },
  updateOrganizationUserConnection(_, { input }, ctx) {
    const orgRef = orgsusrconnRef.child(`${input.oid}/${input.uid}/${input.id}`);
    return update_mutation({input}, ctx, orgRef);
  },
  deleteOrganizationUserConnection(_, { input }, ctx) {
    //const orgRef = orgsusrconnRef.child(`${input.oid}/${input.uid}/${input.id}`);
    const orgRef = orgsusrconnRef.child(`${input.oid}/${input.uid}`);
    return delete_mutation({input}, ctx, orgRef);
  },
}

