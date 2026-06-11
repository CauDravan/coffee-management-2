import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-md
        hover:shadow-xl
        transition
        duration-300
      "
    >

      <img
        src={
          product.image ||
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c"
        }
        alt={product.name}
        className="
          w-full
          h-56
          object-cover
        "
      />

      <div className="p-5">

        <h2
          className="
            text-xl
            font-bold
            text-gray-800
            mb-2
          "
        >
          {product.name}
        </h2>

        <p
          className="
            text-amber-900
            font-semibold
            text-lg
            mb-4
          "
        >
          {product.price.toLocaleString()} đ
        </p>

        <Link
          to={`/products/${product._id}`}
          className="
            block
            text-center
            bg-amber-900
            text-white
            py-2
            rounded-lg
            hover:bg-amber-800
            transition
          "
        >
          View Detail
        </Link>

      </div>

    </div>

  );

};

export default ProductCard;