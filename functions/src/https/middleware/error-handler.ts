import { Request, Response, NextFunction } from 'express';

export class ApplicationError extends Error {
  public json: string;
  constructor(
    // FIXME: Poner un tipo estándar para errorObject
    errorObject: object,
    publicMessage: string = 'Ha ocurrido un error',
    public httpStatusCode: number = 500,
    public eventType: string = 'unexpectedError'
  ) {
    super(publicMessage);
    // tslint:disable-next-line:no-any
    const stack = (errorObject as any)?.error?.stack || (errorObject as any)?.stack;
    this.json = JSON.stringify({ ...errorObject, stack, publicMessage });
    console.log(this.json);
  }

}

type PosibleErrors = string | Error | ApplicationError;

const getError = (err: PosibleErrors) => {
  if (typeof err === 'string') {
    return new ApplicationError({ error: err, message: `unexpected error (string) -- ${err}` });
  } else if (err instanceof ApplicationError) {
    return err;
  } else {
    return new ApplicationError({ error: err, message: `unexpected error -- ${err.name}: ${err.message}` });
  }
};

export const errorHandler = async (
  err: PosibleErrors | PosibleErrors[],
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ApplicationError;
  if (Array.isArray(err)) {
    if (err.length > 1) {
      const errors = err
        .map(getError)
        .map((e) => e.message)
        .join('//');
      error = new ApplicationError({ error: errors });
    } else if (err.length === 1) {
      error = getError(err[0]);
    } else {
      error = new ApplicationError({ error: 'empty error array' });
    }
  } else {
    error = getError(err);
  }

  try {
    res.status(error.httpStatusCode).json({ message: error.message });
  } catch (e) {
    try {
      res.end();
    } catch (fe) {
      console.log('request ended before error');
      console.error(e, fe);
    }
  }
};
