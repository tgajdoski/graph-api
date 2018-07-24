const admin = require("firebase-admin");
const { query } = require("../query-helper");
const Lodash = require("lodash");
const orgsusrconnRef = admin.database().ref("organization_users");

export const organizationUser = {
  async organizationUser(_, { oid, uid }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);
    const orgUserRef = orgsusrconnRef.child(`${oid}/${uid}`);
    let userSnap = (await orgUserRef.once("value"));
    let obj = userSnap.val();
    let user = Object.assign({}, obj, );
    
   // console.log('user', user);

    return user;
  }
};
