import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
// import * as admin from 'firebase-admin'
// import * as functions from 'firebase-functions'
// import * as Lodash from 'lodash'
// import * as serviceAccount from '../../qnary-dev.json'
const firebase = require("firebase");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
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
  async refreshtokens(parent, { refreshToken }, ctx, info) {
    let refUrl = `https://securetoken.googleapis.com/v1/token?key=${
      process.env.apiKey
    }&grant_type=refresh_token&refresh_token=${refreshToken}`;
    //console.log("URL ", refUrl);
    var res = await axios.post(refUrl);
    if (res.data)
      return {
        token: res.data.access_token,
        refreshtoken: res.data.refresh_token
      };
    throw new Error(`error: cant refresh tokens`);
  },
  async passwordResetEmail(parent, { email }, ctx, info) {
    let auth = firebase.auth();
    let responsetext = "Password reset email sent successfully!"
    auth.sendPasswordResetEmail(email).then(function() {
      console.log("Email sent.");
     }).catch(function(error) {
       // An error happened.
       responsetext  = `error: cant send email - ${error.code.toString()}`;
     });
      return {responsetext: responsetext};
  },
  // we need user - or uid so we can catch the user
  async passwordUpdate(parent, { email, oid, oldpass, newpass }, ctx, info) {
    try {
      const login = await auth.login(parent, {email, password: oldpass }, ctx, info);
      const user =  firebase.auth().currentUser;
      let responsetext = "Password updated successfully!"
      try {
        const updateuser = await user.updatePassword(newpass);
        const updateTime = await admin.database().ref(`organization_users/${oid}/${user.uid}/settings/mobile`).update({
          'password_last_changed': firebase.database.ServerValue.TIMESTAMP
        });
        return {responsetext: responsetext};
      }
      catch (error) {
        console.error(`login failed: ${error}`);
        return {responsetext: `login failed: ${error}`};
      }
    }
    catch (error) {
      console.error(`login failed: ${error}`);
      return {responsetext: `login failed: ${error}`};
     }
   

         
    // const text = user.updatePassword(newpass).then(function() {
    //    admin.database().ref(`organization_users/${oid}/${user.uid}/settings/mobile`).update({
    //     'password_last_changed': firebase.database.ServerValue.TIMESTAMP
    //   }).then(function(res) {
    //     return {responsetext: responsetext};
    //   }).catch(function(error) {
    //   // An error happened.
    //     responsetext  = `error: cant send email - ${error}`;
    //   });
    //   return {responsetext: responsetext};
    // }).catch(function(error) {
    // // An error happened.
    //   responsetext  = `error: cant change email - ${error}`;
    //   return {responsetext: responsetext};
    // });
  },

};
