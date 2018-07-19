
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
  async messageAdmin(_, {oid, msg}, ctx) {
    return await this.notifyAdminApproval(_, {oid, msg}, ctx);
  },
  async messageAdminInsight(_, {oid, uid, user, subject, msg, insight, comment}, ctx) {
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

    var insightToSend = Lodash.copy(insight);
    if ( !insight && comment )
      insightToSend = { comment: comment };

      let profile_fields = ['created_at', 'firstName', 'lastName', 'name', 'email', 'slug', 'welcome'];

    var emailTemplateId =
      (insight||{}).category && (insight||{}).type && (insight||{}).version ?
      [insight.category, insight.type, insight.version].join('_') : 'email_01';

    var messsage = {
      oid: oid,
      uid: uid, //logged in user
      type: 'email',
      email: {
        template: emailTemplateId,
        from: 'Qnary Insights <insights@qnary.com>', 
        to:  adminEmails.join(','),
        subject: subject + user.name,
        replyTo: null, // loggedInUserProfile.email,

        // NOTE: for now assume all messages are admin messages
        list: "admin_message",
        tags: ["internal","private"],
      },
      locals: {
        insight: insightToSend,
        comment: msg || '',
        from: Lodash.pick(user["profile"], profile_fields),
        profile: Lodash.pick(user["profile"], profile_fields)
      }
    };
    console.log('sending msg', messsage);
    let taskRef = admin.database().ref(`/queues/share/tasks`).push();
    messsage["created_at"] = admin.database.ServerValue.TIMESTAMP;
    messsage["_id"] = taskRef.key;
    messsage["_task_id"] = taskRef.key;
    messsage["_app_id"] = "ios: version";
    update[`/queues/share/tasks/${taskRef.key}`] = messsage;
    return update;
  },

}

export default utils;