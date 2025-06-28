import { useEffect, useState } from "react";
import about from "../assets/about.png";
import SEO from "../components/SEO";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about-section");
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
      id="about-section"
      className="relative mx-auto px-4 py-16 sm:px-6 lg:px-8"
    >
      <SEO
        title="About Leo Club of Kathmandu Himalayas Patan | History & Mission"
        description="Learn about Leo Club of Kathmandu Himalayas Patan, Nepal's oldest Leo Club since 1974. Discover our history, mission, and community service work in Kathmandu and Patan."
        keywords="leo club history nepal, oldest leo club nepal, history of leo club nepal, leo club vs lions club, youth volunteering nepal, community service nepal, leo club of kathmandu himalayas patan history"
        url="/about"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">About Us</span>
            <span className="mt-2 block text-lg font-normal text-gray-500">
              Serving with Pride Since 1974
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 bg-green-500"></div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Image Section - Appears first on mobile, second on desktop */}
          <div
            className={`order-1 lg:order-2 transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -left-6 -top-6 h-64 w-64 rounded-full bg-green-200/30 -z-10"></div>
              <div className="absolute -bottom-6 -right-6 h-64 w-64 rounded-full bg-green-100/30 -z-10"></div>

              {/* Main image with frame */}
              <div className="overflow-hidden rounded-lg shadow-xl">
                <img
                  src={about}
                  alt="Leo Club of Kathmandu Himalayas Patan Members in Action"
                  className="h-full w-full transform object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -right-6 -top-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500 p-2 text-center text-white shadow-lg">
                <div>
                  <div className="text-xl font-bold">50+</div>
                  <div className="text-xs">Years of Service</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Section - Appears second on mobile, first on desktop */}
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                The Leo Club of Kathmandu Himalayas Patan, chartered on October
                29, 1974, is Nepal's oldest existing Leo Club. With over 50
                years of service, we have been at the forefront of youth
                empowerment and community development in Kathmandu and Patan.
                Our club is part of a global network of Leos, working to inspire
                leadership, teamwork, and volunteerism among young individuals.
              </p>

              <p className="text-lg text-gray-700">
                As a youth volunteer organization in Nepal, we organize various
                community service activities including health awareness
                programs, environmental initiatives, disaster relief, blood
                donation camps, and support for orphanages and old age homes. We
                strive to address local challenges and build a better future for
                our community and beyond.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <h3 className="mb-2 text-xl font-semibold text-green-600">
                    Our Motto
                  </h3>
                  <p className="text-gray-600">
                  Leadership, Experience, Opportunity.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <h3 className="mb-2 text-xl font-semibold text-green-600">
                    Our Goal
                  </h3>
                  <p className="text-gray-600">
                    Empower youth to lead and serve.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="/register"
                  className="inline-flex items-center rounded-full bg-green-500 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Our Team
                </a>
                <a
                  href="/2425/programs"
                  className="inline-flex items-center rounded-full border-2 border-green-500 bg-transparent px-6 py-3 text-base font-medium text-green-500 transition-all duration-300 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
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

export default About;
