import React, { useState, useEffect } from "react";

// Import JSON data for each category
import bloodBankData from "../assets/directory/blood_bank/blood_bank.json";
import oldAgeHomeData from "../assets/directory/old_age_home/old_age_home.json";
import orphanageData from "../assets/directory/orphanage/orphanage.json";

// Define the type for directory items
interface DirectoryItem {
  id: string;
  name: string;
  type: string;
  location: string;
  contact_number: string;
  alt_contact_number?: string;
  needs?: string;
  attention_level?: string;
  last_updated?: string;
}

interface DirectoryListProps {
  category: string;
}

const DirectoryList: React.FC<DirectoryListProps> = ({ category }) => {
  const [data, setData] = useState<DirectoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<DirectoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [itemsWithNeeds, setItemsWithNeeds] = useState<DirectoryItem[]>([]);

  // Helper function to create Google Maps search URL
  const createGoogleMapsUrl = (item: DirectoryItem) => {
    const query = encodeURIComponent(`${item.name}, ${item.location}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    // Format: YYYY/MM/DD to DD MMM YYYY
    const [year, month, day] = dateString
      .split("/")
      .map((num) => parseInt(num));

    if (isNaN(year) || isNaN(month) || isNaN(day)) return dateString;

    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Load the appropriate data based on the category
  useEffect(() => {
    let categoryData: DirectoryItem[] = [];

    switch (category) {
      case "blood_bank":
        categoryData = bloodBankData as DirectoryItem[];
        break;
      case "old_age_home":
        categoryData = oldAgeHomeData as DirectoryItem[];
        break;
      case "orphanage":
        categoryData = orphanageData as DirectoryItem[];
        break;
      default:
        categoryData = [];
    }

    // Sort by attention_level (higher values first)
    const sortedData = [...categoryData].sort((a, b) => {
      const levelA = parseInt(a.attention_level || "0");
      const levelB = parseInt(b.attention_level || "0");
      return levelB - levelA;
    });

    setData(sortedData);
    setFilteredData(sortedData);

    // Extract items with needs
    const needsItems = sortedData.filter(
      (item) => item.needs && item.needs.trim() !== ""
    );
    setItemsWithNeeds(needsItems);

    // Extract unique districts from the data
    const uniqueDistricts = new Set<string>();
    categoryData.forEach((item) => {
      const locationParts = item.location.split(",");
      if (locationParts.length > 0) {
        const district = locationParts[locationParts.length - 1].trim();
        uniqueDistricts.add(district);
      }
    });

    setDistricts(Array.from(uniqueDistricts).sort());
  }, [category]);

  // Filter data based on search term and selected district
  useEffect(() => {
    let result = data;

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearchTerm) ||
          item.location.toLowerCase().includes(lowerSearchTerm) ||
          item.contact_number.includes(searchTerm)
      );
    }

    if (selectedDistrict) {
      result = result.filter((item) =>
        item.location.includes(selectedDistrict)
      );
    }

    setFilteredData(result);
  }, [searchTerm, selectedDistrict, data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district === selectedDistrict ? null : district);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {category === "blood_bank"
          ? "Blood Banks"
          : category === "old_age_home"
          ? "Old Age Homes"
          : "Orphanages"}
      </h2>

      {/* Needs Section - Only for old_age_home and orphanage */}
      {(category === "old_age_home" || category === "orphanage") &&
        itemsWithNeeds.length > 0 && (
          <div className="mb-8 rounded-lg bg-amber-50 p-5 border-l-4 border-amber-500">
            <h3 className="mb-3 text-xl font-semibold text-amber-800">
              Urgent Needs
            </h3>
            <div className="space-y-3">
              {itemsWithNeeds.map((item) => (
                <div
                  key={`need-${item.id}`}
                  className="rounded bg-white p-3 shadow-sm"
                >
                  <a
                    href={createGoogleMapsUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-800 hover:text-blue-600 transition-colors cursor-pointer inline-block"
                  >
                    {item.name}
                  </a>
                  <div className="grid grid-cols-1 gap-1 mt-1 md:grid-cols-2">
                    <div className="flex items-start text-gray-700">
                      <svg
                        className="mr-1 h-4 w-4 text-gray-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <a
                        href={createGoogleMapsUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {item.location}
                      </a>
                    </div>
                    <div className="flex items-start text-gray-700">
                      <svg
                        className="mr-1 h-4 w-4 text-gray-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{item.contact_number}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-amber-700 justify-between">
                    <div className="flex items-center">
                      <svg
                        className="mr-1 h-4 w-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Needs: {item.needs}</span>
                    </div>
                    {item.last_updated && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg
                          className="mr-1 h-3.5 w-3.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1.4 1v1H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1.6V3a1 1 0 00-2 0v1H8V3a1 1 0 00-2 0v1zm1 5a1 1 0 011 1v3a1 1 0 11-2 0V8a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Updated: {formatDate(item.last_updated)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, location or contact number..."
          className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* District Filter Buttons */}
      {districts.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 font-medium text-gray-700">
            Filter by District:
          </h3>
          <div className="flex flex-wrap gap-2">
            {districts.map((district) => (
              <button
                key={district}
                onClick={() => handleDistrictSelect(district)}
                className={`rounded-full px-4 py-1 text-sm ${
                  selectedDistrict === district
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {district}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Found {filteredData.length}{" "}
        {filteredData.length === 1 ? "result" : "results"}
      </div>

      {/* List of Items */}
      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="rounded-lg bg-white p-5 shadow-md">
              <a
                href={createGoogleMapsUrl(item)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer inline-block"
              >
                {item.name}
              </a>
              <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="flex items-start">
                  <svg
                    className="mr-2 h-5 w-5 text-gray-500 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <a
                    href={createGoogleMapsUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {item.location}
                  </a>
                </div>
                <div className="flex items-start">
                  <svg
                    className="mr-2 h-5 w-5 text-gray-500 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <div>{item.contact_number}</div>
                    {item.alt_contact_number && (
                      <div className="text-gray-500">
                        {item.alt_contact_number}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Show needs if available */}
              {item.needs && item.needs.trim() !== "" && (
                <div className="mt-3 flex items-start justify-between">
                  <div className="flex items-start">
                    <svg
                      className="mr-2 h-5 w-5 text-amber-500 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="font-medium text-amber-700">
                      Needs: {item.needs}
                    </div>
                  </div>
                  {item.last_updated && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg
                        className="mr-1 h-3.5 w-3.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1.4 1v1H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1.6V3a1 1 0 00-2 0v1H8V3a1 1 0 00-2 0v1zm1 5a1 1 0 011 1v3a1 1 0 11-2 0V8a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Updated: {formatDate(item.last_updated)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-gray-100 p-6 text-center">
            <p className="text-gray-600">
              No results found. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryList;
