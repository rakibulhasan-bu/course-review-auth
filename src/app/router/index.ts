import { Router } from "express";
import reviewRouter from "../modules/review/review.router";
import courseRouter from "../modules/course/course.router";
import categoryRoute from "../modules/category/category.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: reviewRouter,
  },
  {
    path: "/",
    route: courseRouter,
  },
  {
    path: "/",
    route: categoryRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
