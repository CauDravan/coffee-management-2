import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getCart,
  updateCartItem,
  removeFromCart
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

  const handleUpdateQuantity = async (
    productId,
    quantity
  ) => {

    try {

      if (quantity < 1) return;

      await updateCartItem(
        productId,
        quantity
      );

      await fetchCart();

    } catch (error) {

      console.error(error);
      alert("Update failed");
    }
  };

  const handleRemove = async (
    productId
  ) => {

    try {

      await removeFromCart(productId);

      await fetchCart();

    } catch (error) {

      console.error(error);
      alert("Remove failed");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (
    !cart ||
    cart.items.length === 0
  ) {
    return (
      <>
        <Navbar />

        <h1 className="text-center text-3xl mt-10">
          Cart is empty
        </h1>
      </>
    );
  }

  const totalPrice =
    cart.items.reduce(
      (sum, item) =>
        sum +
        item.price * item.quantity,
      0
    );

  return (
    <div>

      <Navbar />

      <div className="max-w-4xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Cart
        </h1>

        {cart.items.map(item => (

          <div
            key={item.product._id}
            className="border p-4 rounded mb-4"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="text-xl font-semibold">
                  {item.product.name}
                </h2>

                <p>
                  Price:
                  {" "}
                  {item.price.toLocaleString()}
                  {" "}
                  đ
                </p>

                <p>
                  Subtotal:
                  {" "}
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}
                  {" "}
                  đ
                </p>

              </div>

              <div className="flex flex-col items-end gap-3">

                <div className="flex items-center gap-3">

                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() =>
                      handleUpdateQuantity(
                        item.product._id,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() =>
                      handleUpdateQuantity(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() =>
                    handleRemove(
                      item.product._id
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          </div>

        ))}

        <div className="mt-8 flex justify-between items-center">

          <div className="text-2xl font-bold">
            Total:
            {" "}
            {totalPrice.toLocaleString()}
            {" "}
            đ
          </div>

          <button
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            onClick={() =>
              navigate("/checkout")
            }
          >
            Checkout
          </button>

        </div>

      </div>

    </div>
  );
};

export default CartPage;