
import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import MedicalDisclaimerBanner from './MedicalDisclaimerBanner';
import useMedicalBot from '../hooks/useMedicalBot';

const ChatInterface = () => {
  const { messages, processMessage, isProcessing } = useMedicalBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <MedicalDisclaimerBanner />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 chat-container">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {isProcessing && (
        <div className="px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="bg-medical-primary/20 dark:bg-medical-primary/30 p-2 rounded-full">
              <div className="w-2 h-2 bg-medical-primary rounded-full animate-pulse"></div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">MedicalBot is thinking...</span>
          </div>
        </div>
      )}
      
      <ChatInput onSendMessage={processMessage} disabled={isProcessing} />
    </div>
  );
};

export default ChatInterface;
