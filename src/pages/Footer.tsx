import { useState } from "react";
import facebookLogo from "../assets/logos/facebook.png";
import instagramLogo from "../assets/logos/instagram.webp";
import linkedinLogo from "../assets/logos/linkedin.png";
import emailLogo from "../assets/logos/email.png";
import { Helmet } from "react-helmet-async";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "") return;

    setIsSubmitting(true);
    setSubscribeError("");

    try {
      // Send subscription data to Formspree
      const response = await fetch("https://formspree.io/f/xblopgdv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          subject: "Newsletter Subscription",
          message: `A new user has subscribed to your Newsletter: ${email}`,
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        // Reset after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setSubscribeError(error.message);
      } else {
        setSubscribeError("An unexpected error occurred");
      }
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  // JSON-LD structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Leo Club of Kathmandu Himalayas Patan",
    url: "https://lckhp.org",
    logo: "https://lckhp.org/lckhp-logo.png",
    sameAs: [
      "https://www.facebook.com/lckhp",
      "https://www.instagram.com/lckhimalayaspatan/",
      "https://www.linkedin.com/company/100013568/",
    ],
    description:
      "Leo Club of Kathmandu Himalayas Patan, established in 1974, is Nepal's oldest Leo Club focusing on youth volunteering, community service, and leadership development.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kupondole Rd",
      addressLocality: "Patan",
      addressRegion: "Lalitpur",
      postalCode: "44600",
      addressCountry: "Nepal",
    },
    email: "info@lckhp.org",
    foundingDate: "1974-10-29",
    keywords:
      "leo club nepal, youth volunteering, community service, blood donation, donate to orphanage, old age home, leadership development",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@lckhp.org",
      url: "https://lckhp.org/#contact-section",
    },
  };

  return (
    <footer className="relative bg-green-800 text-white pt-12 mt-12">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* Professional wave with clean angles */}
      <div className="absolute -top-16 left-0 right-0 h-16 overflow-hidden">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,100 L0,60 C360,95 720,15 1440,60 L1440,100 Z"
            fill="#166534"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-2 pb-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div>
            <h3 className="mb-4 text-2xl font-bold uppercase tracking-wide text-green-300">
              LCKHP
            </h3>
            <p className="mb-4 text-gray-300">
              The Leo Club of Kathmandu Himalayas Patan has been serving
              communities since 1974. Our mission is to empower youth and foster
              leadership for a meaningful impact.
            </p>
            <address className="not-italic text-gray-300">
              M8M9+68M, Kupondole Rd, <br />
              Lalitpur 44600, Nepal
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-green-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#about-section"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/2425/programs"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                >
                  Our Programs
                </a>
              </li>
              <li>
                <a
                  href="/2425/members"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                >
                  Members
                </a>
              </li>
              <li>
                <a
                  href="/2425/calendar"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                >
                  Calendar
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                >
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="/325r/2425/LDC325R-LeoDarpan.pdf"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                  target="_blank"
                >
                  Leo Darpan
                </a>
              </li>
              <li>
                <a
                  href="https://blog.lckhp.org"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/#faq-section"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/#contact-section"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/resources"
                  className="inline-block text-gray-300 transition-colors duration-300 hover:text-white hover:underline"
                >
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-green-300">
              Connect With Us
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.facebook.com/lckhp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white/20"
                aria-label="Facebook"
              >
                <img src={facebookLogo} alt="Facebook" className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/lckhimalayaspatan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white/20"
                aria-label="Instagram"
              >
                <img src={instagramLogo} alt="Instagram" className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/100013568/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white/20"
                aria-label="LinkedIn"
              >
                <img src={linkedinLogo} alt="LinkedIn" className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@lckhp.org"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:bg-white/20"
                aria-label="Email"
              >
                <img src={emailLogo} alt="Email" className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-gray-300">
              Stay connected with us on social media for the latest updates on
              our activities and initiatives.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-green-300">
              Subscribe to Our Newsletter
            </h3>
            {isSubscribed ? (
              <div className="rounded-lg bg-green-600/20 p-4 text-center">
                <p className="text-white">
                  Thank you for subscribing to our newsletter!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <p className="text-gray-300">
                  Get updates on our latest events and initiatives.
                </p>
                {subscribeError && (
                  <div className="rounded-lg bg-red-600/20 p-2 text-center">
                    <p className="text-white text-sm">{subscribeError}</p>
                  </div>
                )}
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg bg-white/10 py-3 pl-4 pr-12 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                  />
                  <button
                    type="submit"
                    className={`absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-2 text-white transition-colors ${
                      isSubmitting
                        ? "bg-green-700 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-400"
                    }`}
                    disabled={isSubmitting}
                    aria-label="Subscribe"
                  >
                    {isSubmitting ? (
                      <svg
                        className="h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-center text-sm text-gray-400 md:text-left">
              © {currentYear} Leo Club of Kathmandu Himalayas Patan. All Rights
              Reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a
                href="/privacy-policy"
                className="transition-colors hover:text-white hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="transition-colors hover:text-white hover:underline"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
