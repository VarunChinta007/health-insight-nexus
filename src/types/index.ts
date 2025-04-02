
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "patient" | "doctor" | "admin";
  bloodGroup?: string;
  age?: number;
  gender?: string;
  allergies?: string[];
  conditions?: string[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  type: "prescription" | "lab" | "imaging" | "visit" | "surgery" | "other";
  title: string;
  description: string;
  attachments?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "canceled";
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  message: string;
  timestamp: string;
}

export interface HealthStat {
  id: string;
  userId: string;
  type: "blood_pressure" | "heart_rate" | "blood_sugar" | "temperature" | "oxygen" | "weight";
  value: string;
  date: string;
  time: string;
}

export interface HealthTrend {
  region: string;
  condition: string;
  cases: number;
  trend: "increasing" | "decreasing" | "stable";
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "appointment" | "result" | "reminder" | "alert";
  read: boolean;
  date: string;
}
