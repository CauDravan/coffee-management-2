import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getAllProducts = async () => {
  return await Product.find({
    status: "available"
  }).populate("category");
};

export const getProductById = async (id) => {
  return await Product.findById(id)
    .populate("category");
};

export const searchProducts = async (keyword) => {
  return await Product.find({
    name: {
      $regex: keyword,
      $options: "i"
    }
  });
};

export const getProductsByCategory = async (categoryId) => {
  return await Product.find({
    category: categoryId,
    status: "available"
  });
};