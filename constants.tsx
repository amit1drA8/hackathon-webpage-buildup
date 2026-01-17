
import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  PlusCircle, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Building2,
  Cpu,
  GraduationCap,
  BookOpen,
  FileText,
  Video,
  Trophy,
  CreditCard
} from 'lucide-react';
import { Issue, IssueCategory, IssueStatus, IssuePriority, Notice, StudyMaterial, AttendanceRecord, Lecture, FeeRecord, Course, StudentAcademicDetail } from './types';

export const INITIAL_ISSUES: Issue[] = [
  {
    id: 'ISS-101',
    title: 'Wi-Fi not working in Hostel A',
    description: 'The Wi-Fi in the west wing of Hostel A has been down since yesterday evening.',
    category: IssueCategory.IT,
    status: IssueStatus.OPEN,
    priority: IssuePriority.HIGH,
    studentName: 'Alex Student',
    studentId: 'STU-2024-0812',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    sentiment: 'Frustrated'
  }
];

export const MOCK_NOTICES: Notice[] = [
  {
    id: 'N1',
    title: 'End Term Examination Schedule',
    content: 'The end-term examination schedule for Spring 2024 has been released.',
    date: 'Oct 24, 2024',
    type: 'Urgent',
    fullText: 'All students are hereby informed that the End Term Theory Examinations for the session 2023-24 (Even Semester) are scheduled to commence from 1st December 2024. The detailed branch-wise date sheet has been uploaded to the student portal. Please ensure all your dues are cleared by 15th November to receive your hall tickets.'
  },
  {
    id: 'N2',
    title: 'Annual Tech Fest: Innovate 2024',
    content: 'Registration for the annual tech fest is now open.',
    date: 'Oct 22, 2024',
    type: 'Event',
    fullText: 'Join us for Innovate 2024! This year we feature 15+ hackathons, robotic wars, and guest lectures from industry leaders. Prize pool of ₹5,00,000 up for grabs. Registration closes next Friday.'
  }
];

export const MOCK_RESOURCES: StudyMaterial[] = [
  { id: 'R1', title: 'Data Structures & Algorithms Notes', subject: 'CS201', type: 'PDF', url: '#', fileSize: '2.4 MB' },
  { id: 'R2', title: 'Database Management Lecture Series', subject: 'CS302', type: 'Video', url: '#', fileSize: '45 mins' }
];

export const MOCK_COURSES: Course[] = [
  { id: 'C1', code: 'CS501', name: 'Artificial Intelligence', semester: 'Semester 5', studentCount: 65 },
  { id: 'C2', code: 'CS302', name: 'Database Management Systems', semester: 'Semester 3', studentCount: 58 },
  { id: 'C3', code: 'CS101', name: 'Intro to Computer Science', semester: 'Semester 1', studentCount: 120 }
];

export const MOCK_ROSTER: Record<string, StudentAcademicDetail[]> = {
  'C1': [
    { 
      rollNo: '2024-0812', name: 'Alex J. Student', attendance: 82, 
      marks: [
        { subject: 'AI (Theory)', score: 85, maxMarks: 100 },
        { subject: 'AI (Lab)', score: 42, maxMarks: 50 },
        { subject: 'ML Basics', score: 78, maxMarks: 100 }
      ]
    },
    { 
      rollNo: '2024-0944', name: 'Jordan Smith', attendance: 95, 
      marks: [
        { subject: 'AI (Theory)', score: 92, maxMarks: 100 },
        { subject: 'AI (Lab)', score: 48, maxMarks: 50 },
        { subject: 'ML Basics', score: 94, maxMarks: 100 }
      ]
    },
    { 
      rollNo: '2024-0102', name: 'Casey Rivera', attendance: 68, 
      marks: [
        { subject: 'AI (Theory)', score: 45, maxMarks: 100 },
        { subject: 'AI (Lab)', score: 30, maxMarks: 50 },
        { subject: 'ML Basics', score: 55, maxMarks: 100 }
      ]
    }
  ],
  'C2': [
    { 
      rollNo: '2022-0455', name: 'Sam Taylor', attendance: 88, 
      marks: [
        { subject: 'DBMS Concepts', score: 72, maxMarks: 100 },
        { subject: 'SQL Lab', score: 45, maxMarks: 50 }
      ]
    }
  ]
};

