
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, MessageCircle, Video, Upload, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
            className="mr-2"
          >
            <Bot className="h-8 w-8 text-medical-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-medical-primary to-medical-secondary">
            MedicalBot
          </h1>
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin')} 
            className="flex items-center gap-2"
          >
            <Settings size={18} />
            <span className="hidden sm:inline">Admin Panel</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-medical-primary to-medical-accent">
              Your Intelligent Health Assistant
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get reliable medical information instantly with our AI-powered medical assistant. 
              Ask questions, upload videos for analysis, or use voice commands for a seamless experience.
            </p>
          </motion.div>

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
            />
            <FeatureCard 
              icon={<Upload />}
              title="Voice Input"
              description="Speak your questions naturally and get voice or text responses for accessibility."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/chat')}
              className="bg-medical-primary hover:bg-medical-accent text-white px-8 py-6 rounded-full text-lg font-medium flex items-center gap-2 transition-all hover:shadow-lg"
            >
              Start Chatting <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} MedicalBot. All rights reserved.</p>
          <p className="mt-2">For informational purposes only. Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
  >
    <div className="inline-flex items-center justify-center p-3 bg-medical-primary/10 rounded-full mb-4">
      {React.cloneElement(icon, { className: "h-6 w-6 text-medical-primary" })}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default Home;
