import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService";

const CartPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const data = await getCart();

      setCart(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) return;

      await updateCartItem(productId, quantity);

      await fetchCart();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cart item");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);

      await fetchCart();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item from cart");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <>
        <Navbar />

        <div className="text-center py-20">
          <h1 className="text-5xl mb-4">🛒</h1>

          <h2 className="text-3xl font-bold">Your Cart Is Empty</h2>

          <p className="text-gray-500 mt-3">
            Looks like you haven't added any coffee yet.
          </p>
        </div>
      </>
    );
  }

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <Navbar />

      <div
        className="
    max-w-6xl
    mx-auto
    px-4
    py-10
  "
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>

          <p className="text-gray-500">Review your selected items</p>
        </div>

        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="
  bg-white
  rounded-2xl
  shadow-md
  p-5
  mb-5
"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <img
                  src={
                    item.product.image ||
                    "https://images.unsplash.com/photo-1517701604599-bb29b565090c"
                  }
                  alt={item.product.name}
                  className="
      w-24
      h-24
      object-cover
      rounded-xl
    "
                />

                <div>
                  <h2 className="text-xl font-bold">{item.product.name}</h2>

                  <p className="text-gray-500">
                    {item.price.toLocaleString()} đ
                  </p>

                  <p className="font-semibold mt-2">
                    Subtotal: {(item.price * item.quantity).toLocaleString()}đ
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-3">
                  <button
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-gray-100
                      hover:bg-gray-200
                    "
                    onClick={() =>
                      handleUpdateQuantity(item.product._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-gray-100
                      hover:bg-gray-200
                    "
                    onClick={() =>
                      handleUpdateQuantity(item.product._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemove(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div
          className="
            mt-10
            bg-white
            shadow-lg
            rounded-2xl
            p-6
            flex
            justify-between
            items-center
          "
        >
          <div className="text-2xl font-bold">
            Total: {totalPrice.toLocaleString()} đ
          </div>

          <button
            className="
              bg-amber-900
              text-white
              px-8
              py-3
              rounded-xl
              hover:bg-amber-800
            "
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
