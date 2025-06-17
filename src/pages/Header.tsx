const Header = () => {
  // Logo path in public directory should be referenced at root path
  const logoPath = "/lckhp-logo.png";

  return (
    <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-slate-700 md:mx-auto md:flex-row md:items-center w-full">
      <a
        href="/"
        className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black"
      >
        <span className="mr-2 text-4xl text-green-500">
          <img src={logoPath} height={40} width={50} alt="LCKHP Logo" />
        </span>
        LCKHP
      </a>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label
        className="absolute top-5 right-7 cursor-pointer md:hidden"
        htmlFor="navbar-open"
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
      </label>
      <nav
        aria-label="Header Navigation"
        className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-screen md:ml-24 md:max-h-full md:flex-row md:items-start"
      >
        <ul className="flex flex-col items-center space-y-4 py-3 w-full md:w-auto md:ml-auto md:flex-row md:space-y-0 md:py-0">
          <li className="md:mr-8 lg:mr-12">
            <a href="/2425/members" className="block py-1">
              Our Team
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a href="/2425/calendar" className="block py-1">
              Calendar
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a href="/2425/programs" className="block py-1">
              Programs
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a href="/projects" className="block py-1">
              Projects
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a href="/donate" className="block py-1">
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
            >
              Blog
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a href="/#faq-section" className="block py-1">
              FAQ
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a href="/resources" className="block py-1">
              Resources
            </a>
          </li>
          <li className="md:mr-8 lg:mr-12">
            <a
              href="/325r/2425/LDC325R-LeoDarpan.pdf"
              className="block py-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leo Darpan
            </a>
          </li>
          <li className="w-full text-center md:w-auto md:mr-0">
            <a
              href="/register"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
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
