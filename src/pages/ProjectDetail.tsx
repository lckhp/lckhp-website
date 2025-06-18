import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa";
import GoHomeButton from "../components/GoHomeButton";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  fullDescription: string[];
  imageUrl?: string;
}

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      imageUrl: "/assets/projects/we-hear-your-outcry.jpg",
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
        <title>{`${project.title} - Community Project in Nepal | Leo Club of Kathmandu Himalayas Patan`}</title>
        <meta
          name="description"
          content={`Learn about ${project.title}, a community service project by Leo Club of KHP addressing community support in Nepal.`}
        />
        <link
          rel="canonical"
          href={`https://lckhp.org/projects/${project.id}`}
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

          <div className="mt-10 text-center">
            <GoHomeButton variant="primary" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
