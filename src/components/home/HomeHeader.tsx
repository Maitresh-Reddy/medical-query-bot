
import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default HomeHeader;
