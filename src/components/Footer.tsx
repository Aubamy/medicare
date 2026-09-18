import {
  HeartPulse,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 mb-5 w-fit"
            >
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <HeartPulse size={24} />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Medi<span className="text-green-500">Care</span>
              </h2>
            </Link>

            <p className="text-gray-400 leading-relaxed">
              Your trusted online pharmacy for quality medicines,
              healthcare products and wellness essentials.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="bg-gray-800 hover:bg-green-600 p-3 rounded-full transition"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-green-500 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-green-500 transition"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="hover:text-green-500 transition"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-green-500 transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">
              Customer Service
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-green-500 transition"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition"
                >
                  FAQs
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition"
                >
                  Delivery Information
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-green-500 transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5">
              Contact Us
            </h3>

            <div className="space-y-4">

              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="text-green-500 shrink-0 mt-1"
                />

                <p>Lagos, Nigeria</p>
              </div>

              <a
                href="tel:+2348000000000"
                className="flex items-center gap-3 hover:text-green-400 transition"
              >
                <Phone
                  size={20}
                  className="text-green-500 shrink-0"
                />

                <span>+234 800 000 0000</span>
              </a>

              <a
                href="mailto:support@medicare.com"
                className="flex items-center gap-3 hover:text-green-400 transition"
              >
                <Mail
                  size={20}
                  className="text-green-500 shrink-0"
                />

                <span>support@medicare.com</span>
              </a>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} MediCare Pharmacy.
              All rights reserved.
            </p>

            <p className="text-sm text-gray-500">
              Your health is our priority  <HeartPulse className="text-white flex inline-block p-1 rounded-lg bg-green-600" size={22} />
            </p>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;