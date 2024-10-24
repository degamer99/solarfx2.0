import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const AnimatedButton = ({ onClick, label, children, cstyle }) => {
  const buttonVariants = {
    hover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    tap: { scale: 0.9 },
  };

  const router = useRouter()

  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      onClick={onClick}
      className={`  bg-green-500 text-base ${cstyle} py-3 px-6 rounded-lg font-semibold focus:outline-none`}
    >
      {label}
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
