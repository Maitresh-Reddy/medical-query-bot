
import { useState, useEffect } from 'react';
import { Send, Mic, MicOff, Upload } from 'lucide-react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const { 
    text: speechText,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
    clearText
  } = useSpeechRecognition();

  useEffect(() => {
    if (speechText) {
      setInput(speechText);
    }
  }, [speechText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      clearText();
    }
  };
  
  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This is a placeholder for file upload functionality
    // In a real implementation, you would handle the file upload here
    console.log("File upload:", e.target.files);
    
    // For now, we'll just show a message that says file upload is not implemented yet
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      onSendMessage(`I've uploaded a file: ${fileName}`);
    }
  };

  return (
    <div className="border-t bg-white dark:bg-gray-950 p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label className="cursor-pointer text-gray-500 hover:text-medical-primary transition-colors">
          <Upload className="h-5 w-5" />
          <input
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            disabled={disabled}
          />
        </label>

        {hasRecognitionSupport && (
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-2 rounded-full ${
              isListening 
                ? 'bg-medical-primary text-white animate-pulse-slow' 
                : 'text-gray-500 hover:text-medical-primary'
            }`}
            disabled={disabled}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
        )}
        
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Ask a medical question..."}
            className="w-full p-3 pr-10 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-medical-primary"
            disabled={disabled}
          />
          {isListening && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="inline-block h-2 w-2 rounded-full bg-medical-primary animate-pulse"></span>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className={`p-3 rounded-full ${
            !input.trim() || disabled
              ? 'bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed'
              : 'bg-medical-primary text-white hover:bg-medical-accent transition-colors'
          }`}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
