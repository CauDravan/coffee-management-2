import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-amber-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">
          Coffee Shop
        </h1>

        <div className="flex gap-4">
          <button>Home</button>
          <button>Products</button>
          <Link to="/cart">
            <button>Cart</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;