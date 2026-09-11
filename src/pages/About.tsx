import {
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Truck,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Products",
    description:
      "We provide quality healthcare and wellness products you can trust.",
  },
  {
    icon: HeartPulse,
    title: "Your Health First",
    description:
      "Everything we do is focused on helping you take better care of your health.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your healthcare essentials delivered conveniently to your doorstep.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare Focused",
    description:
      "Our platform makes it simple to find everyday healthcare products.",
  },
];

const About = () => {
  return (

    <>
        < Navbar />
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <HeartPulse
            size={50}
            className="mx-auto mb-5"
          />

          <h1 className="text-4xl md:text-5xl font-bold">
            About MediCare
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-green-100 text-lg">
            Making quality healthcare products easier to
            discover, access, and purchase.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-green-600 font-semibold uppercase tracking-wide">
              Who We Are
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Healthcare made simple
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed">
              MediCare is a modern online pharmacy platform
              designed to make it easier for people to discover
              healthcare, wellness, personal care, and medical
              products.
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              From everyday medicines and vitamins to medical
              devices and baby care products, we bring useful
              healthcare essentials together in one convenient
              place.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
              <HeartPulse size={32} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-6">
              Our Mission
            </h3>

            <p className="text-gray-600 mt-3 leading-relaxed">
              To create a simple, convenient, and trustworthy
              digital healthcare shopping experience for
              everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-green-600 font-semibold">
              WHY MEDICARE
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Why choose us?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mt-5">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-green-600 rounded-3xl p-10 md:p-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Take care of your health today
          </h2>

          <p className="text-green-100 mt-4 max-w-xl mx-auto">
            Explore our collection of healthcare and wellness
            products.
          </p>

          <a
            href="/products"
            className="inline-block mt-7 bg-white text-green-600 px-7 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            Shop Products
          </a>
        </div>
      </section>
    </div>

    <Footer />
    
    </>
  );
};

export default About;