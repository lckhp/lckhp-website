import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Landing from "./Landing";
import About from "./About";
import LeadershipTeam from "./LeadershipTeam";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import Header from "./Header";
import Carousel from "../components/Carousel";
import RecentBlogs from "../components/RecentBlogs";
import AnniversaryPopup from "../components/AnniversaryPopup";
import PresidentTheme from "../components/PresidentTheme";
import SEO from "../components/SEO";
import SeoLinks from "../components/SeoLinks";
import FAQ from "../components/FAQ";

const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupLoaded, setPopupLoaded] = useState(false);
  const location = useLocation();
  const scrollToSectionRef = useRef<string | null>(null);

  // Preload the popup component as soon as possible
  useEffect(() => {
    // Mark popup as loaded immediately
    setPopupLoaded(true);

    // Check if popup has been shown in this browser session
    const hasShownPopup = localStorage.getItem("hasShownAnniversaryPopup");
    const lastShownTime = localStorage.getItem("lastPopupShownTime");
    const currentTime = new Date().getTime();

    // If popup hasn't been shown or it was shown more than 24 hours ago
    if (
      !hasShownPopup ||
      !lastShownTime ||
      currentTime - parseInt(lastShownTime) > 24 * 60 * 60 * 1000
    ) {
      // Show popup with a shorter delay if not shown recently
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        // Mark that we've shown the popup and record timestamp
        localStorage.setItem("hasShownAnniversaryPopup", "true");
        localStorage.setItem("lastPopupShownTime", currentTime.toString());
      }, 800); // Reduced from 1500ms to 800ms

      return () => clearTimeout(timer);
    }
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

  // Inside useEffect
  useEffect(() => {
    // Handle hash fragments for better SEO indexing
    const handleHashFragment = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Set a timeout to ensure DOM is fully loaded
    setTimeout(handleHashFragment, 1000);

    // Also add event listener for hash changes
    window.addEventListener("hashchange", handleHashFragment);
    return () => window.removeEventListener("hashchange", handleHashFragment);
  }, []);

  // Add enhanced homepage-specific structured data
  useEffect(() => {
    // Create home page specific JSON-LD structured data
    const homepageStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Leo Club of Kathmandu Himalayas Patan",
      url: "https://lckhp.org",
      logo: "https://lckhp.org/lckhp-logo.png",
      description:
        "Nepal's oldest Leo Club established in 1974, offering youth leadership opportunities and community service activities in Kathmandu and Patan.",
      foundingDate: "1974",
      keywords:
        "leo club nepal, youth volunteering, community service, kathmandu, patan",
      sameAs: [
        "https://www.facebook.com/leokhp",
        "https://www.instagram.com/lckhp",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Patan",
        addressRegion: "Lalitpur",
        addressCountry: "Nepal",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "info@lckhp.org",
      },
    };

    // Create nonprofit organization structured data
    const nonprofitStructuredData = {
      "@context": "https://schema.org",
      "@type": "NGO",
      name: "Leo Club of Kathmandu Himalayas Patan",
      alternateName: "LCKHP",
      url: "https://lckhp.org",
      logo: "https://lckhp.org/lckhp-logo.png",
      nonprofitStatus: "Nonprofit501c3",
      description:
        "Leo Club of Kathmandu Himalayas Patan is a youth volunteer organization focused on community service, leadership development, and humanitarian aid in Nepal.",
      foundingDate: "1974",
      slogan: "We Serve",
      memberOf: {
        "@type": "Organization",
        name: "Lions Clubs International",
      },
    };

    // Add structured data to page
    const addStructuredData = (data: Record<string, any>) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
      return script;
    };

    const script1 = addStructuredData(homepageStructuredData);
    const script2 = addStructuredData(nonprofitStructuredData);

    // Cleanup when component unmounts
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div className="overflow-x-hidden w-full">
      <SEO
        title="Leo Club of Kathmandu Himalayas Patan | Youth Volunteering in Nepal"
        description="Join Nepal's oldest Leo Club established in 1974. We offer youth leadership opportunities, community service activities, and volunteer programs in Kathmandu and Patan."
        keywords="leo club nepal, leo club kathmandu, leo club patan, youth volunteering nepal, community service nepal, leo club vs lions club, oldest leo club in nepal, join leo club, youth volunteer organization kathmandu, leo club of kathmandu himalayas patan"
        url="https://lckhp.org/"
        type="website"
        image="/lckhp-logo.png"
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
      <RecentBlogs />
      <PresidentTheme />
      <FAQ />
      <ContactUs />
      <Footer />
      <SeoLinks />
    </div>
  );
};

export default Home;
