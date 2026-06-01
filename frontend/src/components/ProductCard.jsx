import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={
          product.image ||
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c"
        }
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-3">
        {product.name}
      </h2>

      <p className="text-gray-500">
        {product.price.toLocaleString()} đ
      </p>
      
      <Link
        to={`/products/${product._id}`}
        className="mt-3 inline-block bg-amber-900 text-white px-4 py-2 rounded"
      >
        View Detail
      </Link>
    </div>
  );
};

export default ProductCard;