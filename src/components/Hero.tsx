import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  HeartPulse,
  Pill,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left Content */}
          <div className="w-full min-w-0">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Health,
              <span className="block text-green-600">Our Priority</span>
            </h1>

            {/* Description */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Get quality medicines, healthcare products and wellness
              essentials delivered safely and conveniently to your doorstep.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 sm:mt-8">
              <Link
                to="/products"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 sm:px-7 py-3.5 rounded-xl font-medium transition"
              >
                Shop Now
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/products"
                className="w-full sm:w-auto flex items-center justify-center border border-green-600 text-green-600 hover:bg-green-50 px-6 sm:px-7 py-3.5 rounded-xl font-medium transition"
              >
                View Products
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-10">
              <div className="flex flex-col items-center text-center min-w-0">
                <div className="bg-green-100 text-green-600 p-2 sm:p-3 rounded-xl mb-2 sm:mb-3">
                  <Truck size={18} className="sm:hidden" />
                  <Truck size={22} className="hidden sm:block" />
                </div>

                <p className="font-semibold text-gray-800 text-[11px] sm:text-sm leading-tight">
                  Fast Delivery
                </p>
              </div>

              <div className="flex flex-col items-center text-center min-w-0">
                <div className="bg-blue-100 text-blue-600 p-2 sm:p-3 rounded-xl mb-2 sm:mb-3">
                  <ShieldCheck size={18} className="sm:hidden" />
                  <ShieldCheck size={22} className="hidden sm:block" />
                </div>

                <p className="font-semibold text-gray-800 text-[11px] sm:text-sm leading-tight">
                  Trusted Products
                </p>
              </div>

              <div className="flex flex-col items-center text-center min-w-0">
                <div className="bg-orange-100 text-orange-600 p-2 sm:p-3 rounded-xl mb-2 sm:mb-3">
                  <Clock size={18} className="sm:hidden" />
                  <Clock size={22} className="hidden sm:block" />
                </div>

                <p className="font-semibold text-gray-800 text-[11px] sm:text-sm leading-tight">
                  24/7 Support
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full min-w-0 relative">
            {/* Main Card */}
            <div className="relative w-full overflow-hidden bg-green-600 rounded-2xl sm:rounded-3xl px-5 py-10 sm:p-12 min-h-[330px] sm:min-h-[400px] flex items-center justify-center">
              {/* Decorative Circles */}
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full border-[20px] border-green-500 opacity-60" />
              <div className="absolute -bottom-20 -left-16 w-52 h-52 rounded-full border-[25px] border-green-500 opacity-60" />

              {/* Floating Icons */}
              <div className="absolute top-8 left-7 bg-white/15 text-white p-3 rounded-2xl rotate-[-12deg]">
                <Pill size={28} />
              </div>

              <div className="absolute bottom-8 right-7 bg-white/15 text-white p-3 rounded-2xl rotate-[12deg]">
                <Stethoscope size={28} />
              </div>

              <div className="relative z-10 text-center text-white w-full">
                {/* Main Icon */}
                <div className="inline-flex items-center justify-center bg-white text-green-600 p-5 rounded-full shadow-lg mb-5">
                  <HeartPulse size={48} />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  Better Health Starts Here
                </h2>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-green-100">
                  Quality healthcare products you can trust.
                </p>

                {/* Small Labels */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  <span className="bg-white/15 border border-white/20 text-white text-xs sm:text-sm px-3 py-2 rounded-full">
                    Quality Care
                  </span>

                  <span className="bg-white/15 border border-white/20 text-white text-xs sm:text-sm px-3 py-2 rounded-full">
                    Safe Products
                  </span>

                  <span className="bg-white/15 border border-white/20 text-white text-xs sm:text-sm px-3 py-2 rounded-full">
                    Trusted Service
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="w-full sm:w-auto sm:absolute sm:-bottom-6 sm:-left-4 md:-left-8 bg-white shadow-lg sm:shadow-xl rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 mt-4 sm:mt-0">
              <div className="bg-green-100 p-2.5 sm:p-3 rounded-xl text-green-600 shrink-0">
                <ShieldCheck size={24} className="sm:hidden" />
                <ShieldCheck size={28} className="hidden sm:block" />
              </div>

              <div className="min-w-0">
                <p className="font-bold text-gray-800 text-sm sm:text-base">
                  100% Genuine
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  Quality Guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;