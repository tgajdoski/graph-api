const admin = require('firebase-admin');
const functions = require('firebase-functions');
const Lodash = require('lodash');


class Deffered {
  promise= null;
   resolve= null;
    reject = null;
  constructor(){
    this.promise = new Promise((resolve, reject)=> {
      this.resolve = resolve;
      this.reject = reject;
    })
  }
}

export default class EventService {

    constructor() {
      var map = {
        'new_user': {
          method: 'NewUserCommandEvent', // NewUserEvent
          ref: this.firebaseQueue
        },
        'social_connect': {
          method: 'SocialConnectCommandEvent',
          ref: this.firebaseQueue
        },
        'data': {
          method: 'ProcessDataCommandEvent',
          ref: this.firebaseQueue
        },
        'optimize': {
          method: 'ProcessOptimizationsEvent', // OptimizeCommandEvent
          ref: this.firebaseQueue
        },
        'rules': {
          method: 'RuleCommandEvent',
          ref: this.firebaseQueue
        },
        'search': {
          method: 'SearchCommandEvent',
          ref: this.firebaseQueue
        },
        'share': {
          method: 'ShareCommandEvent',
          ref: this.firebaseQueue
        },
        'social_disconnect': {
          method: 'SocialDisconnectCommandEvent',
          ref: this.firebaseQueue
        },
        'search_group_disconnect': {
          method: 'SeachGroupDisconnectCommandEvent',
          ref: this.firebaseQueue
        },
        'subscription': {
          method: 'SubscriptionCommandEvent',
          ref: this.firebaseQueue
        }
      };

      let self = this;
      Lodash.each(map, function(event, key) {
        var ref, method;
        if (Lodash.isObject(event)) {
          method = event.method;
          ref = event.ref(key);
        } else if (Lodash.isString(event)) {
          method = event;
          ref = admin.database().ref('queues', key);
        } else {
          throw new Error(`invalid event configuration  ${key}  ${event}`);
        }
  
        console.log('$$', key, method, ref.toString());
        self['send' + method] = Lodash.partial(self.sendEvent, ref, key);
      });
  
    }

    firebaseQueue = (event) => {
     
      return admin.database().ref(`/queues/${event}/tasks`);
    } 

  
    sendEvent(ref, event, msg) {
     // console.log("AAAA ", ref.toString(), event, msg);
      if (!msg.created_at) {
        msg.created_at = admin.database.ServerValue.TIMESTAMP; // time since the Unix epoch, in milliseconds
      }

      var def = new Deffered();

      var taskRef = ref.push();
      msg._id = taskRef.key;
      msg._task_id = taskRef.key;
      msg._app_id = 'ios: version';

      taskRef.set(msg, function(err) {
        if( err ) {
          def.reject(err);
        }
        else {
          def.resolve(taskRef);
        }
      });

      return def.promise;
    }

  };
