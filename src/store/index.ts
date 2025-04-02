
import { create } from 'zustand';
import { User, MedicalRecord, Appointment, ChatMessage, HealthStat, Notification } from '@/types';

// Sample data
const sampleUser: User = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/assets/avatar.png",
  role: "patient",
  bloodGroup: "O+",
  age: 35,
  gender: "Male",
  allergies: ["Penicillin", "Pollen"],
  conditions: ["Hypertension"]
};

const sampleMedicalRecords: MedicalRecord[] = [
  {
    id: "rec1",
    patientId: "user1",
    doctorName: "Dr. Sarah Johnson",
    date: "2023-10-15",
    type: "visit",
    title: "Annual Checkup",
    description: "Regular annual physical examination. Blood pressure slightly elevated at 130/85. Recommended lifestyle changes and follow-up in 3 months.",
  },
  {
    id: "rec2",
    patientId: "user1",
    doctorName: "Dr. Michael Chen",
    date: "2023-11-05",
    type: "prescription",
    title: "Hypertension Medication",
    description: "Prescribed Lisinopril 10mg daily for hypertension management.",
  },
  {
    id: "rec3",
    patientId: "user1",
    doctorName: "Dr. Lisa Wong",
    date: "2023-12-20",
    type: "lab",
    title: "Blood Work Results",
    description: "Complete blood count and metabolic panel. Results normal except for slightly elevated cholesterol (210 mg/dL).",
    attachments: ["/assets/lab-report.pdf"]
  },
  {
    id: "rec4",
    patientId: "user1",
    doctorName: "Dr. James Wilson",
    date: "2024-01-10",
    type: "imaging",
    title: "Chest X-Ray",
    description: "Routine chest X-ray. No abnormalities detected.",
    attachments: ["/assets/xray.jpg"]
  },
];

const sampleAppointments: Appointment[] = [
  {
    id: "apt1",
    patientId: "user1",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-05-30",
    time: "10:00 AM",
    status: "scheduled",
    notes: "Follow-up appointment for hypertension"
  },
  {
    id: "apt2",
    patientId: "user1",
    doctorName: "Dr. Michael Chen",
    date: "2024-04-15",
    time: "2:30 PM",
    status: "completed",
    notes: "Medication review"
  },
];

const sampleChatMessages: ChatMessage[] = [
  {
    id: "msg1",
    sender: "user",
    message: "I've been experiencing headaches for the past three days",
    timestamp: "2024-05-20T14:30:00"
  },
  {
    id: "msg2",
    sender: "ai",
    message: "I'm sorry to hear that you've been experiencing headaches. Could you provide more details about the headache location, intensity, and any other symptoms you might be experiencing?",
    timestamp: "2024-05-20T14:30:45"
  },
];

const sampleHealthStats: HealthStat[] = [
  {
    id: "stat1",
    userId: "user1",
    type: "blood_pressure",
    value: "130/85",
    date: "2024-05-19",
    time: "08:00 AM"
  },
  {
    id: "stat2",
    userId: "user1",
    type: "heart_rate",
    value: "78",
    date: "2024-05-19",
    time: "08:00 AM"
  },
  {
    id: "stat3",
    userId: "user1",
    type: "blood_sugar",
    value: "95",
    date: "2024-05-19",
    time: "08:00 AM"
  },
];

const sampleNotifications: Notification[] = [
  {
    id: "notif1",
    userId: "user1",
    title: "Appointment Reminder",
    message: "You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM",
    type: "appointment",
    read: false,
    date: "2024-05-29"
  },
  {
    id: "notif2",
    userId: "user1",
    title: "Lab Results Available",
    message: "Your recent blood work results are now available. Please check your EHR.",
    type: "result",
    read: true,
    date: "2024-05-18"
  },
];

