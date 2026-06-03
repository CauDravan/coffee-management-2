import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export const getCart = async () => {
  const response = await axios.get(
    API_URL,
    getAuthConfig()
  );

  return response.data.cart;
};

export const addToCart = async (
  productId,
  quantity = 1
) => {

  const response = await axios.post(
    `${API_URL}/add`,
    {
      productId,
      quantity
    },
    getAuthConfig()
  );

  return response.data;
};

export const updateCartItem = async (
  productId,
  quantity
) => {

  const response = await axios.put(
    `${API_URL}/update`,
    {
      productId,
      quantity
    },
    getAuthConfig()
  );

  return response.data;
};

export const removeFromCart = async (
  productId
) => {

  const response = await axios.delete(
    `${API_URL}/remove/${productId}`,
    getAuthConfig()
  );

  return response.data;
};