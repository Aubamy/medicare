import { useState } from "react";
import { Star } from "lucide-react";

const API_URL = "https://medi-care-api-yyxr.onrender.com/api";

const Testimonial = () => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const token = localStorage.getItem("medicare-token");

      if (!token) {
        throw new Error("Please login to submit a testimonial.");
      }

      const response = await fetch(`${API_URL}/testimonials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          rating,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            "Failed to submit testimonial"
        );
      }

      setSuccess(
        responseData.message ||
          "Thank you! Your testimonial has been submitted and is awaiting approval."
      );

      setMessage("");
      setRating(5);
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

  return (
    <section className="py-16 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-green-600 font-semibold uppercase tracking-wider">
            Share Your Experience
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Leave Us a Review
          </h1>

          <p className="text-gray-500 mt-4">
            Tell us about your experience with MediCare.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
        >
          {/* Rating */}
          <div className="mb-6">
            <label className="block text-gray-800 font-semibold mb-3">
              Your Rating
            </label>

            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, index) => {
                const star = index + 1;

                return (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition hover:scale-110"
                  >
                    <Star
                      size={32}
                      className={
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-800 font-semibold mb-3"
            >
              Your Review
            </label>

            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your experience..."
              required
              minLength={5}
              rows={5}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Success */}
          {success && (
            <div className="mb-5 bg-green-50 text-green-700 border border-green-200 rounded-xl p-4">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-50 text-red-700 border border-red-200 rounded-xl p-4">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Testimonial;