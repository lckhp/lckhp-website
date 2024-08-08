import React, { useState, useEffect } from "react";
import "./Calendar.css";

const monthImages = [
  { name: "2024-07", src: "/images/calendar/2024-07.png" },
  { name: "2024-08", src: "/images/calendar/2024-08.png" },
  { name: "2024-09", src: "/images/calendar/2024-09.png" },
  { name: "2024-10", src: "/images/calendar/2024-10.png" },
  { name: "2024-11", src: "/images/calendar/2024-11.png" },
  { name: "2024-12", src: "/images/calendar/2024-12.png" },
  { name: "2025-01", src: "/images/calendar/2025-01.png" },
  { name: "2025-02", src: "/images/calendar/2025-02.png" },
  { name: "2025-03", src: "/images/calendar/2025-03.png" },
  { name: "2025-04", src: "/images/calendar/2025-04.png" },
  { name: "2025-05", src: "/images/calendar/2025-05.png" },
  { name: "2025-06", src: "/images/calendar/2025-06.png" },
];

const Calendar = () => {
  const getCurrentMonthIndex = () => {
    const currentDate = new Date();
    const currentYearMonth = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    return monthImages.findIndex((month) => month.name === currentYearMonth);
  };

  const [currentMonth, setCurrentMonth] = useState(getCurrentMonthIndex());

  useEffect(() => {
    setCurrentMonth(getCurrentMonthIndex());
  }, []);

  const handlePrevious = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth < monthImages.length - 1) {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  return (
    <div className="calendar">
      <div className="image-container">
        <img
          src={monthImages[currentMonth].src}
          alt={monthImages[currentMonth].name}
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="overlay"></div>
        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentMonth === 0}>
            &#9664;
          </button>
          <button
            onClick={handleNext}
            disabled={currentMonth === monthImages.length - 1}
          >
            &#9654;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
