import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data.products;
};

export const getProductById = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data.product;
};

export const searchProducts =
  async (keyword) => {

    const response =
      await axios.get(
        `${API_URL}/search?keyword=${keyword}`
      );

    return response.data.products;
  };

export const getProductsByCategory =
  async (categoryId) => {

    const response =
      await axios.get(
        `${API_URL}/category/${categoryId}`
      );

    return response.data.products;
  };