import config from "../../config";
import AppError from "../../error/AppError";
import User from "../user/user.model";
import { TChangePassword, TLogIn } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token: accessToken,
  };
};

const changePasswordIntoDB = async (
  payload: TChangePassword,
  userData: JwtPayload,
) => {
  const user = await User.findById(userData?._id).select(
    "+password +changePassword",
  );
  if (!user) {
    throw new AppError(400, `Your provided Token is not valid user!`);
  }

  if (payload.currentPassword === payload.newPassword) {
    throw new AppError(400, `Your current password and new password are same!`);
  }

  //checking if the current password is matched
  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(
      400,
      `${payload.currentPassword} is not your current password!`,
    );
  }

  const isMatchWithOldPassword = await bcrypt.compare(
    payload.newPassword,
    user.changePassword.oldPassword,
  );
  const isMatchWithMoreOldPassword = await bcrypt.compare(
    payload.newPassword,
    user.changePassword.moreOldPassword,
  );

  if (isMatchWithOldPassword || isMatchWithMoreOldPassword) {
    throw new AppError(
      400,
      `Your provided new Password is match with last two password!`,
    );
  }

  const hashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );
  const hashOldPassword = await bcrypt.hash(
    payload?.currentPassword,
    Number(config.bcrypt_salt),
  );

  const result = await User.findByIdAndUpdate(
    userData?._id,
    {
      password: hashPassword,
      changePassword: {
        oldPassword: hashOldPassword,
        moreOldPassword: user?.changePassword?.oldPassword,
      },
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(400, `Password update unsuccessful!`);
  }
  return result;
};

export const authServices = { loginUserIntoDB, changePasswordIntoDB };
