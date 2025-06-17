import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoHomeButton from "../components/GoHomeButton";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  fullDescription: string[];
  hasPdf?: boolean;
  pdfPath?: string;
  imageUrl?: string;
  pdfImages?: number;
}

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const sliderRef = React.useRef<Slider>(null);

  // Project data
  const projectsData: ProjectData[] = [
    {
      id: "we-hear-your-outcry",
      title: "We Hear Your Outcry",
      description:
        "An initiative to acknowledge and address challenges faced by community members",
      fullDescription: [
        "Leo Club of Kathmandu Himalayas' Patan is proud to present the 'We Hear Your Outcry' series, a compassionate initiative dedicated to acknowledging and addressing the diverse challenges faced by individuals in our community.",
        "This empathetic endeavor creates a safe space where we actively listen to and learn from the personal struggles of others, recognizing that every story contains valuable insights and lessons. Through these authentic narratives, we aim to raise awareness about various societal hardships, illuminate the resilience within our community, and inspire others to overcome obstacles with determination and hope.",
        "'We Hear Your Outcry' establishes a platform that not only amplifies often-unheard voices but also serves as a beacon of inspiration for individuals navigating difficult circumstances. By thoughtfully sharing these experiences, we cultivate an environment of empathy, understanding, and mutual support throughout our community.",
        "We invite you to join us in this meaningful journey as we transform challenges into opportunities for collective growth, healing, and unity. Together, we can create positive change and provide support to those who need it most, embodying our commitment to service and compassion.",
      ],
      hasPdf: true,
      pdfPath:
        "/assets/projects/WeHearYourOutcry-Episode1-DrugAidsAndAwareness.pdf",
      imageUrl: "/assets/projects/we-hear-your-outcry.jpg",
      pdfImages: 15,
    },
    {
      id: "uttam-shakti",
      title: "Uttam Shakti",
      description:
        "Empowering individuals through pad making training and skill development",
      fullDescription: [
        "Uttam Shakti is a transformative initiative by the Leo Club of Kathmandu Himalayas Patan designed to empower individuals through comprehensive pad-making training while simultaneously developing sustainable livelihood skills.",
        "This holistic program addresses multiple community needs by increasing accessibility to sanitary products in Nepal's underserved rural areas while fostering economic independence through practical skill acquisition. Our approach combines health education with entrepreneurial development, creating pathways to self-sufficiency and improved well-being.",
        "Through workshops, mentorship, and ongoing support, participants gain both technical expertise in producing quality sanitary products and fundamental business knowledge to transform these skills into income-generating opportunities. This dual focus on health awareness and economic empowerment creates lasting positive impacts for individuals and their communities.",
        "Uttam Shakti represents our commitment to sustainable development solutions that honor local contexts and needs. By investing in people's capabilities and creating access to essential health products, we're working toward a vision of healthier, more resilient, and economically empowered communities across Nepal.",
      ],
      imageUrl: "/assets/projects/uttam-shakti.jpg",
    },
  ];

  useEffect(() => {
    // Find the project data matching the route parameter
    const currentProject = projectsData.find((p) => p.id === projectId);

    if (currentProject) {
      setProject(currentProject);
      document.title = `${currentProject.title} | Leo Club of Kathmandu Himalayas Patan`;
    } else {
      // Redirect to projects page if project not found
      navigate("/projects");
    }

    setLoading(false);
  }, [projectId, navigate]);

  // Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentPage(newIndex + 1);
    },
    customPaging: (i: number) => (
      <div
        className="w-3 h-3 mx-1 rounded-full bg-gray-300 hover:bg-blue-500"
        style={{
          backgroundColor: i === currentPage - 1 ? "#3B82F6" : "#D1D5DB",
        }}
      />
    ),
    dotsClass: "slick-dots custom-dots",
  };

  const generatePdfImageArray = (totalPages: number) => {
    const images = [];
    for (let i = 1; i <= totalPages; i++) {
      images.push({
        id: i,
        src: `/assets/projects/WeHearYourOutcry-Episode1-DrugAidsAndAwareness/${i}.jpg`,
        alt: `Page ${i}`,
      });
    }
    return images;
  };

  if (loading || !project) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{project.title} | Leo Club of Kathmandu Himalayas Patan</title>
        <meta
          name="description"
          content={`Learn more about ${project.title}, a project initiated by Leo Club of Kathmandu Himalayas Patan.`}
        />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center text-blue-700 hover:text-blue-900 mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to Projects</span>
          </button>

          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            {project.title}
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mb-8"></div>

          {project.imageUrl && (
            <div className="mb-8">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/placeholder-image.png";
                }}
              />
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            {project.fullDescription.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {project.hasPdf && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-2xl font-semibold text-blue-900 mb-4 md:mb-0">
                  Project Document
                </h2>
                <div className="flex space-x-4">
                  <a
                    href={project.pdfPath}
                    download
                    className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
                  >
                    <FaDownload className="mr-2" />
                    Download PDF
                  </a>
                  <a
                    href={project.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    View PDF
                  </a>
                </div>
              </div>

              {project.pdfImages && project.pdfImages > 0 && (
                <div className="mt-6">
                  <div className="carousel-container">
                    <Slider {...settings} ref={sliderRef}>
                      {generatePdfImageArray(project.pdfImages).map((image) => (
                        <div key={image.id} className="outline-none">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full max-h-[70vh] object-contain mx-auto"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "/placeholder-image.png";
                            }}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      className={`px-4 py-2 rounded flex items-center ${
                        currentPage <= 1
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-700 text-white hover:bg-blue-800"
                      }`}
                      onClick={() => sliderRef.current?.slickPrev()}
                      disabled={currentPage <= 1}
                    >
                      <FaArrowLeft className="mr-2" />
                      Previous
                    </button>

                    <span className="text-gray-700">
                      Page {currentPage} of {project.pdfImages}
                    </span>

                    <button
                      className={`px-4 py-2 rounded flex items-center ${
                        currentPage >= project.pdfImages
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-700 text-white hover:bg-blue-800"
                      }`}
                      onClick={() => sliderRef.current?.slickNext()}
                      disabled={currentPage >= project.pdfImages}
                    >
                      Next
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <GoHomeButton variant="secondary" className="text-sm px-6 py-3" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
