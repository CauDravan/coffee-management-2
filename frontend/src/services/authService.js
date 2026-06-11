import axios from "axios";

const API_URL =
  "http://localhost:5000/api/auth";

export const login = async (
  email,
  password
) => {

  const response = await axios.post(
    `${API_URL}/login`,
    {
      email,
      password
    }
  );

  return response.data;
};

export const register = async (
  name,
  email,
  password,
  phone = ""
) => {

  const response =
    await axios.post(
      `${API_URL}/register`,
      {
        name,
        email,
        password,
        phone
      }
    );

  return response.data;
};