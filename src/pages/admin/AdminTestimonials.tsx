import { useEffect, useState } from "react";
import {
MessageSquare,
Loader2,
RefreshCw,
Trash2,
Check,
X,
Star,
Plus,
} from "lucide-react";

import api from "../../api/axios";

interface Testimonial {
id: number;
name: string;
message: string;
rating: number;
approved: boolean;
createdAt: string;
}

const AdminTestimonials = () => {
const [testimonials, setTestimonials] = useState<
Testimonial[]

> ([]);

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [showForm, setShowForm] = useState(false);

const [formData, setFormData] = useState({
name: "",
message: "",
rating: 5,
});

const fetchTestimonials = async () => {
try {
setLoading(true);
setError("");


  const response = await api.get(
    "/admin/testimonials"
  );

  setTestimonials(response.data);
} catch (error: any) {
  setError(
    error?.response?.data?.message ||
      "Failed to load testimonials"
  );
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchTestimonials();
}, []);

const handleSubmit = async (
e: React.FormEvent
) => {
e.preventDefault();


try {
  setError("");

  const response = await api.post(
    "/admin/testimonials",
    {
      name: formData.name,
      message: formData.message,
      rating: Number(formData.rating),
      approved: true,
    }
  );

  setTestimonials((previous) => [
    response.data,
    ...previous,
  ]);

  setFormData({
    name: "",
    message: "",
    rating: 5,
  });

  setShowForm(false);
} catch (error: any) {
  const message = error?.response?.data?.message;

  setError(
    Array.isArray(message)
      ? message.join(", ")
      : message || "Failed to create testimonial"
  );
}


};

const handleApproval = async (
id: number,
approved: boolean
) => {
try {
setError("");


  await api.put(
    `/admin/testimonials/${id}/approval`,
    {
      approved,
    }
  );

  setTestimonials((previous) =>
    previous.map((testimonial) =>
      testimonial.id === id
        ? {
            ...testimonial,
            approved,
          }
        : testimonial
    )
  );
} catch (error: any) {
  setError(
    error?.response?.data?.message ||
      "Failed to update testimonial"
  );
}


};

const handleDelete = async (id: number) => {
const confirmed = window.confirm(
"Are you sure you want to delete this testimonial?"
);

if (!confirmed) {
  return;
}

try {
  setError("");

  await api.delete(
    `/admin/testimonials/${id}`
  );

  setTestimonials((previous) =>
    previous.filter(
      (testimonial) =>
        testimonial.id !== id
    )
  );
} catch (error: any) {
  setError(
    error?.response?.data?.message ||
      "Failed to delete testimonial"
  );
}


};

return ( <div className="p-6 md:p-8">


  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        Testimonials
      </h1>

      <p className="text-gray-500 mt-1">
        Manage customer reviews and testimonials.
      </p>
    </div>

    <div className="flex gap-3">

      <button
        onClick={fetchTestimonials}
        disabled={loading}
        className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 px-4 py-3 rounded-xl font-semibold transition"
      >
        <RefreshCw
          size={18}
          className={
            loading ? "animate-spin" : ""
          }
        />
        Refresh
      </button>

      <button
        onClick={() =>
          setShowForm((previous) => !previous)
        }
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold transition"
      >
        <Plus size={18} />
        Add Testimonial
      </button>

    </div>

  </div>

  {/* Error */}
  {error && (
    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 mb-6">
      {error}
    </div>
  )}

  {/* Add Form */}
  {showForm && (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Add Testimonial
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Customer Name
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            placeholder="Enter customer name"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rating
          </label>

          <select
            value={formData.rating}
            onChange={(e) =>
              setFormData({
                ...formData,
                rating: Number(e.target.value),
              })
            }
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
        </div>

      </div>

      <div className="mt-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Testimonial
        </label>

        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          placeholder="Enter customer testimonial"
          required
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 mt-5">

        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-5 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Add Testimonial
        </button>

      </div>
    </form>
  )}

  {/* Loading */}
  {loading ? (
    <div className="flex justify-center py-20">
      <Loader2
        size={35}
        className="animate-spin text-green-600"
      />
    </div>
  ) : testimonials.length === 0 ? (

    /* Empty State */
    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">

      <MessageSquare
        size={50}
        className="mx-auto text-gray-300"
      />

      <h2 className="text-xl font-semibold text-gray-800 mt-4">
        No testimonials yet
      </h2>

      <p className="text-gray-500 mt-2">
        Add your first customer testimonial.
      </p>

    </div>

  ) : (

    /* Testimonials */
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {testimonials.map((testimonial) => (

        <div
          key={testimonial.id}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
        >

          {/* Top */}
          <div className="flex items-start justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-700 font-bold">
                  {testimonial.name
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  {testimonial.name}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(
                    testimonial.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                testimonial.approved
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {testimonial.approved
                ? "Approved"
                : "Pending"}
            </span>

          </div>

          {/* Rating */}
          <div className="flex gap-1 mt-5">

            {Array.from({ length: 5 }).map(
              (_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={
                    index <
                    testimonial.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              )
            )}

          </div>

          {/* Message */}
          <p className="text-gray-600 leading-relaxed mt-4">
            "{testimonial.message}"
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-gray-100 mt-6 pt-5">

            <button
              onClick={() =>
                handleApproval(
                  testimonial.id,
                  !testimonial.approved
                )
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                testimonial.approved
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {testimonial.approved ? (
                <>
                  <X size={17} />
                  Reject
                </>
              ) : (
                <>
                  <Check size={17} />
                  Approve
                </>
              )}
            </button>

            <button
              onClick={() =>
                handleDelete(testimonial.id)
              }
              className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold text-sm"
            >
              <Trash2 size={17} />
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</div>


);
};

export default AdminTestimonials;
