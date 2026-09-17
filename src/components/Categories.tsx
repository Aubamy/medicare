
import {
  Pill,
  HeartPulse,
  Baby,
  Stethoscope,
  Sparkles,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Medicines",
    description: "Quality medicines",
    icon: Pill,
  },
  {
    name: "Vitamins",
    description: "Boost your health",
    icon: HeartPulse,
  },
  {
    name: "Personal Care",
    description: "Care for yourself",
    icon: Sparkles,
  },
  {
    name: "Baby Care",
    description: "For your little ones",
    icon: Baby,
  },
  {
    name: "Wellness",
    description: "Live healthier",
    icon: Activity,
  },
  {
    name: "Medical Devices",
    description: "Health essentials",
    icon: Stethoscope,
  },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-green-600 font-semibold mb-2">
              SHOP BY CATEGORY
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything You Need for Better Health
            </h2>

            <p className="text-gray-600 mt-3 max-w-2xl">
              Explore our wide range of healthcare and wellness products.
            </p>
          </div>

          {/* View All */}
          <Link
            to="/categories"
            className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition"
          >
            View All
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(
                  category.name
                )}`}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-2 transition duration-300 cursor-pointer group"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition">
                  <Icon size={30} />
                </div>

                {/* Category Name */}
                <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-2">
                  {category.description}
                </p>

                {/* Browse */}
                <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-semibold mt-4 opacity-0 group-hover:opacity-100 transition">
                  Browse
                  <ArrowRight size={15} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;