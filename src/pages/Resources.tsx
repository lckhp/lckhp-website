import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Resources: React.FC = () => {
  useEffect(() => {
    document.title = "LCKHP Resources Page";
  });

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const actions = e.currentTarget.querySelector(".actions") as HTMLElement;
    if (actions) actions.style.display = "block";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const actions = e.currentTarget.querySelector(".actions") as HTMLElement;
    if (actions) actions.style.display = "none";
  };

  const handleViewClick = (src: string) => {
    window.open(src, "_blank");
  };

  const handleDownloadClick = (src: string, alt: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = alt;
    link.click();
  };

  const resources = [
    {
      src: "/lions-logo.png",
      alt: "Lions International Logo",
      text: "Lions International Logo",
    },
    {
      src: "/lions-international-president-logo.JPG",
      alt: "Lions International President Logo",
      text: "Lions International President Logo",
    },
    {
      src: "/District-R-DG-logo.jpg",
      alt: "District 325 District Governer Logo",
      text: "District 325 District Governer Logo",
    },
    { src: "/leo-logo.png", alt: "Leo Logo", text: "Leo Logo" },
    {
      src: "/md325-logo.PNG",
      alt: "Leo Multiple District 325 President Logo",
      text: "Leo Multiple District 325 President Logo",
    },
    {
      src: "/ldc325r-dp-logo-2425.png",
      alt: "Leo District 325R President Logo",
      text: "Leo District 325R President Logo",
    },
    { src: "/lckhp-logo.png", alt: "LCKHP Club Logo", text: "LCKHP Club Logo" },
    {
      src: "/lckhp-president-logo-2425.png",
      alt: "LCKHP President Logo 24/25",
      text: "LCKHP President Logo 24/25",
    },
    {
      src: "/lckhp-president-logo-2324.png",
      alt: "LCKHP President Logo 23/24",
      text: "LCKHP President Logo 23/24",
    },
  ];

  const googleDriveResources = [
    {
      src: "/gdrive.png",
      alt: "District Resources",
      text: "District Resources",
      url: "https://drive.google.com/drive/folders/1X7ayyyaa_shF21ux5kThJe0EIyEQqFz3?usp=sharing", // Replace with actual link
    },
    {
      src: "/gdrive.png",
      alt: "Cluster Resources",
      text: "Cluster Resources",
      url: "https://drive.google.com/drive/folders/1ik1mRIGgTNpS7tuK39IPO-ZexXbOkpT9", // Replace with actual link
    },
  ];

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-5 justify-center">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="relative w-52 text-center border border-gray-300 p-3 rounded-lg shadow-lg"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <img
              src={resource.src}
              alt={resource.alt}
              className="w-full h-auto rounded"
            />
            <div className="mt-2 font-bold">{resource.text}</div>
            <div className="actions absolute bottom-2 left-1/2 transform -translate-x-1/2 hidden">
              <button
                className="m-1 p-1.5 text-sm cursor-pointer border-none bg-blue-500 text-white rounded"
                onClick={() => handleViewClick(resource.src)}
              >
                View
              </button>
              <button
                className="m-1 p-1.5 text-sm cursor-pointer border-none bg-blue-500 text-white rounded"
                onClick={() => handleDownloadClick(resource.src, resource.alt)}
              >
                Download
              </button>
            </div>
          </div>
        ))}
        {googleDriveResources.map((resource, index) => (
          <div
            key={index}
            className="relative w-52 text-center border border-gray-300 p-3 rounded-lg shadow-lg cursor-pointer"
            onClick={() => window.open(resource.url, "_blank")}
          >
            {resource.src && (
              <img
                src={resource.src}
                alt={resource.alt}
                className="w-full h-auto rounded"
              />
            )}
            <div className="mt-2 font-bold">{resource.text}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link to="/" className="text-blue-400 hover:underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Resources;
