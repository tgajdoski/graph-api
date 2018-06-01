const admin = require("firebase-admin");
var serviceAccount = require('../qnary-dev.json');
const Lodash = require("lodash");

const getUserId = async (req, res, next) => {
    let token =   req.header('Authentication')
    if (Lodash.isNil(token)) return next();
    admin.auth().verifyIdToken(token)
   .then(function(user) {
     req.user = { token: token, ...user }
     //    console.log('req' ,req);
     return next()
   }).catch(function(error) {
      req.user = null;
     console.log(error)
     return next()
   });
  }
  
export default { getUserId }
  