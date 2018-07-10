const admin = require("firebase-admin");
const Lodash = require("lodash");
const rootRef = admin.database().ref();

export const allownotifications_mutation = {
  async allowNotification(_, { input, oid }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);
    const userNotif = Lodash.pick(input, [
      "id",
      "app",
      "platform",
      "status",
      "token",
      "uid"
    ]);
    userNotif["created_at"] = admin.database.ServerValue.TIMESTAMP;

    let updates = {
      [`notifications/${input.platform}/${input.device.id}`]: input,
      [`/user_notifications/${input.uid}/${input.token}`]: userNotif,
      [`/organization_users/${oid}/${
        input.uid
      }/settings/notifications/push/off`]: false
    };
    try {
      await rootRef.update(updates);
      return true;
    } catch (error) {
      console.log("error :", error);
      throw error;
    }
  }
};
