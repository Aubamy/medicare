import { useState } from "react";
import { Link,} from "react-router-dom";
import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "../context/cartContext";
import api from "../api/axios";

const Checkout = () => {
const { cart, totalPrice } = useCart();


const [formData, setFormData] = useState({
name: "",
email: "",
phone: "",
address: "",
note: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (
e: React.FormEvent<HTMLFormElement>
) => {
e.preventDefault();


try {
  setLoading(true);
  setError("");

  // Create the order from the user's server-side cart
  const checkoutResponse = await api.post("/checkout");

  const { orderId } = checkoutResponse.data;

  // Initialize Paystack payment
  const paymentResponse = await api.post(
    "/payment/initialize",
    {
      orderId,
    }
  );

  const { paymentUrl } = paymentResponse.data;

  // Send customer to Paystack
  window.location.href = paymentUrl;
} catch (error: any) {
  setError(
    error?.response?.data?.message ||
      "Unable to place your order. Please try again."
  );

  setLoading(false);
}


};

if (cart.length === 0) {
return ( <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4"> <div className="text-center"> <ShoppingBag
         size={60}
         className="mx-auto text-gray-400 mb-5"
       />


      <h1 className="text-2xl font-bold text-gray-800">
        Your cart is empty
      </h1>

      <p className="text-gray-500 mt-2">
        Add some products before checking out.
      </p>

      <Link
        to="/products"
        className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
      >
        Browse Products
      </Link>
    </div>
  </div>
);


}

return ( <div className="min-h-screen bg-gray-50 py-10 px-4"> <div className="max-w-6xl mx-auto">


    {/* Back */}
    <Link
      to="/cart"
      className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-8"
    >
      <ArrowLeft size={18} />
      Back to Cart
    </Link>

    <h1 className="text-3xl font-bold text-gray-800 mb-8">
      Checkout
    </h1>

    {error && (
      <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl">
        {error}
      </div>
    )}

    <div className="grid lg:grid-cols-3 gap-8">

      {/* Customer Form */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Delivery Information
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="08012345678"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your delivery address"
              rows={4}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Note (Optional)
            </label>

            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Any special instructions?"
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Processing...
              </>
            ) : (
              "Place Order"
            )}
          </button>

        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Order Summary
        </h2>

        <div className="space-y-4">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-medium text-gray-800">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-gray-800">
                ₦
                {(
                  item.price * item.quantity
                ).toLocaleString()}
              </p>
            </div>
          ))}

        </div>

        <div className="border-t mt-6 pt-5 flex justify-between">
          <span className="font-semibold text-gray-700">
            Total
          </span>

          <span className="text-xl font-bold text-green-600">
            ₦{totalPrice.toLocaleString()}
          </span>
        </div>

      </div>

    </div>
  </div>
</div>

);
};

export default Checkout;
