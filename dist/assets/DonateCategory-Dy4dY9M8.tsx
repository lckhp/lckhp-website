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
                Supporting Urgent & Emergency Needs in Nepal
              </h2>
              <p className="text-gray-600 mb-4">
                These are verified emergency fund collections for critical
                situations such as medical treatments (cancer, transplants),
                natural disasters (floods, landslides, fires, earthquakes), and
                other urgent needs. Your donation, no matter how small, can make
                a significant difference in someone's life during their most
                challenging times.
              </p>
            </div>
          )}
          {category === "orphanage" && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Helping Orphanages in Nepal
              </h2>
              <p className="text-gray-600 mb-4">
                Orphanages and children's homes in Nepal need continuous support
                to provide education, shelter, and care for children. Consider
                donating clothes, school supplies, food, or toys to these
                verified organizations. Your contribution can make a significant
                difference in a child's life.
              </p>
            </div>
          )}
        </div>

        <DonateList category={category} />

        {/* WhatsApp Emergency Contact for Blood Banks */}
        {category === "blood_bank" && (
          <div className="mt-8 rounded-lg border-2 border-red-300 bg-red-50 p-5 text-center">
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Emergency Blood Request
            </h3>
            <p className="text-lg font-medium text-red-800">
              In case of urgency in Kathmandu and Pokhara,
              <a
                href="https://wa.me/9779862857260"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 text-blue-600 underline hover:text-blue-800"
              >
                Whatsapp
              </a>
              your authorized hospital prescription letter to Leo Sonam Sherpa
              (Founder Member of T.U. Lions Blood Transfusion & Research Center,
              Kirtipur) in this number:
              <a
                href="https://wa.me/9779862857260"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-semibold text-blue-600 hover:text-blue-800"
              >
                +977-9862857260
              </a>
            </p>
          </div>
        )}

        {/* Go to Home Button */}
        <div className="mt-12 text-center">
          <GoHomeButton variant="primary" />
        </div>

        {/* Add SEO links for better search engine visibility */}
        <DonateSeoLinks />
      </div>
    </div>
  );
};

export default DonateCategory;
