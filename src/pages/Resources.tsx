import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import GoHomeButton from "../components/GoHomeButton";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

// Define interfaces for our resource types
interface BaseResource {
  src: string;
  alt: string;
  text: string;
  category: string;
}

interface LogoResource extends BaseResource {
  url?: never;
}

interface DriveResource extends BaseResource {
  url: string;
}

type Resource = LogoResource | DriveResource;

const Resources: React.FC = () => {
  useEffect(() => {
    document.title = "Resources | Leo Club of Kathmandu Himalayas Patan";
  }, []);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("all");

  const resources: LogoResource[] = [
    {
      src: "/lions-logo.png",
      alt: "Lions International Logo",
      text: "Lions International Logo",
      category: "lions",
    },
    {
      src: "/lions-international-president-logo.JPG",
      alt: "Lions International President Logo",
      text: "Lions International President Logo",
      category: "lions",
    },
    {
      src: "/District-R-DG-logo.jpg",
      alt: "District 325 District Governer Logo",
      text: "District 325 District Governer Logo",
      category: "district",
    },
    {
      src: "/leo-logo.png",
      alt: "Leo Logo",
      text: "Leo Logo",
      category: "leo",
    },
    {
      src: "/md325-logo.PNG",
      alt: "Leo Multiple District 325 President Logo",
      text: "Leo Multiple District 325 President Logo",
      category: "district",
    },
    {
      src: "/ldc325r-dp-logo-2425.png",
      alt: "Leo District 325R President Logo",
      text: "Leo District 325R President Logo",
      category: "district",
    },
    {
      src: "/lckhp-logo.png",
      alt: "LCKHP Club Logo",
      text: "LCKHP Club Logo",
      category: "club",
    },
    {
      src: "/lckhp-logo-50-years.png",
      alt: "LCKHP - 50 Years Logo",
      text: "LCKHP - 50 Years Logo",
      category: "club",
    },
    {
      src: "/lckhp-president-logo-2425.png",
      alt: "LCKHP President Logo 24/25",
      text: "LCKHP President Logo 24/25",
      category: "club",
    },
    {
      src: "/lckhp-president-logo-2324.png",
      alt: "LCKHP President Logo 23/24",
      text: "LCKHP President Logo 23/24",
      category: "club",
    },
  ];

  const googleDriveResources: DriveResource[] = [
    {
      src: "/gdrive.png",
      alt: "District Resources",
      text: "District Resources",
      url: "https://drive.google.com/drive/folders/1X7ayyyaa_shF21ux5kThJe0EIyEQqFz3?usp=sharing",
      category: "documents",
    },
    {
      src: "/gdrive.png",
      alt: "Cluster Resources",
      text: "Cluster Resources",
      url: "https://drive.google.com/drive/folders/1ik1mRIGgTNpS7tuK39IPO-ZexXbOkpT9",
      category: "documents",
    },
  ];

  const handleViewClick = (e: React.MouseEvent, src: string) => {
    e.stopPropagation();
    window.open(src, "_blank");
  };

  const handleDownloadClick = (
    e: React.MouseEvent,
    src: string,
    alt: string
  ) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = src;
    link.download = alt;
    link.click();
  };

  const filteredResources = resources.filter(
    (resource) => category === "all" || resource.category === category
  );

  const allResources: Resource[] = [
    ...filteredResources,
    ...(category === "all" || category === "documents"
      ? googleDriveResources
      : []),
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "lions", name: "Lions International" },
    { id: "leo", name: "Leo" },
    { id: "district", name: "District" },
    { id: "club", name: "Club" },
    { id: "documents", name: "Documents" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="relative py-20 px-4 bg-gradient-to-br from-green-800 to-green-600 text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20px 20px, rgba(255,255,255,0.2) 2px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Leo & Lions Resources
              </h1>
              <div className="h-1 w-24 bg-yellow-400 mx-auto rounded-full mb-6"></div>
              <p className="text-lg max-w-3xl mx-auto">
                Welcome to the official resources page of Leo Club of Kathmandu
                Himalayas Patan. Here you'll find logos and assets for Leo Club,
                Lions International, and our club for official communications.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <SEO
            title="Resources & Logos | Leo Club of Kathmandu Himalayas Patan"
            description="Official logos and resources for Leo Club of Kathmandu Himalayas Patan (LCKHP). Download Lions International, Leo Club, and LCKHP branding assets for official use."
            keywords="leo club logos, lckhp resources, leo club nepal resources, lions international logos, leo club branding, official leo logos"
            url="/resources"
          />

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat.id
                    ? "bg-green-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {allResources.map((resource, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() =>
                  "url" in resource
                    ? window.open(resource.url, "_blank")
                    : undefined
                }
                className={`relative overflow-hidden rounded-xl bg-white border border-gray-100 p-6 flex flex-col items-center 
                  transition-all duration-300 shadow-lg ${
                    "url" in resource ? "cursor-pointer" : ""
                  }`}
              >
                <div className="w-full aspect-square flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4 overflow-hidden">
                  <img
                    src={resource.src}
                    alt={resource.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <h3 className="font-bold text-gray-800 text-center mb-auto">
                  {resource.text}
                </h3>

                {!resource.url && (
                  <motion.div
                    className="mt-4 flex space-x-2 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0,
                      y: hoveredCard === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                      onClick={(e) => handleViewClick(e, resource.src)}
                    >
                      View
                    </button>
                    <button
                      className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                      onClick={(e) =>
                        handleDownloadClick(e, resource.src, resource.alt)
                      }
                    >
                      Download
                    </button>
                  </motion.div>
                )}

                {"url" in resource && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-green-800 to-transparent opacity-0 transition-opacity duration-300 flex items-end justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredCard === index ? 0.8 : 0,
                    }}
                  >
                    <p className="text-white font-medium">View Resources →</p>
                  </motion.div>
                )}

                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  {resource.category}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">
                No resources found in this category.
              </p>
            </motion.div>
          )}

          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <GoHomeButton
              variant="primary"
              className="transition-all transform hover:scale-105"
            />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
