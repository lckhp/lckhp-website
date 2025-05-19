import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: string;
  dateAdded: string;
}

const RecentBlogs: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // These are fallback blog posts in case the fetch fails
  const fallbackPosts: BlogPost[] = [
    {
      id: "1",
      title: "Youth Leadership Development Through Community Service",
      brief:
        "How young Leo members build leadership skills while serving communities in Nepal.",
      slug: "youth-leadership-development",
      coverImage: "/blog-images/leadership.jpg",
      dateAdded: "2023-09-15",
    },
    {
      id: "2",
      title: "Impact of Leo Club Activities on Local Communities",
      brief:
        "Exploring how our volunteer initiatives create lasting change in Kathmandu and Patan.",
      slug: "community-impact",
      coverImage: "/blog-images/community.jpg",
      dateAdded: "2023-10-22",
    },
    {
      id: "3",
      title: "Environmental Conservation Efforts in Kathmandu Valley",
      brief:
        "Our ongoing projects to address environmental challenges in Nepal's urban centers.",
      slug: "environmental-conservation",
      coverImage: "/blog-images/environment.jpg",
      dateAdded: "2023-11-05",
    },
  ];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Using Hashnode's GraphQL API
        const response = await fetch("https://gql.hashnode.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query GetPublicationArticles {
                publication(host: "blog.lckhp.org") {
                  posts(first: 6) {
                    edges {
                      node {
                        id
                        title
                        brief
                        slug
                        coverImage {
                          url
                        }
                        publishedAt
                      }
                    }
                  }
                }
              }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data = await response.json();

        // Process and set the blog posts
        if (
          data &&
          data.data &&
          data.data.publication &&
          data.data.publication.posts
        ) {
          const posts = data.data.publication.posts.edges;

          if (posts && posts.length > 0) {
            const formattedPosts = posts.map((edge: any) => {
              const post = edge.node;
              return {
                id: post.id,
                title: post.title,
                brief: post.brief,
                slug: post.slug,
                coverImage:
                  post.coverImage?.url || "/blog-images/default-cover.jpg",
                dateAdded: post.publishedAt,
              };
            });

            setBlogPosts(formattedPosts);
          } else {
            // Use fallback posts if no posts are returned
            setBlogPosts(fallbackPosts);
          }
        } else {
          // Use fallback posts if API response format is unexpected
          setBlogPosts(fallbackPosts);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        // Use fallback posts on error
        setBlogPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "";
    }

    try {
      // Handle ISO format dates like "2025-05-14T17:21:48.161Z"
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString;
      }

      // Format date as "Month Day, Year" (e.g., "May 14, 2025")
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      // If there's any error parsing the date, return the original string
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    arrows: true,
    centerMode: false,
    adaptiveHeight: true,
    className: "center",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div id="recent-blogs-section" className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Latest From Our Blog</span>
            <span className="mt-2 block text-lg font-normal text-gray-500">
              Stay updated with our recent stories and initiatives
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 bg-green-500"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <Slider {...settings} className="blog-slider">
              {blogPosts.map((post) => (
                <div key={post.id} className="px-2 outline-none pb-5 pt-1">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 transform">
                    <div className="relative overflow-hidden">
                      <a
                        href={`https://blog.lckhp.org/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block flex-shrink-0"
                        aria-label={`Read ${post.title}`}
                        title={post.title}
                      >
                        <img
                          src={
                            post.coverImage || "/blog-images/default-cover.jpg"
                          }
                          alt={`${post.title} - Featured image`}
                          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/blog-images/default-cover.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300 hover:bg-opacity-0"></div>
                      </a>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="text-sm text-green-600 mb-2">
                        {formatDate(post.dateAdded)}
                      </div>
                      <a
                        href={`https://blog.lckhp.org/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors mb-2 line-clamp-2"
                      >
                        {post.title}
                      </a>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                        {post.brief}
                      </p>
                      <a
                        href={`https://blog.lckhp.org/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-medium text-green-600 hover:text-green-700 transition-all hover:translate-x-1"
                      >
                        Read More
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://blog.lckhp.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
            aria-label="Visit the Leo Club of Kathmandu Himalayas Patan blog"
            title="LCKHP Blog - Read our latest articles"
          >
            Visit Our Blog
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
