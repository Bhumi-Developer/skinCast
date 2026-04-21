import SavedProduct from "../models/savedProduct.model.js";
import { fetchAmazonProducts } from "../services/product.service.js";


export const saveProduct = async (req, res) => {
    try {
      const userId = req.userId;
  
      const {
        productId,
        name,
        price,
        image,
        rating,
        description,
        url,
      } = req.body;
  
      if (!productId) {
        return res.status(400).json({ message: "Product data incomplete" });
      }
  
      // 🔍 STEP 1: Check already saved
      const existing = await SavedProduct.findOne({
        userId,
        productId,
      });
  
      if (existing) {
        return res.status(200).json({
          message: "Product already saved",
          isSaved: true,
          data: existing,
        });
      }
  
      // 💾 STEP 2: Save directly
      const saved = await SavedProduct.create({
        userId,
        productId,
        name,
        price,
        image,
        rating,
        description,
        url,
      });
  
      return res.json({
        message: "Product saved successfully",
        isSaved: true,
        data: saved,
      });
  
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

export const unsaveProduct = async (req, res) => {
    try {
      const userId = req.userId;
      const { productId } = req.body;
  
      if (!productId) {
        return res.status(400).json({ message: "productId required" });
      }
  
      const deleted = await SavedProduct.findOneAndDelete({
        userId,
        productId,
      });
  
      if (!deleted) {
        return res.status(404).json({ message: "Product not found in saved list" });
      }
  
      res.json({
        message: "Product removed from saved list",
        productId,
      });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

export const getSavedProducts = async (req, res) => {
    try {
      const userId = req.userId;
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      console.log("📦 Fetching saved products for user:", userId);
  
      const savedProducts = await SavedProduct.find({ userId })
        .sort({ createdAt: -1 }); // newest first
  
      return res.json({
        message: "Saved products fetched successfully",
        count: savedProducts.length,
        data: savedProducts,
      });
  
    } catch (err) {
      console.log("❌ Error in getSavedProducts:", err.message);
      return res.status(500).json({ message: err.message });
    }
  };

export const getHomeProducts = async (req, res) => {
    try {
      console.log("🏠 Fetching home page skincare products...");
  
      const query =
        "skincare moisturizer serum cleanser gentle dermatologist recommended all skin types";
  
      let products = await fetchAmazonProducts(query);
  
      if (!products || products.length === 0) {
        return res.status(404).json({
          message: "No products found",
          products: [],
        });
      }
  
      const filtered = products.filter((p) => {
        const text = `${p.name || ""} ${p.description || ""}`.toLowerCase();
        const rating = Number(p.rating || 0);
  
        const isUniversal =
          text.includes("all skin types") ||
          text.includes("gentle") ||
          text.includes("dermatologist") ||
          text.includes("hypoallergenic") ||
          (!text.includes("men") && !text.includes("women"));
  
        return isUniversal && rating > 4;
      });
  
      const finalProducts =
        filtered.length > 0
          ? filtered
          : products.filter((p) => Number(p.rating || 0) > 4);
  
      const limited = finalProducts.slice(0, 12);
  
      return res.json({
        message: "Home products fetched successfully",
        count: limited.length,
        products: limited,
      });
    } catch (error) {
      console.log("Home products error:", error.message);
      return res.status(500).json({ message: error.message });
    }
  };