
import { AlertCircle } from "lucide-react";
import { useState } from "react";

const MedicalDisclaimerBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 mb-4 rounded-md animate-fade-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-yellow-700 dark:text-yellow-200">
            <strong>Medical Disclaimer:</strong> Information provided by this bot is for educational purposes only and not a substitute for professional medical advice. For emergencies, contact a healthcare professional immediately.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-auto flex-shrink-0 text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-300"
        >
          <span className="sr-only">Close</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MedicalDisclaimerBanner;
