const admin = require('firebase-admin');
const functions = require('firebase-functions');
const  { query } = require('../query-helper');
const Lodash = require('lodash');


const connectionsRef = admin.database().ref('connections');

export const connections = {
    connections(_, { }, ctx) {
      return  query({}, ctx , connectionsRef);
        },
    connection(_, { id }, ctx ) {
      return  query({ id }, ctx , connectionsRef);
        },
  }
  
