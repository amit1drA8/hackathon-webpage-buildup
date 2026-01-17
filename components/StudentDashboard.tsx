
import React, { useState } from 'react';
import { Issue, IssueStatus, Notice } from '../types';
import { CATEGORY_ICONS, STATUS_ICONS, MOCK_NOTICES, MOCK_RESOURCES } from '../constants';
import { 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Bell, 
  BookOpen, 
  FileText, 
  QrCode, 
  ExternalLink,
  BrainCircuit,
  GraduationCap,
  Cpu,
  Trophy,
  Download,
  X,
  Calendar,
  Video,
  ShieldCheck,
  User
} from 'lucide-react';

interface Props {
  issues: Issue[];
  onReportClick: () => void;
  onStudyAiClick: () => void;
}

const StudentDashboard: React.FC<Props> = ({ issues, onReportClick, onStudyAiClick }) => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showIdModal, setShowIdModal] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const stats = {
    total: issues.length,
    resolved: issues.filter(i => i.status === IssueStatus.RESOLVED).length,
    pending: issues.filter(i => i.status !== IssueStatus.RESOLVED).length,
  };

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => setDownloading(null), 1500);
  };

  const studentInfo = {
    name: "Alex J. Student",
    id: "STU-2024-0812",
    course: "CS & Engg.",
    bloodGroup: "O+ Positive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Top Banner & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <GraduationCap size={120} />
          </div>
          <div className="relative z-10">
            <p className="text-indigo-100 text-sm mb-1 font-medium">Academic Status</p>
            <h3 className="text-2xl font-bold mb-4">{studentInfo.name}</h3>
            <div className="flex gap-3 mb-6">
              <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{studentInfo.course}</div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Sem 5</div>
            </div>
            <button 
              onClick={onStudyAiClick}
              className="w-full bg-white text-indigo-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all active:scale-95 shadow-sm"
            >
              <BrainCircuit size={18} />
              Study AI Tutor
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Active Tickets</p>
              <p className="text-2xl font-bold text-slate-800">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-2xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Resolved Issues</p>
              <p className="text-2xl font-bold text-slate-800">{stats.resolved}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Section 1: Digital ID Card Preview */}
          <div 
            onClick={() => setShowIdModal(true)}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative group cursor-pointer hover:shadow-xl transition-all"
          >
            <div className="bg-indigo-600 h-24 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 flex items-center justify-center rotate-12">
                 <GraduationCap size={150} />
               </div>
            </div>
            <div className="px-6 pb-6 relative -mt-12 text-center">
              <div className="w-24 h-24 bg-white rounded-3xl mx-auto mb-4 border-4 border-white shadow-xl overflow-hidden">
                <img src={studentInfo.avatar} alt="Student Profile" className="w-full h-full object-cover" />
              </div>
              <h5 className="text-lg font-bold text-slate-800">{studentInfo.name}</h5>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-6">ID: {studentInfo.id}</p>
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 flex justify-center">
                <QrCode size={100} className="text-slate-800 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              <button className="w-full py-3 rounded-xl border border-indigo-100 text-indigo-600 text-xs font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                <Download size={14} />
                View & Download Digital ID
              </button>
            </div>
          </div>

          {/* Section 5: Learning Hub */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-600" />
              Learning Hub
            </h4>
            <div className="space-y-3">
              {MOCK_RESOURCES.map(res => (
                <div key={res.id} className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all flex items-center justify-between group cursor-pointer" onClick={() => handleDownload(res.id)}>
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2.5 rounded-xl text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {res.type === 'PDF' ? <FileText size={18} /> : res.type === 'Video' ? <Video size={18} /> : <ExternalLink size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{res.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        {res.subject} • {res.fileSize}
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-300 group-hover:text-indigo-600">
                    {downloading === res.id ? <Clock size={16} className="animate-spin" /> : <Download size={16} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 2: Notice Board */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Bell size={24} className="text-indigo-600" />
                Notice Board
              </h4>
              <div className="flex gap-2">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">All Notices</span>
              </div>
            </div>
            <div className="space-y-4">
              {MOCK_NOTICES.map(notice => (
                <div 
                  key={notice.id} 
                  onClick={() => setSelectedNotice(notice)}
                  className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${notice.type === 'Urgent' ? 'bg-red-500 animate-pulse' : 'bg-indigo-400'}`}></div>
                      <h6 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{notice.title}</h6>
                    </div>
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      notice.type === 'Urgent' ? 'bg-red-50 text-red-600' : 
                      notice.type === 'Event' ? 'bg-amber-50 text-amber-600' : 
                      'bg-slate-100 text-slate-600'
                    }`}>{notice.type}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-1">{notice.content}</p>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span className="flex items-center gap-1.5 uppercase"><Calendar size={12} /> {notice.date}</span>
                    <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">Read more →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-4">Dashboard Overview</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Welcome to your student hub. Use the navigation sidebar to access specialized AI support for your studies, 
              check your real-time attendance across all subjects, or reach out to the helpdesk for administrative assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Digital ID Modal */}
      {showIdModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden relative border border-slate-100">
            {/* Header / ID Top Part */}
            <div className="bg-indigo-600 h-32 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center rotate-6 scale-125">
                 <GraduationCap size={200} />
              </div>
              <button 
                onClick={() => setShowIdModal(false)}
                className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-all z-20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="px-10 pb-10 text-center relative -mt-16 bg-white rounded-t-[40px] z-10">
              <div className="w-32 h-32 bg-white rounded-[40px] mx-auto mb-6 border-[6px] border-white shadow-2xl overflow-hidden">
                <img src={studentInfo.avatar} alt="Student" className="w-full h-full object-cover" />
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 leading-tight">{studentInfo.name}</h3>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">ID: {studentInfo.id}</p>
              </div>

              {/* QR Centerpiece */}
              <div className="bg-slate-50/80 p-6 rounded-[32px] border border-slate-100 mb-8 shadow-inner flex flex-col items-center">
                <QrCode size={120} className="text-slate-900" />
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Course</p>
                  <p className="text-sm font-black text-slate-700">{studentInfo.course}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Blood Grp</p>
                  <p className="text-sm font-black text-slate-700">{studentInfo.bloodGroup}</p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleDownload('ID-CARD')}
                className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 flex items-center justify-center gap-3"
              >
                {downloading === 'ID-CARD' ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Download size={20} />
                )}
                Download Digital ID
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
                  <Bell size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notice Detail</span>
              </div>
              <button onClick={() => setSelectedNotice(null)} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto">
              <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${
                selectedNotice.type === 'Urgent' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
              }`}>
                {selectedNotice.type}
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-6 leading-tight">{selectedNotice.title}</h3>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-8 pb-8 border-b border-slate-50">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> Posted: {selectedNotice.date}</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> Official Announcement</span>
              </div>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {selectedNotice.fullText || selectedNotice.content}
              </p>
            </div>
            <div className="p-8 bg-slate-50 flex justify-end">
              <button onClick={() => setSelectedNotice(null)} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;

const Loader2: React.FC<{size?: number, className?: string}> = ({size=24, className=""}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v4"/><path d="m16.2 4.2 2.8 2.8"/><path d="M18 12h4"/><path d="m16.2 19.8 2.8-2.8"/><path d="M12 18v4"/><path d="m4.2 19.8 2.8-2.8"/><path d="M2 12h4"/><path d="m4.2 4.2 2.8 2.8"/>
  </svg>
);
