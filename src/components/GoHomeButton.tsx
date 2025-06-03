import React from "react";
import { Link } from "react-router-dom";

interface GoHomeButtonProps {
  variant?: "primary" | "secondary" | "text";
  className?: string;
}

const GoHomeButton: React.FC<GoHomeButtonProps> = ({
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center transition-all duration-300 font-medium";

  const variantStyles = {
    primary:
      "rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 hover:shadow-lg",
    secondary:
      "rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 hover:shadow-lg",
    text: "text-blue-600 hover:text-blue-800 hover:underline",
  };

  return (
    <Link
      to="/"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {variant !== "text" ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Return to Home
        </>
      ) : (
        "Return to Home"
      )}
    </Link>
  );
};

export default GoHomeButton;
