import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { logout, signin, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post("/signUp",signup)
authRouter.post("/signIn",signin)
authRouter.post("/signOut",authMiddleware,logout)

export default authRouter