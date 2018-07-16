const admin = require("firebase-admin");
const Lodash = require("lodash");

const rootRef = admin.database().ref();

export const boarding_connections_mutation = {
  async disconnectConnection(_, { input }, ctx) {
    let updates = {};
    updates[
      `/organization_user_connections/${input.oid}/${input.uid}/${input.id}`
    ] = null;

    let taskRef = admin
      .database()
      .ref(`/queues/social_disconnect/tasks`)
      .push();
    let msg = {
      oid: input.user.oid,
      uid: input.user.uid,
      connection: Lodash.omit(input, ["user", "profile"])
    };
    msg["created_at"] = admin.database.ServerValue.TIMESTAMP;
    msg["_id"] = taskRef.key;
    msg["_task_id"] = taskRef.key;
    msg["_app_id"] = "ios: version";
    updates[`/queues/social_disconnect/tasks/${taskRef.key}`] = msg;

    try {
      let results = await rootRef.update(updates);
      return true;
    } catch (error) {
      console.log("error :", error);
      throw error;
    }
  },
  async completeOnBoarding(_, { oid, uid }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);
    var onboardtime = admin.database.ServerValue.TIMESTAMP;

    let updates = {
      [`/organization_users/${oid}/${uid}/settings/mobile`]: {
        onboarded: onboardtime
      }
    };
    try {
      await rootRef.update(updates);
      return true;
    } catch (error) {
      console.log("error :", error);
      throw error;
    }
  },
  async createOrUpdateConnection(_, { input }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);

    let connectionsRef = admin.database().ref("/connections");
    let created_at = admin.database.ServerValue.TIMESTAMP;
    let connectionRef = connectionsRef.push();
    let updates = {};
    if (input.origin === "fullcontact") {
      input.updated_at = admin.database.ServerValue.TIMESTAMP;
      input.updated_by = input.uid;
      // removing the user profile from connection input
      // updates[`/connections/${input.id}`] = Lodash.omit(input, ['user', 'profile']);
      updates[`/connections/${input.id}`] = input;

      updates[
        `/organization_user_connections/${input.oid}/${input.uid}/${
          input.id
        }/name`
      ] =
        input.name;
      updates[
        `/organization_user_connections/${input.oid}/${input.uid}/${
          input.id
        }/updated_by`
      ] =
        input.uid;
      updates[
        `/organization_user_connections/${input.oid}/${input.uid}/${
          input.id
        }/updated_at`
      ] =
        input.updated_at;
    } else {
      connectionRef = connectionsRef.push();
      input = Lodash.assign(input, {
        "-created_at": 0 - Date.now(),
        created_at: created_at,
        created_by: input.uid,
        auth: {
          firebase_id: input.auth.firebase_id,
          provider: input.auth.provider
        }
      });
      // updates[`/connections/${connectionRef.key}`] = Lodash.omit(input, ['user', 'profile']);
      updates[`/connections/${connectionRef.key}`] = input; // Lodash.omit(input, ['user', 'profile']);
      updates[
        `/organization_user_connections/${input.oid}/${input.uid}/${
          connectionRef.key
        }`
      ] = Lodash.pick(input, [
        "-created_at",
        "created_at",
        "created_by",
        "oid",
        "uid",
        "name",
        "source"
      ]);
    }

    // eventService bypass
    let taskRef = admin
      .database()
      .ref(`/queues/social_connect/tasks`)
      .push();
    let msg = {
      oid: input.user.oid,
      uid: input.user.uid,
      user: input.user,
      profile: input.profile,
      connection: Lodash.omit(input, ["user", "profile"])
    };
    msg["created_at"] = admin.database.ServerValue.TIMESTAMP;
    msg["_id"] = taskRef.key;
    msg["_task_id"] = taskRef.key;
    msg["_app_id"] = "ios: version";
    updates[`/queues/social_connect/tasks/${taskRef.key}`] = msg;

    // onBoarded ????

    try {
      console.log("updates ", updates);
      await rootRef.update(updates);
      return true;
    } catch (error) {
      console.log("error :", error);
      throw error;
    }
  },
  async clearDeviceCache(_, { oid, uid }, ctx) {
    var updates = {};
    updates[
      `/organization_users/${oid}/${uid}/settings/mobile/onboarded`
    ] = null;
    updates[
      `/organization_users/${oid}/${uid}/settings/mobile/password_last_changed`
    ] = null;
    try {
      await rootRef.update(updates);
      return true;
    } catch (error) {
      console.log("error :", error);
      throw error;
    }
  }
};
