const Footer = () => {
    return (
      <footer className="bg-gray-50">
        {/* Main Footer Section */}
        <div className="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:px-10">
          {/* About Section */}
          <div className="max-w-sm">
            <div className="mb-6 flex h-12 items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">LCKHP</span>
            </div>
            <p className="text-gray-600">
              The Leo Club of Kathmandu Himalayas Patan has been serving communities since 1974. Our mission is to empower youth and foster leadership for a meaningful impact.
            </p>
          </div>
  
          {/* Address Section */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-800">Address</h3>
            <address className="text-gray-600 not-italic">
            M8M9+68M, Kupondole Rd, <br />
             Lalitpur 44600, Nepal <br />
            </address>
          </div>
  
       {/* Links Section */}
<div>
  <h3 className="mb-4 text-lg font-medium text-gray-800">Links</h3>
  <ul className="space-y-3 text-gray-600">
    <li>
      <a
        className="hover:text-green-600 hover:underline"
        href="https://www.facebook.com/lckhp"
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
    </li>
    <li>
      <a
        className="hover:text-green-600 hover:underline"
        href="https://www.instagram.com/lckhpatan/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </li>
    <li>
      <a
        className="hover:text-green-600 hover:underline"
        href="https://www.linkedin.com/company/100013568/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </li>
    <li>
      <a
        className="hover:text-green-600 hover:underline"
        href="mailto:info@lckhp.com"
      >
        Gmail
      </a>
    </li>
    <li>
      <a
        className="hover:text-green-600 hover:underline"
        href="/contact" // Assuming the contact page is at /contact
      >
        Contact
      </a>
    </li>
  </ul>
</div>

  
          {/* Newsletter Section */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Subscribe to Our Newsletter
            </h3>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                className="h-12 rounded-lg border-gray-300 bg-gray-100 px-4 text-gray-700 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="rounded-lg bg-green-600 px-6 py-3 text-white transition duration-300 hover:bg-green-500 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
  
        {/* Bottom Footer Section */}
        <div className="bg-gray-100">
          <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-y-4 px-4 py-4 text-center text-gray-600 sm:flex-row sm:justify-between sm:text-left">
            <p>© 2024 LCKHP | All Rights Reserved</p>
            <div>
              <a
                className="hover:text-green-600 hover:underline"
                href="#"
              >
                Privacy Policy
              </a>
              <span className="mx-2">|</span>
              <a
                className="hover:text-green-600 hover:underline"
                href="#"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  