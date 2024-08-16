import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { monthImages } from "../constants/data";

interface CalendarProps {
  year: string;
}

const Calendar: React.FC<CalendarProps> = ({ year }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    if (year === "2425") {
      const currentDate = new Date();
      const currentYearMonth = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}`;
      const index = monthImages.findIndex(
        (month) => month.name === currentYearMonth
      );
      setCurrentMonthIndex(index !== -1 ? index : 0);
    }
  }, [year]);

  useEffect(() => {
    if (sliderRef.current && year === "2425") {
      const timer = setTimeout(() => {
        sliderRef.current?.slickGoTo(currentMonthIndex, true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentMonthIndex, year]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dotsClass: "slick-dots custom-dots",
    ref: sliderRef,
    lazyLoad: "ondemand" as const,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {year === "2425" ? (
        <>
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Calendar for L.Y. {year}
          </h1>
          <div className="w-[75%] max-w-[75%]">
            <Slider {...settings}>
              {monthImages.length > 0 ? (
                monthImages.map((month) => (
                  <div key={month.name} className="relative group">
                    <img
                      src={month.src}
                      alt={month.name}
                      className="w-full h-[75vh] object-contain pointer-events-none select-none"
                      onContextMenu={(e) => e.preventDefault()} // Disable right-click
                      draggable="false" // Disable dragging
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-transparent pointer-events-auto"></div>{" "}
                    {/* Transparent overlay */}
                  </div>
                ))
              ) : (
                <div className="text-center text-lg">No images available</div>
              )}
            </Slider>
          </div>
        </>
      ) : (
        <h1 className="text-2xl md:text-4xl font-bold">
          Sorry, the calendar for {year} is unavailable!
        </h1>
      )}
      <div className="navigation mt-8">
        <Link to="/" className="text-blue-400 hover:underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Calendar;