export const MOCK_FEES: FeeRecord[] = [
  {
    id: 'F1',
    particulars: 'Tuition Fee - Semester 5',
    totalAmount: 85000,
    paidAmount: 85000,
    dueDate: '2024-08-15',
    status: 'Paid',
    transactions: [
      { transactionId: 'TXN99821', date: '2024-08-10', amount: 85000, method: 'Net Banking' }
    ]
  }
];

// Added MOCK_ATTENDANCE to resolve import error in AttendanceTracker.tsx
export const MOCK_ATTENDANCE: Record<string, AttendanceRecord> = {
  monthly: {
    period: "October",
    overallAttended: 18,
    overallTotal: 22,
    subjects: [
      { subject: 'AI', attended: 5, total: 6, percentage: 83, history: [{ date: 'Oct 01', status: 'Attended' }, { date: 'Oct 03', status: 'Attended' }] },
      { subject: 'DBMS', attended: 4, total: 5, percentage: 80, history: [{ date: 'Oct 02', status: 'Attended' }, { date: 'Oct 04', status: 'Missed' }] },
      { subject: 'ML', attended: 9, total: 11, percentage: 81 }
    ]
  },
  semester: {
    period: "Semester 5",
    overallAttended: 145,
    overallTotal: 180,
    subjects: [
      { 
        subject: 'AI (Theory)', 
        attended: 32, 
        total: 40, 
        percentage: 80,
        history: [
          { date: 'Oct 20', status: 'Attended' },
          { date: 'Oct 22', status: 'Missed' },
          { date: 'Oct 24', status: 'Attended' }
        ]
      },
      { 
        subject: 'AI (Lab)', 
        attended: 18, 
        total: 20, 
        percentage: 90,
        history: [{ date: 'Oct 21', status: 'Attended' }]
      },
      { 
        subject: 'Machine Learning', 
        attended: 28, 
        total: 40, 
        percentage: 70,
        history: [{ date: 'Oct 19', status: 'Missed' }]
      },
      { 
        subject: 'Networks', 
        attended: 35, 
        total: 40, 
        percentage: 87.5 
      },
      { 
        subject: 'Cloud Comp.', 
        attended: 32, 
        total: 40, 
        percentage: 80 
      }
    ]
  },
  yearly: {
    period: "2024",
    overallAttended: 320,
    overallTotal: 400,
    subjects: [
      { subject: 'AI', attended: 70, total: 80, percentage: 87.5 },
      { subject: 'DBMS', attended: 65, total: 80, percentage: 81.25 }
    ]
  }
};

export const CATEGORY_ICONS = {
  [IssueCategory.ACADEMIC]: <GraduationCap size={20} />,
  [IssueCategory.CURRICULAR]: <Trophy size={20} />,
  [IssueCategory.INFRASTRUCTURE]: <Building2 size={20} />,
  [IssueCategory.IT]: <Cpu size={20} />,
  [IssueCategory.ADMIN]: <ShieldCheck size={20} />,
};

export const STATUS_ICONS = {
  [IssueStatus.OPEN]: <AlertCircle size={16} className="text-red-500" />,
  [IssueStatus.IN_PROGRESS]: <Clock size={16} className="text-amber-500" />,
  [IssueStatus.RESOLVED]: <CheckCircle2 size={16} className="text-emerald-500" />,
};

export const CAMPUS_KNOWLEDGE_BASE = `
You are the Smart Campus AI Oracle. You have exhaustive knowledge of the College Rules, Regulations, and Administrative Procedures. 
... (truncated for space, use existing content if possible)
`;

export const STUDY_AI_PROMPT = `
You are an advanced Academic Study AI... (truncated for space)
`;
