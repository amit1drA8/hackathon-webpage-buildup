
export enum IssueStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved'
}

export enum IssueCategory {
  ACADEMIC = 'Academic',
  CURRICULAR = 'Curricular',
  INFRASTRUCTURE = 'Infrastructure',
  IT = 'IT',
  ADMIN = 'Admin'
}

export enum IssuePriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  priority: IssuePriority;
  studentName: string;
  studentId: string;
  createdAt: string;
  sentiment?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  fileData?: {
    mimeType: string;
    data: string; // base64 encoded
    name?: string;
  };
}

export type Role = 'Student' | 'Admin';

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'Urgent' | 'General' | 'Event';
  fullText?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: 'PDF' | 'Video' | 'Link';
  url: string;
  fileSize?: string;
}

export interface Lecture {
  date: string;
  status: 'Attended' | 'Missed';
}

export interface SubjectAttendance {
  subject: string;
  attended: number;
  total: number;
  percentage: number;
  history?: Lecture[];
}

export interface AttendanceRecord {
  period: string; // "October", "Semester 5", "Academic Year 2024"
  overallAttended: number;
  overallTotal: number;
  subjects: SubjectAttendance[];
}

export interface FeeTransaction {
  transactionId: string;
  date: string;
  amount: number;
  method: string;
}

export interface FeeRecord {
  id: string;
  particulars: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Partial';
  transactions: FeeTransaction[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  semester: string;
  studentCount: number;
}

export interface StudentAcademicDetail {
  rollNo: string;
  name: string;
  attendance: number;
  marks: {
    subject: string;
    score: number;
    maxMarks: number;
  }[];
}
