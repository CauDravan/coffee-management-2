import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import {
  getAllProducts
} from "../services/productService";

const HomePage = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data =
          await getAllProducts();

        setProducts(data);

      } catch (error) {

        setError(
          "Failed to load products"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          Our Coffee
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {products.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      </div>

    </div>
  );
};

export default HomePage;