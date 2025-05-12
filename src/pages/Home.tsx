import React, { useState, useEffect } from "react";
import Landing from "./Landing";
import About from "./About";
import LeadershipTeam from "./LeadershipTeam";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import Header from "./Header";
import Carousel from "../components/Carousel";
import AnniversaryPopup from "../components/AnniversaryPopup";
import PresidentTheme from "../components/PresidentTheme";
import SEO from "../components/SEO";
import SeoLinks from "../components/SeoLinks";

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
      <SEO
        title="Leo Club of Kathmandu Himalayas Patan | Youth Volunteering in Nepal"
        description="Join Nepal's oldest Leo Club established in 1974. We offer youth leadership opportunities, community service activities, and volunteer programs in Kathmandu and Patan."
        keywords="leo club nepal, leo club kathmandu, leo club patan, youth volunteering nepal, community service nepal, leo club vs lions club, oldest leo club in nepal, join leo club, youth volunteer organization kathmandu, leo club of kathmandu himalayas patan"
        url="/"
      />
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
      <PresidentTheme />
      <ContactUs />
      <Footer />
      <SeoLinks />
    </div>
  );
};

export default Home;
