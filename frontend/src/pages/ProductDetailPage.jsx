import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";

const ProductDetailPage = () => {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const data =
          await getProductById(id);

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

      <div className="max-w-5xl mx-auto py-10">

        <img
          src={
            product.image ||
            "https://images.unsplash.com/photo-1517701604599-bb29b565090c"
          }
          alt={product.name}
          className="w-full max-w-md rounded"
        />

        <h1 className="text-4xl font-bold mt-6">
          {product.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {product.description}
        </p>

        <p className="text-2xl font-semibold mt-4">
          {product.price.toLocaleString()} đ
        </p>

        <p className="mt-2">
          Stock: {product.stock}
        </p>

        <button
          onClick={handleAddToCart}
          className="mt-5 bg-amber-900 text-white px-5 py-3 rounded"
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
};

const handleAddToCart = async () => {

  try {

    await addToCart(
      product._id,
      1
    );

    alert(
      "Added to cart successfully"
    );

  } catch (error) {

    console.log(error);

    console.log(error.response);

    alert(
      error.response?.data?.message ||
      error.message ||
      "Add to cart failed"
    );

  }
};

export default ProductDetailPage;