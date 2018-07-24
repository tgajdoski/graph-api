const admin = require("firebase-admin");
const { query } = require("../query-helper");
const Lodash = require("lodash");
const orgsusrconnRef = admin.database().ref("organization_users");

export const organizationAdmins = {
  async organizationAdmins(_, { oid }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);
    const orgsRef = orgsusrconnRef.child(`${oid}`);
    let adminsSnap = (await orgsRef.orderByChild("roles/admin").equalTo(true).once("value"));
    let admins = [];
    if (adminsSnap)
      adminsSnap.forEach(function (approval) {
        var obj = approval.val();
        admins.push({ uid: approval.key, profile: obj["profile"], email: obj["email"], oid: oid , roles: obj["roles"]});
    });
    return admins;
  }
};
