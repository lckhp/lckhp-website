import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import july from "../assets/calendar/2024-07.png";
import august from "../assets/calendar/2024-08.png";
import september from "../assets/calendar/2024-09.png";
import october from "../assets/calendar/2024-10.png";
import november from "../assets/calendar/2024-11.png";
import december from "../assets/calendar/2024-12.png";
import january from "../assets/calendar/2025-01.png";
import february from "../assets/calendar/2025-02.png";
import march from "../assets/calendar/2025-03.png";
import april from "../assets/calendar/2025-04.png";
import may from "../assets/calendar/2025-05.png";
import june from "../assets/calendar/2025-06.png";


// Sample images for the calendar
const monthImages = [
    { name: "2024-07", src: july },
    { name: "2024-08", src: august },
    { name: "2024-09", src: september },
    { name: "2024-10", src: october },
    { name: "2024-11", src: november },
    { name: "2024-12", src: december },
    { name: "2025-01", src: january },
    { name: "2025-02", src: february },
    { name: "2025-03", src: march },
    { name: "2025-04", src: april },
    { name: "2025-05", src: may },
    { name: "2025-06", src: june },
  ];
  
  

interface CalendarProps {
  year: string;
}

const Calendar: React.FC<CalendarProps> = ({ year }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
