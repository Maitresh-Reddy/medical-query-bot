
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageData } from '../components/ChatMessage';

// This expanded list includes more medical terms to ensure the bot recognizes a wide range of queries
const MEDICAL_TERMS = [
  'symptom', 'disease', 'treatment', 'medication', 'doctor', 'hospital', 'health',
  'pain', 'fever', 'cough', 'cold', 'flu', 'virus', 'bacteria', 'infection', 'prescription',
  'diagnosis', 'surgery', 'therapy', 'patient', 'medical', 'medicine', 'vaccine', 'allergy',
  'blood', 'heart', 'lung', 'liver', 'kidney', 'brain', 'nerve', 'bone', 'joint',
  'immune', 'cancer', 'diabetes', 'asthma', 'hypertension', 'stroke', 'arthritis',
  'skin', 'rash', 'joint', 'muscle', 'headache', 'migraine', 'nausea', 'vomit',
  'diarrhea', 'constipation', 'dizzy', 'fatigue', 'tired', 'insomnia', 'swelling',
  'inflammation', 'chronic', 'acute', 'injury', 'wound', 'fracture', 'sprain',
  'pregnant', 'pregnancy', 'birth', 'diet', 'nutrition', 'vitamin', 'mineral',
  'supplement', 'wellness', 'mental', 'anxiety', 'depression', 'stress', 'psychiatry',
  'therapy', 'counseling', 'syndrome', 'disorder', 'condition', 'specialist',
  'physician', 'nurse', 'clinic', 'emergency', 'ambulance', 'paramedic', 'care',
  'healing', 'recovery', 'relapse', 'symptoms', 'diagnosis', 'prognosis', 'cure',
  'remedy', 'preventive', 'prevention', 'check-up', 'screening', 'test', 'exam',
  'analysis', 'lab', 'laboratory', 'procedure', 'operation', 'anesthesia',
  'feel', 'hurt', 'ache', 'body', 'sick', 'unwell', 'health'
];

const useMedicalBot = () => {
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: uuidv4(),
      content: "Hello, I'm MedicalBot! I can answer your health-related questions. How can I help you today?",
      role: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const isMedicalQuery = useCallback((text: string) => {
    // More lenient check: either contains medical terms or is a short question
    const lowercaseText = text.toLowerCase();
    
    // Check if it contains any medical terms
    const containsMedicalTerm = MEDICAL_TERMS.some(term => lowercaseText.includes(term));
    
    // Check if it's a question (contains question mark or starts with common question words)
    const isQuestion = lowercaseText.includes('?') || 
                      /^(what|how|why|can|where|when|is|are|do|does|should|could|would|will|has|have)/.test(lowercaseText);
    
    // Either it contains medical terms or it's a short question (less than 10 words)
    const wordCount = lowercaseText.split(/\s+/).length;
    const isShortQuestion = isQuestion && wordCount < 15;
    
    return containsMedicalTerm || isShortQuestion;
  }, []);

  const processMessage = useCallback(async (userMessage: string) => {
    setIsProcessing(true);
    
    // Add user message to chat
    const userMessageObj: MessageData = {
      id: uuidv4(),
      content: userMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessageObj]);
    
    // Check if it's a medical query with the improved check
    if (!isMedicalQuery(userMessage)) {
      // Non-medical query response
      setTimeout(() => {
        const botResponse: MessageData = {
          id: uuidv4(),
          content: "I am a Medical Bot. I cannot process this request as it is outside my healthcare knowledge base. Please ask me a medical-related question.",
          role: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsProcessing(false);
      }, 1000);
      
      return;
    }
    
    // For now, we'll simulate bot response with mock data
    // In a real app, this would call an API with the LLM
    setTimeout(() => {
      let botResponse: MessageData;
      
      if (userMessage.toLowerCase().includes('video')) {
        botResponse = {
          id: uuidv4(),
          content: "I've analyzed the video you've provided. Here's what I can tell:",
          role: 'bot',
          timestamp: new Date(),
          summary: "The video appears to show common cold symptoms. I notice signs of congestion and fatigue which are typical for viral upper respiratory infections.",
          recommendations: [
            "Rest and hydration are recommended",
            "Over-the-counter cold medications may help with symptom relief",
            "If symptoms worsen or persist beyond 7-10 days, consult a healthcare provider"
          ]
        };
      } else if (userMessage.toLowerCase().includes('headache')) {
        botResponse = {
          id: uuidv4(),
          content: "Based on your mention of a headache, here's some information that might be helpful:",
          role: 'bot',
          timestamp: new Date(),
          causes: [
            "Tension or stress",
            "Dehydration",
            "Lack of sleep",
            "Eye strain",
            "Sinus congestion"
          ],
          treatments: [
            "Over-the-counter pain relievers like acetaminophen or ibuprofen",
            "Staying hydrated",
            "Applying a cold or warm compress",
            "Resting in a dark, quiet room",
            "Gentle massage of neck and temple areas"
          ],
          cautions: [
            "Seek immediate medical attention for severe, sudden headaches",
            "Consult a doctor if headaches are recurring or worsening",
            "Be cautious with medication overuse which can cause rebound headaches",
            "Track triggers like certain foods, activities, or environmental factors"
          ],
          summary: "Headaches are often caused by tension, dehydration, or lack of sleep. Most can be treated with OTC pain relievers, hydration, and rest, but severe or recurring headaches warrant medical attention."
        };
      } else if (userMessage.toLowerCase().includes('cold') || userMessage.toLowerCase().includes('flu')) {
        botResponse = {
          id: uuidv4(),
          content: "I see you're asking about a cold or flu. Here's some relevant information:",
          role: 'bot',
          timestamp: new Date(),
          causes: [
            "Viral infection (different viruses cause colds vs. influenza)",
            "Exposure to infected individuals",
            "Touching contaminated surfaces then touching face",
            "Droplets in the air from coughs and sneezes"
          ],
          treatments: [
            "Rest and adequate hydration",
            "Over-the-counter symptom relief medications",
            "Antiviral medications (for flu, if started early)",
            "Saline nasal spray or rinse for congestion",
            "Warm liquids like tea with honey for sore throat"
          ],
          cautions: [
            "High fever, difficulty breathing, or chest pain require medical attention",
            "Elderly, young children, pregnant women, and those with chronic conditions should seek care early",
            "Avoid spreading by washing hands and staying home when sick",
            "Annual flu vaccination is recommended for prevention"
          ],
          summary: "Colds and flu are viral infections spread through contact and airborne droplets. Most cases can be managed with rest, fluids, and OTC medications, but certain symptoms or high-risk individuals require medical care. Prevention includes handwashing and vaccination."
        };
      } else {
        // Generic medical response
        botResponse = {
          id: uuidv4(),
          content: `I understand you have a medical question about "${userMessage}". While I can provide general information, please consult with a healthcare professional for personalized advice.`,
          role: 'bot',
          timestamp: new Date(),
          summary: "For specific medical concerns, it's best to consult with a healthcare professional who can provide personalized advice based on your medical history and current health status."
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsProcessing(false);
    }, 1500);
    
  }, [isMedicalQuery]);

  return {
    messages,
    processMessage,
    isProcessing
  };
};

export default useMedicalBot;
