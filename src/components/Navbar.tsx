import { useState } from "react";

import {
  Menu,
  X,
  ShoppingCart,
  Search,
  HeartPulse,
  Heart,
  Package,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlishContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { totalItems } = useCart();

  const { wishlist } = useWishlist();

  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    loading,
    logout,
  } = useAuth();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();

    closeMenu();

    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <HeartPulse size={22} />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 whitespace-nowrap">
              Medi
              <span className="text-green-600">
                Care
              </span>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">

            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Products
            </Link>

            <Link
              to="/categories"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Categories
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-green-600 transition"
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Contact
            </Link>

          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-5">

            {/* Search */}
            <Link
              to="/products"
              className="text-gray-700 hover:text-green-600 transition"
              aria-label="Search products"
            >
              <Search size={21} />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-gray-700 hover:text-red-500 transition"
              aria-label="Wishlist"
            >
              <Heart size={21} />

              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-green-600 transition"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Authentication */}
            {!loading && (
              isAuthenticated ? (
                <div className="flex items-center gap-3">

                  <Link
                    to="/profile"
                    className="text-green-600 hover:text-green-700 font-medium transition"
                  >
                    Hi, {user?.fullName}
                  </Link>

                  {/* Orders */}
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition font-medium"
                  >
                    <Package size={18} />
                    Orders
                  </Link>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin/dashboard")}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
                    >
                      Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Logout
                  </button>

                </div>
              ) : (
                <div className="flex items-center gap-3">

                  {/* Login */}
                  <button
                    onClick={() => navigate("/login")}
                    className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition font-medium"
                  >
                    Login
                  </button>

                  {/* Create Account */}
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-medium"
                  >
                    Create Account
                  </button>

                </div>
              )
            )}

          </div>

          {/* Mobile / Tablet Actions */}
          <div className="flex lg:hidden items-center gap-3">

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-gray-700 hover:text-red-500 transition"
              aria-label="Wishlist"
            >
              <Heart size={21} />

              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-green-600 transition"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl transition shrink-0"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg w-full">

          <div className="px-4 sm:px-6 py-6">

            {/* Navigation */}
            <div className="flex flex-col">

              <Link
                to="/"
                onClick={closeMenu}
                className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:text-green-600 transition"
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={closeMenu}
                className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:text-green-600 transition"
              >
                Products
              </Link>

              <Link
                to="/#categories"
                onClick={closeMenu}
                className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:text-green-600 transition"
              >
                Categories
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:text-green-600 transition"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="py-4 border-b border-gray-100 text-gray-700 font-medium hover:text-green-600 transition"
              >
                Contact
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                onClick={closeMenu}
                className="flex items-center justify-between py-4 border-b border-gray-100 text-gray-700 font-medium hover:text-red-500 transition"
              >
                <span>Wishlist</span>

                {wishlist.length > 0 && (
                  <span className="bg-red-500 text-white text-xs min-w-6 h-6 px-2 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

            </div>

            {/* Mobile Actions */}
            <div className="mt-6">

              {!loading && (
                isAuthenticated ? (

                  <div className="space-y-4">

                    {/* Profile */}
                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="block bg-green-50 rounded-xl p-4 hover:bg-green-100 transition"
                    >
                      <p className="text-sm text-gray-500">
                        Welcome back
                      </p>

                      <p className="font-bold text-gray-800 mt-1">
                        {user?.fullName}
                      </p>

                      <p className="text-sm text-green-600 mt-2 font-medium">
                        View Profile →
                      </p>
                    </Link>

                    {/* Orders */}
                    <Link
                      to="/orders"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 w-full border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl font-medium transition"
                    >
                      <Package size={19} />
                      My Orders
                    </Link>

                    {/* Admin Dashboard */}
                    {user?.role === "admin" && (
                      <button
                        onClick={() => {
                          closeMenu();
                          navigate("/admin/dashboard");
                        }}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition"
                      >
                        Admin Dashboard
                      </button>
                    )}

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                    >
                      Logout
                    </button>

                  </div>

                ) : (

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      onClick={() => {
                        closeMenu();
                        navigate("/login");
                      }}
                      className="border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-xl font-medium transition"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => {
                        closeMenu();
                        navigate("/register");
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
                    >
                      Register
                    </button>

                  </div>

                )
              )}

            </div>

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;