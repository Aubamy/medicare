import { useEffect, useState } from "react";
import {
  CheckCircle,
  Loader2,
  XCircle,
} from "lucide-react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/cartContext";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();

  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");

      if (!reference) {
        setError("Payment reference was not found.");
        setLoading(false);
        return;
      }

      try {
        await api.get(
          `/payment/verify/${reference}`
        );

        // Clear the frontend cart after
        // successful payment verification.
        clearCart();

        setSuccess(true);
      } catch (error: any) {
        setError(
          error?.response?.data?.message ||
            "Unable to verify your payment."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2
            size={55}
            className="mx-auto text-green-600 animate-spin mb-5"
          />

          <h1 className="text-2xl font-bold text-gray-800">
            Verifying Payment
          </h1>

          <p className="text-gray-500 mt-2">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
          <CheckCircle
            size={70}
            className="mx-auto text-green-600 mb-5"
          />

          <h1 className="text-3xl font-bold text-gray-800">
            Payment Successful!
          </h1>

          <p className="text-gray-500 mt-3">
            Your payment has been confirmed and your
            order has been placed successfully.
          </p>

          <div className="flex flex-col gap-3 mt-7">
            <Link
              to="/orders"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
            >
              View My Orders
            </Link>

            <Link
              to="/products"
              className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
        <XCircle
          size={70}
          className="mx-auto text-red-500 mb-5"
        />

        <h1 className="text-3xl font-bold text-gray-800">
          Payment Verification Failed
        </h1>

        <p className="text-gray-500 mt-3">
          {error}
        </p>

        <Link
          to="/orders"
          className="inline-block mt-7 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          Go to My Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentCallback;