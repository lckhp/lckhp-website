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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <SEO
          title="Member Not Found | Leo Club of Kathmandu Himalayas Patan"
          description="This Leo Club member profile could not be found. Please visit our members directory to see all active Leo members."
          url={`/2425/members`}
        />
        <h1 className="text-2xl md:text-4xl font-bold">Member not found!</h1>
        <div className="navigation mt-8">
          <Link to="/2425/members" className="text-blue-400 hover:underline">
            Go to Members
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

  return (
    <div className="bg-gray-100 min-h-screen">
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
      <div className="container mx-auto p-5">
        <div className="bg-white p-5 rounded shadow-lg flex flex-col items-center relative">
          <div className="relative">
            {/* Display Leo logo overlay only if membership_type is "General Member" */}
            {member.membership_type === "General Member" && (
              <img
                src="/leo-logo.png"
                alt="Leo Logo"
                className="absolute inset-0 opacity-20 transform scale-175 pointer-events-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(1.75)",
                }}
                onDragStart={preventDefault}
              />
            )}
            {photoUrl && (
              <div
                className="relative w-40 h-40 rounded-full border-4 border-yellow-500 flex items-center justify-center mb-4 mt-4 pointer-events-none"
                style={{ zIndex: 2 }}
                onDragStart={preventDefault}
              >
                <img
                  src={photoUrl}
                  alt={`Profile of ${member.name}`}
                  className="w-36 h-36 rounded-full object-cover pointer-events-none"
                />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold mt-3">
            {member.membership_type === "General Member"
              ? `Leo ${member.name}`
              : member.name}
          </h1>
          <p className="text-2xl font-bold mb-4">{member.designation}</p>

          <MemberInfo member={member} />

          <div className="flex space-x-4 mt-1">
            <a
              href={`mailto:${member.club_email}`}
              aria-label={`Send email to ${member.name}`}
              rel="noopener noreferrer"
            >
              <img
                src={emailLogo}
                alt="Email"
                className="w-10 h-10 rounded-full"
              />
            </a>
            {/* Conditionally render social media logos if URLs are present */}
            {member.fb_url && (
              <a
                href={member.fb_url}
                target="_blank"
                aria-label={`${member.name}'s Facebook profile`}
                rel="noopener noreferrer"
              >
                <img
                  src={facebookLogo}
                  alt="Facebook"
                  className="w-10 h-10 rounded-full"
                />
              </a>
            )}
            {member.insta_url && (
              <a
                href={member.insta_url}
                target="_blank"
                aria-label={`${member.name}'s Instagram profile`}
                rel="noopener noreferrer"
              >
                <img
                  src={instagramLogo}
                  alt="Instagram"
                  className="w-10 h-10 rounded-full"
                />
              </a>
            )}
            {member.linkedin_url && (
              <a
                href={member.linkedin_url}
                target="_blank"
                aria-label={`${member.name}'s LinkedIn profile`}
                rel="noopener noreferrer"
              >
                <img
                  src={linkedinLogo}
                  alt="LinkedIn"
                  className="w-10 h-10 rounded-full"
                />
              </a>
            )}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/2425/members" className="text-blue-500 hover:underline">
            Back to Members Directory
          </Link>
        </div>
      </div>
    </div>
  );
};

const MemberInfo: React.FC<{ member: (typeof membersData)[0] }> = ({
  member,
}) => {
  return (
    <div className="text-center">
      {" "}
      {/* Add text-center class here */}
      <p className="text-gray-600 mb-1">
        <strong>Occupation:</strong> {member.occupation}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Contact Number:</strong> {member.contact_number}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Personal Email:</strong>{" "}
        <a
          href={`mailto:${member.email}`}
          className="text-blue-500 hover:underline break-words inline-block"
          style={{ wordBreak: "break-word", textAlign: "center" }} // Added style
        >
          {member.email}
        </a>
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Club Email:</strong>{" "}
        <a
          href={`mailto:${member.club_email}`}
          className="text-blue-500 hover:underline break-words inline-block"
          style={{ wordBreak: "break-word", textAlign: "center" }} // Added style
        >
          {member.club_email}
        </a>
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Address:</strong> {member.address}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Membership Type:</strong> {member.membership_type}
      </p>
      {/* Show Leo/Lions ID only if membership_type is "General Member" */}
      {member.membership_type === "General Member" && (
        <p className="text-gray-600 mb-1">
          <strong>Leo/Lions ID:</strong> {member.leo_lions_id}
        </p>
      )}
      <p className="text-gray-600 mb-3">
        <strong>Joined Date:</strong> {member.joined_date}
      </p>
    </div>
  );
};

export default MemberProfile;
