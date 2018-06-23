const admin = require('firebase-admin');
const  { query } = require('../query-helper');
const Lodash = require("lodash");
const usrnotifRef = admin.database().ref('user_notifications');

export const user_notifications = {
  
  async user_notifications(_, { uid }, ctx) {
    const orgsRef = usrnotifRef.child(`${uid}`);
    let userNotifsSnap = await orgsRef.once("value");  
    let returnUsrNotif = [];
    userNotifsSnap.forEach(app => {
      let id = app.key;
      let usernotif = app.val();
      // org_user_app status can differ from /approvals status ???
      if (!Lodash.isNil(usernotif))
          returnUsrNotif.push(Object.assign({ id: id }, usernotif));
    });
    
    return returnUsrNotif;  
   },
   user_notification(_, { uid, id }, ctx) {
    const orgsRef  = usrnotifRef.child(`${uid}`);
    return  query({ id }, ctx , orgsRef);
   },
}
