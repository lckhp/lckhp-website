import about from "../assets/about.png";

const About = () => {
  return (
    <div className="relative mx-auto px-8 pt-16 sm:max-w-xl md:max-w-full md:px-8 lg:py-24 xl:px-16">
      <div className="mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <h2 className="mb-6 font-sans text-3xl font-extrabold leading-snug tracking-tight text-gray-800 sm:text-4xl">
            About Us
          </h2>
          <p className="mb-4 text-base text-gray-600 md:text-lg">
            The Leo Club of Kathmandu Himalayas Patan, chartered on October 29,
            1974, is Nepal’s first and oldest Leo Club. With over 50 years of
            service, we have been at the forefront of youth empowerment and
            community development. Our club is part of a global network of
            Leos, working to inspire leadership, teamwork, and volunteerism
            among young individuals.
          </p>
          <p className="mb-4 text-base text-gray-600 md:text-lg">
            From health awareness programs to environmental initiatives,
            disaster relief, and cultural exchange, we strive to address local
            challenges and build a better future for our community and beyond.
          </p>
          <div className="mt-8">
            <p className="text-lg font-semibold text-gray-800">Our Motto:</p>
            <p className="text-base text-gray-600">
              Leadership, Experience, Opportunity.
            </p>
            <p className="mt-4 text-lg font-semibold text-gray-800">Our Goal:</p>
            <p className="text-base text-gray-600">
              Empower youth to lead and serve.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center overflow-hidden">
          <img
            src={about}
            alt="About"
            className="h-[80%] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
