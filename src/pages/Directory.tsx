import React from "react";
import { Link } from "react-router-dom";

// Icons for the buttons
const BloodBankIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const OldAgeHomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const OrphanageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const Directory: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Directory
        </h1>

        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              to="/directory/blood-bank"
              className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-all hover:bg-gray-800 hover:text-white"
            >
              <div className="mb-3 rounded-full bg-red-100 p-3 text-red-600">
                <BloodBankIcon />
              </div>
              <h3 className="text-lg font-medium">Blood Banks</h3>
            </Link>

            <Link
              to="/directory/old-age-homes"
              className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-all hover:bg-gray-800 hover:text-white"
            >
              <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-600">
                <OldAgeHomeIcon />
              </div>
              <h3 className="text-lg font-medium">Old Age Homes</h3>
            </Link>

            <Link
              to="/directory/orphanages"
              className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-all hover:bg-gray-800 hover:text-white"
            >
              <div className="mb-3 rounded-full bg-purple-100 p-3 text-purple-600">
                <OrphanageIcon />
              </div>
              <h3 className="text-lg font-medium">Orphanages</h3>
            </Link>
          </div>
        </div>

        {/* Go to Home Button */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition-all hover:bg-green-600 hover:shadow-md"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
