import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
  Quote,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Testimonial {
  id: number;
  name: string;
  message: string;
  rating: number;
  approved: boolean;
  createdAt: string;
}

const API_URL =
  "https://medi-care-api-yyxr.onrender.com/api";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/testimonials`);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || "Failed to load testimonials"
          );
        }

        setTestimonials(responseData.data || []);
      } catch (error) {
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const writeTestimonialButton = (
    <div className="flex justify-center mt-6">
      <Link
        to="/testimonial"
        className="inline-flex items-center gap-2 border border-green-600 text-green-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-50 transition"
      >
        <MessageSquareText size={17} />
        Write a Testimonial
      </Link>
    </div>
  );

  if (loading) {
    return (
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Loading testimonials...
          </p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-600 text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
            What Our Customers Say
          </h2>

          <p className="text-gray-500 text-sm mt-3">
            No testimonials available yet.
          </p>

          {writeTestimonialButton}
        </div>
      </section>
    );
  }

  const testimonial = testimonials[current];

  return (
    <section className="py-12 sm:py-16 px-5 sm:px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-green-600 text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
            What Our Customers Say
          </h2>

          <p className="text-gray-500 text-sm mt-3">
            Real experiences from our customers.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10">
          {/* Quote Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-green-50 text-green-600 p-3 rounded-full">
              <Quote size={24} />
            </div>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={17}
                className={
                  index < testimonial.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          {/* Message */}
          <p className="text-center text-gray-600 text-base sm:text-lg leading-7 max-w-2xl mx-auto">
            "{testimonial.message}"
          </p>

          {/* Customer */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <span className="text-green-700 font-bold text-lg">
                {testimonial.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {testimonial.name}
              </h3>

              <p className="text-xs text-gray-500 mt-0.5">
                Verified Customer
              </p>
            </div>
          </div>

          {/* Previous Button */}
          {testimonials.length > 1 && (
            <button
              onClick={previousTestimonial}
              aria-label="Previous testimonial"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Next Button */}
          {testimonials.length > 1 && (
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`View testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  current === index
                    ? "w-6 bg-green-600"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        {/* Write Testimonial Button */}
        {writeTestimonialButton}
      </div>
    </section>
  );
};

export default Testimonial;