import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoHomeButton from "../components/GoHomeButton";

import { calendarYears, calendarMonths } from "../constants/data";
import ZoomIcon from "../assets/zoom-icon.png"; // Ensure this path is correct and the image exists

interface CalendarProps {
  year: string;
}

interface MonthImage {
  name: string;
  src: string;
}

const Calendar: React.FC<CalendarProps> = ({ year }) => {
  const navigate = useNavigate();
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const [isZoomVisible, setIsZoomVisible] = useState<boolean>(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [monthImages, setMonthImages] = useState<MonthImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sliderRef = useRef<Slider | null>(null);

  // Handler for year change in dropdown
  const handleYearChange = (selectedYear: string) => {
    navigate(`/${selectedYear}/calendar`);
  };

  useEffect(() => {
    if (year) {
      document.title = `LCKHP ${year} Calendar`;
    } else {
      document.title = "LCKHP Calendar not found!";
    }
  }, [year]);

  // Load calendar images dynamically based on the selected year
  useEffect(() => {
    const loadCalendarImages = async () => {
      setIsLoading(true);

      try {
        if (calendarYears.includes(year)) {
          const startYear = year === "2425" ? "2024" : "2025";
          const endYear = year === "2425" ? "2025" : "2026";

          const images: MonthImage[] = [];

          // Dynamic import for July-December (first year)
          for (let i = 0; i < 6; i++) {
            const month = calendarMonths[i];
            try {
              const imagePath = `../assets/calendar/${year}/${startYear}-${month.number}.png`;
              const imageModule = await import(/* @vite-ignore */ imagePath);
              images.push({
                name: `${startYear}-${month.number}`,
                src: imageModule.default,
              });
            } catch (error) {
              console.error(
                `Failed to load image for ${startYear}-${month.number}:`,
                error
              );
              // Add placeholder for missing image
              images.push({
                name: `${startYear}-${month.number}`,
                src: "",
              });
            }
          }

          // Dynamic import for January-June (second year)
          for (let i = 6; i < 12; i++) {
            const month = calendarMonths[i];
            try {
              const imagePath = `../assets/calendar/${year}/${endYear}-${month.number}.png`;
              const imageModule = await import(/* @vite-ignore */ imagePath);
              images.push({
                name: `${endYear}-${month.number}`,
                src: imageModule.default,
              });
            } catch (error) {
              console.error(
                `Failed to load image for ${endYear}-${month.number}:`,
                error
              );
              // Add placeholder for missing image
              images.push({
                name: `${endYear}-${month.number}`,
                src: "",
              });
            }
          }

          setMonthImages(images);
        }
      } catch (error) {
        console.error("Error loading calendar images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalendarImages();
  }, [year]);

  useEffect(() => {
    if (calendarYears.includes(year) && monthImages.length > 0) {
      const currentDate = new Date();
      const currentYearMonth = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}`;
      const index = monthImages.findIndex(
        (month) => month.name === currentYearMonth
      );
      setCurrentMonthIndex(index !== -1 ? index : 0);

      if (sliderRef.current) {
        const timer = setTimeout(() => {
          sliderRef.current?.slickGoTo(currentMonthIndex, true);
        }, 100);

        return () => clearTimeout(timer);
      }
    }
  }, [currentMonthIndex, year, monthImages]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    src: string
  ) => {
    const zoomBoxSize = 150; // Size of the zoom box
    const offsetX = -145; // Horizontal offset from the mouse pointer
    const offsetY = -85; // Vertical offset from the mouse pointer

    // Calculate the position of the zoom box relative to the pointer
    let zoomLeft = e.clientX + offsetX;
    let zoomTop = e.clientY + offsetY;

    // Adjust if the zoom box goes off-screen to the right
    if (zoomLeft + zoomBoxSize > window.innerWidth) {
      zoomLeft = e.clientX - zoomBoxSize - offsetX;
    }

    // Adjust if the zoom box goes off-screen to the bottom
    if (zoomTop + zoomBoxSize > window.innerHeight) {
      zoomTop = e.clientY - zoomBoxSize - offsetY;
    }

    setIsZoomVisible(true);
    setZoomStyle({
      left: `${zoomLeft}px`,
      top: `${zoomTop}px`,
      width: `${zoomBoxSize}px`,
      height: `${zoomBoxSize}px`,
      backgroundImage: `url(${src})`,
      backgroundSize: "850%", // Increase zoom level
      backgroundPosition: `${
        ((e.clientX - e.currentTarget.getBoundingClientRect().left) /
          e.currentTarget.offsetWidth) *
        100
      }% ${
        ((e.clientY - e.currentTarget.getBoundingClientRect().top) /
          e.currentTarget.offsetHeight) *
        100
      }%`,
    });
  };

  const handleMouseLeave = () => {
    setIsZoomVisible(false);
  };

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

  const getYearLabel = (yearCode: string) => {
    if (yearCode === "2425") return "2024/25";
    if (yearCode === "2526") return "2025/26";
    if (yearCode === "2627") return "2026/27";
    return yearCode;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {calendarYears.includes(year) ? (
        <>
          {/* Header with title centered */}
          <h1 className="text-2xl md:text-4xl font-bold mb-4 mt-4 text-center">
            LCKHP Calendar for L.Y. {getYearLabel(year)}
          </h1>

          {/* Year Selector below title */}
          <div className="mb-6 flex items-center justify-center">
            <label
              htmlFor="calendar-year-select"
              className="mr-2 text-gray-300"
            >
              Select calendar for L.Y.
            </label>
            <select
              id="calendar-year-select"
              value={year}
              onChange={(e) => handleYearChange(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {calendarYears.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {getYearLabel(yearOption)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-[75%] max-w-[75%] relative mb-12">
            {isLoading ? (
              <div className="flex justify-center items-center h-[75vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <Slider {...settings}>
                {monthImages.length > 0 ? (
                  monthImages.map((month) => (
                    <div
                      key={month.name}
                      className="relative group"
                      onMouseMove={(e) => handleMouseMove(e, month.src)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {month.src ? (
                        <img
                          src={month.src}
                          alt={month.name}
                          className="w-full h-[75vh] object-contain pointer-events-none select-none"
                          onContextMenu={(e) => e.preventDefault()}
                          draggable="false"
                          style={{ cursor: `url(${ZoomIcon}), auto` }}
                        />
                      ) : (
                        <div className="w-full h-[75vh] flex items-center justify-center bg-gray-800">
                          <p className="text-gray-400">Image not available</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-transparent group-hover:bg-transparent pointer-events-auto"></div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-lg h-[75vh] flex items-center justify-center">
                    No images available
                  </div>
                )}
              </Slider>
            )}
            {isZoomVisible && (
              <div
                className="absolute w-[150px] h-[150px] border-2 border-black rounded-lg pointer-events-none bg-no-repeat"
                style={zoomStyle}
              />
            )}
          </div>
        </>
      ) : (
        <h1 className="text-2xl md:text-4xl font-bold mb-8">
          Sorry, the calendar for L.Y. {getYearLabel(year)} is currently
          unavailable!
        </h1>
      )}
      <div className="navigation mb-6">
        <GoHomeButton variant="secondary" className="text-sm px-4 py-2" />
      </div>
    </div>
  );
};

export default Calendar;
