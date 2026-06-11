import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import RegisterPage from "./pages/RegisterPage";
import StatisticsPage from "./pages/StatisticsPage";

import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetailPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        <Route
          path="/orders"
          element={<OrderHistoryPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Admin Routes */}

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProductsPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrdersPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/statistics"
          element={
            <AdminRoute>
              <StatisticsPage />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;