import React from "react";

/**
 * This component renders hidden links to improve SEO for donation pages
 * These links are for search engines to better understand the site structure
 * They are visually hidden but semantically available for crawlers
 */
const DonateSeoLinks: React.FC = () => {
  return (
    <div className="sr-only" aria-hidden="true">
      <h2>Donation Opportunities in Nepal</h2>
      <ul>
        <li>
          <a href="/donate">Where to Donate in Kathmandu, Nepal</a>
        </li>
        <li>
          <a href="/donate/blood-bank">Blood Donation Centers in Kathmandu</a>
        </li>
        <li>
          <a href="/donate/blood-bank">Where to Donate Blood in Nepal</a>
        </li>
        <li>
          <a href="/donate/blood-bank">Emergency Blood Donation Nepal</a>
        </li>
        <li>
          <a href="/donate/orphanages">
            Orphanages in Nepal Accepting Donations
          </a>
        </li>
        <li>
          <a href="/donate/orphanages">
            Help Children in Nepal - Orphanage Donations
          </a>
        </li>
        <li>
          <a href="/donate/orphanages">
            Donate School Supplies to Orphanages in Kathmandu
          </a>
        </li>
        <li>
          <a href="/donate/old-age-homes">
            Old Age Homes in Nepal Needing Support
          </a>
        </li>
        <li>
          <a href="/donate/old-age-homes">Donate to Elderly in Kathmandu</a>
        </li>
        <li>
          <a href="/donate/old-age-homes">Support Old Age Homes in Patan</a>
        </li>
        <li>
          <a href="/donate/urgent-needs">Medical Emergency Fundraising Nepal</a>
        </li>
        <li>
          <a href="/donate/urgent-needs">Urgent Donation Needs in Kathmandu</a>
        </li>
        <li>
          <a href="/donate/organizations">
            Non-Profit Organizations in Nepal Needing Support
          </a>
        </li>
        <li>
          <a href="/donate/organizations">Donate to Schools in Nepal</a>
        </li>
      </ul>

      <h2>Types of Donations in Nepal</h2>
      <ul>
        <li>
          <a href="/donate/blood-bank">Blood Donation Group A+ in Kathmandu</a>
        </li>
        <li>
          <a href="/donate/blood-bank">Blood Donation Group B+ in Nepal</a>
        </li>
        <li>
          <a href="/donate/blood-bank">Blood Donation Group O- in Patan</a>
        </li>
        <li>
          <a href="/donate/orphanages">
            Donate Clothing to Orphanages in Nepal
          </a>
        </li>
        <li>
          <a href="/donate/orphanages">
            Children's Book Donations in Kathmandu
          </a>
        </li>
        <li>
          <a href="/donate/old-age-homes">
            Blanket Donations for Elderly in Nepal
          </a>
        </li>
        <li>
          <a href="/donate/old-age-homes">
            Medicine Donations for Old Age Homes
          </a>
        </li>
        <li>
          <a href="/donate/urgent-needs">Cancer Treatment Donations in Nepal</a>
        </li>
        <li>
          <a href="/donate/urgent-needs">Earthquake Relief Donations Nepal</a>
        </li>
        <li>
          <a href="/donate/organizations">
            Educational Supply Donations to Schools in Nepal
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Support Community Organizations in Kathmandu
          </a>
        </li>
      </ul>

      <h2>Volunteer Opportunities in Nepal</h2>
      <ul>
        <li>
          <a href="/donate">Volunteer in Kathmandu, Nepal</a>
        </li>
        <li>
          <a href="/donate/orphanages">Volunteer at Orphanages in Nepal</a>
        </li>
        <li>
          <a href="/donate/old-age-homes">
            Volunteer at Old Age Homes in Kathmandu
          </a>
        </li>
        <li>
          <a href="/donate/blood-bank">Blood Donation Drive Volunteer Nepal</a>
        </li>
        <li>
          <a href="/donate/organizations">
            Volunteer at Schools and Non-Profits in Nepal
          </a>
        </li>
      </ul>

      {/* Enhanced SEO links for organizations section */}
      <h2>Non-Profit Organizations in Nepal</h2>
      <ul>
        <li>
          <a href="/donate/organizations">Verified NGOs in Kathmandu, Nepal</a>
        </li>
        <li>
          <a href="/donate/organizations">
            Educational Organizations Needing Donations in Nepal
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            School Supply Donation Centers in Kathmandu
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Community Development Organizations in Nepal
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Rural Education Support Organizations Nepal
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Women Empowerment Organizations in Kathmandu
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Youth Development Programs Needing Support in Nepal
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Skill Development Centers in Kathmandu and Patan
          </a>
        </li>
      </ul>

      <h2>Educational Support in Nepal</h2>
      <ul>
        <li>
          <a href="/donate/organizations">
            Donate Books to Rural Schools in Nepal
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            School Stationery Donation Drive Nepal
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Computer Donations for Schools in Kathmandu
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Scholarship Support for Needy Students in Nepal
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Teacher Training Programs Needing Support in Nepal
          </a>
        </li>
        <li>
          <a href="/donate/organizations">
            Science Lab Equipment for Schools in Nepal
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DonateSeoLinks;
