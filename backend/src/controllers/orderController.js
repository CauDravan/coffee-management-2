import * as orderService from "../services/orderService.js";

export const createOrder = async (
  req,
  res
) => {

  try {

    const { shippingAddress } =
      req.body;

    const order =
      await orderService.createOrder(
        req.user._id,
        shippingAddress
      );

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getMyOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await orderService.getMyOrders(
        req.user._id
      );

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const getOrderById = async (
  req,
  res
) => {

  try {

    const order =
      await orderService.getOrderById(
        req.user._id,
        req.params.id
      );

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};