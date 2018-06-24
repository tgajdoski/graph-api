const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const rootRef = admin.database().ref();

export const boarding_connections_mutation = {
  async createBoargingConnection(_, { input }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    const orgUserConn =  Lodash.pick(input, ['created_by',  'name', 'oid', 'uid', 'source', 'source_type', 'type']);
    input['created_at'] =  admin.database.ServerValue.TIMESTAMP;
    orgUserConn['updated_at'] =  admin.database.ServerValue.TIMESTAMP;
    let connID = await rootRef.child(`/connections`).push();

     let updates = {
       [`/connections/${connID.key}`]: input,
       [`/organization_user_connections/${input.oid}/${input.uid}/${connID.key}`]: orgUserConn,
     };
     try{
       let results = await rootRef.update(updates);
       let connection = (await rootRef(`/connections/${connID.key}`).once('value')).val();
       return connection;
     }
     catch(error)
     {
       console.log('error :' , error );
       throw error
     }
   },
  updateBoargingConnection(_, { input }, ctx) {
    return true;
  },
  deleteBoargingConnection(_, { input }, ctx) {
    return true;
   },
  }

