import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth/is-authenticated.js";
import { getUser } from "../controllers/user/get-user.js";

export const userRouter = Router();

userRouter.route("/").get(isAuthenticated, getUser);
