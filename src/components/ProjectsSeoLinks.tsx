import React from "react";

/**
 * This component renders hidden links to improve SEO for project pages
 * These links are for search engines to better understand the site structure
 * They are visually hidden but semantically available for crawlers
 */
const ProjectsSeoLinks: React.FC = () => {
  return (
    <div className="sr-only" aria-hidden="true">
      <h2>Community Projects in Nepal</h2>
      <ul>
        <li>
          <a href="/projects">Leo Club Projects in Nepal</a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            We Hear Your Outcry - Mental Health Awareness Project
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">
            Uttam Shakti - Women Empowerment Initiative
          </a>
        </li>
        <li>
          <a href="/projects">
            Youth-led Community Service Projects in Kathmandu
          </a>
        </li>
        <li>
          <a href="/projects">Social Impact Programs in Nepal</a>
        </li>
      </ul>

      <h2>We Hear Your Outcry Project</h2>
      <ul>
        <li>
          <a href="/projects/we-hear-your-outcry">
            Mental Health Awareness Campaign in Nepal
          </a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            Drug Awareness and Prevention Programs in Kathmandu
          </a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            Community Support Programs for Vulnerable Populations in Nepal
          </a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            Youth Mental Health Resources in Patan
          </a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            Addiction Support Services in Kathmandu Valley
          </a>
        </li>
      </ul>

      <h2>Uttam Shakti Project</h2>
      <ul>
        <li>
          <a href="/projects/uttam-shakti">
            Women Empowerment Projects in Nepal
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">
            Menstrual Health Education Programs in Kathmandu
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">
            Sustainable Livelihood Training in Nepal
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">
            Sanitary Pad Production Training for Rural Women
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">
            Skill Development Programs for Women in Lalitpur
          </a>
        </li>
      </ul>

      <h2>Leo Club Service Categories</h2>
      <ul>
        <li>
          <a href="/projects">Youth Leadership Development in Nepal</a>
        </li>
        <li>
          <a href="/projects">Health Awareness Campaigns in Kathmandu</a>
        </li>
        <li>
          <a href="/projects">
            Environmental Conservation Initiatives in Nepal
          </a>
        </li>
        <li>
          <a href="/projects">Educational Outreach Programs in Patan</a>
        </li>
        <li>
          <a href="/projects">Community Welfare Projects by Youth Volunteers</a>
        </li>
      </ul>
    </div>
  );
};

export default ProjectsSeoLinks;
