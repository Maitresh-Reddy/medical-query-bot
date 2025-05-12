
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Bot, Settings, Upload, Server, Cog, TrendingUp } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cloud');
  
  // Cloud LLM settings
  const [apiKey, setApiKey] = useState('');
  const [modelName, setModelName] = useState('gpt-4o');
  const [temperature, setTemperature] = useState(0.7);
  const [apiProvider, setApiProvider] = useState('openai');

  // Local LLM settings
  const [localModelPath, setLocalModelPath] = useState('');
  const [localModelLoaded, setLocalModelLoaded] = useState(false);

  // Medical specific parameters
  const [medicalSpecialty, setMedicalSpecialty] = useState('general');
  const [medicalAccuracy, setMedicalAccuracy] = useState(0.9);
  const [citeSources, setCiteSources] = useState(true);
  const [simplifyLanguage, setSimplifyLanguage] = useState(false);

  // Video processing settings
  const [summarizationLevel, setSummarizationLevel] = useState('medium');
  const [medicalFocus, setMedicalFocus] = useState('general');
  const [liveVideoEnabled, setLiveVideoEnabled] = useState(false);
  
  const handleSaveSettings = () => {
    // Save settings to localStorage for demonstration
    // In a real app, these would be saved to a database
    if (activeTab === 'cloud') {
      localStorage.setItem('medicalbot-provider', apiProvider);
      localStorage.setItem('medicalbot-model', modelName);
      localStorage.setItem('medicalbot-temperature', temperature.toString());
    } else {
      localStorage.setItem('medicalbot-local-model-path', localModelPath);
      localStorage.setItem('medicalbot-local-model-loaded', localModelLoaded.toString());
    }
    
    // Save medical parameters
    localStorage.setItem('medicalbot-specialty', medicalSpecialty);
    localStorage.setItem('medicalbot-accuracy', medicalAccuracy.toString());
    localStorage.setItem('medicalbot-cite-sources', citeSources.toString());
    localStorage.setItem('medicalbot-simplify', simplifyLanguage.toString());
    
    // Save video settings
    localStorage.setItem('medicalbot-summarization-level', summarizationLevel);
    localStorage.setItem('medicalbot-medical-focus', medicalFocus);
    localStorage.setItem('medicalbot-live-video', liveVideoEnabled.toString());
    
    toast.success('Settings saved successfully!');
  };

  const handleLoadLocalModel = () => {
    // Simulating loading a local model
    toast.info('Loading local model...');
    
    // In a real app, this would actually load the model
    setTimeout(() => {
      setLocalModelLoaded(true);
      toast.success('Local model loaded successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Button>
          <div className="flex items-center">
            <Bot className="h-6 w-6 text-medical-primary mr-2" />
            <h1 className="text-2xl font-bold">MedicalBot Admin</h1>
          </div>
        </motion.div>

        <div className="grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  LLM API Settings
                </CardTitle>
                <CardDescription>
                  Configure the AI model and parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="cloud" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="cloud">Cloud LLMs</TabsTrigger>
                    <TabsTrigger value="local">Local LLMs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cloud" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Provider</label>
                      <select 
                        value={apiProvider}
                        onChange={(e) => setApiProvider(e.target.value)}
                        className="w-full p-2 border rounded-md bg-background text-foreground"
                      >
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Anthropic (Claude)</option>
                        <option value="mistral">Mistral AI</option>
                        <option value="cohere">Cohere</option>
                        <option value="perplexity">Perplexity</option>
                        <option value="azure">Azure OpenAI</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">API Key</label>
                      <Input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Model</label>
                      {apiProvider === 'openai' && (
                        <select 
                          value={modelName}
                          onChange={(e) => setModelName(e.target.value)}
                          className="w-full p-2 border rounded-md bg-background text-foreground"
                        >
                          <option value="gpt-4o">GPT-4o</option>
                          <option value="gpt-4o-mini">GPT-4o Mini</option>
                          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                          <option value="gpt-4.5-preview">GPT-4.5 Preview</option>
                        </select>
                      )}
                      {apiProvider === 'anthropic' && (
                        <select 
                          value={modelName}
                          onChange={(e) => setModelName(e.target.value)}
                          className="w-full p-2 border rounded-md bg-background text-foreground"
                        >
                          <option value="claude-3-opus">Claude 3 Opus</option>
                          <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                          <option value="claude-3-haiku">Claude 3 Haiku</option>
                        </select>
                      )}
                      {apiProvider === 'mistral' && (
                        <select 
                          value={modelName}
                          onChange={(e) => setModelName(e.target.value)}
                          className="w-full p-2 border rounded-md bg-background text-foreground"
                        >
                          <option value="mistral-large">Mistral Large</option>
                          <option value="mistral-medium">Mistral Medium</option>
                          <option value="mistral-small">Mistral Small</option>
                        </select>
                      )}
                      {apiProvider === 'cohere' && (
                        <select 
                          value={modelName}
                          onChange={(e) => setModelName(e.target.value)}
                          className="w-full p-2 border rounded-md bg-background text-foreground"
                        >
                          <option value="command-r-plus">Command R+</option>
                          <option value="command-r">Command R</option>
                        </select>
                      )}
                      {apiProvider === 'perplexity' && (
                        <select 
                          value={modelName}
                          onChange={(e) => setModelName(e.target.value)}
                          className="w-full p-2 border rounded-md bg-background text-foreground"
                        >
                          <option value="llama-3.1-sonar-small-128k-online">Sonar Small (8B)</option>
                          <option value="llama-3.1-sonar-large-128k-online">Sonar Large (70B)</option>
                          <option value="llama-3.1-sonar-huge-128k-online">Sonar Huge (405B)</option>
                        </select>
                      )}
                      {apiProvider === 'azure' && (
                        <select 
                          value={modelName}
                          onChange={(e) => setModelName(e.target.value)}
                          className="w-full p-2 border rounded-md bg-background text-foreground"
                        >
                          <option value="gpt-4">GPT-4</option>
                          <option value="gpt-35-turbo">GPT-3.5 Turbo</option>
                        </select>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="local" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Local Model Selection</label>
                      <select 
                        className="w-full p-2 border rounded-md bg-background text-foreground mb-2"
                      >
                        <option value="llama3-medical">Llama 3 (Medical fine-tuned)</option>
                        <option value="mistral-medical">Mistral Medical</option>
                        <option value="onnx-whisper">ONNX Whisper (Speech-to-Text)</option>
                        <option value="custom">Custom Model</option>
                      </select>
                      
                      <Input
                        type="text"
                        value={localModelPath}
                        onChange={(e) => setLocalModelPath(e.target.value)}
                        placeholder="Model path or URL"
                        className="w-full mb-2"
                      />
                      
                      <div className="flex items-center justify-between">
                        <Button 
                          onClick={handleLoadLocalModel} 
                          disabled={localModelLoaded}
                          variant={localModelLoaded ? "outline" : "default"}
                        >
                          {localModelLoaded ? "Model Loaded" : "Load Model"}
                        </Button>
                        
                        {localModelLoaded && (
                          <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Model running locally
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Model Settings</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Threads</span>
                          <Input type="number" defaultValue={4} min={1} max={12} />
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Context Length</span>
                          <Input type="number" defaultValue={2048} min={512} max={32768} step={512} />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Temperature: {temperature.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>More Precise</span>
                    <span>More Creative</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cog className="h-5 w-5" />
                  Medical Parameters
                </CardTitle>
                <CardDescription>
                  Configure medical-specific settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Medical Specialty Focus</label>
                  <select 
                    value={medicalSpecialty}
                    onChange={(e) => setMedicalSpecialty(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background text-foreground"
                  >
                    <option value="general">General Medicine</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="oncology">Oncology</option>
                    <option value="emergency">Emergency Medicine</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Medical Accuracy Level: {(medicalAccuracy * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1"
                    step="0.05"
                    value={medicalAccuracy}
                    onChange={(e) => setMedicalAccuracy(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Broader Responses</span>
                    <span>More Conservative</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <label className="text-sm font-medium cursor-pointer">Cite Medical Sources</label>
                    <Switch 
                      checked={citeSources} 
                      onCheckedChange={setCiteSources} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <label className="text-sm font-medium cursor-pointer">Simplify Medical Language</label>
                    <Switch 
                      checked={simplifyLanguage} 
                      onCheckedChange={setSimplifyLanguage} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Video Processing Settings
                </CardTitle>
                <CardDescription>
                  Configure video summary options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Summary Length</label>
                    <select 
                      value={summarizationLevel}
                      onChange={(e) => setSummarizationLevel(e.target.value)}
                      className="w-full p-2 border rounded-md bg-background text-foreground"
                    >
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                      <option value="detailed">Detailed Medical Report</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Medical Focus</label>
                    <select 
                      value={medicalFocus}
                      onChange={(e) => setMedicalFocus(e.target.value)}
                      className="w-full p-2 border rounded-md bg-background text-foreground"
                    >
                      <option value="general">General</option>
                      <option value="symptoms">Symptoms</option>
                      <option value="treatment">Treatment</option>
                      <option value="diagnosis">Diagnosis</option>
                      <option value="rehabilitation">Rehabilitation</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <label className="text-sm font-medium cursor-pointer">Live Video Analysis</label>
                    <Switch 
                      checked={liveVideoEnabled} 
                      onCheckedChange={setLiveVideoEnabled} 
                    />
                  </div>
                  
                  <Button onClick={handleSaveSettings} className="w-full">Save All Settings</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
