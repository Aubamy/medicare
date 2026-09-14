import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/WishlishContext";
import { useAuth } from "../context/AuthContext";

import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, loading } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [added, setAdded] = useState(false);

  const liked = isInWishlist(product.id);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(product);

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 2000);
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">

      {/* Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">

        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </Link>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-4 right-4 bg-white p-2.5 rounded-full shadow-md transition ${
            liked
              ? "text-red-500"
              : "text-gray-600 hover:text-red-500"
          }`}
          title={
            liked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={20}
            className={liked ? "fill-red-500" : ""}
          />
        </button>

        {/* Category */}
        <span className="absolute bottom-4 left-4 bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
          {product.category}
        </span>

      </div>

      {/* Details */}
      <div className="p-5">

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm text-gray-600">
            {product.rating}
          </span>
        </div>

        {/* Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-green-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Cart */}
        <div className="flex items-center justify-between gap-3 mt-5">

          <p className="text-xl font-bold text-green-600">
            ₦{product.price.toLocaleString()}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className={`text-white p-3 rounded-xl transition ${
              added
                ? "bg-green-800"
                : "bg-green-600 hover:bg-green-700"
            } ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            title={
              added
                ? "Added to cart"
                : "Add to cart"
            }
          >
            <ShoppingCart size={20} />
          </button>

        </div>

        {/* Success message */}
        {added && (
          <p className="text-green-600 text-sm font-medium mt-3 text-center">
            ✓ Added to cart
          </p>
        )}

      </div>
    </div>
  );
};

export default ProductCard;