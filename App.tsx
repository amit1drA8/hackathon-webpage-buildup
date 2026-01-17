
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  PlusCircle, 
  Settings, 
  LogOut, 
  UserCircle,
  Menu,
  X,
  Bell,
  BarChart3,
  ShieldCheck,
  BrainCircuit,
  GraduationCap,
  CalendarCheck,
  Zap,
  CreditCard,
  BookOpen
} from 'lucide-react';
import { Role, Issue, IssueStatus, IssueCategory, IssuePriority } from './types';
import { INITIAL_ISSUES } from './constants';
import StudentDashboard from './components/StudentDashboard';
import IssueForm from './components/IssueForm';
import Chatbot from './components/Chatbot';
import AdminDashboard from './components/AdminDashboard';
import StudyAI from './components/StudyAI';
import AttendanceTracker from './components/AttendanceTracker';
import FeesSection from './components/FeesSection';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';
import { analyzeSentiment } from './services/gemini';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('campus_auth') === 'true';
  });
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem('campus_role') as Role) || 'Student';
  });
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [issues, setIssues] = useState<Issue[]>(() => {
    const saved = localStorage.getItem('campus_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('campus_issues', JSON.stringify(issues));
  }, [issues]);

  const handleLogin = (selectedRole: Role) => {
    setIsAuthenticated(true);
    setRole(selectedRole);
    localStorage.setItem('campus_auth', 'true');
    localStorage.setItem('campus_role', selectedRole);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('campus_auth');
    localStorage.removeItem('campus_role');
  };

  const handleCreateIssue = async (newIssueData: Partial<Issue>) => {
    const sentiment = await analyzeSentiment(newIssueData.description || "");
    const newIssue: Issue = {
      id: `ISS-${Math.floor(100 + Math.random() * 900)}`,
      title: newIssueData.title || 'Untitled',
      description: newIssueData.description || '',
      category: newIssueData.category || IssueCategory.ADMIN,
      status: IssueStatus.OPEN,
      priority: newIssueData.priority || IssuePriority.MEDIUM,
      studentName: role === 'Admin' ? 'Administrator' : 'Alex Student',
      studentId: role === 'Admin' ? 'ADMIN-001' : 'STU-2024-0812',
      createdAt: new Date().toISOString(),
      sentiment
    };
    setIssues(prev => [newIssue, ...prev]);
    setActiveTab('dashboard');
  };

  const handleUpdateStatus = (id: string, status: IssueStatus) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id ? { ...issue, status } : issue
    ));
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const navItems = role === 'Student' ? [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck size={20} /> },
    { id: 'fees', label: 'Fees & Payments', icon: <CreditCard size={20} /> },
    { id: 'study-ai', label: 'Pro AI Assistant', icon: <Zap size={20} className="text-amber-500" /> },
    { id: 'chatbot', label: 'AI Helpdesk', icon: <MessageSquare size={20} /> },
    { id: 'new-issue', label: 'Report Issue', icon: <PlusCircle size={20} /> },
  ] : [
    { id: 'dashboard', label: 'Tickets Hub', icon: <Settings size={20} /> },
    { id: 'teacher-academic', label: 'My Courses', icon: <BookOpen size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'chatbot', label: 'AI Assistant', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="min-h-screen flex text-slate-900 animate-in fade-in duration-700">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <GraduationCapIcon size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-indigo-900">CampusDesk</h1>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className={`p-2 rounded-xl ${role === 'Admin' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {role === 'Admin' ? <ShieldCheck size={18} /> : <UserCircle size={18} />}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-black text-slate-800 truncate uppercase tracking-widest">{role === 'Admin' ? 'Teacher/Staff' : 'Student'}</p>
                <p className="text-[10px] text-slate-400 truncate font-bold">{role === 'Admin' ? 'admin@college.edu' : 'alex.s@college.edu'}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500">
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-slate-500 hover:text-indigo-600 transition-colors p-2">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="p-6 md:p-8 flex-1">
          {activeTab === 'dashboard' && role === 'Student' && (
            <StudentDashboard 
              issues={issues} 
              onReportClick={() => setActiveTab('new-issue')} 
              onStudyAiClick={() => setActiveTab('study-ai')}
            />
          )}
          {activeTab === 'attendance' && role === 'Student' && <AttendanceTracker />}
          {activeTab === 'fees' && role === 'Student' && <FeesSection />}
          {activeTab === 'study-ai' && role === 'Student' && <StudyAI />}
          {activeTab === 'chatbot' && <Chatbot />}
          {activeTab === 'new-issue' && <IssueForm onSubmit={handleCreateIssue} />}
          {activeTab === 'dashboard' && role === 'Admin' && (
            <AdminDashboard issues={issues} onUpdateStatus={handleUpdateStatus} showAnalytics={false} />
          )}
          {activeTab === 'teacher-academic' && role === 'Admin' && (
            <TeacherDashboard />
          )}
          {activeTab === 'analytics' && role === 'Admin' && (
            <AdminDashboard issues={issues} onUpdateStatus={handleUpdateStatus} showAnalytics={true} />
          )}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;

const GraduationCapIcon: React.FC<{size?: number, className?: string}> = ({size=24, className=""}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
