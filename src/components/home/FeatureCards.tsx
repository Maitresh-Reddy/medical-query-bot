
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Video, Upload } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeatureCards = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid md:grid-cols-3 gap-6 mb-12"
    >
      <FeatureCard 
        icon={<MessageCircle />}
        title="Text Chat"
        description="Ask medical questions and get instant, accurate responses based on trusted medical information."
      />
      <FeatureCard 
        icon={<Video />}
        title="Video Analysis"
        description="Upload videos showing symptoms or conditions for AI analysis and medical insights."
        highlight={true}
      />
      <FeatureCard 
        icon={<Upload />}
        title="Voice Input"
        description="Speak your questions naturally and get voice or text responses for accessibility."
      />
    </motion.div>
  );
};

export default FeatureCards;
