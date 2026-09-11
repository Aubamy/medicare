import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <p className="text-green-600 font-semibold">
              SHOPPING CART
            </p>

            <h1 className="text-4xl font-bold text-gray-900 mt-2">
              Your Cart
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">

              <ShoppingBag
                size={60}
                className="mx-auto text-gray-300"
              />

              <h2 className="text-2xl font-bold text-gray-800 mt-5">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mt-2">
                Add some healthcare products to your cart.
              </p>

            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-5"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-xl"
                    />

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {item.category}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>

                      </div>

                      <div className="flex items-center justify-between mt-6">

                        <p className="text-green-600 font-bold text-lg">
                          ₦{item.price.toLocaleString()}
                        </p>

                        <div className="flex items-center border rounded-lg">

                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="px-4 font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>

                        </div>

                      </div>

                    </div>
                  </div>
                ))}

              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">

                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="flex justify-between mt-6 text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between mt-4 text-gray-600">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t mt-6 pt-6 flex justify-between">
                  <span className="font-bold text-gray-900">
                    Total
                  </span>

                  <span className="font-bold text-green-600 text-xl">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>

                <Link
  to="/checkout"
  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-3 rounded-xl transition"
>
  Proceed to Checkout
</Link>

              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cart;