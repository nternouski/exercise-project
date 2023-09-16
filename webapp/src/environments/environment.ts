import { firestore } from './local_firestore';

export const environment = {
  production: false,
  localFirebase: { firestore, auth: 'http://localhost:9099', storage: { host: 'localhost', port: 9199 } },
  firebase: {
    apiKey: "AIzaSyC4CjueUJU4v8nIM17V1sksp_BeqHtL-Nk",
    authDomain: "test-app-27472.firebaseapp.com",
    projectId: "test-app-27472",
    storageBucket: "test-app-27472.appspot.com",
    messagingSenderId: "733352248840",
    appId: "1:733352248840:web:6cc84c8d1c9d5ae79af3bd"
  },
};
