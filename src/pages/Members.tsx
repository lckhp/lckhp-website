import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import membersData from "../assets/members/json/members.json"; // Import JSON data

interface MembersProps {
  year: string;
}

const Members: React.FC<MembersProps> = ({ year }) => {
  const [images, setImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Function to load all images with various extensions
    const loadImages = async () => {
      const imports = import.meta.glob([
        "../assets/members/images/*.jpg",
        "../assets/members/images/*.JPG",
        "../assets/members/images/*.jpeg",
        "../assets/members/images/*.JPEG",
        "../assets/members/images/*.png",
        "../assets/members/images/*.PNG",
        "../assets/members/images/*.webp",
        "../assets/members/images/*.WEBP",
      ]);
      const imageEntries = await Promise.all(
        Object.entries(imports).map(async ([path, importFunc]) => {
          const imageModule = (await importFunc()) as { default: string };
          const imagePath = path.split("/").pop() || "";
          return [imagePath, imageModule.default];
        })
      );
      setImages(Object.fromEntries(imageEntries));
    };

    loadImages();
  }, []);

  const getImagePath = (photoPath: string) => {
    const imageName = photoPath.split("/").pop();
    return imageName ? images[imageName] : "";
  };

  if (year !== "2425") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl md:text-4xl font-bold">
          Sorry, members for L.Y. {year} is currently unavailable!
        </h1>
        <div className="navigation mt-8">
          <Link to="/" className="text-blue-400 hover:underline">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      {/* Title at the top of the page */}
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Meet Our Leo Team L.Y. 24/25
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {membersData.map((member) => (
          <div
            key={member.id}
            className="relative bg-white p-5 rounded shadow-lg flex flex-col items-center"
          >
            {/* Display Leo logo only if membership_type is "General Member" */}
            {member.membership_type === "General Member" && (
              <img
                src="/leo-logo.png" // Path to your Leo logo in the public folder
                alt="Leo Logo"
                className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-full"
                style={{ zIndex: 1 }}
              />
            )}
            {/* Member photo */}
            <img
              src={getImagePath(member.photo_path)}
              alt={member.name}
              className="relative w-32 h-32 rounded-full object-cover mb-4"
              style={{ zIndex: 2 }}
            />
            <h2
              className="text-xl font-semibold relative"
              style={{ zIndex: 2 }}
            >
              {member.name}
            </h2>
            <p className="text-gray-600 relative" style={{ zIndex: 2 }}>
              {member.designation}
            </p>
            <Link
              to={`/2425/members/${member.id}`}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 relative"
              style={{ zIndex: 2 }}
            >
              Go To Profile
            </Link>
          </div>
        ))}
      </div>
      <div className="navigation mt-8 flex justify-center">
        <Link to="/" className="text-blue-400 hover:underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Members;
