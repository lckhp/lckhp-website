import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel: React.FC = () => {
  // Real images with descriptions - all from public directory
  const carouselImages = [
    {
      id: 1,
      image: "/carousel/1.jpg",
      alt: "Disaster Relief Program",
      caption: "Disaster Relief Program",
      description:
        "Leos in flood relief, providing essential support to affected communities.",
    },
    {
      id: 2,
      image: "/carousel/2.JPG",
      alt: "Hunger Relief Program",
      caption: "Hunger Relief Program",
      description: "Providing meals and support at local orphanages.",
    },
    {
      id: 3,
      image: "/carousel/3.jpg",
      alt: "Leos Fellowship Hiking",
      caption: "Leos Fellowship Hiking",
      description:
        "Building team spirit and friendship through outdoor activities.",
    },
    {
      id: 4,
      image: "/carousel/4.jpg",
      alt: "AMR Youth Awareness",
      caption: "AMR Youth Awareness",
      description:
        "Educating youth on antimicrobial resistance and health practices.",
    },
    {
      id: 5,
      image: "/carousel/5.JPG",
      alt: "Health Screening",
      caption: "Health Screening Program",
      description:
        "Providing health checkups and care for elderly at old age homes.",
    },
    {
      id: 6,
      image: "/carousel/6.jpg",
      alt: "Animal Welfare",
      caption: "Animal Welfare Initiative",
      description: "Volunteering to help and protect animals in our community.",
    },
    {
      id: 7,
      image: "/carousel/7.JPG",
      alt: "Leos Fellowship Futsal",
      caption: "Leos Fellowship Futsal",
      description: "Promoting teamwork and healthy lifestyle through sports.",
    },
    {
      id: 8,
      image: "/carousel/8.JPG",
      alt: "Leo District Award",
      caption: "Leo District Recognition",
      description:
        "LCKHP being recognized and awarded by our Leo District for outstanding service.",
    },
    {
      id: 9,
      image: "/carousel/9.JPG",
      alt: "Candlelight Vigil",
      caption: "Candlelight Vigil Ceremony",
      description:
        "Honoring the memory of Nepali students who lost their lives abroad through a solemn candlelight vigil.",
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    lazyLoad: "progressive" as const,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="carousel-section" className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Our Impact</span>
            <span className="mt-2 block text-lg font-normal text-gray-500">
              A glimpse of our recent initiatives and achievements
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 bg-green-500"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Carousel slider */}
          <div className="relative rounded-xl shadow-2xl overflow-hidden">
            {/* Gradient overlay for slider dots visibility */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent z-10"></div>

            <Slider {...settings} className="carousel-slider">
              {carouselImages.map((item) => (
                <div key={item.id} className="outline-none">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-20">
                      <h3 className="text-2xl font-bold mb-2">
                        {item.caption}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
