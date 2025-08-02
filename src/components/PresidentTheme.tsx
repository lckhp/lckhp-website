import React, { useEffect, useState } from "react";
import presidentLogo from "../assets/lckhp-president-logo-2526.png";

const PresidentTheme: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("president-theme-section");
      if (element) {
        const position = element.getBoundingClientRect();
        // If element is in viewport
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="president-theme-section"
      className="relative mx-auto px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">President's Theme</span>
            <span className="mt-2 block text-lg font-normal text-gray-500">
              2025-2026
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 bg-green-500"></div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Image Section */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -left-6 -top-6 h-64 w-64 rounded-full bg-green-200/30 -z-10"></div>
              <div className="absolute -bottom-6 -right-6 h-64 w-64 rounded-full bg-green-100/30 -z-10"></div>

              {/* Main image with frame */}
              <div className="overflow-hidden rounded-lg shadow-xl">
                <img
                  src={presidentLogo}
                  alt="President's Theme - Striving For Change"
                  className="h-full w-full transform object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  President's Theme
                </h3>
                <p className="text-gray-600">Empower to Evolve</p>
              </div>

              <p className="text-lg text-gray-700">
                The idea behind Empowered to Evolve is to honor the foundation 
                built before us while ensuring we never stop growing — as 
                individuals, as a club, and as leaders. It reflects our belief 
                that when we empower ourselves and others, we naturally evolve 
                into better versions of who we are meant to be.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="/2425/programs"
                  className="inline-flex items-center rounded-full bg-green-500 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Our Programs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresidentTheme;
