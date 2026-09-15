
import { useEffect, useState } from "react";
import {
  Mail,
  MessageSquare,
  Loader2,
  RefreshCw,
  User,
  Calendar,
} from "lucide-react";

import api from "../../api/axios";

interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchMessages = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await api.get("/contact");

      setMessages(response.data);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Failed to load messages"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Customer Messages
              </h1>

              <p className="text-gray-500 mt-1">
                Messages sent through the contact form.
              </p>
            </div>

            <button
              onClick={() => fetchMessages(true)}
              disabled={refreshing}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold px-4 py-2.5 rounded-xl transition"
            >
              <RefreshCw
                size={18}
                className={refreshing ? "animate-spin" : ""}
              />

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2
              size={35}
              className="animate-spin text-green-600"
            />
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <MessageSquare
              size={50}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-xl font-bold text-gray-800 mt-4">
              No messages yet
            </h2>

            <p className="text-gray-500 mt-2">
              Customer messages will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <User size={17} />
                        {message.fullName}
                      </span>

                      <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <Mail size={17} />
                        {message.email}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mt-4">
                      {message.subject}
                    </h2>

                    <p className="text-gray-600 mt-3 leading-7 whitespace-pre-wrap">
                      {message.message}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-5">
                      <Calendar size={16} />

                      {new Date(
                        message.createdAt
                      ).toLocaleString()}
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ${
                      message.isRead
                        ? "bg-gray-100 text-gray-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {message.isRead ? "Read" : "Unread"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminMessages;
