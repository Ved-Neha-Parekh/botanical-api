const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plant name is required."],
      trim: true,
    },
    category: {
      type: String,
      enum: ["INDOOR", "OUTDOOR", "SUCCULENT", "AQUATIC"],
      required: [true, "Plant category is required."],
    },
    price: {
      type: Number,
      required: [true, "Plant price is required."],
      min: [50, "Price cannot be less than 50."],
    },
    waterFrequencyInDays: {
      type: Number,
      required: [true, "Watering frequency is required."],
      min: [1, "Watering frequency cannot be less than 1 day."],
      max: [30, "Watering frequency cannot be more than 30 days."],
    },
    lastWaterDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "SOLD", "DEAD", "MAINTENANCE"],
      default: "AVAILABLE",
    },
    isSeasonal: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Plants", plantSchema);
