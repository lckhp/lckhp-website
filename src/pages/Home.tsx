import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/lckhp-background-banner.png"
import { FaDiscord, FaFacebook, FaLinkedin, FaViber, FaInstagram } from "react-icons/fa";

const Home: React.FC = () => {
  useEffect(() => {
    const progress = document.querySelector(".progress") as HTMLDivElement;
    const percentage = document.querySelector(".progress span") as HTMLSpanElement;

    let per = 0;
    function progressLoad() {
      if (per >= 40) {
        progress.style.width = `40%`;
        percentage.innerHTML = "40%";
      } else {
        progress.style.width = `${per}%`;
        percentage.innerHTML = `${per}%`;
      }
      per++;
    }

    const interval = setInterval(progressLoad, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-body relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* background */}
      <div
        className="absolute blur-sm inset-0 bg-cover opacity-20 z-[1] bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundBlendMode: "darken",
        }}
      ></div>
     
     
      <div className="relative z-10 container mx-auto p-8 text-center">
        <div className="top flex items-center justify-center space-x-4 mb-8">
          <hr className="border-gray-500 flex-grow" />
          <p className="text-lg font-semibold">LEO CLUB OF KATHMANDU HIMALAYAS PATAN</p>
          <hr className="border-gray-500 flex-grow" />
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 uppercase">SITE IS UNDER</h1>
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 uppercase">CONSTRUCTION</h1>

        <h3 className="text-2xl mb-4">PROGRESS</h3>
        <div className="progress-wrapper mx-auto w-1/2 h-8 bg-gray-800 rounded-full overflow-hidden mb-6">
          <div className="progress h-full bg-blue-500 flex items-center justify-center">
            <span className="text-white">0%</span>
          </div>
        </div>
        <h3 className="text-xl mb-6">
          For time being, please contact us on the following platforms for inquiries:
        </h3>
        <div className="social-icons flex space-x-4 justify-center mb-8">
          <a
            href="https://www.facebook.com/lckhp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white hover:text-blue-400"
          >
            <FaFacebook style={{fontSize:'3rem'}} />
          </a>
          <a
            href="https://www.instagram.com/lckhpatan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white hover:text-blue-400"
          >
            <FaInstagram style={{fontSize:'3rem'}}/>
          </a>
          <a
            href="https://discord.gg/aawStVKTJr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white hover:text-blue-400"
          >
           <FaDiscord style={{fontSize:'3rem'}}/>
          </a>
          <a
            href="https://www.linkedin.com/company/100013568/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white hover:text-blue-400"
          >
            <FaLinkedin style={{fontSize:'3rem'}} />
          </a>
          <a
            href="https://wa.me/9779818143788/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-white hover:text-blue-400"
          >
            <FaViber style={{fontSize:'3rem'}} />
          </a>
        </div>
        <div className="navigation">
          <Link to="/2425/calendar" className="text-blue-400 hover:underline">
            Go to Calendar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
