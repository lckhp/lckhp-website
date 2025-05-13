import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const scrollToSectionRef = useRef<string | null>(null);

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

  // Store the section to scroll to in a ref so we can access it after popup closes
  useEffect(() => {
    // Check for scrollTo parameter in query string
    const searchParams = new URLSearchParams(location.search);
    const scrollToSection = searchParams.get("scrollTo");

    if (scrollToSection) {
      scrollToSectionRef.current = scrollToSection;
    }
  }, [location.search]);

  // Handle scrolling logic
  const scrollToSection = () => {
    if (scrollToSectionRef.current) {
      const element = document.getElementById(scrollToSectionRef.current);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Scroll when page loads initially
  useEffect(() => {
    if (scrollToSectionRef.current) {
      // Wait for all components to be rendered
      const timer = setTimeout(() => {
        scrollToSection();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Scroll again when popup closes if needed
  const handlePopupClose = () => {
    setIsPopupOpen(false);

    // If we have a section to scroll to, do it after popup animation finishes
    if (scrollToSectionRef.current) {
      setTimeout(() => {
        scrollToSection();
      }, 600);
    }
  };

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
        onClose={handlePopupClose}
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
