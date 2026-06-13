import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";

import { getAllProducts } from "../services/productService";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/adminService";

const INPUT_STYLE = `
  w-full
  border
  border-gray-300
  rounded-xl
  px-4
  py-3
  focus:outline-none
  focus:ring-2
  focus:ring-amber-300
`;

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateProduct(editingId, formData);

        toast.success("Product updated");
      } else {
        await createProduct(formData);

        toast.success("Product created");
      }

      resetForm();

      await fetchProducts();
    } catch (error) {
      console.error(error);

      toast.error("Failed to create product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      image: product.image || "",
    });
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Delete this product?");

    if (!confirmed) return;

    try {
      await deleteProduct(productId);

      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Product Management</h1>

          <p className="text-gray-500">Manage your coffee products</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            shadow-lg
            rounded-3xl
            p-8
            mb-10
          "
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className={INPUT_STYLE}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className={INPUT_STYLE}
              required
            />

            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className={INPUT_STYLE}
              required
            />

            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className={INPUT_STYLE}
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={`${INPUT_STYLE} mt-4`}
            rows="4"
          />

          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="
                bg-green-600
                text-white
                px-6
                py-2
                rounded
              "
            >
              {editingId ? "Update Product" : "Create Product"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="
                  bg-gray-500
                  text-white
                  px-6
                  py-2
                  rounded
                "
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-5
                flex
                justify-between
                items-center
              "
            >
              <div className="flex gap-4 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="
      w-20
      h-20
      rounded-xl
      object-cover
    "
                />

                <div>
                  <h2 className="font-bold text-lg">{product.name}</h2>

                  <p className="text-gray-500">{product.description}</p>

                  <p className="font-semibold mt-2">
                    {product.price.toLocaleString()} đ
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="
                    bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
