
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSubmitted(false);

      await api.post("/contact", formData);

      setSubmitted(true);

      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Failed to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <MessageCircle size={46} className="mx-auto mb-4" />

            <h1 className="text-4xl md:text-5xl font-bold">
              Contact Us
            </h1>

            <p className="mt-4 text-green-100 max-w-2xl mx-auto">
              Have a question or need help? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <main className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <Phone size={24} />
                </div>

                <h3 className="font-bold text-gray-900 mt-4">
                  Phone
                </h3>

                <p className="text-gray-500 mt-1">
                  +234 800 000 0000
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Mail size={24} />
                </div>

                <h3 className="font-bold text-gray-900 mt-4">
                  Email
                </h3>

                <p className="text-gray-500 mt-1">
                  support@medicare.com
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <MapPin size={24} />
                </div>

                <h3 className="font-bold text-gray-900 mt-4">
                  Location
                </h3>

                <p className="text-gray-500 mt-1">
                  Lagos, Nigeria
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Clock size={24} />
                </div>

                <h3 className="font-bold text-gray-900 mt-4">
                  Opening Hours
                </h3>

                <p className="text-gray-500 mt-1">
                  Monday - Saturday
                </p>

                <p className="text-gray-500">
                  8:00 AM - 8:00 PM
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                Send us a message
              </h2>

              <p className="text-gray-500 mt-2">
                Fill out the form below and our team will get back
                to you.
              </p>

              {submitted && (
                <div className="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                  Message submitted successfully! 
                </div>
              )}

              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is your message about?"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <Send size={19} />

                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
