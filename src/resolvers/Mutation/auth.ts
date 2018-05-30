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
const axios = require('axios');


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
   const data = await firebase.auth().signInWithEmailAndPassword(email, password)
   console.log('data user refresh ' , data.user.refreshToken);
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
        refreshtoken: await user.refreshToken,
        user: userwithoid ,
        user_organizations: Object.keys(user_org).map(o => Object.assign({oid: o}, user_org[o]))
      }
  },
   async refreshtokens(parent, { refreshToken }, ctx, info) {

    let refUrl = `https://securetoken.googleapis.com/v1/token?key=${process.env.apiKey}&grant_type=refresh_token&refresh_token=${refreshToken}`
    console.log('URL ' , refUrl);
    var res = await axios.post(refUrl);
    if (res.data)
      return {
        token:   res.data.access_token,
        refreshtoken:   res.data.refresh_token,
      }
      throw new Error(`error: cant refresh tokens`);
   },

}
