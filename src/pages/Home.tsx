import React from "react";
import Landing from "./Landing";
import About from "./About";
import LeadershipTeam from "./LeadershipTeam";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import Header from "./Header";
import Carousel from "../components/Carousel";

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden w-full">
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
