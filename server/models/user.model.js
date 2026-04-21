// models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    skinType: {
      type: String,
      enum: ["oily", "dry", "combination", "sensitive"],
      default: null,
    },

    concerns: {
      type: [String],
      default: [],
    },

    budget: {
      type: Number,
      default: null,
    },

    location: {
      type: String,
      default: null,
    },

    productGoal:  {
      type: String,
      default: null,
    },
    category:  {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);