import React, { useState, useEffect } from "react";
import Landing from "./Landing";
import About from "./About";
import LeadershipTeam from "./LeadershipTeam";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import Header from "./Header";
import Carousel from "../components/Carousel";
import AnniversaryPopup from "../components/AnniversaryPopup";

const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupLoaded, setPopupLoaded] = useState(false);

  // Preload the popup component as soon as possible
  useEffect(() => {
    // Mark popup as loaded immediately
    setPopupLoaded(true);

    // Show popup with a shorter delay
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 800); // Reduced from 1500ms to 800ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden w-full">
      {/* Always render popup in DOM to ensure it's loaded */}
      <AnniversaryPopup
        isOpen={popupLoaded && isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
      <Header />
      <Landing />
      <About />
      <Carousel />
      <LeadershipTeam />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
