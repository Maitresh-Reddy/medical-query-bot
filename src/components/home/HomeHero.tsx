
import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';

const HomeHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12 relative z-10"
    >
      <div className="relative inline-block mb-4">
        <motion.div
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-medical-primary/30 to-medical-secondary/30 blur-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="relative bg-white dark:bg-gray-900 rounded-full p-4 border border-medical-primary/20"
          animate={{
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Stethoscope className="h-16 w-16 text-medical-primary" />
        </motion.div>
      </div>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-medical-primary to-medical-accent">
        Your Intelligent Health Assistant
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Get reliable medical information instantly with our AI-powered medical assistant. 
        Ask questions, upload videos for analysis, or use voice commands for a seamless experience.
      </p>
    </motion.div>
  );
};

export default HomeHero;
