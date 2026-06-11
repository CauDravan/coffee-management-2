import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import {
  getAllProducts,
  searchProducts,
  getProductsByCategory,
} from "../services/productService";

import { getAllCategories } from "../services/categoryService";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);

        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = async () => {
    try {
      if (!keyword.trim()) {
        const products = await getAllProducts();

        setProducts(products);

        return;
      }

      const results = await searchProducts(keyword);

      setProducts(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryFilter = async (categoryId) => {
    try {
      if (categoryId === "all") {
        const products = await getAllProducts();

        setProducts(products);

        return;
      }

      const products = await getProductsByCategory(categoryId);

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

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Hero Section */}

        <section
          className="
      bg-gradient-to-r
      from-amber-100
      to-orange-50
      rounded-3xl
      p-10
      md:p-16
      mb-12
      shadow-sm
    "
        >
          <h1
            className="
        text-5xl
        font-bold
        text-amber-900
        mb-4
      "
          >
            Premium Coffee
          </h1>

          <p
            className="
        text-gray-600
        text-lg
        max-w-2xl
        mb-6
      "
          >
            Freshly roasted coffee beans and handcrafted drinks delivered
            straight to your door.
          </p>

          <button
            className="
        bg-amber-900
        text-white
        px-6
        py-3
        rounded-xl
        hover:bg-amber-800
        transition
      "
          >
            Shop Now
          </button>
        </section>

        {/* Search */}

        <div className="mb-10">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search coffee..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="
          flex-1
          border
          border-gray-300
          rounded-xl
          px-4
          py-3
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-amber-300
        "
            />

            <button
              onClick={handleSearch}
              className="
          bg-amber-900
          text-white
          px-6
          rounded-xl
          hover:bg-amber-800
        "
            >
              Search
            </button>
          </div>
        </div>

        {/* Categories */}

        <div className="mb-10">
          <h2
            className="
        text-xl
        font-semibold
        mb-4
      "
          >
            Categories
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryFilter("all")}
              className="
          px-5
          py-2
          rounded-full
          border
          bg-white
          hover:bg-amber-100
          transition
        "
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryFilter(category._id)}
                className="
            px-5
            py-2
            rounded-full
            border
            bg-white
            hover:bg-amber-100
            transition
          "
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Section */}

        <div className="mb-6">
          <h2
            className="
        text-3xl
        font-bold
      "
          >
            Our Coffee Collection
          </h2>

          <p className="text-gray-500">Discover our premium drinks</p>
        </div>

        <div
          className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-6
    "
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
