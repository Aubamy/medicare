import {
  Clock,
  HeartPulse,
  ShieldCheck,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted & Genuine",
    description:
      "Shop with confidence knowing our healthcare products are carefully selected for quality.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your healthcare essentials delivered conveniently and safely to your doorstep.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "We're here to help whenever you need assistance with your shopping experience.",
  },
  {
    icon: HeartPulse,
    title: "Health Comes First",
    description:
      "Your health and wellbeing remain at the heart of everything we do.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-green-600 font-semibold mb-2">
            WHY CHOOSE MEDICARE
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Healthcare you can rely on
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed">
            We make it simple to find the healthcare products
            you need while giving you a convenient and reliable
            shopping experience.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">
                  <Icon size={30} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mt-6">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 mt-3 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-green-600 rounded-3xl p-8 md:p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold">
                Your health matters to us.
              </h3>

              <p className="text-green-100 mt-2">
                Quality healthcare products, all in one place.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl">
              <HeartPulse size={24} />

              <span className="font-semibold">
                Care you can trust
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;