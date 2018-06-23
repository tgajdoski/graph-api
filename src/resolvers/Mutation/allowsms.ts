const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const rootRef = admin.database().ref();

export const allowsms_mutation = {

   async allowSMS(_, {input, oid }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
   const userNotif =  Lodash.pick(input, ['id',  'app', 'platform', 'status', 'token', 'uid']);
   userNotif['created_at'] =  admin.database.ServerValue.TIMESTAMP;
 
   var sms_org_user = {
    "platform": input.platform,
    "phone_details" : input.sms,
    "push": {
      "off": false
    }
  }

    let updates = {
      [`notifications/${input.platform}/${input.sms.formatedNumber}`]: input,
      [`/user_notifications/${input.uid}/${input.sms.formatedNumber}`]: userNotif,
      [`/organization_users/${oid}/${input.uid}/settings/sms`]: sms_org_user,
    };
    try{
      let results = await rootRef.update(updates);
      return true;
    }
    catch(error)
    {
      console.log('error :' , error );
      throw error
    }
  },
  async checkAllowSMS(_, {uid, oid }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
    let updates = {
      [`/organization_users/${oid}/${uid}/settings/sms/push/off`]: false,
    };
    try{
      let results = await rootRef.update(updates);
      return true;
    }
    catch(error)
    {
      console.log('error :' , error );
      throw error
    }
  },
  async checkDissallowSMS(_, {uid, oid }, ctx) {
    if (Lodash.isNil(ctx.request.user)) throw new Error(`Unauthorized request`)
  
    let updates = {
      [`/organization_users/${oid}/${uid}/settings/sms/push/off`]: true,
    };
    try{
      let results = await rootRef.update(updates);
      return true;
    }
    catch(error)
    {
      console.log('error :' , error );
      throw error
    }
  },


}
