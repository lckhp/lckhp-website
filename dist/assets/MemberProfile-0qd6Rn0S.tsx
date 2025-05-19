import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import membersData from "../assets/members/json/members.json";
import SEO from "../components/SEO";

// Import social media logos
import emailLogo from "../assets/logos/email.png";
import facebookLogo from "../assets/logos/facebook.png";
import instagramLogo from "../assets/logos/instagram.webp";
import linkedinLogo from "../assets/logos/linkedin.png";

const MemberProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  // Check if the ID is actually a URL (like www.linkedin.com/...)
  const isExternalUrl = id?.includes("www.") || id?.includes("http");

  // If it's an external URL, we should redirect to the members page
  if (isExternalUrl) {
    return <Navigate to="/2425/members" replace />;
  }

  const member = membersData.find((m) => m.id === parseInt(id || "", 10));

  // Scroll to top when component mounts or when member changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (member) {
      document.title = `Leo ${member.name}'s Profile`;
    } else {
      document.title = "Leo Member Not Found!";
    }
  }, [member]);

  useEffect(() => {
    if (member) {
      const loadImage = async () => {
        try {
          const images = import.meta.glob([
            "../assets/members/images/*.jpg",
            "../assets/members/images/*.JPG",
            "../assets/members/images/*.jpeg",
            "../assets/members/images/*.JPEG",
            "../assets/members/images/*.png",
            "../assets/members/images/*.PNG",
            "../assets/members/images/*.webp",
            "../assets/members/images/*.WEBP",
          ]);
          const imageName = member.photo_path.split("/").pop();
          const imagePath = `../assets/members/images/${imageName}`;
          if (images[imagePath]) {
            const imageModule = (await images[imagePath]()) as {
              default: string;
            };
            setPhotoUrl(imageModule.default);
          }
        } catch (error) {
          console.error("Failed to load image", error);
        }
      };
      loadImage();
    }
  }, [member]);

  // Prevent dragging of images
  const preventDefault = (e: React.DragEvent | React.MouseEvent) => {
    e.preventDefault();
  };

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
        <SEO
          title="Member Not Found | Leo Club of Kathmandu Himalayas Patan"
          description="This Leo Club member profile could not be found. Please visit our members directory to see all active Leo members."
          url={`/2425/members`}
        />
        <div className="p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl max-w-xl mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Member Not Found
          </h1>
          <p className="text-lg text-blue-200 mb-6">
            We couldn't find the member profile you're looking for.
          </p>
          <Link
            to="/2425/members"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Return to Members Directory
          </Link>
        </div>
      </div>
    );
  }

  // Craft more detailed descriptions for member profiles
  const memberDescription = `${member.name} is a ${
    member.membership_type === "General Member"
      ? "Leo member"
      : member.membership_type
  } at Leo Club of Kathmandu Himalayas Patan${
    member.designation ? `, serving as ${member.designation}` : ""
  }. ${
    member.joined_date ? `Member since ${member.joined_date}.` : ""
  } Leo LCKHP is Nepal's oldest Leo Club, established in 1974, focusing on youth leadership and community service in Kathmandu.`;

  const memberKeywords = `${member.name}, leo club nepal, ${
    member.designation || "leo member"
  }, youth volunteer nepal, community service kathmandu, leo club of kathmandu himalayas patan, lckhp member`;

  // Determine badge color based on designation
  const getBadgeColor = () => {
    if (
      member.designation === "President" ||
      member.designation === "Immediate Past President"
    ) {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else if (
      member.designation === "Vice President" ||
      member.designation.includes("Secretary")
    ) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (
      member.designation === "Treasurer" ||
      member.designation.includes("Treasurer")
    ) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else if (member.designation === "Proposed Member") {
      return "bg-purple-100 text-purple-800 border-purple-200";
    } else if (
      member.designation === "Dropped Member" ||
      member.designation === "Inactive Member"
    ) {
      return "bg-red-100 text-red-800 border-red-200";
    } else {
      return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 relative">
      {member && (
        <SEO
          title={`${member.name} - ${
            member.designation || "Leo Member"
          } | Leo Club of Kathmandu Himalayas Patan`}
          description={memberDescription}
          keywords={memberKeywords}
          url={`/2425/members/${id}`}
          type="profile"
        />
      )}

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Back button */}
        <div className="mb-6 relative z-10">
          <Link
            to="/2425/members"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back to Members Directory</span>
          </Link>
        </div>

        {/* Main profile card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header section with background - no profile image inside */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700 relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 820"
                className="w-full h-full opacity-20"
              >
                <circle cx="200" cy="200" r="150" fill="#FFF" opacity="0.1" />
                <circle cx="1000" cy="100" r="100" fill="#FFF" opacity="0.1" />
                <circle cx="400" cy="400" r="80" fill="#FFF" opacity="0.1" />
                <circle cx="900" cy="500" r="120" fill="#FFF" opacity="0.1" />
              </svg>
            </div>
          </div>

          {/* Profile content section with image at the top */}
          <div className="px-6 pb-8">
            {/* Profile image - positioned at the top with negative margin */}
            <div className="flex justify-center -mt-20 mb-6 relative z-10">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={`Profile of ${member.name}`}
                      className="w-full h-full object-cover"
                      onDragStart={preventDefault}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Leo logo for general members */}
                {member.membership_type === "General Member" && (
                  <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-1 border-2 border-white">
                    <img
                      src="/leo-logo.png"
                      alt="Leo Logo"
                      className="w-6 h-6 object-contain"
                      onDragStart={preventDefault}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mb-6 relative z-10">
              <h1 className="text-3xl font-bold text-gray-900">
                {member.membership_type === "General Member"
                  ? `Leo ${member.name}`
                  : member.name}
              </h1>

              <div className="mt-2">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-medium border ${getBadgeColor()}`}
                >
                  {member.designation}
                </span>
              </div>

              {/* Social media links */}
              <div className="flex justify-center space-x-4 mt-4 relative z-10">
                <a
                  href={`mailto:${member.club_email}`}
                  aria-label={`Send email to ${member.name}`}
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative z-10"
                >
                  <img
                    src={emailLogo}
                    alt="Email"
                    className="w-6 h-6 rounded-full"
                  />
                </a>
                {member.fb_url && (
                  <a
                    href={member.fb_url}
                    target="_blank"
                    aria-label={`${member.name}'s Facebook profile`}
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative z-10"
                  >
                    <img
                      src={facebookLogo}
                      alt="Facebook"
                      className="w-6 h-6 rounded-full"
                    />
                  </a>
                )}
                {member.insta_url && (
                  <a
                    href={member.insta_url}
                    target="_blank"
                    aria-label={`${member.name}'s Instagram profile`}
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative z-10"
                  >
                    <img
                      src={instagramLogo}
                      alt="Instagram"
                      className="w-6 h-6 rounded-full"
                    />
                  </a>
                )}
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    aria-label={`${member.name}'s LinkedIn profile`}
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative z-10"
                  >
                    <img
                      src={linkedinLogo}
                      alt="LinkedIn"
                      className="w-6 h-6 rounded-full"
                    />
                  </a>
                )}
              </div>
            </div>

            {/* Member details in grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto relative z-10">
              <InfoItem label="Occupation" value={member.occupation} />
              <InfoItem
                label="Contact"
                value={
                  <a
                    href={`tel:${member.contact_number}`}
                    className="text-blue-600 hover:underline relative z-10"
                  >
                    {member.contact_number}
                  </a>
                }
              />
              <InfoItem
                label="Personal Email"
                value={
                  <a
                    href={`mailto:${member.email}`}
                    className="text-blue-600 hover:underline break-words relative z-10"
                  >
                    {member.email}
                  </a>
                }
              />
              <InfoItem
                label="Club Email"
                value={
                  <a
                    href={`mailto:${member.club_email}`}
                    className="text-blue-600 hover:underline break-words relative z-10"
                  >
                    {member.club_email}
                  </a>
                }
              />
              <InfoItem label="Address" value={member.address} />
              <InfoItem
                label="Membership Type"
                value={member.membership_type}
              />
              <InfoItem
                label={
                  <div className="flex items-center space-x-1">
                    <span>Leo/Lions ID</span>
                    <div className="relative group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500 cursor-pointer"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="absolute left-0 bottom-full mb-2 w-64 hidden group-hover:block z-20">
                        <div className="bg-black text-white text-xs rounded py-2 px-3 shadow-lg">
                          Leo/Lions ID is the unique international
                          identification number issued by Lions International to
                          each active Leo/Lion individual which is recognizable
                          globally.
                          <br></br>
                          <br></br>
                          Only active general members are eligible to receive
                          this ID.
                          <br></br>
                          <br></br>
                          Proposed and inactive members are not eligible for
                          lions international identification.
                          <div className="absolute left-0 top-full w-3 h-3 -mt-1.5 ml-1 overflow-hidden">
                            <div className="bg-black transform rotate-45 origin-top-left w-2 h-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                value={
                  member.membership_type === "Dropped" ||
                  member.designation === "Dropped Member" ||
                  member.membership_type === "Proposed Member" ||
                  member.designation === "Proposed Member"
                    ? "N/A"
                    : member.leo_lions_id &&
                      (typeof member.leo_lions_id === "string" ||
                        typeof member.leo_lions_id === "number") &&
                      (typeof member.leo_lions_id === "number" ||
                        member.leo_lions_id.trim() !== "")
                    ? member.leo_lions_id
                    : "N/A"
                }
              />
              <InfoItem label="Joined Date" value={member.joined_date} />
              {member.blood_group && (
                <InfoItem
                  label="Blood Group"
                  value={
                    <span className="font-medium text-red-600">
                      {member.blood_group}
                    </span>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// InfoItem component for consistent styling
const InfoItem: React.FC<{
  label: string | React.ReactNode;
  value: React.ReactNode;
}> = ({ label, value }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg relative z-10">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div className="text-gray-900 font-medium">{value}</div>
    </div>
  );
};

export default MemberProfile;
