const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { query } = require("../query-helper");
const Lodash = require("lodash");

const orgsusrconnRef = admin.database().ref("organization_user_connections");
const connectionsRef = admin.database().ref("connections");

export const organization_user_connections = {
  async organization_user_connections(_, { oid, uid }, ctx) {
    const orgsRef = orgsusrconnRef.child(`${oid}/${uid}`);
    let oucs = await query({}, ctx, orgsRef);
    let output = [];
    if (oucs)
      for (let ouc of oucs) {
        if (ouc.id) {
          let id = ouc.id;
          let conn = await query({ id }, ctx, connectionsRef);
          output.push(Lodash.assign(ouc, conn));
        }
      }
    return output;
  }
};
