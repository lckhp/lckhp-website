import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const District325R: React.FC = () => {
  const { "*": wildcard } = useParams();
  const [redirecting, setRedirecting] = useState<boolean>(false);

  useEffect(() => {
    if (wildcard === "register") {
      setRedirecting(true);
      document.title = "Redirecting to Registration...";

      setTimeout(() => {
        window.location.href =
          "https://docs.google.com/forms/d/e/1FAIpQLSfgnO62RCSTQR7FwY2SDFewn7RiPA3fn2Ta8bi-eSknwuegYg/viewform";
      }, 2000); // Wait 2 seconds before redirecting
    } else {
      setRedirecting(false);
    }
  }, [wildcard]);

  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold">
          Redirecting to 3rd District Installation, 1st Council Meeting, and
          Award Ceremony Registration Form...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl md:text-4xl font-bold">
        Sorry, this content is currently unavailable!
      </h1>
      <div className="navigation mt-8">
        <Link to="/" className="text-blue-400 hover:underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default District325R;
