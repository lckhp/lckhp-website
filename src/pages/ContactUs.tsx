import {
  FaDiscord,
  FaFacebook,
  FaLinkedin,
  FaViber,
  FaInstagram,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="relative mx-auto px-8 pt-16 sm:max-w-xl md:max-w-full md:px-8 lg:py-24 xl:px-16">
      <div className="mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <h2 className="mb-6 font-sans text-3xl font-extrabold leading-snug tracking-tight text-gray-800 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mb-4 text-base text-gray-600 md:text-lg">
            We’d love to hear from you! Let’s connect and work together for a
            better tomorrow!
          </p>

          <div className="space-y-6 text-gray-600 md:text-lg">
            <div>
              <h3 className="text-xl font-medium text-gray-800">📧 Email</h3>
              <p>
                <a
                  href="mailto:info@lckhp.org"
                  className="text-green-500 hover:underline"
                >
                  info@lckhp.org
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">📍 Address</h3>
              <p>Kathmandu, Nepal</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">🌐 Follow Us</h3>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://www.facebook.com/lckhp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-green-600 hover:text-green-500"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/lckhpatan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-green-600 hover:text-green-500"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://discord.gg/aawStVKTJr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-green-600 hover:text-green-500"
                >
                  <FaDiscord />
                </a>
                <a
                  href="https://www.linkedin.com/company/100013568/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-green-600 hover:text-green-500"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://wa.me/9779818143788/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-green-600 hover:text-green-500"
                >
                  <FaViber />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.1066092026667!2d85.31829069999999!3d27.683099700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19fd42edcd99%3A0x976e01e07f9cb64a!2sLions%20Dental%20Service%20Center!5e0!3m2!1sen!2snp!4v1733549800785!5m2!1sen!2snp"
            height="350"
            allowFullScreen
            className="w-full rounded-lg shadow-md"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
