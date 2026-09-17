import { useEffect, useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  id: number;
  productName: string;
  price: number;
  image: string;
}

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: number;
  totalAmount: number;
  paymentReference: string | null;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

const API_URL = "https://medi-care-api-yyxr.onrender.com/api";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("medicare-token");

        if (!token) {
          throw new Error("Please login to view your orders.");
        }

        const response = await fetch(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || "Failed to load orders"
          );
        }

        setOrders(responseData.data?.orders || []);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle size={18} />;

      case "shipped":
        return <Truck size={18} />;

      case "processing":
      case "paid":
      case "pending":
        return <Clock size={18} />;

      case "cancelled":
        return <XCircle size={18} />;

      default:
        return <Package size={18} />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-purple-100 text-purple-700";

      case "paid":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="text-gray-500 hover:text-green-600 transition text-sm"
            >
              ← Back to Home
            </Link>

            <div className="flex items-center gap-3 mt-5">
              <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                <ShoppingBag size={26} />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  My Orders
                </h1>

                <p className="text-gray-500 mt-1">
                  Track and manage your pharmacy orders
                </p>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2
                size={35}
                className="animate-spin text-green-600"
              />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-5">
              {error}
            </div>
          )}

          {/* Empty Orders */}
          {!loading && !error && orders.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
              <Package
                size={50}
                className="mx-auto text-gray-300"
              />

              <h2 className="text-xl font-bold text-gray-800 mt-4">
                No Orders Yet
              </h2>

              <p className="text-gray-500 mt-2">
                You haven't placed any orders yet.
              </p>

              <Link
                to="/products"
                className="inline-flex mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                Start Shopping
              </Link>
            </div>
          )}

          {/* Orders */}
          {!loading && !error && orders.length > 0 && (
            <div className="space-y-5">
              {orders.map((order) => {
                const totalItems =
                  order.items?.reduce(
                    (total, item) =>
                      total + Number(item.quantity),
                    0
                  ) || 0;

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6"
                  >

                    {/* Top */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                      <div>
                        <p className="text-sm text-gray-500">
                          Order ID
                        </p>

                        <h2 className="font-bold text-gray-800 text-lg">
                          #{order.id}
                        </h2>
                      </div>

                      {/* Status */}
                      <div
                        className={`inline-flex items-center gap-2 w-fit px-3 py-2 rounded-full text-sm font-medium capitalize ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>

                    </div>

                    {/* Products */}
                    {order.items?.length > 0 && (
                      <div className="mt-6 pt-5 border-t space-y-3">

                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4"
                          >
                            <img
                              src={item.product?.image}
                              alt={item.product?.productName}
                              className="w-14 h-14 rounded-xl object-cover border border-gray-100"
                            />

                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">
                                {item.product?.productName ||
                                  "Product"}
                              </p>

                              <p className="text-sm text-gray-500 mt-1">
                                Quantity: {item.quantity}
                              </p>
                            </div>

                            <p className="font-semibold text-gray-800">
                              ₦
                              {Number(
                                item.price
                              ).toLocaleString()}
                            </p>
                          </div>
                        ))}

                      </div>
                    )}

                    {/* Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-6 pt-5 border-t">

                      <div>
                        <p className="text-sm text-gray-500">
                          Order Date
                        </p>

                        <p className="font-medium text-gray-800 mt-1">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Items
                        </p>

                        <p className="font-medium text-gray-800 mt-1">
                          {totalItems}{" "}
                          {totalItems === 1
                            ? "item"
                            : "items"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Total
                        </p>

                        <p className="font-bold text-green-600 mt-1">
                          ₦
                          {Number(
                            order.totalAmount
                          ).toLocaleString()}
                        </p>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Continue Shopping */}
          {!loading && (
            <div className="text-center mt-10">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition"
              >
                <ShoppingBag size={19} />
                Continue Shopping
              </Link>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Orders;