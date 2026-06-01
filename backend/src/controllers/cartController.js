import * as cartService from "../services/cartService.js";

export const getCart = async (req, res) => {
  try {

    const cart = await cartService.getCart(
      req.user._id
    );

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    const cart = await cartService.addToCart(
      req.user._id,
      productId,
      quantity
    );

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const updateCartItem = async (req, res) => {
  try {

    const { productId, quantity } = req.body;

    const cart = await cartService.updateCartItem(
      req.user._id,
      productId,
      quantity
    );

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const removeFromCart = async (req, res) => {
  try {

    const cart = await cartService.removeFromCart(
      req.user._id,
      req.params.productId
    );

    res.status(200).json({
      success: true,
      message: "Item removed",
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const clearCart = async (req, res) => {
  try {

    const cart = await cartService.clearCart(
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};