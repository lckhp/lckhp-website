import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
// Set default year here - EASY TO UPDATE
const defaultYear = "2425";
// Import members data based on year
import membersData2425 from "../assets/members/json/2425.json";
import membersData2324 from "../assets/members/json/2324.json";
import membersData2526 from "../assets/members/json/2526.json";
import GoHomeButton from "../components/GoHomeButton";

interface MembersProps {
  year: string;
}

interface Member {
  id: number;
  name: string;
  photo_path: string;
  designation: string;
  membership_type: string;
  [key: string]: any; // For other properties
}

const Members: React.FC<MembersProps> = ({ year }) => {
  const navigate = useNavigate();
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Get the right members data based on year
  useEffect(() => {
    let data: Member[] = [];

    // Choose the data based on year
    if (year === "2425") {
      data = [...membersData2425] as Member[];
    } else if (year === "2324") {
      data = [...membersData2324] as Member[];
    } else if (year === "2526") {
      data = [...membersData2526] as Member[];
    } else {
      data = [...membersData2425] as Member[]; // Default to 2425 if year is not recognized
    }

    setMembers(data);
    setFilteredMembers(data);

    document.title = `Leo Club Members ${year} | Leo Club of Kathmandu Himalayas Patan`;
  }, [year]);

  // Handle year change
  const handleYearChange = (selectedYear: string) => {
    navigate(`/${selectedYear}/members`);
  };

  // Filter members based on search term and active filter
  useEffect(() => {
    let filtered = [...members];

    // First apply search filter
    if (searchTerm.trim()) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(lowercaseSearch) ||
          member.designation.toLowerCase().includes(lowercaseSearch)
      );
    }

    // Then apply status filter
    if (activeFilter !== "all") {
      if (activeFilter === "general") {
        filtered = filtered.filter(
          (member) =>
            member.designation !== "Dropped Member" &&
            member.designation !== "Proposed Member" &&
            member.designation !== "Inactive Member"
        );
      } else if (activeFilter === "proposed") {
        filtered = filtered.filter(
          (member) => member.designation === "Proposed Member"
        );
      } else if (activeFilter === "inactive") {
        filtered = filtered.filter(
          (member) =>
            member.designation === "Dropped Member" ||
            member.designation === "Inactive Member"
        );
      }
    }

    setFilteredMembers(filtered);
  }, [searchTerm, activeFilter, members]);

  // Count members by status
  const getMemberCounts = (members: Member[]) => {
    const generalCount = members.filter(
      (member) =>
        member.designation !== "Dropped Member" &&
        member.designation !== "Proposed Member" &&
        member.designation !== "Inactive Member"
    ).length;

    const proposedCount = members.filter(
      (member) => member.designation === "Proposed Member"
    ).length;

    const inactiveCount = members.filter(
      (member) =>
        member.designation === "Dropped Member" ||
        member.designation === "Inactive Member"
    ).length;

    return { generalCount, proposedCount, inactiveCount };
  };

  useEffect(() => {
    // Function to load all images with various extensions
    const loadImages = async () => {
      const imports = import.meta.glob([
        "../assets/members/images/*.jpg",
        "../assets/members/images/*.JPG",
        "../assets/members/images/*.jpeg",
        "../assets/members/images/*.JPEG",
        "../assets/members/images/*.png",
        "../assets/members/images/*.PNG",
        "../assets/members/images/*.webp",
        "../assets/members/images/*.WEBP",
      ]);
      const imageEntries = await Promise.all(
        Object.entries(imports).map(async ([path, importFunc]) => {
          const imageModule = (await importFunc()) as { default: string };
          const imagePath = path.split("/").pop() || "";
          return [imagePath, imageModule.default];
        })
      );
      setImages(Object.fromEntries(imageEntries));
    };

    loadImages();
  }, []);

  const getImagePath = useMemo(
    () => (photoPath: string) => {
      const imageName = photoPath.split("/").pop();
      return imageName ? images[imageName] : "";
    },
    [images]
  );

  // Prevent dragging of images
  const preventDefault = (e: React.DragEvent | React.MouseEvent) => {
    e.preventDefault();
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (year !== "2425" && year !== "2324" && year !== "2526") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
        <div className="p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl max-w-xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Sorry, members for L.Y. {year} are currently unavailable!
          </h1>
          <p className="text-lg text-blue-200 mb-6">
            Please select a valid year.
          </p>
          <div className="flex flex-col space-y-4">
            <Link
              to={`/${defaultYear}/members`}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View {getYearLabel(defaultYear)} Members
            </Link>
            <GoHomeButton variant="secondary" />
          </div>
        </div>
      </div>
    );
  }

  // Get member counts for filter badges
  const { generalCount, proposedCount, inactiveCount } =
    getMemberCounts(members);
  const totalCount = members.length;

  // Helper function to convert year code to display format
  function getYearLabel(yearCode: string): string {
    if (yearCode === "2425") return "2024/25";
    if (yearCode === "2324") return "2023/24";
    if (yearCode === "2526") return "2025/26";
    return yearCode;
  }

  // For better SEO indexing, add this function to your component
  const renderHiddenMemberLinks = () => {
    // Create these links for SEO crawlers (no need for environment check)
    return (
      <div className="sr-only" aria-hidden="true">
        <h2>Leo Club Member Profiles</h2>
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <Link to={`/${year}/members/${member.id}`}>
                Leo {member.name} - {member.designation || "Member"}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero section */}
        <div className="mb-6 relative">
          {/* Logos and title in the same row */}
          <div className="flex items-center justify-between mb-4">
            <img
              src="/lckhp-logo.png"
              alt="LCKHP Logo"
              className="h-16 md:h-20 object-contain"
            />
            <div className="text-center mx-4 flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                  Meet Our Leo Team
                </span>
              </h1>
              <p className="mt-1 text-lg text-gray-600">
                Leo Club of Kathmandu Himalayas Patan L.Y. {getYearLabel(year)}
              </p>

              {/* Year Selector */}
              <div className="mt-4 flex items-center justify-center">
                <label htmlFor="year-select" className="mr-2 text-gray-500">
                  Select Members for L.Y.
                </label>
                <select
                  id="year-select"
                  value={year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="bg-gray-100 text-gray-800 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2324">2023/24</option>
                  <option value="2425">2024/25</option>
                  <option value="2526">2025/26</option>
                </select>
              </div>
            </div>
            <img
              src="/lckhp-president-logo-2425.png"
              alt="LCKHP President Logo"
              className="h-16 md:h-20 object-contain"
            />
          </div>
        </div>

        {/* Search and filter section */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-5 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or position..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Members ({totalCount})
              </button>
              <button
                onClick={() => setActiveFilter("general")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === "general"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Active General ({generalCount})
              </button>
              <button
                onClick={() => setActiveFilter("proposed")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === "proposed"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Proposed ({proposedCount})
              </button>
              <button
                onClick={() => setActiveFilter("inactive")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === "inactive"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Inactive ({inactiveCount})
              </button>
            </div>
          </div>
        </div>

        {/* Display member count */}
        <div className="mb-8 px-4 py-3 bg-white text-center rounded-lg shadow-sm">
          {filteredMembers.length === members.length ? (
            <>
              {(() => {
                const { generalCount, proposedCount, inactiveCount } =
                  getMemberCounts(members);
                return (
                  <span className="text-lg text-gray-700">
                    Showing all {members.length} members ({" "}
                    <span className="text-green-600 font-medium">
                      {generalCount} Active General
                    </span>
                    ,{" "}
                    <span className="text-yellow-600 font-medium">
                      {proposedCount} Proposed
                    </span>
                    ,{" "}
                    <span className="text-red-500 font-medium">
                      {inactiveCount} Inactive
                    </span>
                    )
                  </span>
                );
              })()}
            </>
          ) : (
            <>
              {(() => {
                const { generalCount, proposedCount, inactiveCount } =
                  getMemberCounts(filteredMembers);
                return (
                  <span className="text-lg text-gray-700">
                    Found {filteredMembers.length}{" "}
                    {filteredMembers.length === 1 ? "member" : "members"} ({" "}
                    <span className="text-green-600 font-medium">
                      {generalCount} Active General
                    </span>
                    ,{" "}
                    <span className="text-yellow-600 font-medium">
                      {proposedCount} Proposed
                    </span>
                    ,{" "}
                    <span className="text-red-500 font-medium">
                      {inactiveCount} Inactive
                    </span>
                    )
                  </span>
                );
              })()}
            </>
          )}
        </div>

        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="relative bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center overflow-hidden group"
              >
                {/* Background element for cards */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-100 opacity-50 group-hover:bg-blue-200 transition-all"></div>

                {member.membership_type === "General Member" && (
                  <img
                    src="/leo-logo.png"
                    alt="Leo Logo"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none group-hover:opacity-15 transition-opacity"
                    style={{ zIndex: 1 }}
                    onDragStart={preventDefault}
                  />
                )}

                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500 flex items-center justify-center mb-4 group-hover:border-blue-500 transition-colors shadow-lg z-10">
                  <img
                    src={getImagePath(member.photo_path)}
                    alt={`${member.name} - ${member.designation}`}
                    className="w-full h-full object-cover pointer-events-none group-hover:scale-110 transition-transform"
                    onDragStart={preventDefault}
                  />
                </div>

                <h2 className="text-xl font-bold text-gray-800 text-center mb-1 relative z-10">
                  {member.membership_type === "General Member"
                    ? `Leo ${member.name}`
                    : member.name}
                </h2>

                <div className="mb-3 z-10">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      member.designation === "Proposed Member"
                        ? "bg-yellow-100 text-yellow-800"
                        : member.designation === "Dropped Member" ||
                          member.designation === "Inactive Member"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {member.designation}
                  </span>
                </div>

                <Link
                  to={`/${year}/members/${member.id}`}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors z-10 w-full text-center font-medium flex items-center justify-center space-x-1"
                >
                  <span>View Profile</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="mt-4 text-xl font-medium text-gray-600">
              No members found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("all");
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="navigation mt-12 text-center">
          <GoHomeButton variant="secondary" />
        </div>

        {/* Add this at the end of your component */}
        {renderHiddenMemberLinks()}
      </div>
    </div>
  );
};

export default Members;
