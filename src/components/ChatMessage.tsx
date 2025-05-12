
import { User, Stethoscope } from "lucide-react";

export interface MessageData {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
  causes?: string[];
  treatments?: string[];
  cautions?: string[];
  summary?: string;
  recommendations?: string[]; // Added this property
}

interface ChatMessageProps {
  message: MessageData;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.role === 'bot';

  const renderStructuredResponse = () => {
    if (!isBot || (!message.causes && !message.treatments && !message.cautions && !message.recommendations)) {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
    }

    return (
      <div className="space-y-4">
        <p className="whitespace-pre-wrap">{message.content}</p>
        
        {message.causes && message.causes.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium text-medical-dark dark:text-medical-muted mb-2">Possible Causes:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {message.causes.map((cause, i) => (
                <li key={i}>{cause}</li>
              ))}
            </ul>
          </div>
        )}

        {message.treatments && message.treatments.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium text-medical-dark dark:text-medical-muted mb-2">Treatments:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {message.treatments.map((treatment, i) => (
                <li key={i}>{treatment}</li>
              ))}
            </ul>
          </div>
        )}

        {message.cautions && message.cautions.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium text-medical-dark dark:text-medical-muted mb-2">Cautions / Preventive Measures:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {message.cautions.map((caution, i) => (
                <li key={i}>{caution}</li>
              ))}
            </ul>
          </div>
        )}

        {message.recommendations && message.recommendations.length > 0 && (
          <div className="mt-3">
            <h4 className="font-medium text-medical-dark dark:text-medical-muted mb-2">Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {message.recommendations.map((recommendation, i) => (
                <li key={i}>{recommendation}</li>
              ))}
            </ul>
          </div>
        )}

        {message.summary && (
          <div className="mt-4 p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-md">
            <h4 className="font-medium text-medical-dark dark:text-medical-muted mb-2">Summary:</h4>
            <p className="text-sm">{message.summary}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`flex items-start gap-3 animate-fade-in ${isBot ? '' : 'flex-row-reverse'}`}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
        {isBot ? (
          <div className="bg-medical-primary rounded-full p-1.5">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
        ) : (
          <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-1.5">
            <User className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      
      <div 
        className={`py-3 px-4 max-w-[85%] ${
          isBot ? 'chat-message-bot' : 'chat-message-user'
        }`}
      >
        {renderStructuredResponse()}
      </div>
    </div>
  );
};

export default ChatMessage;
