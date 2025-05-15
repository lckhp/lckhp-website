import React from "react";

/**
 * This component renders hidden links that help search engines discover
 * all important pages on the site. These links are visually hidden but
 * still accessible to search engine crawlers.
 */
const SeoLinks: React.FC = () => {
  return (
    <div className="sr-only" aria-hidden="true">
      <h2>Important Pages</h2>
      <ul>
        <li>
          <a href="/">Leo Club of Kathmandu Himalayas Patan</a>
        </li>
        <li>
          <a href="/#about-section">About Leo Club Nepal</a>
        </li>
        <li>
          <a href="/register">Join Leo Club in Nepal</a>
        </li>
        <li>
          <a href="/2425/programs">Leo Club Activities and Events</a>
        </li>
        <li>
          <a href="/2425/members">Youth Volunteers in Nepal</a>
        </li>
        <li>
          <a href="/donate">Directory for Donations and Volunteering</a>
        </li>
        <li>
          <a href="/donate/blood-bank">Blood Donation Centers in Nepal</a>
        </li>
        <li>
          <a href="/donate/old-age-homes">
            Donate to Old Age Homes in Kathmandu
          </a>
        </li>
        <li>
          <a href="/donate/orphanages">Support Orphanages in Nepal</a>
        </li>
        <li>
          <a href="https://blog.lckhp.org">LCKHP Official Blog</a>
        </li>
      </ul>

      <h2>Youth Volunteering in Nepal</h2>
      <ul>
        <li>
          <a href="/register">How to Join Leo Club</a>
        </li>
        <li>
          <a href="/2425/programs">Youth Volunteer Programs in Kathmandu</a>
        </li>
        <li>
          <a href="/2425/calendar">Community Service Events Calendar</a>
        </li>
        <li>
          <a href="/#about-section">Leo Club vs Lions Club</a>
        </li>
      </ul>

      <h2>Donation Opportunities</h2>
      <ul>
        <li>
          <a href="/donate/blood-bank">Where to Donate Blood in Kathmandu</a>
        </li>
        <li>
          <a href="/donate/blood-bank">Blood Banks Accepting Donors in Nepal</a>
        </li>
        <li>
          <a href="/donate/blood-bank">Emergency Blood Donation Nepal</a>
        </li>
        <li>
          <a href="/donate/old-age-homes">Old Age Homes Needing Donations</a>
        </li>
        <li>
          <a href="/donate/orphanages">Orphanages That Need Help in Patan</a>
        </li>
        <li>
          <a href="/donate">Non-profit Organizations in Nepal</a>
        </li>
      </ul>

      <h2>LCKHP Blog Posts</h2>
      <ul>
        <li>
          <a href="https://blog.lckhp.org">Leo Club of KHP Blog</a>
        </li>
        <li>
          <a href="https://blog.lckhp.org/community-service">
            Community Service Articles
          </a>
        </li>
        <li>
          <a href="https://blog.lckhp.org/youth-leadership">
            Youth Leadership Development
          </a>
        </li>
        <li>
          <a href="https://blog.lckhp.org/volunteer-stories">
            Volunteer Stories from Nepal
          </a>
        </li>
        <li>
          <a href="https://blog.lckhp.org/events">
            Leo Club Events and Activities
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SeoLinks;
