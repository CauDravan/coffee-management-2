import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import Navbar from "../components/Navbar";

import { getAllOrders, updateOrderStatus } from "../services/adminService";

const AdminOrdersPage = () => {
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

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();

      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);

      await fetchOrders();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />

        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">Loading orders...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Order Management</h1>

          <p className="text-gray-500">
            Manage customer orders and update status
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>

            <h2 className="text-3xl font-bold">No Orders Found</h2>

            <p className="text-gray-500 mt-2">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-6
                mb-6
              "
            >
              <div
                className="
                  flex
                  justify-between
                  flex-wrap
                  gap-6
                  mb-6
                "
              >
                <div>
                  <p className="text-gray-500 text-sm">Order ID</p>

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
                  <p className="text-gray-500 text-sm">Customer</p>

                  <p>{order.user?.name}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Email</p>

                  <p>{order.user?.email}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Total</p>

                  <p
                    className="
                      text-xl
                      font-bold
                      text-amber-900
                    "
                  >
                    {order.totalPrice?.toLocaleString()} đ
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Date</p>

                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="mb-6">
                <div
                  className="
      flex
      items-center
      gap-4
      flex-wrap
    "
                >
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

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="
        border
        border-gray-300
        rounded-xl
        px-4
        py-2
        focus:outline-none
        focus:ring-2
        focus:ring-amber-300
      "
                  >
                    <option value="Pending">Pending</option>

                    <option value="Processing">Processing</option>

                    <option value="Completed">Completed</option>

                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-2">Order Items</h3>

                {order.items?.map((item) => (
                  <div
                    key={
                      item.product?._id ||
                      Math.random()
                    }
                    className="
                      flex
                      justify-between
                      items-center
                      border-t
                      py-4
                    "
                  >
                    <div>

                      <p className="font-semibold">
                        {item.product?.name ||
                          "Unknown Product"}
                      </p>

                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p
                      className="
                        font-semibold
                        text-amber-900
                      "
                    >
                      {item.price?.toLocaleString()} đ
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
