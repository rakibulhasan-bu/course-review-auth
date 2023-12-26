import express from "express";
import { reviewController } from "./review.controller";
import validateRequest from "../../middleware/validateRequest";
import { reviewValidation } from "./review.validation";
const reviewRouter = express.Router();

reviewRouter.post(
  "/reviews",
  validateRequest(reviewValidation.reviewValidationSchema),
  reviewController.createReview,
);

export default reviewRouter;
