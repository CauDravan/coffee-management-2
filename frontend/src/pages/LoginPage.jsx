import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { login }
from "../services/authService";

const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data =
        await login(
          email,
          password
        );

      localStorage.setItem(
        "token",
        data.token
      );
      
      // Store user info for later use
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      window.location.href = "/";

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    }
  };

  return (
    <div className="max-w-md mx-auto py-20">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3"
        />

        <button
          type="submit"
          className="w-full bg-amber-900 text-white p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default LoginPage;