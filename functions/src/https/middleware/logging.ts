import { Request, Response, NextFunction } from "express";

export const logHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = req.get("x-original-url") || req.originalUrl;
  console.log(`${req.method} | ${url}`);
  next();
};
