import React from "react";
import { Link } from "react-router-dom";
import DirectoryList from "../component/DirectoryList";

interface DirectoryCategoryProps {
  category: string;
}

const DirectoryCategory: React.FC<DirectoryCategoryProps> = ({ category }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          {category === "blood_bank"
            ? "Blood Banks"
            : category === "old_age_home"
            ? "Old Age Homes"
            : "Orphanages"}
        </h1>

        <div className="mb-6 flex justify-between">
          <Link
            to="/directory"
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-all hover:bg-gray-300"
          >
            &larr; Back to Directory
          </Link>
        </div>

        <DirectoryList category={category} />

        {/* WhatsApp Emergency Contact for Blood Banks */}
        {category === "blood_bank" && (
          <div className="mt-8 rounded-lg border-2 border-red-300 bg-red-50 p-5 text-center">
            <p className="text-lg font-medium text-red-800">
              In case of urgency in Kathmandu and Pokhara,
              <a
                href="https://wa.me/9779862857260"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 text-blue-600 underline hover:text-blue-800"
              >
                Whatsapp
              </a>
              your authorized hospital prescription letter to Leo Sonam Sherpa
              (Founder Member of T.U. Lions Blood Transfusion & Research Center,
              Kirtipur) in this number:
              <a
                href="https://wa.me/9779862857260"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-semibold text-blue-600 hover:text-blue-800"
              >
                +977-9862857260
              </a>
            </p>
          </div>
        )}

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

export default DirectoryCategory;
