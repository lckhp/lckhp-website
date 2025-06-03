import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import reportLinks from "../assets/reports/reports.json"; // Import JSON data
import GoHomeButton from "../components/GoHomeButton";

const ReportRedirect: React.FC<{
  role: "secretary" | "treasurer" | "tail-twister";
}> = ({ role }) => {
  const { month } = useParams<{ month: string }>();
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    const path = `2425/${role}/report/${month}`;
    const reportLink = (reportLinks as { [key: string]: string })[path];

    if (reportLink) {
      setLink(reportLink);
      document.title = "Redirecting to Report...";
    } else {
      setLink(null);
      document.title = "Report not found";
    }
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
      <div className="mt-8 flex justify-center">
        <GoHomeButton variant="secondary" />
      </div>
    </div>
  );
};

export default ReportRedirect;
