import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <SEO
        title="Page Not Found | Leo Club of Kathmandu Himalayas Patan"
        description="The page you're looking for could not be found. Explore other resources from Leo Club of Kathmandu Himalayas Patan."
        keywords="leo club nepal, youth volunteering nepal, community service nepal"
        url="/404"
      />
      <div className="text-center max-w-2xl">
        <p className="text-base font-semibold text-green-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            You might be looking for:
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <li>
              <Link
                to="/"
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Home Page
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Join Leo Club
              </Link>
            </li>
            <li>
              <Link
                to="/2425/programs"
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Our Programs
              </Link>
            </li>
            <li>
              <Link
                to="/directory"
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Directory for Donations
              </Link>
            </li>
            <li>
              <Link
                to="/directory/blood-bank"
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Blood Donation Centers
              </Link>
            </li>
            <li>
              <Link
                to="/2425/members"
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Our Members
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Go back home
          </Link>
          <Link
            to="/2425/programs"
            className="rounded-md border border-green-600 px-3.5 py-2.5 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-50"
          >
            View Our Programs
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
