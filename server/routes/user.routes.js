import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getMe, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/profile", authMiddleware, getUserProfile)
userRouter.put("/update-profile", authMiddleware, updateUserProfile)
userRouter.get("/me", authMiddleware, getMe)


export default userRouter