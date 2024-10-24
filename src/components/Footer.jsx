import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white p-8"
    >
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2"> <Logo />    Solarfx is a top financial services provider, specializing in forex and stock trading. Committed to excellence, we offer a seamless and secure trading experience with cutting-edge technology. Our team provides personalized support and educational resources, empowering clients to make informed decisions. Join Solarfx for financial growth and success.</h3>
        </div>

        {/* Column 2 */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className=" list-disc pl-6 [&>li]:underline">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#accounts">Accounts</a>
            </li>
            <li>
              <a href="#payments">Payments</a>
            </li>
            <li>
              <a href="#chart">Charts</a>
            </li>
            <li>
              <a href="#faq">FAQs</a>
            </li>
            <li>
              <Link href="/signin">Signin</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500">
              Twitter
            </a>
            <a href="#" className="text-blue-500">
              Facebook
            </a>
            <a href="#" className="text-blue-500">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
