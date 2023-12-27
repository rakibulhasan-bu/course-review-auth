import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../utils/CatchAsyncError";
import AppError from "../error/AppError";

const auth = () => {
  return CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(401, "You are not Authorized!");
      }
      next();
    },
  );
};

export default auth;
