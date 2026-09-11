import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/cartContext";

import type { Product } from "../types/product";

const products: Product[] = [
  {
    id: 1,
    name: "Paracetamol Tablets",
    category: "Medicines",
    price: 2500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description:
      "Quality paracetamol tablets for everyday pain and fever relief.",
  },
  {
    id: 2,
    name: "Vitamin C Supplements",
    category: "Vitamins",
    price: 4500,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8eb8?auto=format&fit=crop&w=600&q=80",
    description:
      "Vitamin C supplements designed to support your immune system.",
  },
  {
    id: 3,
    name: "Digital Thermometer",
    category: "Medical Devices",
    price: 6000,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=600&q=80",
    description:
      "Easy-to-use digital thermometer for accurate temperature readings.",
  },
  {
    id: 4,
    name: "Baby Care Lotion",
    category: "Baby Care",
    price: 3500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=600&q=80",
    description:
      "Gentle baby lotion for keeping your baby's skin soft and moisturized.",
  },
  {
    id: 5,
    name: "Multivitamin Tablets",
    category: "Vitamins",
    price: 5500,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=600&q=80",
    description:
      "Daily multivitamin support for your overall health and wellness.",
  },
  {
    id: 6,
    name: "Blood Pressure Monitor",
    category: "Medical Devices",
    price: 18500,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80",
    description:
      "Digital blood pressure monitor for convenient home monitoring.",
  },
  {
    id: 7,
    name: "Hand Sanitizer",
    category: "Personal Care",
    price: 1800,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?auto=format&fit=crop&w=600&q=80",
    description:
      "Convenient hand sanitizer for everyday hygiene and protection.",
  },
  {
    id: 8,
    name: "First Aid Kit",
    category: "Wellness",
    price: 8500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80",
    description:
      "A practical first aid kit containing essential healthcare supplies.",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Product Not Found
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

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

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
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
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
                    {product.rating} / 5
                  </span>

                </div>

                {/* Price */}
                <p className="text-3xl font-bold text-green-600 mt-6">
                  ₦{product.price.toLocaleString()}
                </p>

                {/* Description */}
                <p className="text-gray-600 leading-7 mt-6">
                  {product.description}
                </p>

                {/* Divider */}
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
                    className="sm:w-14 flex items-center justify-center border border-gray-200 hover:border-red-400 hover:text-red-500 text-gray-600 py-4 rounded-xl transition"
                    title="Add to wishlist"
                  >
                    <Heart size={21} />
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