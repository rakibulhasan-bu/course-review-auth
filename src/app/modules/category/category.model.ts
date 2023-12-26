import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const CategorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = model("Category", CategorySchema);

export default Category;
