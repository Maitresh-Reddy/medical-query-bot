
import React from 'react';

const HomeFooter = () => {
  return (
    <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} MedicalBot. All rights reserved.</p>
        <p className="mt-2">For informational purposes only. Not a substitute for professional medical advice.</p>
      </div>
    </footer>
  );
};

export default HomeFooter;
