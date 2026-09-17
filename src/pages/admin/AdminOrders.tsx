import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Loader2,
  RefreshCw,
  Eye,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;

  product: {
    id: number;
    productName: string;
    price: number;
    image: string;
  };
}

interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  paymentReference: string | null;
  status: string;
  createdAt: string;

  user: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
  };

  items: OrderItem[];
}

const AdminOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/orders");

      setOrders(response.data.data || []);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-emerald-100 text-emerald-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const handleStatusChange = async (
    id: number,
    status: string
  ) => {
    try {
      setError("");

      await api.put(`/admin/orders/${id}/status`, {
        status,
      });

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === id
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Failed to update order status"
      );
    }
  };

  return (
    <div className="p-6 md:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customer orders.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 px-4 py-3 rounded-xl font-semibold transition"
        >
          <RefreshCw
            size={19}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 mb-6">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2
            size={35}
            className="animate-spin text-green-600"
          />
        </div>
      ) : orders.length === 0 ? (

        /* Empty */
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">

          <ShoppingBag
            size={50}
            className="mx-auto text-gray-300"
          />

          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            No orders yet
          </h2>

          <p className="text-gray-500 mt-2">
            Customer orders will appear here.
          </p>

        </div>

      ) : (

        /* Orders Table */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 border-b border-gray-100">

                <tr>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Order
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    View
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Items
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Total
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {orders.map((order) => (

                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition"
                  >

                    {/* Order */}
                    <td className="px-6 py-4">

                      <p className="font-semibold text-gray-900">
                        #{order.id}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {order.paymentReference ||
                          "No payment reference"}
                      </p>

                    </td>

                    {/* View Details */}
                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/orders/${order.id}`
                          )
                        }
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition"
                      >
                        <Eye size={18} />
                        View
                      </button>

                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">

                      <p className="font-semibold text-gray-900">
                        {order.user?.fullName ||
                          "Unknown Customer"}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {order.user?.email || "No email"}
                      </p>

                    </td>

                    {/* Items */}
                    <td className="px-6 py-4">

                      <div className="space-y-2">

                        {order.items?.length > 0 ? (
                          order.items
                            .slice(0, 2)
                            .map((item) => (

                              <div
                                key={item.id}
                                className="flex items-center gap-2"
                              >

                                {item.product?.image ? (
                                  <img
                                    src={item.product.image}
                                    alt={
                                      item.product.productName
                                    }
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded bg-gray-100" />
                                )}

                                <span className="text-sm text-gray-700">
                                  {item.product?.productName ||
                                    "Unknown Product"}{" "}
                                  × {item.quantity}
                                </span>

                              </div>

                            ))
                        ) : (
                          <span className="text-sm text-gray-400">
                            No items
                          </span>
                        )}

                        {order.items?.length > 2 && (
                          <p className="text-xs text-green-600 font-medium">
                            +{order.items.length - 2} more items
                          </p>
                        )}

                      </div>

                    </td>

                    {/* Total */}
                    <td className="px-6 py-4">

                      <span className="font-semibold text-gray-900">
                        ₦
                        {Number(
                          order.totalAmount
                        ).toLocaleString()}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-semibold capitalize outline-none border-0 cursor-pointer ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        <option value="pending">
                          Pending
                        </option>

                        <option value="paid">
                          Paid
                        </option>

                        <option value="processing">
                          Processing
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-500">

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminOrders;