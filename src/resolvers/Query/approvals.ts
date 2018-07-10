const admin = require("firebase-admin");
const Lodash = require("lodash");
var serviceAccount = require("../../qnary-dev.json");

admin.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  messagingSenderId: process.env.messagingSenderId,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  credential: admin.credential.cert(serviceAccount)
});

const approvalsRef = admin.database().ref("approvals");

export const approvals = {
  async userapprovals(_, { oid, uid, status }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);
    const orgsuserappRef = admin
      .database()
      .ref(`organization_user_approvals/${oid}/${uid}`);
    let userApprovalsSnap = !Lodash.isNil(status)
      ? await orgsuserappRef
          .orderByChild("status")
          .equalTo(status)
          .once("value")
      : await orgsuserappRef.once("value");

    async function getApproval(aid) {
      let approvalSnap = await approvalsRef.child(`${aid}`).once("value");
      return approvalSnap;
    }
    let approvalsPromises = [];
    userApprovalsSnap.forEach(snap => {
      let aid = snap.key;
      let $p = getApproval(aid);
      approvalsPromises.push($p);
    });
    let approvalsSnaps = await Promise.all(approvalsPromises);
    let returnApps = [];
    approvalsSnaps.forEach(app => {
      let id = app.key;
      let approval = app.val();
      // org_user_app status can differ from /approvals status ???
      if (!Lodash.isNil(approval))
        if (Lodash.isNil(status)) {
          returnApps.push(Object.assign({ id: id }, approval));
        } else {
          if (approval.status === status)
            returnApps.push(Object.assign({ id: id }, approval));
        }
    });

    return returnApps;
  }
};
