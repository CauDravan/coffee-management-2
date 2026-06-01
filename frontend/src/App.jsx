import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Route
        path="/products/:id"
        element={<ProductDetailPage />}
      />
    </BrowserRouter>
  );
}

export default App;