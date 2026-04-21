import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    input: {
      location:  String,
      skinType: String,
      concerns: [String],
      budget: Number,
      category: String,
      gender: String
    },

    environment: {
      weather: Object,
      forecast: Object,
      aqi: Number,
    },

    result: {
      productType: String,

  ingredients: [
  {
    name: String,
    why: String,
  },
],

avoid: [
  {
    name: String,
    whyAvoid: String,
  },
],

homeRemedies: [
  {
    name: String,
    steps: [String],
    benefits: String,
    whyItWorks: String,
  },
],
    },

    searchQuery: String,
  },
  { timestamps: true }
);

export default mongoose.model("RecommendationHistory", historySchema);