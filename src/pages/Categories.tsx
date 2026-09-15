import {
Baby,
HeartPulse,
Pill,
ShieldCheck,
Sparkles,
Stethoscope,
Syringe,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
{
name: "Medicines",
description: "Quality medicines for your everyday healthcare needs.",
icon: Pill,
color: "bg-blue-100 text-blue-600",
},
{
name: "Vitamins",
description: "Supplements and vitamins to support your wellbeing.",
icon: Sparkles,
color: "bg-yellow-100 text-yellow-600",
},
{
name: "Medical Devices",
description: "Reliable devices for monitoring and managing your health.",
icon: Stethoscope,
color: "bg-purple-100 text-purple-600",
},
{
name: "Baby Care",
description: "Gentle and trusted products for your little ones.",
icon: Baby,
color: "bg-pink-100 text-pink-600",
},
{
name: "Personal Care",
description: "Products to keep you fresh, clean and confident.",
icon: ShieldCheck,
color: "bg-green-100 text-green-600",
},
{
name: "Wellness",
description: "Products designed to support a healthier lifestyle.",
icon: HeartPulse,
color: "bg-red-100 text-red-600",
},
];

const Categories = () => {
return (
<> <Navbar />


  <div className="min-h-screen bg-gray-50">
    {/* Hero */}
    <section className="bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-4">
          <Syringe size={42} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">
          Shop by Category
        </h1>

        <p className="mt-4 text-green-100 max-w-2xl mx-auto">
          Find the healthcare and wellness products you need,
          organized into simple categories.
        </p>
      </div>
    </section>

    {/* Categories */}
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(
                category.name
              )}`}
              className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition border border-gray-100"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mb-5 group-hover:scale-105 transition`}
              >
                <Icon size={30} />
              </div>

              <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition">
                {category.name}
              </h2>

              <p className="text-gray-500 mt-2 leading-relaxed">
                {category.description}
              </p>

              <div className="mt-5 text-green-600 font-semibold">
                Browse Products →
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  </div>

  <Footer />
</>

);
};

export default Categories;
