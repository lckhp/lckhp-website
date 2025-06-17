import React, { useEffect, useRef } from "react";

const Header = () => {
  // Logo path in public directory should be referenced at root path
  const logoPath = "/lckhp-logo.png";
  const [isMobile, setIsMobile] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Dropdown states
  const [aboutDropdownOpen, setAboutDropdownOpen] = React.useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = React.useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = React.useState(false);

  // Timeout refs for delayed closing
  const aboutTimeoutRef = useRef<number | null>(null);
  const programsTimeoutRef = useRef<number | null>(null);
  const mediaTimeoutRef = useRef<number | null>(null);

  // Refs for dropdowns
  const aboutDropdownRef = useRef<HTMLLIElement>(null);
  const programsDropdownRef = useRef<HTMLLIElement>(null);
  const mediaDropdownRef = useRef<HTMLLIElement>(null);

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

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
      if (programsTimeoutRef.current) clearTimeout(programsTimeoutRef.current);
      if (mediaTimeoutRef.current) clearTimeout(mediaTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    // Only add click outside listener for mobile
    // Desktop will use hover instead
    if (isMobile) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          aboutDropdownRef.current &&
          !aboutDropdownRef.current.contains(event.target as Node)
        ) {
          setAboutDropdownOpen(false);
        }
        if (
          programsDropdownRef.current &&
          !programsDropdownRef.current.contains(event.target as Node)
        ) {
          setProgramsDropdownOpen(false);
        }
        if (
          mediaDropdownRef.current &&
          !mediaDropdownRef.current.contains(event.target as Node)
        ) {
          setMediaDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMobile]);

  const closeAllDropdowns = () => {
    setAboutDropdownOpen(false);
    setProgramsDropdownOpen(false);
    setMediaDropdownOpen(false);
  };

  const toggleAboutDropdown = () => {
    // Only toggle if mobile (desktop uses hover)
    if (isMobile) {
      setAboutDropdownOpen(!aboutDropdownOpen);
      setProgramsDropdownOpen(false);
      setMediaDropdownOpen(false);
    }
  };

  const toggleProgramsDropdown = () => {
    // Only toggle if mobile (desktop uses hover)
    if (isMobile) {
      setProgramsDropdownOpen(!programsDropdownOpen);
      setAboutDropdownOpen(false);
      setMediaDropdownOpen(false);
    }
  };

  const toggleMediaDropdown = () => {
    // Only toggle if mobile (desktop uses hover)
    if (isMobile) {
      setMediaDropdownOpen(!mediaDropdownOpen);
      setAboutDropdownOpen(false);
      setProgramsDropdownOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    closeAllDropdowns();
  };

  // Event handlers for hover
  const handleMouseEnter = (dropdown: "about" | "programs" | "media") => {
    if (!isMobile) {
      // Clear any pending timeout that would close this dropdown
      if (dropdown === "about" && aboutTimeoutRef.current) {
        clearTimeout(aboutTimeoutRef.current);
        aboutTimeoutRef.current = null;
      } else if (dropdown === "programs" && programsTimeoutRef.current) {
        clearTimeout(programsTimeoutRef.current);
        programsTimeoutRef.current = null;
      } else if (dropdown === "media" && mediaTimeoutRef.current) {
        clearTimeout(mediaTimeoutRef.current);
        mediaTimeoutRef.current = null;
      }

      // Open the current dropdown and close others
      if (dropdown === "about") {
        setAboutDropdownOpen(true);
        setProgramsDropdownOpen(false);
        setMediaDropdownOpen(false);
      } else if (dropdown === "programs") {
        setProgramsDropdownOpen(true);
        setAboutDropdownOpen(false);
        setMediaDropdownOpen(false);
      } else if (dropdown === "media") {
        setMediaDropdownOpen(true);
        setAboutDropdownOpen(false);
        setProgramsDropdownOpen(false);
      }
    }
  };

  const handleMouseLeave = (dropdown: "about" | "programs" | "media") => {
    if (!isMobile) {
      // Set a short timeout before closing to allow moving between elements
      if (dropdown === "about") {
        aboutTimeoutRef.current = setTimeout(() => {
          setAboutDropdownOpen(false);
        }, 100);
      } else if (dropdown === "programs") {
        programsTimeoutRef.current = setTimeout(() => {
          setProgramsDropdownOpen(false);
        }, 100);
      } else if (dropdown === "media") {
        mediaTimeoutRef.current = setTimeout(() => {
          setMediaDropdownOpen(false);
        }, 100);
      }
    }
  };

  // Dropdown menu styles
  const dropdownMenuStyles = {
    mobile: "w-full mt-2 flex flex-col items-center space-y-4 bg-white py-3",
    desktop:
      "absolute left-0 mt-0 pt-2 w-48 bg-white rounded-b-md shadow-lg ring-1 ring-black ring-opacity-5 z-50",
  };

  // Dropdown item styles
  const dropdownItemStyles = {
    mobile: "block py-1",
    desktop: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
  };

  // Dropdown button with caret
  const DropdownButton = ({
    label,
    isOpen,
    onClick,
  }: {
    label: string;
    isOpen: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="flex items-center py-1 focus:outline-none mx-auto md:mx-0"
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {label}
      <svg
        className={`ml-1 h-4 w-4 transition-transform ${
          isOpen ? "rotate-180" : ""
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
  );

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
        <ul className="flex flex-col items-center space-y-4 py-3 w-full md:w-auto md:ml-auto md:flex-row md:space-y-0 md:py-0 md:items-center">
          {/* About Us Dropdown */}
          <li
            className="relative md:mr-8 lg:mr-12"
            ref={aboutDropdownRef}
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={() => handleMouseLeave("about")}
          >
            <div className="h-full flex items-center">
              <DropdownButton
                label="About Us"
                isOpen={aboutDropdownOpen}
                onClick={toggleAboutDropdown}
              />
            </div>

            {/* About Us Dropdown menu - positioned absolute */}
            {aboutDropdownOpen && (
              <div
                className={
                  isMobile
                    ? dropdownMenuStyles.mobile
                    : `${dropdownMenuStyles.desktop} top-full`
                }
              >
                <a
                  href="/#about-section"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  onClick={closeMobileMenu}
                >
                  About Us
                </a>
                <a
                  href="/2425/members"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  onClick={closeMobileMenu}
                >
                  Members
                </a>
                <a
                  href="/#contact-section"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
                <a
                  href="/#faq-section"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  onClick={closeMobileMenu}
                >
                  FAQ
                </a>
              </div>
            )}
          </li>

          {/* Programs & Events Dropdown */}
          <li
            className="relative md:mr-8 lg:mr-12"
            ref={programsDropdownRef}
            onMouseEnter={() => handleMouseEnter("programs")}
            onMouseLeave={() => handleMouseLeave("programs")}
          >
            <div className="h-full flex items-center">
              <DropdownButton
                label="Programs & Events"
                isOpen={programsDropdownOpen}
                onClick={toggleProgramsDropdown}
              />
            </div>

            {/* Programs Dropdown menu */}
            {programsDropdownOpen && (
              <div
                className={
                  isMobile
                    ? dropdownMenuStyles.mobile
                    : `${dropdownMenuStyles.desktop} top-full`
                }
              >
                <a
                  href="/2425/programs"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  onClick={closeMobileMenu}
                >
                  Our Programs
                </a>
                <a
                  href="/projects"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  onClick={closeMobileMenu}
                >
                  Projects
                </a>
                <a
                  href="/2425/calendar"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  onClick={closeMobileMenu}
                >
                  Calendar
                </a>
              </div>
            )}
          </li>

          {/* Media & Updates Dropdown */}
          <li
            className="relative md:mr-8 lg:mr-12"
            ref={mediaDropdownRef}
            onMouseEnter={() => handleMouseEnter("media")}
            onMouseLeave={() => handleMouseLeave("media")}
          >
            <div className="h-full flex items-center">
              <DropdownButton
                label="Media & Updates"
                isOpen={mediaDropdownOpen}
                onClick={toggleMediaDropdown}
              />
            </div>

            {/* Media Dropdown menu */}
            {mediaDropdownOpen && (
              <div
                className={
                  isMobile
                    ? dropdownMenuStyles.mobile
                    : `${dropdownMenuStyles.desktop} top-full`
                }
              >
                <a
                  href="/325r/2425/LDC325R-LeoDarpan.pdf"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  Leo Darpan
                </a>
                <a
                  href="https://blog.lckhp.org"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LCKHP Blog - Read our latest articles and updates"
                  title="Leo Club of Kathmandu Himalayas Patan Blog"
                  onClick={closeMobileMenu}
                >
                  Blog
                </a>
                <a
                  href="/resources"
                  className={
                    isMobile
                      ? dropdownItemStyles.mobile
                      : dropdownItemStyles.desktop
                  }
                  onClick={closeMobileMenu}
                >
                  Resources
                </a>
              </div>
            )}
          </li>

          {/* Donate link */}
          <li className="md:mr-8 lg:mr-12 flex items-center h-full">
            <a href="/donate" className="block py-1" onClick={closeMobileMenu}>
              Donate
            </a>
          </li>

          {/* Join Us button */}
          <li className="w-full text-center md:w-auto md:mr-0 flex items-center h-full">
            <a
              href="/register"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full md:w-auto"
              onClick={closeMobileMenu}
            >
              <button className="rounded-full border-2 border-green-500 px-6 py-2 text-green-600 transition-colors hover:bg-green-500 hover:text-white mx-auto whitespace-nowrap">
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
