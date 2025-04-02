
import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Image as ImageIcon, 
  FileUp, 
  Send, 
  Info, 
  X, 
  Mic, 
  Activity, 
  Check,
  Loader2, 
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Diagnostics = () => {
  const { chatMessages, chatbotLoading, sendChatMessage } = useAppStore();
  const [message, setMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [bodyPart, setBodyPart] = useState<string | null>(null);
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (message.trim()) {
      sendChatMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  };
  
  const handleImageUpload = (file: File) => {
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      console.error('Please upload an image file');
      return;
    }
    
    setUploadedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
  };
  
  const clearUploadedImage = () => {
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    setUploadedImage(null);
    setUploadedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      
      // Mock voice recognition - in a real app we would use the Web Speech API
      setTimeout(() => {
        setMessage('I have a persistent headache and slight fever for the past two days');
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const toggleSymptomChecker = () => {
    setShowSymptomChecker(!showSymptomChecker);
    setBodyPart(null);
  };

  const selectBodyPart = (part: string) => {
    setBodyPart(part);
    
    // Simulate sending a message about the selected body part
    setTimeout(() => {
      sendChatMessage(`I'm experiencing pain in my ${part}`);
      setShowSymptomChecker(false);
      setBodyPart(null);
    }, 500);
  };

  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Sore Throat", 
    "Fatigue", "Shortness of Breath", "Nausea"
  ];

  const handleQuickSymptom = (symptom: string) => {
    sendChatMessage(`I'm experiencing ${symptom.toLowerCase()}`);
  };

  return (
    <div className="bg-diagnostics-bg bg-cover">
      <h1 className="text-3xl font-bold text-health-deep-blue mb-6 animate-fade-in">
        AI-Powered Diagnostics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Brain className="text-health-bright-blue" />
                AI Health Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col h-[600px]">
                <div className="flex-1 overflow-y-auto p-4">
                  {chatMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Brain size={48} className="text-health-bright-blue mb-4" />
                      <h3 className="text-xl font-semibold mb-2">AI Health Assistant</h3>
                      <p className="text-gray-600 max-w-md mb-4">
                        Describe your symptoms, ask health questions, or upload medical images for analysis
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                        {commonSymptoms.map((symptom) => (
                          <Button 
                            key={symptom}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickSymptom(symptom)}
                            className="hover:bg-health-bright-blue/10"
                          >
                            {symptom}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex",
                            msg.sender === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] rounded-lg px-4 py-2 animate-fade-in",
                              msg.sender === "user"
                                ? "bg-health-bright-blue text-white rounded-br-none"
                                : "bg-gray-100 text-gray-800 rounded-bl-none"
                            )}
                          >
                            <p className="whitespace-pre-wrap">{msg.message}</p>
                            <div
                              className={cn(
                                "text-xs mt-1",
                                msg.sender === "user" ? "text-blue-100" : "text-gray-500"
                              )}
                            >
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                      {chatbotLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-3 animate-fade-in">
                            <div className="flex space-x-2 items-center">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messageEndRef} />
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleSymptomChecker}
                      className="flex items-center gap-1"
                    >
                      <Search size={16} />
                      Symptom Checker
                    </Button>
                    
                    {uploadedImage && (
                      <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md">
                        <ImageIcon size={16} className="text-health-bright-blue" />
                        <span className="text-sm truncate max-w-[100px]">
                          {uploadedImage.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 rounded-full"
                          onClick={clearUploadedImage}
                        >
                          <X size={12} />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {showSymptomChecker && (
                    <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-white">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Interactive Symptom Checker</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-1 rounded-full"
                          onClick={toggleSymptomChecker}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">
                        Select the area where you're experiencing symptoms:
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Head', 'Chest', 'Abdomen', 'Back', 'Arms', 'Legs', 'Skin', 'General'].map((part) => (
                          <Button
                            key={part}
                            variant="outline"
                            className={cn(
                              "h-auto py-2 justify-start",
                              bodyPart === part && "border-health-bright-blue bg-health-bright-blue/10"
                            )}
                            onClick={() => selectBodyPart(part)}
                          >
                            {part}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 items-center">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="shrink-0"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FileUp size={18} />
                      <span className="sr-only">Attach file</span>
                    </Button>
                    
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className={cn("shrink-0", isListening && "bg-health-red text-white")}
                      onClick={toggleListening}
                    >
                      <Mic size={18} />
                      <span className="sr-only">Voice input</span>
                    </Button>
                    
                    <div className="relative flex-1">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isListening ? "Listening..." : "Type your symptoms or questions..."}
                        className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-health-bright-blue focus:outline-none focus:ring-1 focus:ring-health-bright-blue disabled:opacity-50 min-h-[42px] max-h-[120px] resize-none"
                        rows={1}
                        disabled={isListening}
                      />
                      
                      {isListening && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-health-red rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      type="button"
                      size="icon"
                      className="bg-health-bright-blue hover:bg-health-deep-blue shrink-0"
                      onClick={handleSendMessage}
                      disabled={!message.trim() && !uploadedImage}
                    >
                      <Send size={18} />
                      <span className="sr-only">Send</span>
                    </Button>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card 
            className={cn(
              "glass-card mb-6 transition-all",
              isDragging && "border-2 border-dashed border-health-bright-blue bg-health-bright-blue/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="text-health-bright-blue" />
                Image Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedImageUrl ? (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={uploadedImageUrl} 
                      alt="Uploaded medical image" 
                      className="w-full h-full object-contain"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-gray-800/50 text-white hover:bg-gray-800/70"
                      onClick={clearUploadedImage}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <Button 
                    className="w-full bg-health-bright-blue hover:bg-health-deep-blue"
                    onClick={() => {
                      sendChatMessage("I've uploaded a medical image for analysis.");
                      clearUploadedImage();
                    }}
                  >
                    <Activity size={16} className="mr-2" />
                    Analyze Image
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 mb-4 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-bright-blue">
                    <ImageIcon size={32} />
                  </div>
                  <p className="text-center text-gray-600">
                    Drag & drop medical images or{' '}
                    <span className="text-health-bright-blue font-medium">browse</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Supports X-rays, MRIs, CT scans, skin conditions, and more
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Info className="text-health-bright-blue" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>1</Badge>
                    <h3 className="font-semibold">Describe Your Symptoms</h3>
                  </div>
                  <p className="text-sm text-gray-600 pl-7">
                    Explain what you're experiencing in detail to our AI assistant.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>2</Badge>
                    <h3 className="font-semibold">Upload Relevant Images</h3>
                  </div>
                  <p className="text-sm text-gray-600 pl-7">
                    Share medical images for more accurate analysis if applicable.
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>3</Badge>
                    <h3 className="font-semibold">Get AI Assessment</h3>
                  </div>
                  <p className="text-sm text-gray-600 pl-7">
                    Receive preliminary insights based on your information.
                  </p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-3">
                  <div className="text-amber-500 mt-1">
                    <Info size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-amber-800 font-medium">Important Note</p>
                    <p className="text-xs text-amber-700">
                      This AI assistant provides preliminary guidance only and is not a substitute for professional medical advice, diagnosis, or treatment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
