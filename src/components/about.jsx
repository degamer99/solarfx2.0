// AboutUsSection.js
import Image from "next/image";
import AboutImage from "../../public/images/about.png";
import React from "react";

const AboutUsSection = () => {
  return (
    <section className="bg-white py-4 px-6" id="about">
      <p className=" text-center text-xl font-bold text-gray-400">
        {" "}
        Our Heritage{" "}
      </p>
      <h2 className=" text-center text-5xl text-gray-800 font-bold my-4">
        History of <span className="text-green-500">Solarfx</span>
      </h2>
      <div className="container mx-auto">
        {/* <h2 className="text-3xl font-semibold text-center mb-8">About Solarfx</h2> */}

        <div className="flex flex-col lg:flex-row items-center my-4 lg:items-start">
          <div className="lg:w-1/2 lg:pr-8 mb-6">
            {/* Placeholder for a stock image */}
            {/* <img
              className="w-full h-auto rounded-md shadow-md"
              src={AboutImage.src}
              alt="Company Office"
            /> */}
            <Image
              className="w-full h-auto rounded-md shadow-md"
              src={AboutImage}
              alt="Company Office"
            />
          </div>
          <div className="lg:w-1/2 [&>p]:text-lg">
            <p className="text-gray-700 mb-4">
              Solarfx is a leading financial services provider specializing in
              forex and stock trading. With a commitment to excellence, we
              empower traders and investors to navigate the dynamic world of
              financial markets.
            </p>

            <p className="text-gray-700 mb-4">
              At Solarfx, we leverage cutting-edge technology to offer a
              seamless and secure trading experience. Our platform provides
              access to a wide range of financial instruments, including
              currencies, stocks, and cryptocurrencies.
            </p>

            <p className="text-gray-700 mb-4">
              Our team of experienced professionals is dedicated to providing
              personalized support and educational resources, ensuring our
              clients make informed decisions and achieve their financial goals.
            </p>

            <p className="text-gray-700">
              Join Solarfx today and embark on a journey of financial growth and
              success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
