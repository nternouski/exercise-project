import testFF from 'firebase-functions-test';

import { projectId } from "@services";

const user = { uid: '123', token: { admin: true } };

export const testFunction = testFF({
  projectId,
  databaseAuthVariableOverride: user,
});
