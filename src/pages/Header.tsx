const Header = () => {
  // Logo path in public directory should be referenced at root path
  const logoPath = "/leo-logo.png";

  return (
    <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-slate-700 md:mx-auto md:flex-row md:items-center">
      <a
        href="#"
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
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
      <nav
        aria-label="Header Navigation"
        className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
      >
        <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
          <li className="md:mr-12">
            <a href="/2425/members" target="_blank">
              Our Team
            </a>
          </li>
          <li className="md:mr-12">
            <a href="/2425/calendar" target="_blank">
              Calendar
            </a>
          </li>
          <li className="md:mr-12">
            <a href="/2425/programs" target="_blank">
              Programs
            </a>
          </li>
          <li className="md:mr-12">
            <a href="/directory" target="_blank">
              Directory
            </a>
          </li>
          <li className="md:mr-12">
            <a href="/resources" target="_blank">
              Resources
            </a>
          </li>
          <li className="md:mr-12">
            <a href="325r/2425/LDC325R-LeoDarpan.pdf" target="_blank">
              Leo Darpan
            </a>
          </li>
          <li className="md:mr-12">
            <a href="/register" target="_blank" rel="noopener noreferrer">
              <button className="rounded-full border-2 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white">
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
