import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlishContext";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3">
            <Heart className="text-red-500" size={30} />

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>

              <p className="text-gray-500 mt-1">
                Products you've saved for later
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center">
              <Heart
                size={38}
                className="text-red-400"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              You haven't added any products to your wishlist yet.
              Browse our products and save your favorites.
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {wishlist.length}{" "}
                {wishlist.length === 1 ? "product" : "products"} saved
              </p>

              <Link
                to="/products"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Wishlist;