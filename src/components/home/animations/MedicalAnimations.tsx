
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Stethoscope, Pill, Thermometer, Brain } from 'lucide-react';
import { floatingAnimation, pulseAnimation, heartbeatAnimation, breathingAnimation, pulsePathAnimation } from './AnimationUtils';

interface MedicalAnimationsProps {
  animationActive: boolean;
}

const MedicalAnimations: React.FC<MedicalAnimationsProps> = ({ animationActive }) => {
  return (
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
        <Stethoscope className="h-28 w-28 text-purple-500 opacity-20 dark:opacity-10" />
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
  );
};

export default MedicalAnimations;
