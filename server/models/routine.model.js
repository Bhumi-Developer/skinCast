import mongoose from "mongoose";

const routineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    morning: [
      {
        step: Number,
        title: String,
        description: String,
        productType: String,
      },
    ],

    night: [
      {
        step: Number,
        title: String,
        description: String,
        productType: String,
      },
    ],

    skinType: String,
    concerns: [String],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Routine", routineSchema);