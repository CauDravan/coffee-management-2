import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getDashboardStats
} from "../services/adminService";

const StatisticsPage = () => {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const data =
            await getDashboardStats();

          setStats(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);
        }
      };

    fetchStats();

  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard Statistics
        </h1>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          <div className="border p-6 rounded">
            <h2>Total Users</h2>
            <p className="text-3xl font-bold">
              {stats?.totalUsers || 0}
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2>Total Products</h2>
            <p className="text-3xl font-bold">
              {stats?.totalProducts || 0}
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2>Total Orders</h2>
            <p className="text-3xl font-bold">
              {stats?.totalOrders || 0}
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2>Revenue</h2>
            <p className="text-3xl font-bold">
              {stats?.totalRevenue?.toLocaleString() || 0} đ
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2>Pending Orders</h2>
            <p className="text-3xl font-bold">
              {stats?.pendingOrders || 0}
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2>Completed Orders</h2>
            <p className="text-3xl font-bold">
              {stats?.completedOrders || 0}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default StatisticsPage;