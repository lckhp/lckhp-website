import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Import program data
import programData2425 from "../assets/programs/2425.json";
import programData2324 from "../assets/programs/2324.json";

interface ProgramProps {
  year: string;
}

interface Program {
  "S.N.": number;
  "Program Name": string;
  "Program Date": string;
  "Program Venue": string;
  "Program Type": string;
}

interface ProgramStats {
  totalPrograms: number;
  programTypes: { [key: string]: number };
}

const Programs: React.FC<ProgramProps> = ({ year }) => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [stats, setStats] = useState<ProgramStats>({
    totalPrograms: 0,
    programTypes: {},
  });
  const [chartError, setChartError] = useState<boolean>(false);

  // Colors for the pie chart
  const CHART_COLORS = [
    "#4C5AE3", // Blue
    "#FF6384", // Pink
    "#36A2EB", // Lighter Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#C9CBCF", // Grey
    "#8AC926", // Green
    "#F25F5C", // Red
    "#6A0572", // Dark Purple
    "#1A936F", // Dark Green
  ];

  // Handle year change
  const handleYearChange = (selectedYear: string) => {
    navigate(`/${selectedYear}/programs`);
  };

  useEffect(() => {
    if (year) {
      document.title = `LCKHP ${year} Programs`;
    } else {
      document.title = "LCKHP Programs not found!";
    }

    // Set the program data based on the year
    let data: Program[] = [];
    if (year === "2425") {
      data = [...programData2425];
    } else if (year === "2324") {
      data = [...programData2324];
    }

    // Initial sort by date (ascending)
    const sortedPrograms = data.sort((a, b) => {
      const dateA = new Date(a["Program Date"]);
      const dateB = new Date(b["Program Date"]);
      return dateA.getTime() - dateB.getTime();
    });

    setPrograms(sortedPrograms);
    setFilteredPrograms(sortedPrograms);

    // Calculate program statistics
    const totalPrograms = sortedPrograms.length;
    const programTypes: { [key: string]: number } = {};

    sortedPrograms.forEach((program) => {
      const type = program["Program Type"];
      programTypes[type] = (programTypes[type] || 0) + 1;
    });

    setStats({
      totalPrograms,
      programTypes,
    });
  }, [year]);

  // Handle potential chart rendering errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes("chart") || event.message.includes("Chart")) {
        setChartError(true);
        console.error("Chart rendering error:", event);
      }
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  // Function to toggle sort order and sort programs by date
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedPrograms = [...filteredPrograms].sort((a, b) => {
      const dateA = new Date(a["Program Date"]);
      const dateB = new Date(b["Program Date"]);

      return newSortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    setFilteredPrograms(sortedPrograms);
  };

  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Filter programs by type
  const filterByType = (type: string) => {
    if (activeFilter === type) {
      // If clicking the same filter, clear it
      setFilteredPrograms(programs);
      setActiveFilter(null);
    } else {
      // Apply the new filter
      const filtered = programs.filter(
        (program) => program["Program Type"] === type
      );
      setFilteredPrograms(filtered);
      setActiveFilter(type);

      // Re-apply current sort
      const sorted = [...filtered].sort((a, b) => {
        const dateA = new Date(a["Program Date"]);
        const dateB = new Date(b["Program Date"]);

        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });

      setFilteredPrograms(sorted);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilteredPrograms(programs);
    setActiveFilter(null);
  };

  // Prepare chart data
  const chartData = {
    labels: Object.keys(stats.programTypes),
    datasets: [
      {
        label: "Program Types",
        data: Object.values(stats.programTypes),
        backgroundColor: CHART_COLORS.slice(
          0,
          Object.keys(stats.programTypes).length
        ),
        borderColor: CHART_COLORS.slice(
          0,
          Object.keys(stats.programTypes).length
        ).map((color) => color),
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "#ffffff",
          font: {
            size: 11,
          },
          boxWidth: 12,
          padding: 8,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = Object.values(stats.programTypes).reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-900 text-white">
      {year === "2425" || year === "2324" ? (
        <div className="w-full max-w-7xl flex flex-col flex-grow p-4">
          {/* Year Toggle Selector */}
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-4xl font-bold text-center">
              LCKHP Programs for L.Y. {year === "2324" ? "2023/24" : "2024/25"}
            </h1>

            <div className="flex items-center">
              <label htmlFor="year-select" className="mr-2 text-gray-300">
                Select programs for L.Y.
              </label>
              <select
                id="year-select"
                value={year}
                onChange={(e) => handleYearChange(e.target.value)}
                className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="2324">2023/24</option>
                <option value="2425">2024/25</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 flex-grow mb-8">
            {/* Statistics section - fixed on the left */}
            <div className="w-full md:w-1/3 bg-gray-800 rounded-lg p-4 flex flex-col md:sticky top-4 self-start max-h-fit overflow-auto">
              <h2 className="text-xl font-bold mb-4 text-center">
                Program Statistics
              </h2>

              <div className="mb-4 bg-gray-700 rounded-lg p-3">
                <p className="text-lg font-semibold text-center mb-1">
                  Total Programs
                </p>
                <p className="text-3xl font-bold text-center text-blue-400">
                  {stats.totalPrograms}
                </p>
                {activeFilter && (
                  <div className="text-center mt-3">
                    <p className="text-sm text-gray-300">
                      Filtered: {filteredPrograms.length} programs
                    </p>
                    <button
                      onClick={clearFilters}
                      className="text-xs text-blue-400 hover:underline mt-1"
                    >
                      Clear Filter
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-4 bg-gray-700 rounded-lg p-3 overflow-y-auto">
                <p className="text-lg font-semibold mb-2">By Program Type</p>
                <div className="space-y-2">
                  {Object.entries(stats.programTypes)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .map(([type, count], index) => (
                      <div
                        key={type}
                        className={`flex justify-between p-1 rounded-md cursor-pointer ${
                          activeFilter === type
                            ? "bg-blue-900"
                            : "hover:bg-gray-600"
                        }`}
                        onClick={() => filterByType(type)}
                        title={`Click to filter by ${type}`}
                      >
                        <span className="flex items-center max-w-[75%]">
                          <span
                            className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                            style={{
                              backgroundColor:
                                CHART_COLORS[index % CHART_COLORS.length],
                            }}
                          />
                          <span className="truncate">{type}</span>
                        </span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Pie chart or fallback visualization */}
              <div className="flex-grow relative mt-4">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Program Types Distribution
                </h3>

                {/* Fallback visualization instead of chart */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {Object.entries(stats.programTypes)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .map(([type, count], index) => {
                      const percentage = Math.round(
                        (count / stats.totalPrograms) * 100
                      );
                      return (
                        <div
                          key={type}
                          className={`p-3 rounded-lg cursor-pointer ${
                            activeFilter === type
                              ? "bg-blue-700"
                              : "bg-gray-700 hover:bg-gray-600"
                          }`}
                          onClick={() => filterByType(type)}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold flex items-center">
                              <span
                                className="w-3 h-3 rounded-full mr-2"
                                style={{
                                  backgroundColor:
                                    CHART_COLORS[index % CHART_COLORS.length],
                                }}
                              />
                              {type}
                            </span>
                            <span className="text-lg font-bold">{count}</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor:
                                  CHART_COLORS[index % CHART_COLORS.length],
                              }}
                            ></div>
                          </div>
                          <div className="text-right text-xs mt-1">
                            {percentage}%
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Attempt to render chart if not in error state */}
                {!chartError && Object.keys(stats.programTypes).length > 0 && (
                  <div className="h-[300px] flex items-center justify-center mt-4 border-t border-gray-700 pt-4">
                    <Pie data={chartData} options={chartOptions} />
                  </div>
                )}
              </div>
            </div>

            {/* Programs table - scrollable on the right */}
            <div className="w-full md:w-2/3 flex flex-col bg-gray-800 rounded-lg p-4 flex-grow">
              <div className="flex justify-between mb-4 items-center">
                <h3 className="text-lg font-semibold">
                  {activeFilter
                    ? `${activeFilter} Programs (${filteredPrograms.length})`
                    : `All Programs (${filteredPrograms.length})`}
                </h3>
                <button
                  onClick={toggleSortOrder}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
                >
                  Sort by Date:{" "}
                  {sortOrder === "asc" ? "Ascending ↑" : "Descending ↓"}
                </button>
              </div>

              <div className="overflow-y-auto flex-grow">
                <table className="w-full bg-gray-800 rounded-lg table-fixed">
                  <thead className="bg-gray-700 sticky top-0 z-10">
                    <tr>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[8%] sm:w-[8%]">
                        S.N.
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[26%] sm:w-[30%]">
                        Program Name
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[18%] sm:w-[18%]">
                        Date
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[20%] sm:w-[24%]">
                        Venue
                      </th>
                      <th className="px-2 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-[28%] sm:w-[20%]">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    {filteredPrograms.length > 0 ? (
                      filteredPrograms.map((program) => (
                        <tr key={program["S.N."]} className="hover:bg-gray-700">
                          <td className="px-2 py-2">{program["S.N."]}</td>
                          <td
                            className="px-2 py-2 break-words"
                            title={program["Program Name"]}
                          >
                            {program["Program Name"]}
                          </td>
                          <td
                            className="px-2 py-2"
                            title={formatDate(program["Program Date"])}
                          >
                            {formatDate(program["Program Date"])}
                          </td>
                          <td
                            className="px-2 py-2 break-words"
                            title={program["Program Venue"]}
                          >
                            {program["Program Venue"]}
                          </td>
                          <td className="px-2 py-2">
                            <span
                              className="px-2 py-1 inline-block text-xs leading-5 font-semibold rounded-full bg-blue-600 text-white whitespace-normal overflow-visible text-center min-w-[80px] break-words"
                              title={program["Program Type"]}
                            >
                              {program["Program Type"]}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-2 py-4 text-center text-gray-400"
                        >
                          No programs found for the selected filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="navigation text-center py-4 bg-gray-800 rounded-lg p-2 mt-auto">
            <Link to="/" className="text-blue-400 hover:underline">
              Go to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl flex flex-col flex-grow items-center justify-center p-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">
            Sorry, the programs for L.Y. {year} are currently unavailable!
          </h1>
          <div className="navigation py-4 bg-gray-800 rounded-lg p-4">
            <Link to="/" className="text-blue-400 hover:underline">
              Go to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Programs;
