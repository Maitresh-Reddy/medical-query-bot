
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, MessageCircle, Video, Upload, Settings, Heart, Activity, 
         Stethoscope, Pill, Syringe, Thermometer, Brain, Lungs } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [animationActive, setAnimationActive] = useState(false);

  // Start animations after component mounts
  useEffect(() => {
    setAnimationActive(true);
  }, []);

  const floatingAnimation = {
    y: [-3, 3, -3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const heartbeatAnimation = {
    scale: [1, 1.1, 0.9, 1.05, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 1.2,
      ease: "easeInOut"
    }
  };

  const breathingAnimation = {
    scale: [1, 1.08, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulsePathAnimation = {
    pathLength: [0, 1],
    opacity: [0.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: [-10, 10] }}
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
          <div className="relative mb-16">
            {/* Medical themed animations */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              {/* Heartbeat EKG line */}
              <motion.svg 
                className="absolute top-20 right-0 w-1/3 h-20 text-red-500 opacity-10"
                viewBox="0 0 100 20"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={animationActive ? {
                  pathLength: [0, 1],
                  opacity: [0, 0.15]
                } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0,10 L10,10 L15,2 L20,18 L25,0 L30,10 L100,10"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  animate={pulsePathAnimation}
                />
              </motion.svg>
              
              {/* Floating medical icons */}
              <motion.div 
                className="absolute top-0 right-[20%] -z-10"
                animate={heartbeatAnimation}
              >
                <Heart className="h-32 w-32 text-red-500 opacity-20 dark:opacity-10" />
              </motion.div>
              
              <motion.div 
                className="absolute top-40 right-[10%] -z-10"
                animate={floatingAnimation}
              >
                <Pill className="h-20 w-20 text-blue-500 opacity-20 dark:opacity-10" />
              </motion.div>
              
              <motion.div 
                className="absolute top-12 left-[15%] -z-10"
                animate={floatingAnimation}
              >
                <Stethoscope className="h-36 w-36 text-medical-primary opacity-20 dark:opacity-10" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 left-[20%] -z-10"
                animate={breathingAnimation}
              >
                <Lungs className="h-28 w-28 text-purple-500 opacity-20 dark:opacity-10" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 right-[10%] -z-10"
                animate={pulseAnimation}
              >
                <Activity className="h-24 w-24 text-green-500 opacity-20 dark:opacity-10" />
              </motion.div>
              
              <motion.div 
                className="absolute top-32 left-[40%] -z-10"
                animate={pulseAnimation}
              >
                <Brain className="h-20 w-20 text-amber-500 opacity-20 dark:opacity-10" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-20 right-[30%] -z-10"
                animate={floatingAnimation}
              >
                <Thermometer className="h-16 w-16 text-red-400 opacity-20 dark:opacity-10" />
              </motion.div>
            </div>

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
          </div>

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

          <div className="relative">
            <motion.div 
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-64 h-64 -z-10"
              animate={{
                boxShadow: ["0 0 20px 10px rgba(56, 189, 248, 0.1)", "0 0 30px 15px rgba(56, 189, 248, 0.2)", "0 0 20px 10px rgba(56, 189, 248, 0.1)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

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
                <motion.span
                  animate={{ 
                    x: [0, 5, 0] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    repeatDelay: 0.5
                  }}
                >
                  Start Chatting <ArrowRight className="ml-1" />
                </motion.span>
              </Button>
            </motion.div>
          </div>
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

const FeatureCard = ({ icon, title, description, highlight = false }) => (
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
      {React.cloneElement(icon, { className: "h-6 w-6 text-medical-primary" })}
    </motion.div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default Home;
