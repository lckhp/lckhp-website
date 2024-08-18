import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import membersData from "../assets/members/json/members.json";

// Import social media logos
import emailLogo from "../assets/logos/email.jpg";
import facebookLogo from "../assets/logos/facebook.png";
import instagramLogo from "../assets/logos/instagram.webp";
import linkedinLogo from "../assets/logos/linkedin.png";

const MemberProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const member = membersData.find((m) => m.id === parseInt(id || "", 10));

  useEffect(() => {
    if (member) {
      const loadImage = async () => {
        const images = import.meta.glob("../assets/members/images/*.JPG");
        const imageName = member.photo_path.split("/").pop();
        const imagePath = `../assets/members/images/${imageName}`;
        if (images[imagePath]) {
          const imageModule = (await images[imagePath]()) as {
            default: string;
          };
          setPhotoUrl(imageModule.default);
        }
      };
      loadImage();
    }
  }, [member]);

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl md:text-4xl font-bold">Member not found!</h1>
        <div className="navigation mt-8">
          <Link to="/2425/members" className="text-blue-400 hover:underline">
            Go to Members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="bg-white p-5 rounded shadow-lg flex flex-col items-center">
        {photoUrl && (
          <img
            src={photoUrl}
            alt={member.name}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
        )}
        <h1 className="text-3xl font-bold">Leo {member.name}</h1>
        <p className="text-1.5xl font-bold mb-6">{member.designation}</p>

        <p className="text-gray-600 mb-2">
          <strong>Occupation:</strong> {member.occupation}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Contact Number:</strong> {member.contact_number}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong>{" "}
          <a
            href={`mailto:${member.email}`}
            className="text-blue-500 hover:underline"
          >
            {member.email}
          </a>
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Address:</strong> {member.address}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Membership Type:</strong> {member.membership_type}
        </p>

        {/* Show Leo/Lions ID only if membership_type is "General Member" */}
        {member.membership_type === "General Member" && (
          <p className="text-gray-600 mb-2">
            <strong>Leo/Lions ID:</strong> {member.leo_lions_id}
          </p>
        )}

        <p className="text-gray-600 mb-6">
          <strong>Joined Date:</strong> {member.joined_date}
        </p>

        <div className="flex space-x-4 mt-4">
          <a href={`mailto:${member.email}`} rel="noopener noreferrer">
            <img
              src={emailLogo}
              alt="Email"
              className="w-10 h-10 rounded-full"
            />
          </a>
          {/* Conditionally render social media logos if URLs are present */}
          {member.fb_url && (
            <a href={member.fb_url} target="_blank" rel="noopener noreferrer">
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
          Members
        </Link>
      </div>
    </div>
  );
};

export default MemberProfile;
