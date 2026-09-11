import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Upload,
} from "lucide-react";

interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

const API_URL = "http://localhost:3000/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("medicare-token");

        if (!token) {
          throw new Error("You are not logged in.");
        }

        const response = await fetch(
          `${API_URL}/products`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load products"
          );
        }

        const products: Product[] = Array.isArray(data)
          ? data
          : data.products || [];

        const product = products.find(
          (item) => item.id === Number(id)
        );

        if (!product) {
          throw new Error("Product not found");
        }

        setFormData({
          productName: product.productName,
          description: product.description,
          price: String(product.price),
          quantity: String(product.quantity),
          category: product.category,
        });

        setCurrentImage(product.image);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setSaving(true);

      const token = localStorage.getItem(
        "medicare-token"
      );

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const data = new FormData();

      data.append(
        "productName",
        formData.productName
      );

      data.append(
        "description",
        formData.description
      );

      data.append("price", formData.price);

      data.append(
        "quantity",
        formData.quantity
      );

      data.append(
        "category",
        formData.category
      );

      // Only send image if admin selected a new one
      if (image) {
        data.append("image", image);
      }

      const response = await fetch(
        `${API_URL}/edit-products/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to update product"
        );
      }

      setSuccess(
        "Product updated successfully!"
      );

      setTimeout(() => {
        navigate("/admin/products");
      }, 1000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2
          size={35}
          className="animate-spin text-green-600"
        />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() =>
              navigate("/admin/products")
            }
            className="p-2 rounded-lg hover:bg-gray-200 transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Edit Product
            </h1>

            <p className="text-gray-500 mt-1">
              Update your pharmacy product.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 mb-6">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 rounded-xl px-5 py-4 mb-6">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6"
        >

          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Price + Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₦)
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Current Image */}
          {currentImage && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Image
              </label>

              <img
                src={currentImage}
                alt={formData.productName}
                className="w-32 h-32 object-cover rounded-xl border border-gray-200"
              />
            </div>
          )}

          {/* New Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Change Image
            </label>

            <label
              htmlFor="image"
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition"
            >
              <Upload
                size={35}
                className="text-green-600 mb-3"
              />

              <p className="font-semibold text-gray-700">
                {image
                  ? image.name
                  : "Click to choose a new image"}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Leave empty to keep current image
              </p>

              <input
                id="image"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Updating Product...
              </>
            ) : (
              "Update Product"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;