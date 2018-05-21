import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
// import * as admin from 'firebase-admin'
// import * as functions from 'firebase-functions'
// import * as Lodash from 'lodash'
// import * as serviceAccount from '../../qnary-dev.json'
const firebase = require("firebase");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const Lodash = require("lodash");
var serviceAccount = require("../../qnary-dev.json");


firebase.initializeApp({
  apiKey: "AIzaSyAL5jNakQk8PqF89f8rfS6TCedm0oFlBZ4",
  authDomain: "qnary-dev.firebaseapp.com",
  databaseURL: "https://qnary-dev.firebaseio.com",
  messagingSenderId: "582735679903",
  projectId: "qnary-dev",
  storageBucket: "qnary-dev.appspot.com",
  // apiKey: "AIzaSyDNDVQg4RncRKYr5r9O1GZrQOsv24NLd64",
  // authDomain: "qnary-my-fb.firebaseapp.com",
  // databaseURL: "https://qnary-my-fb.firebaseio.com",
  // messagingSenderId: "582735679903",
  // projectId: "qnary-my-fb",
  // storageBucket: "qnary-my-fb.appspot.com",
  credential: admin.credential.cert(serviceAccount)
});
// import { Context } from '../../utils'

export const auth = {
 
async login(parent, { email, password }, ctx, info) {
   const data = await firebase.auth().signInWithEmailAndPassword(email, password)
   const user  = data.user;
  
    if (!user)
      throw new Error(`No such user found for email: ${email}`)
    const user_org_snap = await admin.database().ref(`user_organizations/${user.uid}`).once("value");
    const user_org = user_org_snap.val();
    let userwithoid =  Lodash.pick(user, ['uid', 'displayName' , 'email'])

    Object.keys(user_org).map(o => {
        if (user_org[o].default)
          userwithoid = Object.assign({oid: o}, userwithoid)
      })
    return {
        token: await user.getIdToken(true) , // jwt.sign({ userId: 'aaa' }, process.env.APP_SECRET),
        user: userwithoid ,
        user_organizations: Object.keys(user_org).map(o => Object.assign({oid: o}, user_org[o]))
      }
  },
}
