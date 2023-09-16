import { resolve } from 'node:path';
import * as admin from 'firebase-admin';

if (process.env.NODE_ENV === 'development') {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = resolve('./test-app-27472-firebase-adminsdk-kotog-a74f5f1d81.json');
}
admin.initializeApp();

export * from './https';
