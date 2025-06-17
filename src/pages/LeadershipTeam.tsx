import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Member {
  id: number;
  name: string;
  photo_path: string;
  designation: string;
  contact_number: string;
  email: string;
  club_email: string;
}

interface LeadershipPosition {
  title: string;
  member?: Member;
  isPlaceholder?: boolean;
  hidden?: boolean;
}

const LeadershipTeam: React.FC = () => {
  const [leadershipPositions, setLeadershipPositions] = useState<
    LeadershipPosition[]
  >([
    { title: "Immediate Past President" },
    { title: "President" },
    { title: "Vice President", isPlaceholder: true, hidden: true }, // Hide VP
    { title: "Secretary" },
    { title: "Treasurer" },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch members data
    import("../assets/members/json/2425.json")
      .then((data) => {
        const membersData = data.default as Member[];

        // Find specific members by exact designation
        const immediatePresident = membersData.find(
          (m) => m.designation === "Immediate Past President"
        );
        const president = membersData.find(
          (m) => m.designation === "President"
        );
        const secretary = membersData.find(
          (m) =>
            m.designation === "Secretary" ||
            m.designation === "Secretary / Acting Vice President"
        );
        const treasurer = membersData.find(
          (m) => m.designation === "Treasurer"
        );

        // Update positions with the correct members
        const updatedPositions = [
          { title: "Immediate Past President", member: immediatePresident },
          { title: "President", member: president },
          { title: "Vice President", isPlaceholder: true, hidden: true }, // Hide VP
          { title: "Secretary", member: secretary },
          { title: "Treasurer", member: treasurer },
        ];

        setLeadershipPositions(updatedPositions);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading members data:", error);
        setIsLoading(false);
      });
  }, []);

  // Function to get the correct image path
  const getImagePath = (path: string) => {
    // Remove src/ from the beginning since import paths should be relative
    if (path?.startsWith("src/")) {
      const relativePath = path.substring(4);
      try {
        // Try to load the image dynamically
        return new URL(`../${relativePath}`, import.meta.url).href;
      } catch (error) {
        console.error("Error loading image:", error);
        return "/placeholder-image.png"; // Fallback image
      }
    }
    return path || "/placeholder-image.png";
  };

  return (
    <div
      id="leadership-section"
      className="relative mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Our Leadership Team</span>
            <span className="mt-2 block text-lg font-normal text-gray-500">
              Meet the dedicated officers leading our club
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 bg-green-500"></div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              {leadershipPositions
                .filter((position) => !position.hidden)
                .map((position, index) => (
                  <div key={index} className="group">
                    {position.isPlaceholder ? (
                      // Placeholder card for Vice President with same hover effects
                      <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 h-full">
                        <div className="h-64 overflow-hidden bg-gray-200 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 text-gray-400 transition-transform duration-500 group-hover:scale-110"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>

                        <div className="p-6">
                          <div className="mb-4 h-1 w-12 bg-green-500 transition-all duration-300 group-hover:w-16"></div>

                          <h3 className="mb-1 text-xl font-bold text-gray-900">
                            XXXX
                          </h3>

                          <p className="text-green-600 font-medium">
                            {position.title}
                          </p>

                          <div className="mt-4 flex items-center text-sm text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-1 h-4 w-4 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            XXXX@lckhp.org
                          </div>
                        </div>
                      </div>
                    ) : position.member ? (
                      // Card for position with a member
                      <Link
                        to={`/2425/members/${position.member.id}`}
                        className="block h-full"
                      >
                        <div className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 h-full">
                          <div className="h-64 overflow-hidden">
                            <img
                              src={getImagePath(position.member.photo_path)}
                              alt={position.member.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder-image.png"; // Fallback image on error
                              }}
                            />
                          </div>

                          <div className="p-6">
                            <div className="mb-4 h-1 w-12 bg-green-500 transition-all duration-300 group-hover:w-16"></div>

                            <h3 className="mb-1 text-xl font-bold text-gray-900">
                              {position.member.name}
                            </h3>

                            <p className="text-green-600 font-medium">
                              {position.title}
                            </p>

                            <div className="mt-4 flex items-center text-sm text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 h-4 w-4 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              {position.member.club_email ||
                                position.member.email}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      // Empty card for positions without a member
                      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                        <div className="h-64 overflow-hidden bg-gray-200 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>

                        <div className="p-6">
                          <div className="mb-4 h-1 w-12 bg-green-500"></div>

                          <h3 className="mb-1 text-xl font-bold text-gray-900">
                            Position Open
                          </h3>

                          <p className="text-green-600 font-medium">
                            {position.title}
                          </p>

                          <div className="mt-4 flex items-center text-sm text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-1 h-4 w-4 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            info@lckhp.org
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Meet Our Team button */}
            <div className="mt-12 text-center">
              <Link
                to="/2425/members"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Meet Our Full Team
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadershipTeam;
