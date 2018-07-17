const firebase = require("firebase");
const admin = require("firebase-admin");
const Lodash = require("lodash");
var serviceAccount = require("../../qnary-dev.json");
const axios = require("axios");

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  messagingSenderId: process.env.messagingSenderId,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  credential: admin.credential.cert(serviceAccount)
});

export const auth = {
  async login(parent, { email, password }, ctx, info) {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = data.user;

    if (!user) throw new Error(`No such user found for email: ${email}`);
    const user_org_snap = await admin
      .database()
      .ref(`user_organizations/${user.uid}`)
      .once("value");
    const user_org = user_org_snap.val();
    let userwithoid = Lodash.pick(user, ["uid", "displayName", "email"]);

    Object.keys(user_org).map(o => {
      if (user_org[o].default)
        userwithoid = Object.assign({ oid: o }, userwithoid);
    });
    return {
      id: user.uid,
      token: await user.getIdToken(true), // jwt.sign({ userId: 'aaa' }, process.env.APP_SECRET),
      refreshtoken: await user.refreshToken,
      user: userwithoid,
      organizations: Object.keys(user_org).map(o =>
        Object.assign({ oid: o }, user_org[o])
      )
    };
  },
  async refreshTokens(parent, { refreshToken }, ctx, info) {
    let refUrl = `https://securetoken.googleapis.com/v1/token?key=${
      process.env.apiKey
    }&grant_type=refresh_token&refresh_token=${refreshToken}`;
    //console.log("URL ", refUrl);
    var res = await axios.post(refUrl);
    if (res.data)
      return {
        id: res.data.access_token,
        token: res.data.access_token,
        refreshtoken: res.data.refresh_token
      };
    throw new Error(`error: cant refresh tokens`);
  },
  async passwordResetEmail(parent, { email }, ctx, info) {
    let auth = firebase.auth();
    let response = await auth
      .sendPasswordResetEmail(email)
      .then(function() {
        return {
          isSuccess: true,
          error: null
        };
      })
      .catch(function(error) {
        // An error happened.
        let err = error.code
          ? { code: error.code, message: error.message }
          : { code: "GENERIC_ERROR", message: error };
        return {
          isSuccess: false,
          error: err
        };
      });
    return response;
  },
  async alreadyOnboarded(_, { oid, uid }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);
    const orgsuserappRef = admin
    try {
      let onboard = (await admin.database().ref(`/organization_users/${oid}/${uid}/settings/mobile/onboarded`).once("value")).val();
      console.log('ONBOARD' , onboard);
      return {
        isBoarded: onboard ?  true : false,
        error: null
      };
    } catch (error) {
      console.log('error', error)
     throw new Error(`error: cant check onboard`);
    };
  },  
  async passwordUpdate(parent, { email, oid, oldpass, newpass }, ctx, info) {
    try {
      await auth.login(parent, { email, password: oldpass }, ctx, info);
      const user = firebase.auth().currentUser;
      try {
        await user.updatePassword(newpass);
        await admin
          .database()
          .ref(`organization_users/${oid}/${user.uid}/settings/mobile`)
          .update({
            password_last_changed: firebase.database.ServerValue.TIMESTAMP
          });
        return {
          isSuccess: true
        };
      } catch (error) {
        let err = error.code
          ? { code: error.code, message: error.message }
          : { code: "GENERIC_ERROR", message: error };
        console.error(`login failed: ${error}`);
        return {
          isSuccess: false,
          error: err
        };
      }
    } catch (error) {
      console.error(`login failed AAA: ${error}`);
      return {
        isSuccess: false,
        error: { code: "LOGIN_FAILED", message: error.message }
      };
    }
  }
};
