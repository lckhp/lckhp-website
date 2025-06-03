import React from "react";
import { Link } from "react-router-dom";
import DonateList from "../component/DonateList";
import SEO from "../components/SEO";
import WhatsAppEmergencyButton from "../components/WhatsAppEmergencyButton";
import GoHomeButton from "../components/GoHomeButton";

interface DonateCategoryProps {
  category: string;
}

const DonateCategory: React.FC<DonateCategoryProps> = ({ category }) => {
  // Set SEO parameters based on category
  const getSEOParams = () => {
    if (category === "blood_bank") {
      return {
        title:
          "Blood Donation Centers in Nepal | Leo Club of Kathmandu Himalayas Patan",
        description:
          "Find verified blood banks and donation centers in Kathmandu, Patan and Lalitpur. Emergency blood contact information provided by Leo Club of Kathmandu Himalayas Patan.",
        keywords:
          "blood donation nepal, blood banks kathmandu, blood donation centers patan, where to donate blood, blood banks accepting donors, emergency blood donation, blood donor registration, AB+ blood needed, blood group search nepal",
      };
    } else if (category === "old_age_home") {
      return {
        title:
          "Old Age Homes in Nepal | Where to Donate - Leo Club of Kathmandu Himalayas Patan",
        description:
          "List of verified old age homes in Kathmandu and Patan that need donations and support. Help elderly in Nepal through Leo Club of Kathmandu Himalayas Patan.",
        keywords:
          "old age homes nepal, donate to old age home kathmandu, old age home donations, help elderly nepal, donate blankets, donate food old age home, verified old age homes kathmandu, support elderly patan",
      };
    } else {
      return {
        title:
          "Orphanages in Nepal | Where to Donate - Leo Club of Kathmandu Himalayas Patan",
        description:
          "Find orphanages and children's homes in Kathmandu and Patan that need donations. Support children through Leo Club of Kathmandu Himalayas Patan.",
        keywords:
          "orphanages nepal, donate to orphanage kathmandu, children's homes patan, donate clothes orphanage, donate school supplies nepal, orphanages accepting donations, help children nepal, donate toys kathmandu",
      };
    }
  };

  const seoParams = getSEOParams();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SEO
        title={seoParams.title}
        description={seoParams.description}
        keywords={seoParams.keywords}
        url={`/donate/${
          category === "blood_bank"
            ? "blood-bank"
            : category === "old_age_home"
            ? "old-age-homes"
            : "orphanages"
        }`}
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
      </div>
    </div>
  );
};

export default DonateCategory;
