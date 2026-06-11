import axios from "axios";

const API_URL =
  "http://localhost:5000/api/orders";

const getAuthConfig = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`
  }
});

export const createOrder = async (
  orderData
) => {

  const response =
    await axios.post(
      API_URL,
      orderData,
      getAuthConfig()
    );

  return response.data;
};

export const getMyOrders =
  async () => {

    const response =
      await axios.get(
        `${API_URL}/my-orders`,
        getAuthConfig()
      );

    return response.data.orders;
};

export const getOrderById = async (
  orderId
) => {

  const response =
    await axios.get(
      `${API_URL}/${orderId}`,
      getAuthConfig()
    );

  return response.data.order;
};