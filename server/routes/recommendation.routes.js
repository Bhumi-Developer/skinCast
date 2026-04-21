import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { getSkincareRecommendation, generateRoutine, getUserRoutines, getUserAnalysisHistory} from "../controllers/recommendation.controller.js"

const recommedRouter = express.Router()

recommedRouter.post("/analyze",authMiddleware,getSkincareRecommendation)
recommedRouter.post("/generate", authMiddleware, generateRoutine)
recommedRouter.get("/routines", authMiddleware, getUserRoutines)
recommedRouter.get("/analyze-history", authMiddleware, getUserAnalysisHistory)

export default recommedRouter