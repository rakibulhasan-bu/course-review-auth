import express from "express";
import { categoryController } from "./category.controller";
import validateRequest from "../../middleware/validateRequest";
import { categoryValidation } from "./category.validation";

const categoryRoute = express.Router();

categoryRoute.post(
  "/categories",
  validateRequest(categoryValidation.categoryValidationSchema),
  categoryController.createCategory,
);

categoryRoute.get("/categories", categoryController.getAllCategory);

export default categoryRoute;
