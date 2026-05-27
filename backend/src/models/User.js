import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    phone: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    addresses: [addressSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);