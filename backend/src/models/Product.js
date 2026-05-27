import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    description: {
      type: String,
      default: ""
    },
    
    price: {
      type: Number,
      required: true,
      min: 0
    },

    stock: {
      type: Number,
      required: true,
      min: 0
    },

    image: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["available", "hidden"],
      default: "available"
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    sold: {
      type: Number,
      default: 0
    },

    rating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);