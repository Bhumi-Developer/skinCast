import User from "../models/user.model.js";
import RecommendationHistory from "../models/history.model.js";
import jwt from "jsonwebtoken";


export const getUserProfile = async (req, res) => {
    try {
  
      const userId = req.userId;
  
      // 🔐 Auth check
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
  
      // 📦 Fetch user (exclude password)
      const user = await User.findById(userId).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
  
      // 🎯 Response
      return res.json({
        message: "Profile fetched successfully",
        data: user,
      });
  
    } catch (error) {
  
      return res.status(500).json({
        message: error.message,
      });
    }
  };


export const getMe = async (req, res) => {
  try {

    if (!req.userId) {
      return res.status(401).json({ message: "No userId found" });
    }

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });

  } catch (err) {
    console.log("❌ ERROR:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
    try {
  
      const userId = req.userId;
  
      // 🔐 Auth check
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // ✅ Allowed fields (based on your schema)
      const allowedFields = [
        "name",
        "skinType",
        "concerns",
        "budget",
        "location",
        "productGoal",
        "category",
        "gender"
      ];
  
      // 🧹 Filter only allowed updates
      const updates = {};
  
      Object.keys(req.body).forEach((key) => {
        if (allowedFields.includes(key)) {
          updates[key] = req.body[key];
        }
      });
  
  
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          message: "No valid fields provided",
        });
      }
  
      if (updates.location && typeof updates.location === "object") {
        updates.location = updates.location.city || "";
      }
  
      // 🔄 Update user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
  
      return res.json({
        message: "Profile updated successfully",
        data: updatedUser,
      });
  
    } catch (error) {
  
      return res.status(500).json({
        message: error.message,
      });
    }
  };