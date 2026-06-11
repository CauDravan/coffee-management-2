import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getMyOrders
} from "../services/orderService";

const OrderHistoryPage = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const data =
          await getMyOrders();

        setOrders(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };

    fetchOrders();

  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>

      <Navbar />

      <div className="max-w-5xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <p>No orders found.</p>

        ) : (

          orders.map(order => (

            <div
              key={order._id}
              className="border rounded p-4 mb-4"
            >

              <p>
                Order ID:
                {" "}
                {order._id}
              </p>

              <p>
                Status:
                {" "}
                {order.status}
              </p>

              <p>
                Total:
                {" "}
                {order.totalPrice
                  .toLocaleString()}
                {" "}
                đ
              </p>

              <p>
                Date:
                {" "}
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </p>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default OrderHistoryPage;