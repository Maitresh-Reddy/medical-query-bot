
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default CallToAction;
