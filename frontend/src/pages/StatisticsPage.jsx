import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getDashboardStats } from "../services/adminService";

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const StatCard = ({ title, value, icon }) => (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-6
        hover:shadow-lg
        transition
      "
    >
      <div
        className="
          flex
          justify-between
          items-start
        "
      >
        <div>
          <p
            className="
              text-gray-500
              mb-2
            "
          >
            {title}
          </p>

          <p
            className="
              text-4xl
              font-bold
            "
          >
            {value}
          </p>
        </div>

        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();

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
    return (
      <div>
        <Navbar />

        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">Loading statistics...</h2>
        </div>
      </div>
    );
  }

  if (!stats) {

    return (
      <div>

        <Navbar />

        <div className="text-center py-20">

          <h2 className="text-2xl font-bold">
            Unable to load statistics
          </h2>

        </div>

      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Dashboard Statistics</h1>

          <p className="text-gray-500">
            Overview of your coffee shop performance
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon="👤"
          />

          <StatCard
            title="Total Products"
            value={stats?.totalProducts || 0}
            icon="☕"
          />

          <StatCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            icon="📦"
          />

          <StatCard
            title="Revenue"
            value={`${(stats?.totalRevenue || 0).toLocaleString()} đ`}
            icon="💰"
          />

          <StatCard
            title="Pending Orders"
            value={stats?.pendingOrders || 0}
            icon="🟡"
          />

          <StatCard
            title="Completed Orders"
            value={stats?.completedOrders || 0}
            icon="🟢"
          />
        </div>
      </div>
      <div
        className="
          bg-gradient-to-r
          from-amber-100
          to-orange-50
          rounded-3xl
          p-8
          mb-8
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-2
          "
        >
          Revenue Overview
        </h2>

        <p className="text-gray-600">
          Total revenue generated from all orders
        </p>

        <p
          className="
            text-5xl
            font-bold
            text-amber-900
            mt-4
          "
        >
          {(
            stats?.totalRevenue || 0
          ).toLocaleString()} đ
        </p>

      </div>
    </div>
  );
};

export default StatisticsPage;
