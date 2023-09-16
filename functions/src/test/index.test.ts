import { resolve } from 'node:path';
import { config } from 'dotenv';
config({ path: resolve(`./test.env`) });

import * as admin from 'firebase-admin';
admin.initializeApp();
export { testFunction } from './setup';

export * from './https';
