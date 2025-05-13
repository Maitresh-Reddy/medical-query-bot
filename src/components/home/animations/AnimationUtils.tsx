
import { AnimationProps } from 'framer-motion';

export const floatingAnimation: AnimationProps["animate"] = {
  y: [-3, 3, -3],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const pulseAnimation: AnimationProps["animate"] = {
  scale: [1, 1.05, 1],
  opacity: [0.9, 1, 0.9],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const heartbeatAnimation: AnimationProps["animate"] = {
  scale: [1, 1.1, 0.9, 1.05, 1],
  transition: {
    duration: 0.8,
    repeat: Infinity,
    repeatDelay: 1.2,
    ease: "easeInOut"
  }
};

export const breathingAnimation: AnimationProps["animate"] = {
  scale: [1, 1.08, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const pulsePathAnimation: AnimationProps["animate"] = {
  pathLength: [0, 1],
  opacity: [0.2, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
