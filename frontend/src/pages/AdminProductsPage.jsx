import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  getAllProducts
} from "../services/productService";

import {
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/adminService";

const AdminProductsPage = () => {

  const [products, setProducts] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: ""
    });

  const [editingId, setEditingId] =
    useState(null);

  const fetchProducts =
    async () => {

      try {

        const data =
          await getAllProducts();

        setProducts(data);

      } catch (error) {

        console.error(error);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const resetForm = () => {

    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: ""
    });

    setEditingId(null);
  };

  const handleSubmit =
    async e => {

      e.preventDefault();

      try {

        if (editingId) {

          await updateProduct(
            editingId,
            formData
          );

          alert(
            "Product updated"
          );

        } else {

          await createProduct(
            formData
          );

          alert(
            "Product created"
          );
        }

        resetForm();

        await fetchProducts();

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Operation failed"
        );
      }
    };

  const handleEdit =
    product => {

      setEditingId(
        product._id
      );

      setFormData({
        name:
          product.name || "",
        description:
          product.description || "",
        price:
          product.price || "",
        stock:
          product.stock || "",
        image:
          product.image || ""
      });
    };

  const handleDelete =
    async productId => {

      const confirmed =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmed) return;

      try {

        await deleteProduct(
          productId
        );

        await fetchProducts();

      } catch (error) {

        console.error(error);
      }
    };

  return (
    <div>

      <Navbar />

      <div className="max-w-6xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          Product Management
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border p-6 rounded mb-10"
        >

          <div className="grid grid-cols-2 gap-4">

            <input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              name="stock"
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="border p-2 rounded"
            />

          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="
              border
              p-2
              rounded
              w-full
              mt-4
            "
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
              {editingId
                ? "Update Product"
                : "Create Product"}
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

          {products.map(product => (

            <div
              key={product._id}
              className="
                border
                rounded
                p-4
                flex
                justify-between
              "
            >

              <div>

                <h2 className="font-bold">
                  {product.name}
                </h2>

                <p>
                  Price:
                  {" "}
                  {product.price
                    .toLocaleString()}
                  đ
                </p>

                <p>
                  Stock:
                  {" "}
                  {product.stock}
                </p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    handleEdit(
                      product
                    )
                  }
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
                  onClick={() =>
                    handleDelete(
                      product._id
                    )
                  }
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