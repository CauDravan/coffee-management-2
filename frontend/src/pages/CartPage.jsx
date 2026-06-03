import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getCart
} from "../services/cartService";

const CartPage = () => {

  const [cart, setCart] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const data =
          await getCart();

        setCart(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchCart();

  }, []);

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

            <h2 className="text-xl font-semibold">
              {item.product.name}
            </h2>

            <p>
              Price:
              {" "}
              {item.price.toLocaleString()} đ
            </p>

            <p>
              Quantity:
              {" "}
              {item.quantity}
            </p>

            <p>
              Subtotal:
              {" "}
              {(item.price * item.quantity)
                .toLocaleString()} đ
            </p>

          </div>

        ))}

        <div className="text-right text-2xl font-bold mt-6">

          Total:
          {" "}
          {totalPrice.toLocaleString()} đ

        </div>

      </div>

    </div>
  );
};

export default CartPage;