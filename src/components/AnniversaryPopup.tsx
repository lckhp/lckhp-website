import React, { useState, useEffect, memo } from "react";
import Confetti from "react-confetti";
import fiftyYearLogo from "../assets/lckhp-logo-50-years.png";

interface AnniversaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// Preload the anniversary logo image
const preloadImage = () => {
  const img = new Image();
  img.src = fiftyYearLogo;
};

// Call preload function immediately
preloadImage();

const AnniversaryPopup: React.FC<AnniversaryPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isClosing, setIsClosing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiFading, setConfettiFading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  // Handle window resize for confetti dimensions
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Manage confetti lifecycle
  useEffect(() => {
    if (isOpen) {
      // Mark that popup has been opened at least once
      setHasOpened(true);

      // Start fading out confetti after 6 seconds
      const fadeTimer = setTimeout(() => {
        setConfettiFading(true);
      }, 6000);

      // Completely remove confetti after fade (additional 1 second)
      const removeTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 7000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [isOpen]);

  // Reset states when popup is opened
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setShowConfetti(true);
      setConfettiFading(false);
    }
  }, [isOpen]);

  // Prevent body scrolling when popup is open, but keep the scrollbar visible
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Create a custom event handler for the wheel event
      const preventDefault = (e: Event) => e.preventDefault();

      // Prevent scrolling events while keeping the scrollbar visible
      document.addEventListener("wheel", preventDefault, { passive: false });
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });

      // Add a class to the main content to prevent content shifts
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      if (scrollbarWidth > 0) {
        // If there's a scrollbar, add padding to prevent content shift
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        // Remove event listeners when the popup is closed
        document.removeEventListener("wheel", preventDefault);
        document.removeEventListener("touchmove", preventDefault);

        // Remove the padding when the popup is closed
        document.body.style.paddingRight = "";

        // Restore the previous scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
    }, 500); // Match the CSS transition duration
  };

  // Don't render anything if we've never been opened
  if (!isOpen && !hasOpened) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${
        isOpen ? "visible" : "invisible"
      }`}
      style={{
        opacity: isClosing ? 0 : isOpen ? 1 : 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
      onClick={handleClose}
    >
      {isOpen && showConfetti && (
        <div
          className={`transition-opacity duration-1000 ${
            confettiFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={true}
            numberOfPieces={300}
            gravity={0.15}
            colors={[
              "#22c55e",
              "#16a34a",
              "#15803d",
              "#166534",
              "#14532d",
              "#ffdd00",
              "#ffffff",
            ]}
          />
        </div>
      )}

      <div
        className={`relative bg-white rounded-xl shadow-2xl p-8 mx-auto max-w-2xl w-full transform transition-all duration-500 ${
          isClosing
            ? "scale-95 opacity-0"
            : isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={fiftyYearLogo}
            alt="LCKHP 50 Years Anniversary Logo"
            className="h-56 object-contain"
          />
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Celebrating 50 Years of Service!
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Welcome to the Leo Club of Kathmandu Himalayas Patan's official
            website. We're proud to celebrate 50 years of youth leadership,
            community service, and making a difference in Nepal since 1974.
          </p>
          <button
            onClick={handleClose}
            className="bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition-colors duration-300 font-medium text-lg"
          >
            Explore Our Journey
          </button>
        </div>
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(AnniversaryPopup);
