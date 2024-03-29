import { Router } from "express";
import reviewRouter from "../modules/review/review.router";
import courseRouter from "../modules/course/course.router";
import categoryRoute from "../modules/category/category.route";
import userRoute from "../modules/user/user.route";
import authRoute from "../modules/auth/auth.route";

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
  {
    path: "/auth",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
