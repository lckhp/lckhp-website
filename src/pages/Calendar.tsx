import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { monthImages } from "../constants/data";
import ZoomIcon from "../assets/zoom-icon.png"; // Ensure this path is correct and the image exists

interface CalendarProps {
  year: string;
}

const Calendar: React.FC<CalendarProps> = ({ year }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const [isZoomVisible, setIsZoomVisible] = useState<boolean>(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
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

      if (sliderRef.current) {
        const timer = setTimeout(() => {
          sliderRef.current?.slickGoTo(index !== -1 ? index : 0, true);
        }, 100);

        return () => clearTimeout(timer);
      }
    }
  }, [year]);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {year === "2425" ? (
        <>
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            LCKHP Calendar for L.Y. {year}
          </h1>
          <div className="w-[75%] max-w-[75%] relative">
            <Slider {...settings}>
              {monthImages.length > 0 ? (
                monthImages.map((month) => (
                  <div
                    key={month.name}
                    className="relative group"
                    onMouseMove={(e) => handleMouseMove(e, month.src)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={month.src}
                      alt={month.name}
                      className="w-full h-[75vh] object-contain pointer-events-none select-none"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable="false"
                      style={{ cursor: `url(${ZoomIcon}), auto` }} // Custom zoom icon as pointer
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-transparent pointer-events-auto"></div>
                  </div>
                ))
              ) : (
                <div className="text-center text-lg">No images available</div>
              )}
            </Slider>
            {isZoomVisible && (
              <div
                className="absolute w-[150px] h-[150px] border-2 border-black rounded-lg pointer-events-none bg-no-repeat"
                style={zoomStyle}
              />
            )}
          </div>
        </>
      ) : (
        <h1 className="text-2xl md:text-4xl font-bold">
          Sorry, the calendar for L.Y. {year} is currently unavailable!
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
