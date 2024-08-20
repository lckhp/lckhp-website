import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ReportRedirect: React.FC<{
  role: "secretary" | "treasurer" | "tail-twister";
}> = ({ role }) => {
  const { month } = useParams<{ month: string }>();
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportLinks = async () => {
      try {
        const response = await fetch("/src/assets/reports/reports.json");
        const reportLinks = await response.json();
        const path = `2425/${role}/report/${month}`;
        const reportLink = reportLinks[path];
        if (reportLink) {
          setLink(reportLink);
          document.title = "Redirecting to Report...";
        } else {
          setLink(null);
          document.title = "Report not found";
        }
      } catch (error) {
        console.error("Error fetching report links:", error);
        setLink(null);
        document.title = "Report not found";
      }
    };

    fetchReportLinks();
  }, [role, month]);

  useEffect(() => {
    if (link) {
      window.location.href = link;
    }
  }, [link]);

  if (link) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold">Redirecting to Report...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl md:text-4xl font-bold">
        Sorry, the report is currently unavailable!
      </h1>
      <div className="navigation mt-8">
        <Link to="/" className="text-blue-400 hover:underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ReportRedirect;
