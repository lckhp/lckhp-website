import { useState, useEffect } from "react";
import {
  FaDiscord,
  FaFacebook,
  FaLinkedin,
  FaViber,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("contact-section");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically send a request to a backend API
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div
      id="contact-section"
      className="relative mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:pb-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Get In Touch</span>
            <span className="mt-2 block text-lg font-normal text-gray-500">
              We'd love to hear from you
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 bg-green-500"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="rounded-xl bg-white p-8 shadow-xl">
              {isSubmitted ? (
                <div className="rounded-lg bg-green-50 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-medium text-green-800">
                    Thank You!
                  </h3>
                  <p className="text-green-700">
                    Your message has been sent successfully. We'll get back to
                    you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-3 px-4 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information & Map */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="mb-8 space-y-6 rounded-xl bg-green-50 p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-green-800">
                Contact Information
              </h3>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Address</h4>
                  <p className="text-gray-600">
                    M8M9+68M, Kupondole Rd, Lalitpur 44600, Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Email</h4>
                  <a
                    href="mailto:info@lckhp.org"
                    className="text-green-600 hover:underline"
                  >
                    info@lckhp.org
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <FaPhone />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600">+977 9869375899</p>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-lg font-medium text-gray-900">
                  Connect With Us
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/lckhp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-green-600 shadow-sm transition-all duration-300 hover:bg-green-600 hover:text-white"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://www.instagram.com/lckhpatan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-green-600 shadow-sm transition-all duration-300 hover:bg-green-600 hover:text-white"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://discord.gg/aawStVKTJr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-green-600 shadow-sm transition-all duration-300 hover:bg-green-600 hover:text-white"
                    aria-label="Discord"
                  >
                    <FaDiscord />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/100013568/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-green-600 shadow-sm transition-all duration-300 hover:bg-green-600 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://wa.me/9779818143788/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-green-600 shadow-sm transition-all duration-300 hover:bg-green-600 hover:text-white"
                    aria-label="Viber"
                  >
                    <FaViber />
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.1066092026667!2d85.31829069999999!3d27.683099700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19fd42edcd99%3A0x976e01e07f9cb64a!2sLions%20Dental%20Service%20Center!5e0!3m2!1sen!2snp!4v1733549800785!5m2!1sen!2snp"
                height="300"
                allowFullScreen
                className="w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
