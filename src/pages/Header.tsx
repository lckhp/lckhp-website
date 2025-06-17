import React, { useEffect, useRef } from "react";

const Header = () => {
  // Logo path in public directory should be referenced at root path
  const logoPath = "/lckhp-logo.png";
  const [moreDropdownOpen, setMoreDropdownOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMoreDropdown = () => {
    setMoreDropdownOpen(!moreDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <header className="relative flex max-w-screen-xl flex-col overflow-visible px-4 py-4 text-slate-700 md:mx-auto md:flex-row md:items-center w-full">
      <a
        href="/"
        className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black"
      >
        <span className="mr-2 text-4xl text-green-500">
          <img src={logoPath} height={40} width={50} alt="LCKHP Logo" />
        </span>
        LCKHP
      </a>
      <button
        className="absolute top-5 right-7 cursor-pointer md:hidden"
        onClick={toggleMobileMenu}
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle Navigation"
      >
        <span className="sr-only">Toggle Navigation</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <nav
        aria-label="Header Navigation"
        className={`flex flex-col items-center justify-between transition-all duration-300 ease-in-out w-full md:ml-24 md:flex-row md:items-start md:overflow-visible ${
          mobileMenuOpen
            ? "max-h-screen mt-8"
            : "max-h-0 md:max-h-full overflow-hidden md:overflow-visible"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-3 w-full md:w-auto md:ml-auto md:flex-row md:space-y-0 md:py-0">
          <li className="md:mr-8 lg:mr-12">
            <a
              href="/2425/members"
              className="block py-1"
              onClick={closeMobileMenu}
            >
              Our Team
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a
              href="/2425/calendar"
              className="block py-1"
              onClick={closeMobileMenu}
            >
              Calendar
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a
              href="/2425/programs"
              className="block py-1"
              onClick={closeMobileMenu}
            >
              Programs
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a
              href="/projects"
              className="block py-1"
              onClick={closeMobileMenu}
            >
              Projects
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a href="/donate" className="block py-1" onClick={closeMobileMenu}>
              Donate
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a
              href="https://blog.lckhp.org"
              className="block py-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LCKHP Blog - Read our latest articles and updates"
              title="Leo Club of Kathmandu Himalayas Patan Blog"
              onClick={closeMobileMenu}
            >
              Blog
            </a>
          </li>

          {/* More dropdown menu */}
          <li className="relative md:mr-8 lg:mr-12" ref={dropdownRef}>
            <button
              onClick={toggleMoreDropdown}
              className="flex items-center py-1 focus:outline-none mx-auto md:mx-0"
              aria-expanded={moreDropdownOpen}
              aria-haspopup="true"
            >
              More
              <svg
                className={`ml-1 h-4 w-4 transition-transform ${
                  moreDropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {moreDropdownOpen && (
              <div
                className={
                  isMobile
                    ? "w-full mt-2 flex flex-col items-center space-y-4 bg-white py-3"
                    : "absolute right-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                }
              >
                <a
                  href="/#faq-section"
                  className={
                    isMobile
                      ? "block py-1"
                      : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  }
                  onClick={closeMobileMenu}
                >
                  FAQ
                </a>
                <a
                  href="/resources"
                  className={
                    isMobile
                      ? "block py-1"
                      : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  }
                  onClick={closeMobileMenu}
                >
                  Resources
                </a>
                <a
                  href="/325r/2425/LDC325R-LeoDarpan.pdf"
                  className={
                    isMobile
                      ? "block py-1"
                      : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  Leo Darpan
                </a>
              </div>
            )}
          </li>

          <li className="w-full text-center md:w-auto md:mr-0">
            <a
              href="/register"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              onClick={closeMobileMenu}
            >
              <button className="rounded-full border-2 border-green-500 px-6 py-2 text-green-600 transition-colors hover:bg-green-500 hover:text-white w-3/4 md:w-auto">
                Join Us
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
