
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/WishlishContext";
import api from "../api/axios";

import type { Product } from "../types/product";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        const backendProducts = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        const foundProduct = backendProducts.find(
          (item: any) => Number(item.id) === Number(id)
        );

        if (!foundProduct) {
          setError("Product Not Found");
          setProduct(null);
          return;
        }

        const formattedProduct: Product = {
          id: Number(foundProduct.id),
          name: foundProduct.productName,
          category: foundProduct.category,
          price: Number(foundProduct.price),
          rating: Number(foundProduct.rating || 0),
          image: foundProduct.image,
          description: foundProduct.description || "",
        };

        setProduct(formattedProduct);
      } catch (error) {
        setError("Failed to load product details.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />

            <p className="text-gray-500">
              Loading product details...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {error || "Product Not Found"}
            </h1>

            <p className="text-gray-500 mt-2">
              The product you're looking for doesn't exist.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
            >
              <ArrowLeft size={18} />
              Back to Products
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const liked = isInWishlist(product.id);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition mb-8"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

          {/* Product */}
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Image */}
              <div className="bg-gray-100 min-h-[400px] lg:min-h-[600px]">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[400px] flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 sm:p-10 lg:p-14">

                {/* Category */}
                <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full">
                  {product.category}
                </span>

                {/* Name */}
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-5">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={
                          star <= Math.round(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-gray-600">
                    {product.rating > 0
                      ? `${product.rating} / 5`
                      : "New Product"}
                  </span>
                </div>

                {/* Price */}
                <p className="text-3xl font-bold text-green-600 mt-6">
                  ₦{Number(product.price).toLocaleString()}
                </p>

                {/* Description */}
                <p className="text-gray-600 leading-7 mt-6">
                  {product.description}
                </p>

                <div className="border-t border-gray-100 my-8" />

                {/* Quantity */}
                <div>
                  <p className="font-semibold text-gray-800 mb-3">
                    Quantity
                  </p>

                  <div className="flex items-center border border-gray-200 rounded-xl w-fit overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="p-3 hover:bg-gray-100 transition"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="px-6 font-semibold text-gray-800">
                      {quantity}
                    </span>

                    <button
                      onClick={increaseQuantity}
                      className="p-3 hover:bg-gray-100 transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`sm:w-14 flex items-center justify-center border py-4 rounded-xl transition ${
                      liked
                        ? "border-red-400 text-red-500"
                        : "border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500"
                    }`}
                    title={
                      liked
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <Heart
                      size={21}
                      className={liked ? "fill-red-500" : ""}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;