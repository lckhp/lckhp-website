import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { monthImages } from "../constants/data";  

interface CalendarProps {
  year: string;
}

const Calendar: React.FC<CalendarProps> = ({ year }) => {

  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);

  useEffect(() => {
    const currentDate = new Date();
    const currentYearMonth = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    const index = monthImages.findIndex((month) => month.name === currentYearMonth);
    setCurrentMonthIndex(index !== -1 ? index : 0);
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: currentMonthIndex,
    dotsClass: "slick-dots custom-dots", 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">Calendar for {year}</h1>
      <div className="w-full max-w-4xl">
        <Slider {...settings}>
          {monthImages.map((month) => (
            <div key={month.name} className="relative">
              <img
                src={month.src}
                alt={month.name}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Calendar;
