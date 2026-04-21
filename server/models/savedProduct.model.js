import mongoose from "mongoose";

const savedProductSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
    historyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecommendationHistory",
    },

    
    productId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: Number,

    image: String,

    brand: String,

    rating: Number,

    productType: String, 

    source: {
      type: String,
      default: "amazon", 
    },

    url: String, 

  },
  { timestamps: true } 
);

export default mongoose.model("SavedProduct", savedProductSchema);