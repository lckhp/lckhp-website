import React, { useEffect, useState } from "react";

interface RedirectProps {
  page: string;
}

const Redirect: React.FC<RedirectProps> = ({ page }) => {
  const [redirectionText, setRedirectionText] = useState("");

  useEffect(() => {
    let targetUrl = "";
    let redirectionText = "";

    switch (page) {
      case "members-contact-info":
        targetUrl =
          "https://docs.google.com/spreadsheets/d/1bDvUswe0zU0-wmHbEVe6JRpIUyS2YVZgtxhVx5xmXyw/edit?usp=sharing";
        redirectionText = "Redirecting to Club Members Contact Info Page ...";
        break;
      case "club-assets":
        targetUrl =
          "https://docs.google.com/spreadsheets/d/1ELI20o6YSJGCEwZiAsxmapb2pqAUA8geM_tsHFB89pA/edit?usp=sharing";
        redirectionText = "Redirecting to Club Assets Tracking Page ...";
        break;
      default:
        targetUrl = "/";
        redirectionText = "Redirecting to Home Page ...";
    }

    // Update the state for redirection text
    setRedirectionText(redirectionText);

    // Perform the redirection
    window.location.href = targetUrl;
  }, [page]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold">{redirectionText}</h1>
    </div>
  );
};

export default Redirect;
