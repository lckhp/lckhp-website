import landing from "../assets/landing.png";

const Landing = () => {
  return (
    <div className="relative mx-auto px-8 pt-16 sm:max-w-xl md:max-w-full md:px-8 lg:py-24 xl:px-16">
      <div className="mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <h2 className="mb-6 font-sans text-3xl font-extrabold leading-snug tracking-tight text-gray-800 sm:text-4xl">
            Leo Club of <br />
            <span className="inline-block text-green-500">
              Kathmandu Himalayas Patan
            </span>
          </h2>
          <p className="mb-4 text-base text-gray-600 md:text-lg">
            Welcome to Leo Club of Kathmandu Himalayas Patan. Since 1974, we
            have been serving communities with passion and dedication. As the
            oldest existing Leo Club in Nepal, we are committed to empowering
            youth, fostering leadership, and creating meaningful social impact
            through service and innovation.
          </p>
          <p className="mb-4 text-base text-gray-600 md:text-lg">
            Join us in making a difference. Together, we are #StrivingForChange.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-full bg-green-500 px-6 font-medium tracking-wide text-white shadow-md transition duration-200 hover:bg-green-400 focus:ring focus:ring-green-300"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center overflow-hidden">
          <img
            src={landing}
            alt="Landing"
            className="h-[80%] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
