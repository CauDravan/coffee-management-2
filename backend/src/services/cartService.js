import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (userId) => {
  return await Cart.findOne({
    user: userId
  }).populate("items.product");
};

export const addToCart = async (
  userId,
  productId,
  quantity
) => {

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({
    user: userId
  });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: []
    });
  }

  const existingItem = cart.items.find(
    item => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
      price: product.price
    });
  }

  await cart.save();

  return cart;
};

export const updateCartItem = async (
  userId,
  productId,
  quantity
) => {

  const cart = await Cart.findOne({
    user: userId
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    item => item.product.toString() === productId
  );

  if (!item) {
    throw new Error("Item not found");
  }

  item.quantity = quantity;

  await cart.save();

  return cart;
};

export const removeFromCart = async (
  userId,
  productId
) => {

  const cart = await Cart.findOne({
    user: userId
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  await cart.save();

  return cart;
};

export const clearCart = async (userId) => {

  const cart = await Cart.findOne({
    user: userId
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cart.save();

  return cart;
};