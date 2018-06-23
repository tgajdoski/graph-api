const admin = require('firebase-admin');
const  { query, querynokey } = require('../query-helper');

const orgsusrRef = admin.database().ref('organization_users');

export const organization_users = {
  
  organization_users(_, { oid }, ctx) {
    const orgsRef = orgsusrRef.child(`${oid}`);
    return  query({}, ctx , orgsRef);
   },
   organization_user(_, { oid, uid }, ctx) {
    const orgsRef  = orgsusrRef.child(`${oid}/${uid}`);
    return  querynokey({}, ctx , orgsRef);
   },
}
