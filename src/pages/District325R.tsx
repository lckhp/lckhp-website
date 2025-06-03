import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GoHomeButton from "../components/GoHomeButton";

const District325R: React.FC = () => {
  const { "*": wildcard } = useParams();
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [redirectMessage, setRedirectMessage] = useState<string>("");

  useEffect(() => {
    let redirectUrl: string | null = null;

    if (wildcard === "2425/register") {
      redirectUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSfgnO62RCSTQR7FwY2SDFewn7RiPA3fn2Ta8bi-eSknwuegYg/viewform";
      setRedirectMessage(
        "Redirecting to 3rd District Installation, 1st Council Meeting, and Award Ceremony Registration Form..."
      );
      document.title = "Redirecting to Registration...";
    } else if (wildcard === "2425/clli/register") {
      redirectUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSeCw63p82ozSA8LpFGPtvJSzmLRnZ2VVoMd0VRhHewHaeD71g/viewform?pli=1";
      setRedirectMessage("Redirecting to CLLI Registration Form...");
      document.title = "Redirecting to CLLI Registration...";
    } else if (wildcard === "2425/rlli/register") {
      redirectUrl = "https://forms.gle/kgkHD79ihVCuArQ1A";
      setRedirectMessage("Redirecting to RLLI Registration Form...");
      document.title = "Redirecting to RLLI Registration...";
    }

    if (redirectUrl) {
      setRedirecting(true);
      const timer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000); // Redirect after 2 seconds

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    } else {
      setRedirecting(false);
    }
  }, [wildcard]);

  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold" aria-live="polite">
          {redirectMessage}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl md:text-4xl font-bold">
        Sorry, this content is currently unavailable!
      </h1>
      <div className="mt-8 flex justify-center">
        <GoHomeButton variant="secondary" />
      </div>
    </div>
  );
};

export default District325R;
