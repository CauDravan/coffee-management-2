import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";

const ProductDetailPage = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);

      alert("Added to cart successfully");
    } catch (error) {
      console.log(error);

      console.log(error.response);

      alert(
        error.response?.data?.message || error.message || "Add to cart failed",
      );
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div>
      <Navbar />

      <div
        className="
    max-w-6xl
    mx-auto
    px-4
    py-12
  "
      >
        <div
          className="
      bg-white
      rounded-3xl
      shadow-lg
      p-8
      grid
      md:grid-cols-2
      gap-10
    "
        >
          {/* Product Image */}

          <div>
            <img
              src={
                product.image ||
                "https://images.unsplash.com/photo-1517701604599-bb29b565090c"
              }
              alt={product.name}
              className="
          w-full
          h-[450px]
          object-cover
          rounded-2xl
        "
            />
          </div>

          {/* Product Info */}

          <div
            className="
        flex
        flex-col
        justify-center
      "
          >
            <h1
              className="
          text-5xl
          font-bold
          text-gray-800
          mb-4
        "
            >
              {product.name}
            </h1>

            <p
              className="
          text-3xl
          font-bold
          text-amber-900
          mb-6
        "
            >
              {product.price.toLocaleString()} đ
            </p>

            <p
              className="
          text-gray-600
          leading-relaxed
          mb-6
        "
            >
              {product.description}
            </p>

            <div
              className="
          bg-gray-100
          rounded-xl
          p-4
          mb-6
        "
            >
              <span
                className={
                  product.stock > 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {user?.role !== "admin" && (
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`
      py-4
      rounded-xl
      text-lg
      font-semibold
      text-white
      transition

      ${
        product.stock === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-amber-900 hover:bg-amber-800"
      }
    `}
              >
                {product.stock === 0 ? "Out Of Stock" : "Add To Cart"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
