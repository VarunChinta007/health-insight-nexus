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
    message: "I'm sorry to hear you've been experiencing headaches for several days. This could be caused by various factors including stress, dehydration, eye strain, or tension. Could you provide more details about the location and intensity of your headaches? Also, have you tried any medications or remedies so far?",
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
    return "I understand you're experiencing pain, which can be concerning. Based on your description, you might be experiencing tension headaches, which are common. I recommend the following steps: 1) Rest in a quiet, dark room; 2) Stay hydrated by drinking plenty of water; 3) Consider a mild over-the-counter pain reliever like acetaminophen or ibuprofen if appropriate for your medical history; 4) Apply a cold or warm compress to your forehead or neck. If your headaches persist for more than 3 days, worsen suddenly, or are accompanied by fever, confusion, stiff neck, or visual disturbances, please consult with a healthcare professional immediately.";
  } else if (lowercaseMessage.includes("fever") || lowercaseMessage.includes("temperature")) {
    return "A fever is often your body's natural response to infection. If your temperature is above 100.4°F (38°C), here's what I recommend: 1) Rest and get plenty of fluids; 2) Take acetaminophen or ibuprofen to help reduce fever (following package instructions); 3) Use a light blanket if you're experiencing chills; 4) Monitor your temperature regularly. You should seek medical attention promptly if: your fever exceeds 103°F (39.4°C), persists for more than 3 days, is accompanied by severe headache, difficulty breathing, rash, or confusion. For infants and young children, consult a healthcare provider earlier as they may need special care.";
  } else if (lowercaseMessage.includes("cough") || lowercaseMessage.includes("cold")) {
    return "Coughs and colds are typically viral infections that resolve with supportive care. To manage your symptoms: 1) Rest to allow your body to recover; 2) Stay hydrated with warm fluids like tea with honey (for adults) to soothe the throat; 3) Use over-the-counter cough suppressants or expectorants as appropriate; 4) Consider saline nasal sprays for congestion; 5) Use a humidifier to add moisture to the air. If you experience difficulty breathing, coughing up blood, high fever, symptoms lasting more than 10 days, or worsening symptoms, please consult a healthcare provider. Also note that antibiotics are not effective against viral infections but may be prescribed if a bacterial infection develops.";
  } else if (lowercaseMessage.includes("rash") || lowercaseMessage.includes("skin")) {
    return "Skin issues can have many causes including allergies, infections, or autoimmune conditions. Without seeing the affected area, I can only provide general advice: 1) Avoid scratching to prevent secondary infection; 2) Keep the area clean and dry; 3) Apply a cold compress if there's itching or irritation; 4) Consider using a mild, fragrance-free moisturizer for dry skin; 5) For mild cases, an over-the-counter hydrocortisone cream might help with itching and inflammation. I strongly recommend taking a photo of the affected area and scheduling a telehealth or in-person appointment with a healthcare provider for proper diagnosis, especially if the rash is spreading, painful, blistering, or accompanied by fever.";
  } else if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi")) {
    return "Hello! I'm your AI health assistant, designed to provide helpful health information and guidance. How can I assist you today? You can describe any symptoms you're experiencing, ask about medical conditions, or inquire about general health recommendations. Please note that while I can provide general health information, I'm not a replacement for professional medical advice, diagnosis, or treatment. For serious or persistent health concerns, I recommend consulting with a healthcare professional who can perform a proper examination and consider your complete medical history.";
  } else if (lowercaseMessage.includes("diet") || lowercaseMessage.includes("nutrition") || lowercaseMessage.includes("eat")) {
    return "Maintaining a balanced diet is essential for overall health. A nutritious diet typically includes: 1) Plenty of fruits and vegetables of various colors; 2) Whole grains like brown rice and whole wheat bread; 3) Lean proteins such as fish, poultry, beans, and nuts; 4) Healthy fats from sources like olive oil, avocados, and nuts; 5) Limited added sugars, salt, and unhealthy fats. The Mediterranean and DASH diets are well-researched eating patterns associated with various health benefits. Remember that individual nutritional needs vary based on age, sex, activity level, and health conditions. For personalized nutrition advice, consider consulting with a registered dietitian who can create a plan tailored to your specific needs and goals.";
  } else if (lowercaseMessage.includes("exercise") || lowercaseMessage.includes("workout")) {
    return "Regular physical activity is vital for maintaining good health. Adults should aim for: 1) At least 150 minutes of moderate-intensity aerobic activity (like brisk walking) or 75 minutes of vigorous activity (like running) weekly; 2) Muscle-strengthening activities targeting all major muscle groups 2 or more days per week; 3) Balance and flexibility exercises, especially as you age. Start gradually if you're new to exercise, and choose activities you enjoy to help maintain consistency. Remember to warm up before and cool down after exercising. If you have existing health conditions, consult with a healthcare provider before starting a new exercise program to determine what's safe and appropriate for your specific situation.";
  } else if (lowercaseMessage.includes("sleep") || lowercaseMessage.includes("insomnia")) {
    return "Quality sleep is crucial for physical and mental health. To improve your sleep: 1) Maintain a consistent sleep schedule, even on weekends; 2) Create a relaxing bedtime routine like reading or taking a warm bath; 3) Make your bedroom comfortable, dark, and quiet; 4) Limit exposure to screens and blue light at least an hour before bed; 5) Avoid caffeine, large meals, and alcohol close to bedtime; 6) Regular physical activity can help, but try to finish exercising several hours before bedtime. If you consistently struggle with falling or staying asleep, wake up feeling unrefreshed, or experience daytime sleepiness, consider speaking with a healthcare provider. Persistent sleep issues may indicate an underlying sleep disorder that requires proper treatment.";
  } else {
    return "Thank you for sharing that information. To provide you with better guidance, could you please tell me more about what you're experiencing? Details about when your symptoms started, their severity, any patterns you've noticed, and relevant medical history would be helpful. This additional information will allow me to give you more personalized health information. Remember, while I can provide general health guidance, for specific medical concerns, it's important to consult with a healthcare professional who can perform a proper examination and consider your complete medical history.";
  }
}
