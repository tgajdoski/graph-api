const admin = require('firebase-admin');
const functions = require('firebase-functions');
const  { query } = require('../query-helper');
const Lodash = require('lodash');

const orgsusrconnRef = admin.database().ref('organization_user_connections');
const connectionsRef = admin.database().ref('connections');



export const organization_user_connections = {
  
  async organization_user_connections(_, { oid, uid }, ctx) {
    const orgsRef = orgsusrconnRef.child(`${oid}/${uid}`);
    let oucs = await  query({}, ctx , orgsRef);
    let output = [];
    if (oucs)
      for( let ouc of oucs){
        if(!ouc.id)
        throw Error;
        let id  = ouc.id;
        let conn = await query({ id }, ctx , connectionsRef);
        output.push(Lodash.assign(ouc, conn));
      }
    return output;
   },
   async organization_user_connection(_, { oid, uid, id }, ctx) {
    const orgsRef  = orgsusrconnRef.child(`${oid}/${uid}`);
    let ouc = await  query({}, ctx , orgsRef);
    console.log(ouc);
     if(!ouc[0].id)
       throw Error;
    let oucid  = ouc[0].id;
    console.log(oucid);
    let conn = await query({ oucid }, ctx , connectionsRef);
    return Lodash.assign(ouc[0], conn[0]);
   // return  query({ id }, ctx , orgsRef);
   },
}
