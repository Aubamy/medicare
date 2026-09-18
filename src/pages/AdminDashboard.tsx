import { useEffect, useState } from "react";
import {
  Users,
  Package,
  ShoppingBag,
  Loader2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
}

interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
  createdAt?: string;
}

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  user?: {
    fullName: string;
    email: string;
  };
  items?: any[];
}

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [
        dashboardResponse,
        productsResponse,
        ordersResponse,
      ] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/products"),
        api.get("/admin/orders"),
      ]);

      // Dashboard statistics
      setStats(dashboardResponse.data.data);

      // Products
      // Support both { data: { products: [] } } and { data: [] } responses.
      const productsPayload = productsResponse.data?.data;

      const productData: Product[] = Array.isArray(productsPayload)
        ? productsPayload
        : productsPayload?.products || [];

      // Display the newest products first.
      // Fall back to the product ID if createdAt is unavailable.
      const recentProducts = [...productData]
        .sort((a, b) => {
          const dateA = a.createdAt
            ? new Date(a.createdAt).getTime()
            : 0;

          const dateB = b.createdAt
            ? new Date(b.createdAt).getTime()
            : 0;

          if (dateA && dateB) {
            return dateB - dateA;
          }

          return Number(b.id) - Number(a.id);
        })
        .slice(0, 5);

      setProducts(recentProducts);

      // Orders
      const orderData =
        ordersResponse.data.data || [];

      setOrders(orderData.slice(0, 5));
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user?.role === "admin") {
      fetchDashboard();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  // Authentication loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2
          size={35}
          className="animate-spin text-green-600"
        />
      </div>
    );
  }

  // Admin protection
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Access Denied
          </h1>

          <p className="text-gray-500 mt-2">
            You do not have permission to access the admin
            dashboard.
          </p>
        </div>
      </div>
    );
  }

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "paid":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-purple-100 text-purple-700";

      case "shipped":
        return "bg-indigo-100 text-indigo-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Welcome back, {user.fullName}.
              </p>
            </div>

            <button
              onClick={() => fetchDashboard(true)}
              disabled={refreshing}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold px-4 py-2.5 rounded-xl transition"
            >
              <RefreshCw
                size={18}
                className={
                  refreshing ? "animate-spin" : ""
                }
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>

          </div>

        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2
              size={35}
              className="animate-spin text-green-600"
            />
          </div>
        ) : (
          <>
            {/* Statistics */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Users */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">
                        Total Users
                      </p>

                      <h2 className="text-3xl font-bold text-gray-900 mt-2">
                        {stats.totalUsers}
                      </h2>
                    </div>

                    <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
                      <Users size={26} />
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">
                        Total Products
                      </p>

                      <h2 className="text-3xl font-bold text-gray-900 mt-2">
                        {stats.totalProducts}
                      </h2>
                    </div>

                    <div className="bg-green-100 text-green-600 p-4 rounded-xl">
                      <Package size={26} />
                    </div>
                  </div>
                </div>

                {/* Orders */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">
                        Total Orders
                      </p>

                      <h2 className="text-3xl font-bold text-gray-900 mt-2">
                        {stats.totalOrders}
                      </h2>
                    </div>

                    <div className="bg-purple-100 text-purple-600 p-4 rounded-xl">
                      <ShoppingBag size={26} />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Recent Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-8 overflow-hidden">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-gray-100">

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Products
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Latest products in your pharmacy.
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate("/admin/products")
                  }
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
                >
                  View All
                  <ArrowRight size={18} />
                </button>

              </div>

              {products.length === 0 ? (
                <div className="p-10 text-center">
                  <Package
                    size={45}
                    className="mx-auto text-gray-300"
                  />

                  <p className="text-gray-500 mt-3">
                    No products available yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>

                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                          Product
                        </th>

                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                          Category
                        </th>

                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                          Price
                        </th>

                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                          Quantity
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50 transition"
                        >

                          <td className="px-6 py-4">

                            <div className="flex items-center gap-3">

                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.productName}
                                  className="w-12 h-12 rounded-xl object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                                  <Package
                                    size={22}
                                    className="text-green-600"
                                  />
                                </div>
                              )}

                              <div>
                                <p className="font-semibold text-gray-900">
                                  {product.productName}
                                </p>

                                <p className="text-sm text-gray-500">
                                  ID: #{product.id}
                                </p>
                              </div>

                            </div>

                          </td>

                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {product.category}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-900">
                              ₦
                              {Number(
                                product.price
                              ).toLocaleString()}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {product.quantity}
                            </span>
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>
              )}

            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-8 overflow-hidden">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-gray-100">

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Orders
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Latest customer orders.
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate("/admin/orders")
                  }
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
                >
                  View All
                  <ArrowRight size={18} />
                </button>

              </div>

              {orders.length === 0 ? (
                <div className="p-10 text-center">
                  <ShoppingBag
                    size={45}
                    className="mx-auto text-gray-300"
                  />

                  <p className="text-gray-500 mt-3">
                    No orders available yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>

                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                          Order
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

                        <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                          Action
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 transition"
                        >

                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-900">
                              #{order.id}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {order.user?.fullName ||
                                  "Unknown customer"}
                              </p>

                              <p className="text-sm text-gray-500">
                                {order.user?.email ||
                                  "No email"}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {order.items?.length || 0}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-900">
                              ₦
                              {Number(
                                order.totalAmount
                              ).toLocaleString()}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusClass(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-end">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/admin/orders/${order.id}`
                                  )
                                }
                                className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm"
                              >
                                View
                                <ArrowRight size={16} />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>
              )}

            </div>

          </>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;