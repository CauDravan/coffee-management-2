import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import {
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../services/adminService";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (u) => u.role === "admin"
  ).length;

  const totalCustomers = users.filter(
    (u) => u.role === "user"
  ).length;

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Delete this user?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(userId);

      toast.success("User deleted");

      await fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const handleRoleChange = async (
    userId,
    role
  ) => {
    try {
      await updateUserRole(userId, role);

      toast.success("Role updated");

      await fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update role"
      );
    }
  };

  const getRoleBadge = (role) => {
    if (role === "admin") {
      return `
        bg-red-100
        text-red-700
      `;
    }

    return `
      bg-green-100
      text-green-700
    `;
  };

  if (loading) {
    return (
      <div>
        <Navbar />

        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            Loading users...
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
          <h1 className="text-4xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500">
            Manage user accounts and permissions
          </p>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white rounded-3xl shadow-md p-6">
            <p className="text-gray-500">
              Total Users
            </p>

            <h2 className="text-3xl font-bold">
              {totalUsers}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <p className="text-gray-500">
              Admins
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {totalAdmins}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">
            <p className="text-gray-500">
              Customers
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {totalCustomers}
            </h2>
          </div>

        </div>

        {/* Search */}

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
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
          />
        </div>

        {/* Users */}

        <div className="space-y-4">

          {filteredUsers.map((user) => (

            <div
              key={user._id}
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-6
                flex
                justify-between
                items-center
                flex-wrap
                gap-4
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-amber-100
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                    text-amber-700
                  "
                >
                  {user.name?.charAt(0)}
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    {user.name}
                  </h3>

                  <p className="text-gray-500">
                    {user.email}
                  </p>

                  <p className="text-sm text-gray-400">
                    {user.phone || "No phone"}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Joined:
                    {" "}
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 flex-wrap">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium
                    ${getRoleBadge(user.role)}
                  `}
                >
                  {user.role}
                </span>

                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(
                      user._id,
                      e.target.value
                    )
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
                  <option value="user">
                    User
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>

                {user.role !== "admin" && (
                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="
                      bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      hover:bg-red-700
                    "
                  >
                    Delete
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default AdminUsersPage;