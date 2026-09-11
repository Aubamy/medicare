import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Package,
  User,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";

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

const API_URL = "http://localhost:3000/api";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("medicare-token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        `${API_URL}/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load order"
        );
      }

      setOrder(data);
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

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (
    status: string
  ) => {
    try {
      const token = localStorage.getItem("medicare-token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await fetch(
        `${API_URL}/admin/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setOrder((previous) =>
        previous
          ? {
              ...previous,
              status,
            }
          : previous
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2
          size={38}
          className="animate-spin text-green-600"
        />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6 md:p-8">
        <button
          onClick={() => navigate("/admin/orders")}
          className="flex items-center gap-2 text-green-600 font-semibold mb-6"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>

        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-5">
          {error || "Order not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => navigate("/admin/orders")}
            className="flex items-center gap-2 text-green-600 font-semibold mb-3 hover:text-green-700"
          >
            <ArrowLeft size={19} />
            Back to Orders
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Order #{order.id}
          </h1>

          <p className="text-gray-500 mt-1">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <select
          value={order.status}
          onChange={(e) =>
            handleStatusChange(e.target.value)
          }
          className="px-4 py-3 rounded-xl border border-gray-200 bg-white font-semibold capitalize outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Customer + Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Customer */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <User
                size={20}
                className="text-green-600"
              />
            </div>

            <h2 className="text-lg font-bold text-gray-900">
              Customer Information
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>
              <p className="font-semibold text-gray-900 mt-1">
                {order.user?.fullName ||
                  "Unknown Customer"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Mail
                size={18}
                className="text-gray-400"
              />

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>
                <p className="font-medium text-gray-800">
                  {order.user?.email || "No email"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone
                size={18}
                className="text-gray-400"
              />

              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>
                <p className="font-medium text-gray-800">
                  {order.user?.phone || "No phone"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <CreditCard
                size={20}
                className="text-blue-600"
              />
            </div>

            <h2 className="text-lg font-bold text-gray-900">
              Payment Information
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                Payment Reference
              </p>

              <p className="font-medium text-gray-800 mt-1 break-all">
                {order.paymentReference ||
                  "No payment reference"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Order Status
              </p>

              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold capitalize">
                {order.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <p className="text-2xl font-bold text-gray-900 mt-1">
                ₦
                {Number(
                  order.totalAmount
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <Package
              size={20}
              className="text-purple-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Order Items
            </h2>

            <p className="text-sm text-gray-500">
              {order.items?.length || 0} product
              {(order.items?.length || 0) !== 1
                ? "s"
                : ""}
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {order.items?.length > 0 ? (
            order.items.map((item) => (
              <div
                key={item.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <img
                  src={item.product?.image}
                  alt={item.product?.productName}
                  className="w-20 h-20 rounded-xl object-cover border border-gray-100"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.product?.productName ||
                      "Unknown Product"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="font-semibold text-gray-900">
                    ₦
                    {Number(
                      item.price
                    ).toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    ₦
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString()}{" "}
                    total
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-500">
              No items found for this order.
            </div>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-gray-100 p-6 flex justify-end">
          <div className="w-full sm:w-72">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                Order Total
              </span>

              <span className="text-2xl font-bold text-gray-900">
                ₦
                {Number(
                  order.totalAmount
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;