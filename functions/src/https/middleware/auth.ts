import { NextFunction, Request, Response } from 'express';
import { auth } from 'firebase-admin';

import { ApplicationError } from './error-handler';

export class Locals  {
  userId!: string;
}

export const tokenAuth = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const user = (await auth().verifyIdToken(req.headers.authorization || ''));
    console.log(`${user.provider_id} | ${user.uid}`);
    const locals = { ...req.locals, userId: user.uid };
    req.locals = locals;
    next();
  } catch (err) {
    next(new ApplicationError({ error: 'Invalid Token', err }, 'Invalid Token', 401));
  }
};