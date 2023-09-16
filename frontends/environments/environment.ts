import { firestore } from './local_firestore';

export const environment = {
  production: false,
  localFirebase: { firestore, auth: 'http://localhost:9099', storage: { host: 'localhost', port: 9199 } },
  firebase: {}
};
