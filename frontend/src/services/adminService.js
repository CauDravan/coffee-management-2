import axios from "axios";

const API_URL =
  "http://localhost:5000/api/admin";

const getAuthConfig = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
});

export const createProduct = async (
  productData
) => {

  const response =
    await axios.post(
      `${API_URL}/products`,
      productData,
      getAuthConfig()
    );

  return response.data;
};

export const updateProduct = async (
  productId,
  productData
) => {

  const response =
    await axios.put(
      `${API_URL}/products/${productId}`,
      productData,
      getAuthConfig()
    );

  return response.data;
};

export const deleteProduct = async (
  productId
) => {

  const response =
    await axios.delete(
      `${API_URL}/products/${productId}`,
      getAuthConfig()
    );

  return response.data;
};

export const getAllOrders =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/orders`,
        getAuthConfig()
      );

    return response.data.orders;
  };

export const updateOrderStatus =
  async (
    orderId,
    status
  ) => {

    const response =
      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { status },
        getAuthConfig()
      );

    return response.data;
  };