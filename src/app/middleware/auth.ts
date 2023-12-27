import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../utils/CatchAsyncError";
import AppError from "../error/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...roles: TUserRole[]) => {
  return CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      //if the token is send from the client
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(401, "You are not Authorized!");
      }

      //check if the token is valid
      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(401, "You are not Authorized!");
          }

          //checking required role are write or wrong
          const role = (decoded as JwtPayload).role;
          if (roles && !roles.includes(role)) {
            throw new AppError(401, "You are not Authorized!");
          }

          req.user = decoded as JwtPayload;
          next();
        },
      );
    },
  );
};

export default auth;
