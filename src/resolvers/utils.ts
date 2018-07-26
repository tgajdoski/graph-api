
const admin = require('firebase-admin');
const Lodash = require("lodash");
import { organizationAdmins } from './Query/organizationAdmins';

const utils =  {
  
  async notifyAdminApproval(_, {oid, msg}, ctx) {
    let update = {};
    let admins = await organizationAdmins.organizationAdmins(_, {oid}, ctx);
      let adminEmails = [];
      admins.forEach(admin => {
        adminEmails.push(admin.email);
      });
      if (!adminEmails || !adminEmails.length) {
          console.log('Nobody to sent it too, boo hoo.');
          return '';
      }

    let taskRef = admin.database().ref(`/queues/share/tasks`).push();
    msg["to"] = adminEmails.join(',');
    msg["created_at"] = admin.database.ServerValue.TIMESTAMP;
    msg["_id"] = taskRef.key;
    msg["_task_id"] = taskRef.key;
    msg["_app_id"] = "ios: version";
    update[`/queues/share/tasks/${taskRef.key}`] = msg;
   
    return update;
  },

  async getnotifyAdminApprovalMessage(_, {oid, msg, user, subject, from}, ctx) {
   let message = {};

   return message;
  },
  async getAdminMessage(oid, msg, user, subject, from) {

    let profile_fields = ['created_at', 'firstName', 'lastName', 'name', 'email', 'slug', 'welcome'];
   
    let message  = {
      oid: oid,
      uid: user.uid, //logged in user
      type: 'email',
      email: {
        template: 'email_01',
        from: from,
        subject: subject,
        replyTo: null, // loggedInUserProfile.email,

        // NOTE: for now assume all messages are admin messages
        list: "admin_message",
        tags: ["internal","private"],
      },
      locals: {
        comment: msg || '',
        from: Lodash.pick(user.profile, profile_fields),
        profile: Lodash.pick(user.profile, profile_fields),
      }
    };
<<<<<<< HEAD


    return message;
  },
  async getAdminInsightMessage(_, {oid, insight, user, subject}, ctx) {
    let message = {};

    return message;
=======
    // console.log('sending msg', messsage);
    let taskRef = admin.database().ref(`/queues/share/tasks`).push();
    messsage["created_at"] = admin.database.ServerValue.TIMESTAMP;
    messsage["_id"] = taskRef.key;
    messsage["_task_id"] = taskRef.key;
    messsage["_app_id"] = "ios: version";
    update[`/queues/share/tasks/${taskRef.key}`] = messsage;
    return update;
>>>>>>> 209883bf7232a2b9e1db32f035cb0c577b8a816a
  },

}

export default utils;