
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import api from "../api/axios";

import type { Product } from "../types/product";

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

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await api.get("/products");

        const data = response.data;

        const backendProducts = Array.isArray(data)
          ? data
          : data.products || [];

        const formattedProducts: Product[] =
          backendProducts.map((product: any) => ({
            id: Number(product.id),
            name: product.productName,
            category: product.category,
            price: Number(product.price),
            rating: Number(product.rating || 0),
            image: product.image,
            description: product.description,
          }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
                  onChange={(e) =>
                    handleSearch(e.target.value)
                  }
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
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>

              </div>

            </div>

            {/* Loading */}
            {loading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />

                <p className="text-gray-500">
                  Loading products...
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (

              <>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}

                </div>
              </>

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
                  Try searching for another medicine or
                  healthcare product.
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
