import express from 'express';
import * as functions from 'firebase-functions';

const app = express();
app.disable('x-powered-by');

// autentication check and log
import { tokenAuth } from './middleware/auth';
import { logHandler } from './middleware/logging';
app.use(tokenAuth, logHandler);

app.get('/api/user', (req, res) => {
  return res.status(200).json({ userId: req.locals.userId });
});

import { listener as tasks } from './routes/tasks';
app.use('/api/tasks', tasks);


// error handling
import { errorHandler } from './middleware/error-handler';
app.use(errorHandler);

export const api = functions.runWith({ memory: '512MB', timeoutSeconds: 60 }).https.onRequest(app);
