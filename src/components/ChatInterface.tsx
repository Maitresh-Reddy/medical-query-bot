
import { useRef, useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import MedicalDisclaimerBanner from './MedicalDisclaimerBanner';
import useMedicalBot from '../hooks/useMedicalBot';
import { Button } from '@/components/ui/button';
import { Video, Upload, Camera, VideoOff } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = () => {
  const { messages, processMessage, isProcessing } = useMedicalBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [isLiveVideoActive, setIsLiveVideoActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Clean up media stream on component unmount
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setIsVideoUploaded(true);
        toast.success('Video uploaded successfully');
      } else {
        toast.error('Please upload a valid video file');
      }
    }
  };

  const handleVideoSubmit = () => {
    if (videoFile) {
      processMessage(`I've uploaded a video titled: ${videoFile.name}. Please analyze it for medical relevance.`);
      setIsVideoUploaded(false);
      setVideoFile(null);
    }
  };

  const startLiveVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsLiveVideoActive(true);
      toast.success('Live video started');
    } catch (error) {
      toast.error('Could not access camera and microphone');
      console.error('Error accessing media devices:', error);
    }
  };

  const stopLiveVideo = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsLiveVideoActive(false);
  };

  const analyzeLiveVideo = () => {
    if (isLiveVideoActive) {
      processMessage("Please analyze my current symptoms from the live video feed I'm showing.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <MedicalDisclaimerBanner />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6 chat-container">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isVideoUploaded && videoFile && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-start p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <p className="mb-2 font-medium">Video ready to process: {videoFile.name}</p>
            <div className="w-full max-w-xs">
              <video 
                src={URL.createObjectURL(videoFile)} 
                controls 
                className="w-full rounded-md mb-2"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleVideoSubmit} className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Analyze Video
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setVideoFile(null);
                  setIsVideoUploaded(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {isLiveVideoActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-start p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <p className="mb-2 font-medium">Live Video Feed</p>
            <div className="w-full max-w-xs">
              <video 
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full rounded-md mb-2"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={analyzeLiveVideo} className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Analyze Live Feed
              </Button>
              <Button 
                variant="outline" 
                onClick={stopLiveVideo}
              >
                <VideoOff className="h-4 w-4 mr-1" />
                Stop Video
              </Button>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {isProcessing && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-2"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                }}
                className="bg-medical-primary/20 dark:bg-medical-primary/30 p-2 rounded-full"
              >
                <motion.div 
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                  }}
                  className="w-2 h-2 bg-medical-primary rounded-full"
                />
              </motion.div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">MedicalBot is thinking...</span>
          </div>
        </motion.div>
      )}
      
      <div className="relative">
        <div className="px-4 pb-2 flex items-center space-x-4">
          <label htmlFor="video-upload" className="cursor-pointer inline-block">
            <div className="flex items-center gap-1 text-sm text-gray-500 hover:text-medical-primary">
              <Upload className="h-4 w-4" />
              <span>Upload Video</span>
            </div>
            <input 
              type="file" 
              id="video-upload" 
              accept="video/*" 
              onChange={handleVideoUpload} 
              className="hidden" 
            />
          </label>
          
          {!isLiveVideoActive ? (
            <button 
              onClick={startLiveVideo}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-medical-primary"
            >
              <Camera className="h-4 w-4" />
              <span>Start Live Video</span>
            </button>
          ) : null}
        </div>
        <ChatInput onSendMessage={processMessage} disabled={isProcessing} />
      </div>
    </div>
  );
};

export default ChatInterface;
