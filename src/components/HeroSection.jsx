"use client"
import { motion, AnimatePresence } from "framer-motion";
import Hero1 from "../../public/images/hero1.png";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "./ui/button";
import ParticlesComponent from "@/components/ui/ParticleBackground"
const heroData = [
  {
    headline: "The Safest Place To Trade",
    title: "Fortress of Financial Confidence",
    paragraph:
      "Trade with confidence in our secure fortress - where safety meets success in finance, forex, and stocks.",
    buttonText: "Get Started",
  },
  // {
  //   headline: "Our Insights On Evolution",
  //   title: "Navigating Financial Evolution",
  //   paragraph:
  //   "Stay ahead in forex and stocks with our insights, navigating the evolving landscape of financial markets.",
  //   buttonText: "Get Started",
  // },
  // {
  //   headline: "Future of Trading is Here",
  //   title: "Revolutionizing Financial Futures",
  //   paragraph:
  //   "Experience the future of trading, a revolutionary convergence of finance, forex, and stocks innovation.",
  //   buttonText: "Get Started",
  // },
  // {
  //   headline: 'Discover Amazing Features',
  //   title: 'Innovate Your Experience',
  //   paragraph:
  //     'Suspendisse potenti. Sed finibus tellus ac aliquet tincidunt. Nulla facilisi. Curabitur maximus venenatis orci, vel congue libero elementum id.',
  //   buttonText: 'Learn More',
  // },
  // Add more data objects as needed
];

const HeroSection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const [headData, setHeadData] = useState(0);
  return (
    <section
      className="bg-blue-500 text-white h-screen flex flex-col justify-center items-center"
      id="home"
      style={{
        // use the src property of the image object
        backgroundImage: `url(${Hero1.src})`,
        // other styles
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        // height: "100vh",

        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <AnimatePresence>
        {heroData.map((data, index) => (
          <motion.div
            key={index}
            className="text-center"
            exit={{ opacity: 0, y: -20 }}
          >
      {/* <ParticlesComponent className="[&>canvas]:z-[-5] [&>canvas]:h-full [&>canvas]:w-full"/> */}
                                                                                                                                                                                                                                                                                    
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              {data.headline}
            </motion.h1>

            <motion.h2
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-semibold mb-6"
            >
              {data.title}
            </motion.h2>

            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5, delay: 0.4 }}
              className=" text-center max-w-md mb-8"
            >
              {data.paragraph}
            </motion.p>

            <Link href="/signup">
            <Button size="lg" className="bg-green-600"> Get Started </Button>
            </Link>
            {/* <motion.button
            onClick={() => router.push("/signup")}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-green-500 text-gray-100 py-2 px-4 rounded-md font-semibold hover:bg-green-700 hover:text-white focus:outline-none"
            >
              {data.buttonText}
            </motion.button> */}
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
