import { create } from "domain";
const admin = require("firebase-admin");
const Lodash = require("lodash");
import  utils  from '../utils';
import { organizationAdmins } from '../Query/organizationAdmins';
const rootRef = admin.database().ref();

export const message_mutations = {

  

  async messageAdmin(_, {oid, msg, user, subject, from}, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);
    // prepare Admins message
    var message = await utils.getAdminMessage(oid, msg, user, subject, from)

    let update = {};

    // get organization Admins emails
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
    message["to"] = adminEmails.join(',');
    message["created_at"] = admin.database.ServerValue.TIMESTAMP;
    message["_id"] = taskRef.key;
    message["_task_id"] = taskRef.key;
    message["_app_id"] = "ios: version";

    update[`/queues/share/tasks/${taskRef.key}`] = message;  

    try {
        console.log('UPDATES', update);
        let results = await rootRef.update(update)
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
      return results;
    } catch (error) {
        console.log("error :", error);
        throw error;
    }
  },

//   async messageAdminInsight(_, {oid, insight, user}, ctx) {

//  // prepare Admins Insight message
//     var message = await utils.getAdminInsightMessage(oid, insight, user)

//     let update = {};

//     let admins = await organizationAdmins.organizationAdmins(_, {oid}, ctx);
//     let adminEmails = [];
//     admins.forEach(admin => {
//        adminEmails.push(admin.email);
//     });

//     if (!adminEmails || !adminEmails.length) {
//         console.log('Nobody to sent it too, boo hoo.');
//         return '';
//     }

    
//     let taskRef = admin.database().ref(`/queues/share/tasks`).push();
//     message["created_at"] = admin.database.ServerValue.TIMESTAMP;
//     message["_id"] = taskRef.key;
//     message["_task_id"] = taskRef.key;
//     message["_app_id"] = "ios: version";

//     update[`/queues/share/tasks/${taskRef.key}`] = message;
   
//     try {
//         console.log('UPDATES', update);
//         let results = await rootRef.update(update);
//         return true;
//     } catch (error) {
//         console.log("error :", error);
//         throw error;
//     }
//   }

};
