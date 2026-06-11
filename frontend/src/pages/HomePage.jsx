import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import {
  getAllProducts,
  searchProducts,
  getProductsByCategory
} from "../services/productService";

import {
  getAllCategories
} from "../services/categoryService";

const HomePage = () => {

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [keyword, setKeyword] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadData = async () => {

      try {

        const [
          productsData,
          categoriesData
        ] = await Promise.all([
          getAllProducts(),
          getAllCategories()
        ]);

        setProducts(productsData);
        setCategories(categoriesData);

      } catch (error) {

        console.error(error);

        setError(
          "Failed to load data"
        );

      } finally {

        setLoading(false);
      }
    };

    loadData();

  }, []);

  const handleSearch =
    async () => {

      try {

        if (!keyword.trim()) {

          const products =
            await getAllProducts();

          setProducts(products);

          return;
        }

        const results =
          await searchProducts(
            keyword
          );

        setProducts(results);

      } catch (error) {

        console.error(error);
      }
    };

  const handleCategoryFilter =
    async (categoryId) => {

      try {

        if (
          categoryId === "all"
        ) {

          const products =
            await getAllProducts();

          setProducts(products);

          return;
        }

        const products =
          await getProductsByCategory(
            categoryId
          );

        setProducts(products);

      } catch (error) {

        console.error(error);
      }
    };

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

        <div className="flex gap-3 mb-6">

          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) =>
              setKeyword(
                e.target.value
              )
            }
            className="border p-2 rounded flex-1"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Search
          </button>

        </div>

        <div className="flex flex-wrap gap-2 mb-8">

          <button
            onClick={() =>
              handleCategoryFilter(
                "all"
              )
            }
            className="px-4 py-2 border rounded"
          >
            All
          </button>

          {categories.map(
            (category) => (

              <button
                key={category._id}
                onClick={() =>
                  handleCategoryFilter(
                    category._id
                  )
                }
                className="px-4 py-2 border rounded"
              >
                {category.name}
              </button>

            )
          )}

        </div>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
        >

          {products.map(
            (product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            )
          )}

        </div>

      </div>

    </div>
  );
};

export default HomePage;