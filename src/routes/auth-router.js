import { Router } from "express";
import { signUp } from "../controllers/auth/\sign-up.js";

export const authRouter = Router();

authRouter.post("/sign-up", signUp);
