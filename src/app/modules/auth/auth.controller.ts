import { Request, Response } from "express";
import { CatchAsyncError } from "../../utils/CatchAsyncError";
import { authServices } from "./auth.service";
import sendRes from "../../utils/sendResponse";

const loginUser = CatchAsyncError(async (req: Request, res: Response) => {
  const result = authServices.loginUserIntoDB(req.body);

  sendRes(res, {
    success: true,
    statusCode: 200,
    message: "User login successful",
    data: result,
  });
});

export const authControllers = { loginUser };
