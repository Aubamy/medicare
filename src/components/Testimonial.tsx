import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${API_URL}/testimonials`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message ||
              "Failed to load testimonials"
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
    setCurrent(
      (prev) => (prev + 1) % testimonials.length
    );
  };

  const previousTestimonial = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + testimonials.length) %
        testimonials.length
    );
  };

  if (loading) {
    return (
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">
            Loading testimonials...
          </p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-600 font-semibold uppercase tracking-wider">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            What Our Customers Say
          </h2>

          <p className="text-gray-500 mt-4">
            No testimonials available yet.
          </p>
        </div>
      </section>
    );
  }

  const testimonial = testimonials[current];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-green-600 font-semibold uppercase tracking-wider">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            What Our Customers Say
          </h2>

          <p className="text-gray-500 mt-4">
            Hear from customers who have experienced
            MediCare.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <span
                  key={index}
                  className={
                    index < testimonial.rating
                      ? "text-yellow-400 text-2xl"
                      : "text-gray-300 text-2xl"
                  }
                >
                  ★
                </span>
              )
            )}
          </div>

          {/* Message */}
          <p className="text-center text-gray-600 text-lg md:text-xl leading-8 max-w-2xl mx-auto">
            "{testimonial.message}"
          </p>

          {/* Customer */}
          <div className="flex flex-col items-center mt-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-700 font-bold text-2xl">
                {testimonial.name
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 mt-4">
              {testimonial.name}
            </h3>

            <p className="text-sm text-gray-500">
              Happy Customer
            </p>
          </div>

          {/* Previous Button */}
          {testimonials.length > 1 && (
            <button
              onClick={previousTestimonial}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next Button */}
          {testimonials.length > 1 && (
            <button
              onClick={nextTestimonial}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2.5 rounded-full transition-all ${
                  current === index
                    ? "w-7 bg-green-600"
                    : "w-2.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonial;