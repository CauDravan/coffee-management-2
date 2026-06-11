import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getAllOrders,
  updateOrderStatus
} from "../services/adminService";

const AdminOrdersPage = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders =
    async () => {

      try {

        const data =
          await getAllOrders();

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

  const handleStatusChange =
    async (
      orderId,
      status
    ) => {

      try {

        await updateOrderStatus(
          orderId,
          status
        );

        await fetchOrders();

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Update failed"
        );
      }
    };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          Order Management
        </h1>

        {orders.length === 0 ? (

          <h2>
            No orders found
          </h2>

        ) : (

          orders.map(order => (

            <div
              key={order._id}
              className="
                border
                rounded
                p-5
                mb-4
              "
            >

              <div className="mb-3">

                <p>
                  <strong>
                    Order ID:
                  </strong>
                  {" "}
                  {order._id}
                </p>

                <p>
                  <strong>
                    Customer:
                  </strong>
                  {" "}
                  {order.user?.name}
                </p>

                <p>
                  <strong>
                    Email:
                  </strong>
                  {" "}
                  {order.user?.email}
                </p>

                <p>
                  <strong>
                    Total:
                  </strong>
                  {" "}
                  {order.totalPrice?.toLocaleString()}
                  {" "}
                  đ
                </p>

                <p>
                  <strong>
                    Date:
                  </strong>
                  {" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>

              </div>

              <div className="mb-4">

                <strong>
                  Status:
                </strong>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order._id,
                      e.target.value
                    )
                  }
                  className="
                    ml-3
                    border
                    rounded
                    p-2
                  "
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

              <div>

                <h3 className="font-bold mb-2">
                  Order Items
                </h3>

                {order.items?.map(
                  item => (

                    <div
                      key={
                        item.product?._id ||
                        Math.random()
                      }
                      className="
                        border-t
                        py-2
                      "
                    >

                      <p>
                        Product:
                        {" "}
                        {item.product?.name ||
                          "Unknown"}
                      </p>

                      <p>
                        Quantity:
                        {" "}
                        {item.quantity}
                      </p>

                      <p>
                        Price:
                        {" "}
                        {item.price?.toLocaleString()}
                        {" "}
                        đ
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default AdminOrdersPage;