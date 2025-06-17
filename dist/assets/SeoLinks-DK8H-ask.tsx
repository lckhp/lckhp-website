import React from "react";

// Set default year here - EASY TO UPDATE
const defaultYear = "2425";

/**
 * This component renders hidden links that help search engines discover
 * all important pages on the site. These links are visually hidden but
 * still accessible to search engine crawlers.
 */
const SeoLinks: React.FC = () => {
  // List of member IDs to create links for
  const memberIds = [
    1, 2, 3, 8, 9, 10, 11, 16, 25, 26, 30, 31, 32, 39, 40, 41, 44, 46, 47, 48,
    50, 51, 52, 53, 55, 56, 58, 59, 60, 61,
  ];

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
          <a href={`/${defaultYear}/programs`}>
            Leo Club Activities and Events
          </a>
        </li>
        <li>
          <a href={`/${defaultYear}/members`}>Youth Volunteers in Nepal</a>
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
        <li>
          <a href="/projects">Community Service Projects in Nepal</a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            We Hear Your Outcry Initiative
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">Uttam Shakti Program Nepal</a>
        </li>
      </ul>

      <h2>Leo Club Member Profiles</h2>
      <ul>
        {memberIds.map((id) => (
          <li key={id}>
            <a href={`/${defaultYear}/members/${id}`}>
              Leo Member Profile {id}
            </a>
          </li>
        ))}
      </ul>

      <h2>Youth Volunteering in Nepal</h2>
      <ul>
        <li>
          <a href="/register">How to Join Leo Club</a>
        </li>
        <li>
          <a href={`/${defaultYear}/programs`}>
            Youth Volunteer Programs in Kathmandu
          </a>
        </li>
        <li>
          <a href={`/${defaultYear}/calendar`}>
            Community Service Events Calendar
          </a>
        </li>
        <li>
          <a href="/#about-section">Leo Club vs Lions Club</a>
        </li>
        <li>
          <a href="/register">Youth Leadership Development Programs</a>
        </li>
        <li>
          <a href={`/${defaultYear}/programs`}>
            Student Community Service Opportunities
          </a>
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
        <li>
          <a href="/donate/organizations">Educational NGOs in Kathmandu</a>
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

      <h2>Community Service Projects</h2>
      <ul>
        <li>
          <a href="/projects">Youth-led Projects in Nepal</a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            Mental Health Awareness Projects in Kathmandu
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">
            Women Empowerment Initiative in Nepal
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">Menstrual Health Education Nepal</a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            Community Support Programs in Patan
          </a>
        </li>
        <li>
          <a href="/projects">Social Impact Projects by Nepali Youth</a>
        </li>
        <li>
          <a href="/projects">Sustainable Development Goals in Nepal</a>
        </li>
      </ul>

      <h2>Leo Club Resources</h2>
      <ul>
        <li>
          <a href={`/${defaultYear}/calendar`}>LCKHP Event Calendar</a>
        </li>
        <li>
          <a href={`/${defaultYear}/programs`}>Service Activity Reports</a>
        </li>
        <li>
          <a href="/donate">Volunteering Resources Nepal</a>
        </li>
        <li>
          <a href="/register">Leo Club Membership Benefits</a>
        </li>
        <li>
          <a href="/#about-section">Leo Club History in Nepal</a>
        </li>
      </ul>
    </div>
  );
};

export default SeoLinks;
