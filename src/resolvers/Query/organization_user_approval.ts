const admin = require('firebase-admin');
const functions = require('firebase-functions');
const  { query } = require('../query-helper');
const Lodash = require('lodash');

const orgsusrappRef = admin.database().ref('organization_user_approvals');

export const organization_user_approvals = {
  
  organization_user_approvals(_, { oid, uid }, ctx) {
    const orgsRef = orgsusrappRef.child(`${oid}/${uid}`);
    return  query({}, ctx , orgsRef);
   },
   organization_user_approval(_, { oid, uid, id }, ctx) {
    const orgsRef  = orgsusrappRef.child(`${oid}/${uid}`);
    return  query({ id }, ctx , orgsRef);
   },
}
