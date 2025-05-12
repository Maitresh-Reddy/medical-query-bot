
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Bot, Settings, Upload } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const Admin = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  const [modelName, setModelName] = useState('gpt-4o');
  const [temperature, setTemperature] = useState(0.7);

  const handleSaveSettings = () => {
    // In a real app, these would be saved to a database or secure storage
    localStorage.setItem('medicalbot-model', modelName);
    localStorage.setItem('medicalbot-temperature', temperature.toString());
    
    // API key would normally be handled server-side for security
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
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
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                API Settings
              </CardTitle>
              <CardDescription>
                Configure the AI model and parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <select 
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background text-foreground"
                >
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4o-mini">GPT-4o Mini</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>

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

              <Button onClick={handleSaveSettings} className="w-full">
                Save Settings
              </Button>
            </CardContent>
          </Card>

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
                  <select className="w-full p-2 border rounded-md bg-background text-foreground">
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Medical Focus</label>
                  <select className="w-full p-2 border rounded-md bg-background text-foreground">
                    <option>General</option>
                    <option>Symptoms</option>
                    <option>Treatment</option>
                    <option>Diagnosis</option>
                  </select>
                </div>
                <Button className="w-full">Save Video Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
