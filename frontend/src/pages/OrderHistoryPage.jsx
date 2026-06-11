import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getMyOrders } from "../services/orderService";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();

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

      <div
        className="
          max-w-6xl
          mx-auto
          px-4
          py-10
        "
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Order History</h1>

          <p className="text-gray-500">Track and review your purchases</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>

            <h2 className="text-3xl font-bold mb-2">No Orders Yet</h2>

            <p className="text-gray-500">
              Your order history will appear here.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                mb-5
              "
            >
              <div
                className="
    flex
    justify-between
    items-center
    flex-wrap
    gap-4
  "
              >
                <div>
                  <p
                    className="
        text-sm
        text-gray-500
      "
                  >
                    Order ID
                  </p>

                  <p
                    className="
        font-semibold
        break-all
      "
                  >
                    {order._id}
                  </p>
                </div>

                <div>
                  <p
                    className="
        text-sm
        text-gray-500
      "
                  >
                    Date
                  </p>

                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <p
                    className="
        text-sm
        text-gray-500
      "
                  >
                    Total
                  </p>

                  <p
                    className="
        text-xl
        font-bold
        text-amber-900
      "
                  >
                    {order.totalPrice.toLocaleString()}đ
                  </p>
                </div>

                <div>
                  <p
                    className="
        text-sm
        text-gray-500
        mb-1
      "
                  >
                    Status
                  </p>

                  <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium
                    ${getStatusClass(order.status)}
                  `}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
