
import { useState, useEffect, useCallback } from 'react';

// Define the window with SpeechRecognition properties
interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: typeof SpeechRecognition;
  webkitSpeechRecognition?: typeof SpeechRecognition;
}

// Tell TypeScript that we're extending the window object
const windowWithSpeech = window as WindowWithSpeechRecognition;

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setError('Your browser does not support speech recognition.');
      return;
    }

    // Create a speech recognition instance
    const SpeechRecognitionConstructor = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
    
    if (SpeechRecognitionConstructor) {
      const recognitionInstance = new SpeechRecognitionConstructor();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
        stopListening(); // Stop after getting a result
      };

      recognitionInstance.onerror = (event) => {
        setError(`Error occurred in recognition: ${event.error}`);
        stopListening();
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
        setError(null);
        setTranscript('');
      } catch (err) {
        console.error('Error starting speech recognition:', err);
        setError('Error starting speech recognition.');
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
    hasSupport: !!recognition
  };
};

export default useSpeechRecognition;
