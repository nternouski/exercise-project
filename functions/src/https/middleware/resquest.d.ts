declare namespace Express {
  export interface Request {
    locals: import('./auth').Locals;
  }
}
