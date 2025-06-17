import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DonateList from "../component/DonateList";
import SEO from "../components/SEO";
import WhatsAppEmergencyButton from "../components/WhatsAppEmergencyButton";
import GoHomeButton from "../components/GoHomeButton";
import DonateSeoLinks from "../components/DonateSeoLinks";

interface DonateCategoryProps {
  category: string;
}

const DonateCategory: React.FC<DonateCategoryProps> = ({ category }) => {
  // Set SEO parameters based on category
  const getSEOParams = () => {
    if (category === "blood_bank") {
      return {
        title:
          "Blood Donation Centers in Nepal | Where to Donate Blood in Kathmandu",
        description:
          "Find verified blood banks and donation centers in Kathmandu, Patan and Lalitpur. Emergency blood contact information provided by Leo Club of Kathmandu Himalayas Patan.",
        keywords:
          "blood donation nepal, blood banks kathmandu, blood donation centers patan, where to donate blood, blood banks accepting donors, emergency blood donation, blood donor registration, AB+ blood needed, blood group search nepal, donate blood kathmandu",
        image: "/blood-donation-nepal.jpg",
      };
    } else if (category === "old_age_home") {
      return {
        title:
          "Old Age Homes in Nepal | Where to Donate to Elderly in Kathmandu",
        description:
          "List of verified old age homes in Kathmandu and Patan that need donations and support. Help elderly in Nepal through Leo Club of Kathmandu Himalayas Patan.",
        keywords:
          "old age homes nepal, donate to old age home kathmandu, old age home donations, help elderly nepal, donate blankets, donate food old age home, verified old age homes kathmandu, support elderly patan, elderly care donations nepal",
        image: "/old-age-home-nepal.jpg",
      };
    } else if (category === "urgent_needs") {
      return {
        title:
          "Urgent Needs & Emergency Donations in Nepal | Medical & Disaster Relief",
        description:
          "Support emergency fund collections for medical treatments, disaster relief, and critical situations in Nepal. Help those in urgent need through Leo Club of Kathmandu Himalayas Patan.",
        keywords:
          "emergency donations nepal, medical fundraising kathmandu, urgent help nepal, disaster relief donations, liver transplant fund, cancer treatment donation, flood relief nepal, emergency fundraising kathmandu, medical emergency funds, donate to urgent cause nepal",
        image: "/emergency-donations-nepal.jpg",
      };
    } else if (category === "organization") {
      return {
        title:
          "Non-Profit Organizations in Nepal | Support Schools & Community Organizations",
        description:
          "Directory of verified non-profit organizations and schools in Nepal that need support and donations. Help these organizations through Leo Club of Kathmandu Himalayas Patan.",
        keywords:
          "non-profit organizations nepal, donate to schools nepal, support community organizations kathmandu, educational donations nepal, school supply donations, community support nepal, verified non-profits nepal, donate educational materials",
        image: "/organizations-nepal.jpg",
      };
    } else {
      return {
        title:
          "Orphanages in Nepal | Where to Donate to Children's Homes in Kathmandu",
        description:
          "Find orphanages and children's homes in Kathmandu and Patan that need donations. Support children through Leo Club of Kathmandu Himalayas Patan.",
        keywords:
          "orphanages nepal, donate to orphanage kathmandu, children's homes patan, donate clothes orphanage, donate school supplies nepal, orphanages accepting donations, help children nepal, donate toys kathmandu, children charity nepal",
        image: "/orphanages-nepal.jpg",
      };
    }
  };

  const seoParams = getSEOParams();

  const currentUrl = `/donate/${
    category === "blood_bank"
      ? "blood-bank"
      : category === "old_age_home"
      ? "old-age-homes"
      : category === "urgent_needs"
      ? "urgent-needs"
      : category === "organization"
      ? "organizations"
      : "orphanages"
  }`;

  // Add structured data based on category
  useEffect(() => {
    const getStructuredData = () => {
      const baseData = {
        "@context": "https://schema.org",
        "@type": "Service",
        provider: {
          "@type": "Organization",
          name: "Leo Club of Kathmandu Himalayas Patan",
          url: "https://lckhp.org",
          logo: "https://lckhp.org/lckhp-logo.png",
        },
        serviceType: "Donation Directory",
        areaServed: {
          "@type": "City",
          name: "Kathmandu",
          containedIn: {
            "@type": "Country",
            name: "Nepal",
          },
        },
        url: `https://lckhp.org${currentUrl}`,
      };

      if (category === "blood_bank") {
        return {
          ...baseData,
          name: "Blood Donation Centers in Nepal",
          description:
            "Directory of verified blood banks and donation centers in Kathmandu and Patan, Nepal",
          serviceType: "Blood Donation Directory",
          audience: {
            "@type": "Audience",
            audienceType: "Blood Donors",
          },
          potentialAction: {
            "@type": "DonateAction",
            name: "Donate Blood",
            description: "Find blood banks in Nepal where you can donate blood",
          },
        };
      } else if (category === "old_age_home") {
        return {
          ...baseData,
          name: "Old Age Homes in Nepal",
          description:
            "Directory of verified old age homes in Kathmandu and Patan that need donations",
          serviceType: "Old Age Home Directory",
          audience: {
            "@type": "Audience",
            audienceType: "Donors and Volunteers",
          },
          potentialAction: {
            "@type": "DonateAction",
            name: "Donate to Old Age Homes",
            description:
              "Support elderly care facilities in Nepal with donations",
          },
        };
      } else if (category === "urgent_needs") {
        return {
          ...baseData,
          name: "Emergency and Urgent Donation Needs in Nepal",
          description:
            "Directory of verified emergency fundraising campaigns for medical treatments and disaster relief in Nepal",
          serviceType: "Emergency Fund Directory",
          audience: {
            "@type": "Audience",
            audienceType: "Emergency Donors",
          },
          potentialAction: {
            "@type": "DonateAction",
            name: "Emergency Donations",
            description:
              "Contribute to urgent medical and disaster relief needs in Nepal",
          },
        };
      } else if (category === "organization") {
        return {
          ...baseData,
          name: "Non-Profit Organizations in Nepal",
          description:
            "Directory of verified non-profit organizations and schools in Nepal that need donations and support",
          serviceType: "Organization Directory",
          audience: {
            "@type": "Audience",
            audienceType: "Education and Community Supporters",
          },
          potentialAction: {
            "@type": "DonateAction",
            name: "Donate to Organizations",
            description:
              "Support non-profit organizations and schools in Nepal with donations and supplies",
          },
        };
      } else {
        return {
          ...baseData,
          name: "Orphanages and Children's Homes in Nepal",
          description:
            "Directory of verified orphanages and children's homes in Kathmandu and Patan that need donations",
          serviceType: "Orphanage Directory",
          audience: {
            "@type": "Audience",
            audienceType: "Child Welfare Supporters",
          },
          potentialAction: {
            "@type": "DonateAction",
            name: "Donate to Orphanages",
            description:
              "Support children's homes in Nepal with donations and supplies",
          },
        };
      }
    };

    // Add structured data to the page
    const structuredData = getStructuredData();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [category, currentUrl]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO
        title={seoParams.title}
        description={seoParams.description}
        keywords={seoParams.keywords}
        url={currentUrl}
        type="website"
        image={seoParams.image}
      />

      {/* Add WhatsApp emergency button only for blood bank category */}
      {category === "blood_bank" && (
        <WhatsAppEmergencyButton
          phoneNumber="+977-9862857260"
          message="URGENT BLOOD REQUEST: I am in an emergency situation requiring immediate blood assistance. I have the hospital prescription letter ready to share. Please respond as soon as possible as this is time-sensitive. Thank you."
        />
      )}

      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          {category === "blood_bank"
            ? "Blood Banks & Donation Centers in Nepal"
            : category === "old_age_home"
            ? "Old Age Homes Accepting Donations in Nepal"
            : category === "urgent_needs"
            ? "Urgent Needs & Emergency Fund Collections in Nepal"
            : category === "organization"
            ? "Non-Profit Organizations & Schools Needing Support in Nepal"
            : "Orphanages & Children's Homes Needing Support in Nepal"}
        </h1>

        <div className="mb-6 flex justify-between">
          <Link
            to="/donate"
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-all hover:bg-gray-300"
          >
            &larr; Back to Donate
          </Link>
        </div>

        {/* Category description section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {category === "blood_bank" && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                About Blood Donation in Nepal
              </h2>
              <p className="text-gray-600 mb-4">
                Blood donation is a critical need in Nepal. The organizations
                listed below are verified blood banks and donation centers where
                you can donate blood to help save lives. Regular blood donation
                is encouraged to maintain adequate blood supply for emergency
                situations.
              </p>
            </div>
          )}
          {category === "old_age_home" && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Supporting Old Age Homes in Nepal
              </h2>
              <p className="text-gray-600 mb-4">
                Old age homes in Nepal often rely on donations and support from
                the community. You can donate essentials like food, clothing,
                medicine, and blankets to these verified facilities. Your
                contributions help provide better care for elderly citizens in
                need.
              </p>
            </div>
          )}
          {category === "urgent_needs" && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Urgent Needs & Emergency Fund Collections in Nepal
              </h2>
              <p className="text-gray-600 mb-4">
                These are critical situations requiring immediate financial
                support, including medical treatments and disaster relief. Each
                case has been verified by our team. Your donations to these
                urgent causes can make a life-saving difference for individuals
                and families in crisis.
              </p>
            </div>
          )}
          {category === "organization" && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Supporting Non-Profit Organizations in Nepal
              </h2>
              <p className="text-gray-600 mb-4">
                These verified non-profit organizations and schools in Nepal
                need your support. You can contribute by donating educational
                materials, supplies, and resources to help these organizations
                continue their important work in the community.
              </p>
            </div>
          )}
          {category === "orphanage" && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Supporting Orphanages & Children's Homes in Nepal
              </h2>
              <p className="text-gray-600 mb-4">
                Children's homes and orphanages in Nepal need continuous support
                from donors. You can help by donating food, clothing,
                educational supplies, and other necessities to these verified
                facilities. Your generosity directly impacts the quality of life
                for children without families.
              </p>
            </div>
          )}

          <p className="text-gray-600 italic">
            * All listings on this page have been verified by Leo Club of
            Kathmandu Himalayas Patan as of{" "}
            <span className="font-medium">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            . If you notice any information that needs updating, please contact
            us.
          </p>
        </div>

        {/* Display list of directory items */}
        <div className="mb-10">
          <DonateList category={category} />
        </div>

        {/* Go to Home Button */}
        <div className="mt-12 text-center">
          <GoHomeButton variant="primary" />
        </div>

        {/* SEO Links for better search visibility */}
        <DonateSeoLinks />
      </div>
    </div>
  );
};

export default DonateCategory;
