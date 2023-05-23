import { Router } from "express";
import { signUp } from "../controllers/auth/sign-up.js";
import { signIn } from "../controllers/auth/sign-in.js";

export const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
