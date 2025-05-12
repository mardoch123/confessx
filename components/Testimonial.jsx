import React from 'react';
import { motion } from 'framer-motion';

const Testimonial = ({ quote, author }) => {
  return (
    <motion.div 
      className="bg-light p-6 rounded-xl shadow-sm mx-4 my-8 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl text-primary absolute -top-5 left-4">"</div>
      <p className="text-gray-700 italic pt-4 pb-2">{quote}</p>
      <p className="text-right text-gray-500 font-medium">— {author}</p>
    </motion.div>
  );
};

export default Testimonial;