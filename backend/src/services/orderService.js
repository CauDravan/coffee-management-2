import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (
  userId,
  shippingAddress
) => {

  const cart = await Cart.findOne({
    user: userId
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let totalPrice = 0;

  for (const item of cart.items) {

    if (item.product.stock < item.quantity) {
      throw new Error(
        `${item.product.name} is out of stock`
      );
    }

    totalPrice += item.price * item.quantity;
  }

  const order = await Order.create({
    user: userId,

    items: cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      quantity: item.quantity,
      price: item.price
    })),

    totalPrice,

    shippingAddress
  });

  for (const item of cart.items) {

    item.product.stock -= item.quantity;

    item.product.sold += item.quantity;

    await item.product.save();
  }

  cart.items = [];

  await cart.save();

  return order;
};

export const getMyOrders = async (
  userId
) => {

  return await Order.find({
    user: userId
  }).sort({
    createdAt: -1
  });

};

export const getOrderById = async (
  userId,
  orderId
) => {

  const order = await Order.findById(
    orderId
  );

  if (!order) {
    throw new Error("Order not found");
  }

  if (
    order.user.toString() !==
    userId.toString()
  ) {
    throw new Error("Unauthorized");
  }

  return order;
};