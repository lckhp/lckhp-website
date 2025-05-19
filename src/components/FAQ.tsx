import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the question type
interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
  category: string;
}

const FAQ: React.FC = () => {
  // Define FAQ categories
  const categories = ["All", "About Leo", "Benefits", "Programs", "Membership"];

  // FAQ Data
  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What is Leo Club?",
      answer: (
        <p>
          Leo Club is an international youth organization affiliated with Lions
          Clubs International. It is a place where young people come together to
          make a positive impact on our communities and the world at large. Our
          aim is to develop leadership skills among youth while serving the
          community and making positive change in society. We are known for our
          commitment to leadership, community service, and personal development.
        </p>
      ),
      category: "About Leo",
    },
    {
      id: 2,
      question: "What is the President's Theme?",
      answer: (
        <p>
          In Leo Club, each president sets a theme for their tenure that guides
          the club's focus and activities for the year. The theme represents the
          president's vision for the club and provides direction for service
          projects and initiatives.
          <br></br>
          <br></br>
          Our L.Y. 24/25 President's Theme is "Striving For Change."
        </p>
      ),
      category: "About Leo",
    },
    {
      id: 3,
      question: "When was Leo Club of Kathmandu Himalayas Patan established?",
      answer: (
        <p>
          The Leo Club of Kathmandu Himalayas Patan was chartered on October 29,
          1974, making it Nepal's oldest existing Leo Club with over 50 years of
          service.
        </p>
      ),
      category: "About Leo",
    },
    {
      id: 4,
      question: "What benefits do I get immediately after joining Leo?",
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Leo Club Organizational email (yourname@lckhp.org)</li>
          <li>Your profile portfolio in club website</li>
          <li>Leo Identity Card [For General Members only]</li>
          <li>Leo Pin [For General Members only]</li>
          <li>Club Pin</li>
          <li>President Batch</li>
          <li>Stickers (Leo, Club Logo & 5 Logos)</li>
          <li>Access to Leo Darpan (Ebook to get knowledge about LEO)</li>
          <li>
            Opportunities to contribute to community and gain valuable skills
          </li>
        </ul>
      ),
      category: "Benefits",
    },
    {
      id: 5,
      question: "What long-term benefits can I get from joining Leo?",
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Leadership Development</li>
          <li>Community Involvement</li>
          <li>Communication and Managerial Skills</li>
          <li>Networking</li>
          <li>Global Perspective</li>
          <li>Personal Growth</li>
          <li>Friendship and Camaraderie</li>
          <li>Recognition and Awards</li>
          <li>Organizational Skills and Knowledge</li>
          <li>Training Opportunities</li>
        </ul>
      ),
      category: "Benefits",
    },
    {
      id: 6,
      question: "What kinds of programs does Leo Club organize?",
      answer: (
        <div>
          <p className="mb-2">
            We organize various types of programs including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Community service (Blood donation/Checkup camp/etc.)</li>
            <li>Environmental projects</li>
            <li>Awareness programs</li>
            <li>Animal and support center</li>
            <li>Training</li>
            <li>Children Programs</li>
          </ul>
          <p className="mt-2">
            We also provide professional training programs for members such as:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Software Development</li>
            <li>Leadership and Management</li>
            <li>Career Development</li>
            <li>Communication Skills</li>
            <li>Digital Marketing</li>
            <li>Entrepreneurship</li>
            <li>Design and Creativity (Graphic Design or UI/UX Design)</li>
            <li>Health, Wellness and Stress Management</li>
          </ul>
        </div>
      ),
      category: "Programs",
    },
    {
      id: 7,
      question: "What are the age requirements to join Leo Club?",
      answer: (
        <div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Alpha Leo: Ages 12-18</li>
            <li>Omega Leo: Ages 18-30 (our club)</li>
            <li>Lions: Age 30 and above</li>
          </ul>
          <p className="mt-2">
            To join our "Omega" Leo Club, your age must be between 18 and 30.
          </p>
        </div>
      ),
      category: "Membership",
    },
    {
      id: 8,
      question: "What are the criteria to become a Leo?",
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Age between 18-30</li>
          <li>Will to make a change and contribute to society</li>
          <li>Availability for Volunteer works</li>
          <li>Some documents (Such as photo)</li>
          <li>Membership Fee</li>
        </ul>
      ),
      category: "Membership",
    },
    {
      id: 9,
      question: "What are the types of membership available?",
      answer: (
        <div>
          <p className="mb-2">
            Currently, two types of memberships are open in our club:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Proposed Member:</strong> Membership fee is 500 rs [One
              time]
            </li>
            <li>
              <strong>General Member:</strong> Membership fee is 1500 rs [One
              time]
            </li>
          </ul>
          <p className="mt-2">
            Proposed membership is for individuals who want to join Leo club but
            may not have the full general membership fee amount and may want to
            pay it in installments after being in the club for a certain time.
          </p>
          <p className="mt-2">
            <strong>Key difference:</strong> Proposed members are not eligible
            for official Identity card, board member petition, voting, official
            Leos programs, participation certificates and awards, membership
            certificate and other perks of general membership.
          </p>
          <p className="mt-2">
            Note: Proposed members can become General members any time after
            joining the club by paying the remaining amount.
          </p>
        </div>
      ),
      category: "Membership",
    },
    {
      id: 10,
      question: "How can a Proposed Member be awarded General Membership?",
      answer: (
        <p>
          Proposed members can be awarded General Membership if they meet all of
          the following criteria:
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Member must have attended 5 programs continuously [Without break]
            </li>
            <li>Member must have coordinated one program among those 5</li>
            <li>
              Member must have brought at least two proposed or general members
            </li>
          </ul>
        </p>
      ),
      category: "Membership",
    },
    {
      id: 11,
      question: "How can I contact Leo Club for more information?",
      answer: (
        <p>
          If you have any more queries before joining, kindly contact:
          <br />
          <br />
          <strong>Club Secretary:</strong> Leo Surakshya Khanal
          <br />
          <strong>Contact number:</strong> 9869375899
          <br />
          <strong>Email address:</strong> surakshya@lckhp.org
        </p>
      ),
      category: "About Leo",
    },
    {
      id: 12,
      question: "What is the main aim of Leo Club?",
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Make a Difference</li>
          <li>Foster Leadership</li>
          <li>Build a Supportive Community</li>
          <li>Build Friendship</li>
          <li>Raise different kinds of programs that contribute to change</li>
        </ul>
      ),
      category: "About Leo",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<FAQItem[]>(faqData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);

  // Filter items based on category and search term
  useEffect(() => {
    let filtered = faqData;

    // Filter by category if not "All"
    if (activeCategory !== "All") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.question.toLowerCase().includes(term) ||
          (typeof item.answer === "string" &&
            item.answer.toLowerCase().includes(term))
      );
    }

    setFilteredItems(filtered);
  }, [activeCategory, searchTerm]);

  // Detect when FAQ section is visible
  useEffect(() => {
    const handleScroll = () => {
      if (faqRef.current) {
        const position = faqRef.current.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle FAQ item
  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div
      ref={faqRef}
      id="faq-section"
      className="relative py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto h-1 w-24 bg-green-500 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Leo Club of Kathmandu
            Himalayas Patan, membership, benefits, and our activities.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {item.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    <svg
                      className={`h-6 w-6 transform ${
                        openItemId === item.id ? "rotate-180" : "rotate-0"
                      } transition-transform duration-300 text-green-500`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openItemId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-gray-700 border-t border-gray-100">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No results found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("All");
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <a
            href="/#contact-section"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block">
        <div className="w-64 h-64 rounded-full bg-green-100 opacity-50"></div>
      </div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 hidden lg:block">
        <div className="w-72 h-72 rounded-full bg-green-50 opacity-70"></div>
      </div>
    </div>
  );
};

export default FAQ;
