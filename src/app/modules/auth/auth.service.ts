import config from "../../config";
import AppError from "../../error/AppError";
import User from "../user/user.model";
import { TLogIn } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async (payload: TLogIn) => {
  //checking if the user is exists
  const user = await User.findOne({ username: payload.username }).select(
    "+password",
  );
  if (!user) {
    throw new AppError(404, `${payload.username} user not found!`);
  }
  //checking if the password is matched
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(404, `${payload.password} is not correct!`);
  }
  const jwtPayload = {
    _id: user?._id,
    role: user?.role,
    email: user?.email,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });
  return {
    user,
    token: accessToken,
  };
};

export const authServices = { loginUserIntoDB };
