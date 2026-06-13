import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";
import { createOrder } from "../services/orderService";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    detail: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createOrder({
        shippingAddress: formData,
      });

      toast.success("Order created successfully");

      navigate("/orders");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create order");
    }
  };

  return (
    <div>
      <Navbar />

      <div
        className="
      max-w-5xl
      mx-auto
      px-4
      py-12
    "
      >
        <div
          className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
      "
        >
          <div className="mb-8">
            <h1
              className="
            text-4xl
            font-bold
            mb-2
          "
            >
              Checkout
            </h1>

            <p className="text-gray-500">
              Enter your shipping information to complete the order.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="
              block
              mb-2
              font-medium
            "
              >
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nguyen Van A"
                className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-amber-300
            "
                required
              />
            </div>

            <div>
              <label
                className="
              block
              mb-2
              font-medium
            "
              >
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0123456789"
                className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-amber-300
            "
                required
              />
            </div>

            <div>
              <label
                className="
              block
              mb-2
              font-medium
            "
              >
                Address Detail
              </label>

              <input
                type="text"
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                placeholder="123 Nguyen Hue Street"
                className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-amber-300
            "
                required
              />
            </div>

            <div>
              <label
                className="
              block
              mb-2
              font-medium
            "
              >
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Da Nang"
                className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-amber-300
            "
                required
              />
            </div>

            <div
              className="
            bg-amber-50
            border
            border-amber-200
            rounded-xl
            p-4
          "
            >
              <h3
                className="
              font-semibold
              mb-2
            "
              >
                Order Information
              </h3>

              <p className="text-gray-600">Payment Method: Cash On Delivery</p>
            </div>

            <button
              type="submit"
              className="
            w-full
            bg-amber-900
            text-white
            py-4
            rounded-xl
            text-lg
            font-semibold
            hover:bg-amber-800
            transition
          "
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
