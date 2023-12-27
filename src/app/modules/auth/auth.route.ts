import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";

const authRoute = express.Router();

authRoute.post(
  "/login",
  validateRequest(authValidations.logInValidation),
  authControllers.loginUser,
);

export default authRoute;
