import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

/* =========================
   PRODUCT MANAGEMENT
========================= */

export const getAllProductsAdmin = async (
  req,
  res
) => {

  try {

    const products =
      await Product.find()
        .populate(
          "category",
          "name"
        )
        .sort({
          createdAt: -1
        });

    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createProduct = async (
  req,
  res
) => {

  try {

    const product =
      await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const updateProduct = async (
  req,
  res
) => {

  try {

    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const deleteProduct = async (
  req,
  res
) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/* =========================
   CATEGORY MANAGEMENT
========================= */

export const createCategory = async (
  req,
  res
) => {

  try {

    const category =
      await Category.create({
        name: req.body.name,
        description:
          req.body.description || ""
      });

    res.status(201).json({
      success: true,
      category
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/* =========================
   ORDER MANAGEMENT
========================= */

export const getAllOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find()
        .populate(
          "user",
          "name email"
        )
        .sort({
          createdAt: -1
        });

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

export const updateOrderStatus =
  async (req, res) => {

    try {

      const { status } = req.body;

      const validStatuses = [
        "Pending",
        "Processing",
        "Completed",
        "Cancelled"
      ];

      if (
        !validStatuses.includes(
          status
        )
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid order status"
        });
      }

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      order.status = status;

      await order.save();

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

/* =========================
   USER MANAGEMENT
========================= */

export const getAllUsers = async (
  req,
  res
) => {

  try {

    const users =
      await User.find()
        .select("-password")
        .sort({
          createdAt: -1
        });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const deleteUser = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role === "admin") {

      return res.status(400).json({
        success: false,
        message:
          "Cannot delete admin account"
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

/* =========================
   DASHBOARD STATS
========================= */

export const getDashboardStats =
  async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments();

      const totalProducts =
        await Product.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      const revenueResult =
        await Order.aggregate([
          {
            $match: {
              status: "Completed"
            }
          },
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$totalPrice"
              }
            }
          }
        ]);

      const totalRevenue =
        revenueResult[0]
          ?.totalRevenue || 0;

      const pendingOrders =
        await Order.countDocuments({
          status: "Pending"
        });

      const completedOrders =
        await Order.countDocuments({
          status: "Completed"
        });

      res.status(200).json({
        success: true,
        stats: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue,
          pendingOrders,
          completedOrders
        }
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };