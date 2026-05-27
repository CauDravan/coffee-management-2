import asyncHandler from "../utils/asyncHandler.js";

import generateToken from "../utils/generateToken.js";

import {
  registerUser,
  loginUser,
  getUserProfile
} from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {

  const user = await registerUser(req.body);

  try {
    res.status(201).json({
      success: true,
      message: "Register successful",

    token: generateToken(user._id),

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export const login = asyncHandler(async (req, res) => {

  const user = await loginUser(req.body);

  try {
    res.status(200).json({
      success: true,
      message: "Login successful",

    token: generateToken(user._id),

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export const getProfile = asyncHandler(async (req, res) => {

  const user = await getUserProfile(req.user._id);

  try {
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});