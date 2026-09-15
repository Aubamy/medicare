import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/WishlishContext";
import api from "../api/axios";

import type { Product } from "../types/product";

const FeaturedProducts = () => {
const { addToCart } = useCart();

const {
toggleWishlist,
isInWishlist,
} = useWishlist();

const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchFeaturedProducts = async () => {
try {
setLoading(true);


    const response = await api.get("/products");

    const data = response.data;

    const backendProducts = Array.isArray(data)
      ? data
      : data.products || [];

    const formattedProducts: Product[] =
      backendProducts
        .slice(0, 4)
        .map((product: any) => ({
          id: Number(product.id),
          name: product.productName,
          category: product.category,
          price: Number(product.price),
          rating: Number(product.rating || 0),
          image: product.image,
          description: product.description || "",
        }));

    setProducts(formattedProducts);
  } catch (error) {
    setProducts([]);
  } finally {
    setLoading(false);
  }
};

fetchFeaturedProducts();


}, []);

return ( <section
   id="products"
   className="py-20 bg-white"
 > <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


    {/* Section Header */}
    <div className="text-center mb-12">
      <p className="text-green-600 font-semibold mb-2">
        FEATURED PRODUCTS
      </p>

      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Popular Health Products
      </h2>

      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        Discover some of our most popular healthcare and
        wellness products.
      </p>
    </div>

    {/* Loading */}
    {loading ? (
      <div className="text-center py-12">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />

        <p className="text-gray-500">
          Loading featured products...
        </p>
      </div>
    ) : products.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-gray-500">
          No featured products available.
        </p>
      </div>
    ) : (
      /* Product Grid */
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((product) => {
          const liked = isInWishlist(product.id);

          return (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
            >

              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100 h-60">

                <Link to={`/products/${product.id}`}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
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
                    className={
                      liked ? "fill-red-500" : ""
                    }
                  />
                </button>

                {/* Category */}
                <span className="absolute bottom-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                  {product.category}
                </span>

              </div>

              {/* Product Details */}
              <div className="p-5">

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                  />

                  <span className="text-sm text-gray-600">
                    {product.rating > 0
                      ? product.rating
                      : "New"}
                  </span>
                </div>

                {/* Product Name */}
                <Link
                  to={`/products/${product.id}`}
                  className="text-lg font-bold text-gray-800 hover:text-green-600 transition"
                >
                  {product.name}
                </Link>

                {/* Price */}
                <p className="text-green-600 font-bold text-xl mt-3">
                  ₦{product.price.toLocaleString()}
                </p>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

              </div>
            </div>
          );
        })}

      </div>
    )}

    {/* View All */}
    <div className="flex justify-center mt-12">
      <Link
        to="/products"
        className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition"
      >
        View All Products
      </Link>
    </div>

  </div>
</section>


);
};

export default FeaturedProducts;
