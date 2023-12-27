import { TCategory } from "./category.interface";
import Category from "./category.model";

const createCategoryIntoDB = async (category: TCategory) => {
  return await Category.create(category);
};

const getAllCategoryFromDB = async () => {
  return await Category.find().populate("createdBy");
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
