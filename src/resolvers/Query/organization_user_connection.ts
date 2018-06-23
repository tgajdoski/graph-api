const admin = require('firebase-admin');
const functions = require('firebase-functions');
const  { query } = require('../query-helper');
const Lodash = require('lodash');

const orgsusrconnRef = admin.database().ref('organization_user_connections');

export const organization_user_connections = {
  
  organization_user_connections(_, { oid, uid }, ctx) {
    const orgsRef = orgsusrconnRef.child(`${oid}/${uid}`);
    return  query({}, ctx , orgsRef);
   },
   organization_user_connection(_, { oid, uid, id }, ctx) {
    const orgsRef  = orgsusrconnRef.child(`${oid}/${uid}`);
    return  query({ id }, ctx , orgsRef);
   },
}
