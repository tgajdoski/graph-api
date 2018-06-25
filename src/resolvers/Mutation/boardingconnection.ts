import { create } from "domain";

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const rootRef = admin.database().ref();

export const boarding_connections_mutation = {
  async createBoargingConnection(_, { input }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    const orgUserConn = Lodash.pick(input, ['created_by', 'name', 'oid', 'uid', 'source', 'source_type', 'type']);
    input['created_at'] = admin.database.ServerValue.TIMESTAMP;
    orgUserConn['updated_at'] = admin.database.ServerValue.TIMESTAMP;
    let connID = await rootRef.child(`/connections`).push();

    let updates = {
      [`/connections/${connID.key}`]: input,
      [`/organization_user_connections/${input.oid}/${input.uid}/${connID.key}`]: orgUserConn,
    };
    try {
      let results = await rootRef.update(updates);
      let connection = (await rootRef(`/connections/${connID.key}`).once('value')).val();
      return connection;
    }
    catch (error) {
      console.log('error :', error);
      throw error
    }
  },
  updateBoargingConnection(_, { input }, ctx) {
    return true;
  },
  deleteBoargingConnection(_, { input }, ctx) {
    return true;
  },
  async completeOnboarding(_, { oid, uid }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    var onboardtime = admin.database.ServerValue.TIMESTAMP;

    let updates = {
      [`/organization_users/${oid}/${uid}/settings/mobile`]: { 'onboarded': onboardtime },
    };
    try {
      let results = await rootRef.update(updates);
      return true;
    }
    catch (error) {
      console.log('error :', error);
      throw error
    }
  },
  createOrUpdateConnection(_, { input }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)

    var connectionsRef = admin.database().ref('/connections');
    var connectionRef;
    var created_at = admin.database.ServerValue.TIMESTAMP;

    if (input.origin === 'fullcontact') {
      var updated_at = admin.database.ServerValue.TIMESTAMP;
      var updated_by = input.uid;
      connectionRef = connectionsRef.child(input.id);
      input.origin = null;
      input.id = null;

      return (
        new Promise((resolve) => {
            const obj = connectionRef.update(input, () => {
                resolve(connectionRef.key);
            });
        })
    );

      // connectionRef.update(input, function (err) {
      //   if (err) {
      //     console.log('error :', err);
      //     throw err
      //   }
      //   input.id = connectionRef.key;
      //   return input.id;
      // });
    } else {
      connectionRef = connectionsRef.push();
      var orgUserConnectionRef = admin.database().ref(`/organization_user_connections/${input.oid}/${input.uid}/${connectionRef.key}`);

      input = Lodash.assign(input, {
        "-created_at": 0 - Date.now(),
        created_at: created_at,
        created_by: input.uid,
        auth: {
          firebase_id: input.auth.firebase_id,
          provider: input.auth.provider
        }
      });

      console.log("connect:push", JSON.stringify(input));

      return (
        new Promise((resolve) => {
            const obj = connectionRef.set(input, () => {
                 resolve(
              //  return (
                  new Promise((res) => {
                      const objc = orgUserConnectionRef.set(Lodash.pick(input, ['-created_at', 'created_at', 'created_by', 'oid', 'uid', 'name', 'source']), () => {
                          res(connectionRef.key);
                      });
                  })
           //   );
            )
            });
        })
    );




      // connectionRef.set(input, function (err) {
      //   if (err) {
      //     console.log('error :', err);
      //     throw err
      //   }

      //   orgUserConnectionRef.set(Lodash.pick(input, ['-created_at', 'created_at', 'created_by', 'oid', 'uid', 'name', 'source']), function (err1) {
      //     if (err1) {
      //       console.log('error :', err1);
      //       throw err1
      //     }

      //     input.id = connectionRef.key;
      //     console.log('VRAKAM2', input.id, input);
      //     return input.id;
      //   });
      // });
    }
  },
}

