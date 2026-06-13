import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import { register } from "../services/authService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      await register(formData.name, formData.email, formData.password, formData.phone);

      toast.success("Register successful");

      navigate("/login");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div
        className="
          max-w-md
          mx-auto
          mt-12
          border
          rounded
          p-8
          shadow
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
          "
        >
          Register
        </h1>

        {error && (
          <div
            className="
              bg-red-100
              text-red-700
              p-3
              rounded
              mb-4
            "
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="
                block
                mb-1
              "
            >
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
                w-full
                border
                rounded
                p-2
              "
            />
          </div>

          <div>
            <label
              className="
                block
                mb-1
              "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full
                border
                rounded
                p-2
              "
            />
          </div>
          <div>
            <label
              className="
                block
                mb-1
            "
            >
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="
                w-full
                border
                rounded
                p-2
            "
            />
          </div>
          <div>
            <label
              className="
                block
                mb-1
              "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
                w-full
                border
                rounded
                p-2
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-green-600
              text-white
              py-2
              rounded
            "
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
