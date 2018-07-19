const admin = require('firebase-admin');
const Lodash = require("lodash");

import { create_mutation, update_mutation, delete_mutation } from '../query-helper';
import { organizationAdmins } from '../Query/organizationAdmins';
import  utils  from '../utils';

const approvalsRef = admin.database().ref('approvals');
const rootRef = admin.database().ref();

export const  approvals_mutation = {
//    createApproval(_, {input }, ctx) {
//     return create_mutation({input}, ctx, approvalsRef)
//   },
   updateApproval(_, {input }, ctx) {
    return update_mutation({input}, ctx, approvalsRef)
  },
   deleteApproval(_, { input }, ctx) {
    return delete_mutation({input}, ctx, approvalsRef)
  },

  async updateApprovals(_, {input, oid, uid, user, status , subject}, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);

    let updates = {};
    input.forEach(approval => {
        updates[`approvals/${approval.id}`] = Lodash.omit(approval, ["id"]);
        updates[`organization_user_approvals/${oid}/${uid}/${approval.id}`] = Lodash.pick(approval, ['uid', 'oid', '-created_at', 'created_at', 'created_by', 'source', 'status']);
    });
  
    // Send a message to the admin that created the approval to notify them of a status change.
    let count = input.length;

    let approvalUrl = 'https://manage.qnary.com/admin/organizations/' + oid + '/approvals/' + uid;
    let share_msq = user.profile.name + ' has ' + ( status === 'done' ? 'published' : status ) + ' ' + count + ' post' + ( count > 1 ? 's' : '' ) + '.\n\n' + approvalUrl;
    let profile_fields = ['created_at', 'firstName', 'lastName', 'name', 'email', 'slug', 'welcome'];

    let emailTemplateId = 'email_01';

    let msg = {
        oid: oid,
        uid: uid, //logged in user
        type: 'email',
        email: {
        template: emailTemplateId,
        from: '<qnary_admins@qnary.com>',
        subject: subject + ' '+ user["profile"].name,
        replyTo: null, 
        list: "admin_message",
        tags: ["internal","private"],
        },
        locals: {
        insight: null,
        comment: share_msq || '',
        from: Lodash.pick(user["profile"], profile_fields),
        profile: Lodash.pick(user["profile"], profile_fields)
        }
    };

    let update = await utils.notifyAdminApproval(_, {oid, msg}, ctx);
    Lodash.assign(updates, update);
 
    try {
        console.log('UPDATES', updates);
        let results = await rootRef.update(updates);
        return true;
    } catch (error) {
        console.log("error :", error);
        throw error;
    }
  },
}
