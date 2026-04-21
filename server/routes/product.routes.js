import express from "express";
import {
  saveProduct,
  unsaveProduct,
  getSavedProducts,
  getHomeProducts
} from "../controllers/products.controller.js";

import {authMiddleware} from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.post("/save", authMiddleware, saveProduct);

productRouter.delete("/unsave", authMiddleware, unsaveProduct);

productRouter.get("/my-products", authMiddleware, getSavedProducts);
productRouter.get("/best-products", getHomeProducts);



export default productRouter;