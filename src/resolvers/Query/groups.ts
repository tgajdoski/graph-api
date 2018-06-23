const admin = require('firebase-admin');
const  { query } = require('../query-helper');
const functions = require('firebase-functions');
const Lodash = require('lodash');

const groupsRef = admin.database().ref('groups');

export const groups = {
  groups(_, { }, ctx) {
    return  query({}, ctx , groupsRef);
    },
  group(_, { id }, ctx) {
      return  query({ id }, ctx , groupsRef);
    },
}
