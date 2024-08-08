import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    const progress = document.querySelector(".progress");
    const percentage = document.querySelector(".progress span");

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
    <div className="home-body">
      <div className="background"></div>
      <div className="container">
        <div className="top">
          <hr />
          <p>LEO CLUB OF KATHMANDU HIMALAYAS PATAN</p>
          <hr />
        </div>
        <h1>SITE IS UNDER CONSTRUCTION</h1>
        <h3>PROGRESS</h3>
        <div className="progress-wrapper">
          <div className="progress">
            <span>0%</span>
          </div>
        </div>
        <h3>
          For time being, please contact us on the following platforms for
          inquiries:
        </h3>
        <div className="social-icons">
          <a
            href="https://www.facebook.com/lckhp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/lckhpatan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://discord.gg/Yd5dbcJg9K"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-discord"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/100013568/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://wa.me/9779818143788/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <div className="navigation">
          <Link to="/2425/calendar">Go to Calendar</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
