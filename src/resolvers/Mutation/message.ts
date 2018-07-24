import { create } from "domain";

const admin = require("firebase-admin");
const Lodash = require("lodash");
import  utils  from '../utils';
const rootRef = admin.database().ref();

export const message_mutations = {
  async messageAdmin(_, {oid, msg}, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`);
    let updates = {};
    let update = await utils.notifyAdminApproval(_, {oid, msg}, ctx);
    Lodash.assign(updates, update);
    try {
     //   console.log('UPDATES', updates);
        let results = await rootRef.update(updates);
        return true;
    } catch (error) {
        console.log("error :", error);
        throw error;
    }
  }
};