interface AppState {
  isAuthenticated: boolean;
  user: User | null;
  medicalRecords: MedicalRecord[];
  appointments: Appointment[];
  chatMessages: ChatMessage[];
  healthStats: HealthStat[];
  notifications: Notification[];
  chatbotLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: "patient" | "doctor" | "admin") => void;
  updateUser: (userData: Partial<User>) => void;
  sendChatMessage: (message: string) => void;
  markNotificationAsRead: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  user: null,
  medicalRecords: [],
  appointments: [],
  chatMessages: [],
  healthStats: [],
  notifications: [],
  chatbotLoading: false,
  
  login: (email: string, password: string) => {
    // Mock login - in real app would validate against backend
    if (email && password) {
      set({
        isAuthenticated: true,
        user: sampleUser,
        medicalRecords: sampleMedicalRecords,
        appointments: sampleAppointments,
        chatMessages: sampleChatMessages,
        healthStats: sampleHealthStats,
        notifications: sampleNotifications,
      });
    }
  },
  
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      medicalRecords: [],
      appointments: [],
      chatMessages: [],
      healthStats: [],
      notifications: [],
    });
  },
  
  signup: (name: string, email: string, password: string, role: "patient" | "doctor" | "admin") => {
    // Mock signup - in real app would send to backend
    if (name && email && password) {
      const newUser: User = {
        id: `user${Date.now()}`,
        name,
        email,
        role,
      };
      
      set({
        isAuthenticated: true,
        user: newUser,
        medicalRecords: [],
        appointments: [],
        chatMessages: [],
        healthStats: [],
        notifications: [],
      });
    }
  },
  
  updateUser: (userData: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    }));
  },
  
  sendChatMessage: (message: string) => {
    const newUserMessage: ChatMessage = {
      id: `msg${Date.now()}-user`,
      sender: "user",
      message,
      timestamp: new Date().toISOString(),
    };
    
    set((state) => ({
      chatMessages: [...state.chatMessages, newUserMessage],
      chatbotLoading: true,
    }));
    
    // Mock AI response after a delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg${Date.now()}-ai`,
        sender: "ai",
        message: generateMockAIResponse(message),
        timestamp: new Date().toISOString(),
      };
      
      set((state) => ({
        chatMessages: [...state.chatMessages, aiResponse],
        chatbotLoading: false,
      }));
    }, 1500);
  },
  
  markNotificationAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((notif) => 
        notif.id === id ? { ...notif, read: true } : notif
      ),
    }));
  },
}));

// Helper function to generate mock AI responses
function generateMockAIResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes("headache") || lowercaseMessage.includes("pain")) {
    return "Based on your description, you might be experiencing tension headaches. I recommend rest, staying hydrated, and taking an over-the-counter pain reliever if needed. If symptoms persist for more than 3 days or worsen, please consult with a healthcare professional.";
  } else if (lowercaseMessage.includes("fever") || lowercaseMessage.includes("temperature")) {
    return "A fever can be a sign that your body is fighting an infection. If your temperature is above 100.4°F (38°C), rest, stay hydrated, and consider taking acetaminophen. If the fever persists for more than 3 days or exceeds 103°F (39.4°C), please seek medical attention promptly.";
  } else if (lowercaseMessage.includes("cough") || lowercaseMessage.includes("cold")) {
    return "Coughs and colds are usually viral infections that resolve on their own. Rest, drink plenty of fluids, and use over-the-counter medications for symptom relief. If symptoms include difficulty breathing or persist for more than 10 days, please consult a healthcare provider.";
  } else if (lowercaseMessage.includes("rash") || lowercaseMessage.includes("skin")) {
    return "Skin rashes can have many causes including allergies, infections, or autoimmune conditions. Without seeing the rash, I can't provide specific guidance. I recommend taking a photo and scheduling a telehealth appointment for proper diagnosis.";
  } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
    return "Hello! I'm your AI health assistant. How can I help you today? You can describe any symptoms you're experiencing, and I'll provide guidance based on that information.";
  } else {
    return "Thank you for sharing that information. To provide better guidance, could you tell me more about your symptoms, including when they started, their severity, and any other relevant health information? This will help me give you more specific advice.";
  }
}
