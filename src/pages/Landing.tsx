import { useEffect, useState } from "react";
import fiftyYearLogo from "../assets/lckhp-logo-50-years.png";

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { label: "Years of Service", value: "50+" },
    { label: "Projects Completed", value: "200+" },
    { label: "Lives Impacted", value: "10,000+" },
    { label: "Active Members", value: "50+" },
  ];

  return (
    <div
      id="home"
      className="relative bg-gradient-to-b from-green-50 to-white overflow-hidden"
    >
      {/* Hero Content */}
      <div className="relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text Content */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Leo Club of{" "}
                <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                  Kathmandu Himalayas Patan
                </span>
              </h1>

              <p className="mb-6 max-w-2xl text-lg text-gray-700">
                Since 1974, we have been the oldest existing Leo Club in Nepal,
                dedicated to empowering youth and creating meaningful social
                impact through service and innovation.
              </p>

              <div className="mb-8 flex flex-wrap gap-4">
                <a
                  href="/register"
                  className="inline-flex items-center justify-center rounded-full bg-green-500 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  Join Our Mission
                </a>
                <a
                  href="/#about-section"
                  className="inline-flex items-center justify-center rounded-full border-2 border-green-500 bg-transparent px-6 py-3 text-base font-medium text-green-500 transition-all duration-300 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  Learn More
                </a>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-green-100/60 p-4 shadow-sm"
                  >
                    <p className="text-2xl font-bold text-green-700">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div
              className={`flex justify-center transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-green-500/20 blur-xl" />
                <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-blue-500/20 blur-xl" />

                {/* Main image with frame */}
                <div className="relative rounded-xl bg-gradient-to-br from-green-500 to-blue-500 p-1 shadow-2xl">
                  <img
                    src={fiftyYearLogo}
                    alt="LCKHP 50 Years Anniversary Logo"
                    className="h-full w-full rounded-lg object-contain bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
