import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import GoHomeButton from "../components/GoHomeButton";

/**
 * ProjectsSeoLinks component for SEO optimization
 * Contains hidden links for search engines
 */
const ProjectsSeoLinks: React.FC = () => {
  return (
    <div className="sr-only" aria-hidden="true">
      <h2>Community Projects in Nepal</h2>
      <ul>
        <li>
          <a href="/projects">Leo Club Projects in Nepal</a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            We Hear Your Outcry Project
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">
            Uttam Shakti - Pad Making Initiative
          </a>
        </li>
        <li>
          <a href="/projects">Youth-led Community Projects in Kathmandu</a>
        </li>
        <li>
          <a href="/projects">Social Impact Projects in Nepal</a>
        </li>
        <li>
          <a href="/projects/we-hear-your-outcry">
            Mental Health Awareness in Nepal
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">
            Women Empowerment Projects in Nepal
          </a>
        </li>
        <li>
          <a href="/projects/uttam-shakti">Menstrual Health Education Nepal</a>
        </li>
      </ul>

      <h2>Community Service Categories</h2>
      <ul>
        <li>
          <a href="/projects">Youth Leadership Projects Nepal</a>
        </li>
        <li>
          <a href="/projects">Health Awareness Campaigns in Kathmandu</a>
        </li>
        <li>
          <a href="/projects">Environmental Initiatives in Patan</a>
        </li>
        <li>
          <a href="/projects">Educational Outreach Programs Nepal</a>
        </li>
      </ul>
    </div>
  );
};

const Projects: React.FC = () => {
  useEffect(() => {
    document.title = "Projects | Leo Club of Kathmandu Himalayas Patan";

    // Add structured data for Project Collection
    const projectsStructuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Community Projects by Leo Club of Kathmandu Himalayas Patan",
      description:
        "Discover the community service projects initiated by Leo Club KHP including We Hear Your Outcry and Uttam Shakti initiatives making a difference in Nepal.",
      url: "https://lckhp.org/projects",
      isPartOf: {
        "@type": "WebSite",
        name: "Leo Club of Kathmandu Himalayas Patan",
        url: "https://lckhp.org",
      },
      about: {
        "@type": "Organization",
        name: "Leo Club of Kathmandu Himalayas Patan",
        url: "https://lckhp.org",
      },
      hasPart: [
        {
          "@type": "CreativeWork",
          name: "We Hear Your Outcry",
          description:
            "A compassionate initiative dedicated to acknowledging and addressing the diverse challenges faced by individuals in our community, creating a platform for unheard voices.",
          url: "https://lckhp.org/projects/we-hear-your-outcry",
          image: "https://lckhp.org/assets/projects/we-hear-your-outcry.jpg",
        },
        {
          "@type": "CreativeWork",
          name: "Uttam Shakti",
          description:
            "Empowering individuals through pad-making training and sustainable livelihood skills, addressing health needs in rural Nepal while fostering economic independence.",
          url: "https://lckhp.org/projects/uttam-shakti",
          image: "https://lckhp.org/assets/projects/uttam-shakti.jpg",
        },
      ],
    };

    // Add structured data to the page
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(projectsStructuredData);
    document.head.appendChild(script);

    return () => {
      // Clean up structured data on unmount
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]'
      );
      scripts.forEach((script) => {
        if (script.textContent?.includes("CollectionPage")) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  const projects = [
    {
      id: "we-hear-your-outcry",
      title: "We Hear Your Outcry",
      description:
        "A compassionate initiative dedicated to acknowledging and addressing the diverse challenges faced by individuals in our community, creating a platform for unheard voices.",
      image: "/assets/projects/we-hear-your-outcry.jpg", // This will be created from the PDF cover
    },
    {
      id: "uttam-shakti",
      title: "Uttam Shakti",
      description:
        "Empowering individuals through pad-making training and sustainable livelihood skills, addressing health needs in rural Nepal while fostering economic independence.",
      image: "/assets/projects/uttam-shakti.jpg", // Placeholder image until available
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>
          Community Projects in Nepal | Leo Club of Kathmandu Himalayas Patan
        </title>
        <meta
          name="description"
          content="Explore impactful community projects by Leo Club of KHP including We Hear Your Outcry mental health initiative and Uttam Shakti women empowerment program in Nepal."
        />
        <meta
          name="keywords"
          content="leo club projects, community service nepal, youth volunteering projects, we hear your outcry, uttam shakti, menstrual health nepal, social impact projects kathmandu, youth-led initiatives nepal"
        />
        <link rel="canonical" href="https://lckhp.org/projects" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-2">
            Our Community Projects
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
            Discover the initiatives undertaken by Leo Club of Kathmandu
            Himalayas Patan to create positive impact in our community through
            innovative and empathetic approaches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="transform hover:scale-105 transition-all duration-300"
            >
              <Link to={`/projects/${project.id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  <img
                    src={project.image || "/placeholder-image.png"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/placeholder-image.png";
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600">{project.description}</p>
                    <div className="mt-4 flex justify-end">
                      <span className="inline-flex items-center text-blue-600 hover:text-blue-800">
                        Learn More
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <GoHomeButton variant="secondary" className="text-sm px-6 py-3" />
        </div>

        {/* Add SEO Links */}
        <ProjectsSeoLinks />
      </div>
    </div>
  );
};

export default Projects;
