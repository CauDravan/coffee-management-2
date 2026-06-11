import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="bg-amber-900 text-white shadow">
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          justify-between
          items-center
        "
      >
        {/* Logo */}

        <Link
          to="/"
          className="
            text-2xl
            font-bold
            hover:text-amber-200
          "
        >
          ☕ Coffee Shop
        </Link>

        {/* Menu */}

        <div
          className="
            flex
            items-center
            gap-5
            font-medium
          "
        >
          <Link to="/" className="hover:text-amber-200">
            Home
          </Link>

          {/* User Menu */}

          {user?.role === "user" && (
            <>
              <Link to="/cart" className="hover:text-amber-200">
                Cart
              </Link>

              <Link to="/orders" className="hover:text-amber-200">
                Orders
              </Link>
            </>
          )}

          {/* Admin Menu */}

          {user?.role === "admin" && (
            <>
              <Link to="/admin/products" className="hover:text-amber-200">
                Products
              </Link>

              <Link to="/admin/orders" className="hover:text-amber-200">
                Orders
              </Link>

              <Link to="/admin/statistics" className="hover:text-amber-200">
                Statistics
              </Link>
            </>
          )}

          {/* Guest */}

          {!user ? (
            <>
              <Link to="/login" className="hover:text-amber-200">
                Login
              </Link>

              <Link
                to="/register"
                className="
                  bg-white
                  text-amber-900
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span
                className="
                  text-amber-200
                "
              >
                Hello, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-red-600
                "
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
