
import React, { useState, useEffect } from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import HomeHero from '@/components/home/HomeHero';
import FeatureCards from '@/components/home/FeatureCards';
import CallToAction from '@/components/home/CallToAction';
import HomeFooter from '@/components/home/HomeFooter';
import MedicalAnimations from '@/components/home/animations/MedicalAnimations';

const Home = () => {
  const [animationActive, setAnimationActive] = useState(false);

  // Start animations after component mounts
  useEffect(() => {
    setAnimationActive(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <HomeHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-16">
            <MedicalAnimations animationActive={animationActive} />
            <HomeHero />
          </div>

          <FeatureCards />
          <CallToAction />
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default Home;
