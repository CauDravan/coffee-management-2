import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { createOrder } from "../services/orderService";

const CheckoutPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      detail: "",
      city: ""
    });

  const handleChange = e => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {

    e.preventDefault();

    try {

      await createOrder({
        shippingAddress: formData
      });

      alert(
        "Order created successfully"
      );

      navigate("/orders");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Create order failed"
      );
    }
  };

  return (
    <div>

      <Navbar />

      <div className="max-w-xl mx-auto py-10">

        <h1 className="text-3xl font-bold mb-6">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="detail"
            placeholder="Address Detail"
            value={formData.detail}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded"
          >
            Place Order
          </button>

        </form>

      </div>

    </div>
  );
};

export default CheckoutPage;