import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

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

const categories = [
  "All",
  "Medicines",
  "Vitamins",
  "Medical Devices",
  "Baby Care",
  "Personal Care",
  "Wellness",
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Search handler
  const handleSearch = (value: string) => {
    if (value.trim()) {
      setSearchParams({
        search: value,
      });
    } else {
      setSearchParams({});
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const search = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">

        {/* Header */}
        <section className="bg-green-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center">
              <p className="text-green-600 font-semibold mb-2">
                OUR PRODUCTS
              </p>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Shop Healthcare Products
              </h1>

              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Browse our collection of quality medicines,
                healthcare products and wellness essentials.
              </p>
            </div>

          </div>
        </section>

        {/* Products */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">

              {/* Search */}
              <div className="relative flex-1 max-w-xl">

                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* Filter */}
              <div className="relative">

                <SlidersHorizontal
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value)
                  }
                  className="appearance-none bg-white border border-gray-200 pl-11 pr-10 py-3 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            {/* Product Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}
              </p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>

            ) : (

              /* No Products */
              <div className="text-center py-20">

                <Search
                  size={48}
                  className="mx-auto text-gray-300 mb-4"
                />

                <h2 className="text-xl font-semibold text-gray-800">
                  No products found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try searching for another medicine or healthcare
                  product.
                </p>

                <button
                  onClick={() => {
                    setSearchParams({});
                    setSelectedCategory("All");
                  }}
                  className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
                >
                  Clear Search
                </button>

              </div>

            )}

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default Products;