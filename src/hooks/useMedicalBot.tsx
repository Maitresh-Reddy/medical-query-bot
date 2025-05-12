
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageData } from '../components/ChatMessage';
import { toast } from '@/components/ui/sonner';

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

interface LLMConfig {
  provider: string;
  model: string;
  temperature: number;
  apiKey?: string;
}

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
  const [llmConfig, setLlmConfig] = useState<LLMConfig>({
    provider: 'openai',
    model: 'gpt-4o',
    temperature: 0.7
  });
  const [medicalSpecialty, setMedicalSpecialty] = useState('general');
  const [medicalAccuracy, setMedicalAccuracy] = useState(0.9);

  // Load settings from localStorage on initial load
  useEffect(() => {
    const provider = localStorage.getItem('medicalbot-provider');
    const model = localStorage.getItem('medicalbot-model');
    const temperature = localStorage.getItem('medicalbot-temperature');
    const specialty = localStorage.getItem('medicalbot-specialty');
    const accuracy = localStorage.getItem('medicalbot-accuracy');
    
    setLlmConfig({
      provider: provider || 'openai',
      model: model || 'gpt-4o',
      temperature: temperature ? parseFloat(temperature) : 0.7,
    });
    
    setMedicalSpecialty(specialty || 'general');
    setMedicalAccuracy(accuracy ? parseFloat(accuracy) : 0.9);
  }, []);

  const isMedicalQuery = useCallback((text: string) => {
    // More lenient check: either contains medical terms or is a short question
    const lowercaseText = text.toLowerCase();
    
    // Check if it contains any medical terms
    const containsMedicalTerm = MEDICAL_TERMS.some(term => lowercaseText.includes(term));
    
    // Check if it's a question (contains question mark or starts with common question words)
    const isQuestion = lowercaseText.includes('?') || 
                      /^(what|how|why|can|where|when|is|are|do|does|should|could|would|will|has|have)/.test(lowercaseText);
    
    // Either it contains medical terms or it's a short question (less than 15 words)
    const wordCount = lowercaseText.split(/\s+/).length;
    const isShortQuestion = isQuestion && wordCount < 15;
    
    return containsMedicalTerm || isShortQuestion || lowercaseText.includes('video');
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
    
    try {
      // In a real app, this would call an API with the selected LLM
      // For demonstration, we'll use mock data with some variation based on settings
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      let botResponse: MessageData;
      
      if (userMessage.toLowerCase().includes('video')) {
        botResponse = {
          id: uuidv4(),
          content: getVideoAnalysisResponse(),
          role: 'bot',
          timestamp: new Date(),
          summary: "The video shows common respiratory symptoms. I notice signs of congestion and fatigue which are typical for viral upper respiratory infections.",
          recommendations: getMedicalRecommendations(medicalSpecialty)
        };
      } else if (userMessage.toLowerCase().includes('headache')) {
        botResponse = {
          id: uuidv4(),
          content: "Based on your mention of a headache, here's some information that might be helpful:",
          role: 'bot',
          timestamp: new Date(),
          causes: getHeadacheCauses(medicalAccuracy),
          treatments: getHeadacheTreatments(medicalSpecialty),
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
          treatments: getFluTreatments(medicalSpecialty, medicalAccuracy),
          cautions: [
            "High fever, difficulty breathing, or chest pain require medical attention",
            "Elderly, young children, pregnant women, and those with chronic conditions should seek care early",
            "Avoid spreading by washing hands and staying home when sick",
            "Annual flu vaccination is recommended for prevention"
          ],
          summary: "Colds and flu are viral infections spread through contact and airborne droplets. Most cases can be managed with rest, fluids, and OTC medications, but certain symptoms or high-risk individuals require medical care. Prevention includes handwashing and vaccination."
        };
      } else {
        // Generic medical response with some customization based on settings
        botResponse = {
          id: uuidv4(),
          content: `I understand you have a medical question about "${userMessage}". While I can provide general information, please consult with a healthcare professional for personalized advice.`,
          role: 'bot',
          timestamp: new Date(),
          summary: getGenericSummary(medicalSpecialty),
          recommendations: getMedicalRecommendations(medicalSpecialty)
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("There was an error processing your message. Please try again.");
      
      // Add error response
      const errorResponse: MessageData = {
        id: uuidv4(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again or check your connection.",
        role: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsProcessing(false);
    }
    
  }, [isMedicalQuery, medicalSpecialty, medicalAccuracy]);

  // Helper functions to generate responses based on settings
  const getVideoAnalysisResponse = () => {
    const responses = [
      "I've analyzed the video you've provided. Here's what I can tell:",
      "Based on my analysis of your video, I've identified the following:",
      "After reviewing your video, here's my medical assessment:"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const getHeadacheCauses = (accuracy: number) => {
    // Higher accuracy means more specific causes
    const basicCauses = [
      "Tension or stress",
      "Dehydration",
      "Lack of sleep",
      "Eye strain",
      "Sinus congestion"
    ];
    
    const detailedCauses = [
      "Tension-type headache from sustained muscle contraction",
      "Dehydration leading to reduced brain fluid cushioning",
      "Sleep deprivation affecting pain regulation neurotransmitters",
      "Digital eye strain from extended screen use",
      "Sinus congestion causing pressure in paranasal sinuses",
      "Temporomandibular joint dysfunction",
      "Cervicogenic factors from neck muscular tension"
    ];
    
    return accuracy > 0.75 ? detailedCauses : basicCauses;
  };
  
  const getHeadacheTreatments = (specialty: string) => {
    const basicTreatments = [
      "Over-the-counter pain relievers like acetaminophen or ibuprofen",
      "Staying hydrated",
      "Applying a cold or warm compress",
      "Resting in a dark, quiet room",
      "Gentle massage of neck and temple areas"
    ];
    
    if (specialty === 'neurology') {
      return [
        ...basicTreatments,
        "Consider triptans for migraine-type headaches if diagnosed",
        "Preventive medications for chronic headache disorders",
        "Botulinum toxin injections for chronic migraine"
      ];
    }
    
    return basicTreatments;
  };
  
  const getFluTreatments = (specialty: string, accuracy: number) => {
    const basicTreatments = [
      "Rest and adequate hydration",
      "Over-the-counter symptom relief medications",
      "Antiviral medications (for flu, if started early)",
      "Saline nasal spray or rinse for congestion",
      "Warm liquids like tea with honey for sore throat"
    ];
    
    if (specialty === 'emergency' && accuracy > 0.8) {
      return [
        ...basicTreatments,
        "Oseltamivir (Tamiflu) within 48 hours of symptom onset for influenza",
        "Monitoring for respiratory distress or secondary bacterial pneumonia",
        "IV fluids for severe dehydration"
      ];
    }
    
    return basicTreatments;
  };
  
  const getGenericSummary = (specialty: string) => {
    const summaries = {
      general: "For specific medical concerns, it's best to consult with a healthcare professional who can provide personalized advice based on your medical history and current health status.",
      cardiology: "Cardiovascular health requires personalized assessment. A cardiologist can provide specific guidance based on your medical history, risk factors, and current symptoms.",
      neurology: "Neurological symptoms can have many causes. A neurologist can conduct proper testing and provide appropriate treatment options based on your specific condition.",
      pediatrics: "Children's health concerns should be addressed by a pediatrician who can consider developmental factors and provide age-appropriate medical advice.",
      dermatology: "Skin conditions often require visual examination by a dermatologist for accurate diagnosis and treatment recommendations.",
      emergency: "If you're experiencing severe or concerning symptoms, please seek immediate medical attention through your local emergency services."
    };
    
    return summaries[specialty as keyof typeof summaries] || summaries.general;
  };
  
  const getMedicalRecommendations = (specialty: string) => {
    const generalRecommendations = [
      "Consult with a healthcare provider for personalized advice",
      "Keep track of your symptoms and when they occur",
      "Stay hydrated and maintain a balanced diet",
      "Ensure you get adequate rest and sleep"
    ];
    
    const specialtyRecommendations: Record<string, string[]> = {
      cardiology: [
        "Monitor your blood pressure regularly",
        "Maintain a heart-healthy diet low in sodium and saturated fats",
        "Regular cardiovascular exercise as approved by your doctor",
        "Take prescribed medications consistently"
      ],
      neurology: [
        "Track headache or neurological symptom patterns",
        "Identify and avoid potential triggers",
        "Follow recommended sleep hygiene practices",
        "Manage stress through mindfulness or relaxation techniques"
      ],
      pediatrics: [
        "Keep vaccinations up to date",
        "Monitor developmental milestones",
        "Ensure proper nutrition appropriate for age",
        "Establish consistent sleep routines"
      ]
    };
    
    return specialtyRecommendations[specialty] || generalRecommendations;
  };

  return {
    messages,
    processMessage,
    isProcessing
  };
};

export default useMedicalBot;
