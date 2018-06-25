const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');
// const EventService = require('../event-helper');
import   EventService  from '../event-helper';
const rootRef = admin.database().ref();

export const sendevents_mutation = {

   async sendSocialConnectCommandEvent(_, {input: { oid, uid, user, profile, connection }}, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
   
    var msg = { oid: oid, uid: uid, user: user, profile: profile, connection: connection };

    console.log("connect:sendSocialConnectCommandEvent", JSON.stringify(msg));
    let eventService = new EventService();

    return eventService["sendSocialConnectCommandEvent"](msg).then(function() {
      console.log('sendSocialConnectCommandEvent', arguments);
      return true;
    } , (error) => {
      console.log('EROOR ', error);
      throw error;
    });

  },
  
 

}
