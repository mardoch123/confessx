import React from 'react';
import { motion } from 'framer-motion';

const CTAButton = ({ text, onClick, className = '' }) => {
  return (
    <motion.button
      className={`px-6 py-3 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default CTAButton;