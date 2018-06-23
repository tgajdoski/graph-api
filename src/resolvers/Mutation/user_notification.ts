const admin = require('firebase-admin');
const { create_mutation, create_mutation_key, update_mutation, delete_mutation } = require("../query-helper");

const usrnotifRef = admin.database().ref('user_notifications');

export const user_notifications_mutation = {
  createUserNotification(_, { input }, ctx) {
    const orgRef = usrnotifRef.child(`${input.uid}/${input.token}`);
    return create_mutation_key({input}, ctx, orgRef);
  },
  updateUserNotification(_, { input }, ctx) {
    const orgRef = usrnotifRef.child(`${input.uid}`);
    return update_mutation({input}, ctx, orgRef);
  },
  deleteUserNotification(_, { input }, ctx) {
   // const orgRef = orgsusrappRef.child(`${input.oid}/${input.uid}/${input.id}`);
    const orgRef = usrnotifRef.child(`${input.uid}`);
    return delete_mutation({input}, ctx, orgRef);
  },
}

