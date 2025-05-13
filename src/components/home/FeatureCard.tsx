
import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

const FeatureCard = ({ icon, title, description, highlight = false }: FeatureCardProps) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all ${
      highlight ? 'ring-2 ring-medical-primary/30' : ''
    }`}
  >
    <motion.div 
      className="inline-flex items-center justify-center p-3 bg-medical-primary/10 rounded-full mb-4"
      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
      transition={{ duration: 0.5 }}
    >
      {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-medical-primary" })}
    </motion.div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default FeatureCard;
