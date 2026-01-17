
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Cell
} from 'recharts';
import { MOCK_ATTENDANCE } from '../constants';
import { 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  Info,
  Clock,
  X,
  ChevronRight
} from 'lucide-react';
import { SubjectAttendance } from '../types';

const AttendanceTracker: React.FC = () => {
  const [view, setView] = useState<'monthly' | 'semester' | 'yearly'>('semester');
  const [selectedSubject, setSelectedSubject] = useState<SubjectAttendance | null>(null);
  
  const data = MOCK_ATTENDANCE[view];

  const overallPercentage = ((data.overallAttended / data.overallTotal) * 100).toFixed(1);
  const missedCount = data.overallTotal - data.overallAttended;
  const isSafe = parseFloat(overallPercentage) >= 75;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* View Switcher */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit mx-auto md:mx-0">
        {(['monthly', 'semester', 'yearly'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
              view === v 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Summary Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-8 rounded-[32px] border ${isSafe ? 'bg-indigo-600 border-indigo-500' : 'bg-red-600 border-red-500'} text-white shadow-xl shadow-indigo-100`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">Total Attendance</p>
                <h3 className="text-4xl font-black">{overallPercentage}%</h3>
              </div>
              <div className="bg-white/20 p-3 rounded-2xl">
                {isSafe ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-1000" 
                  style={{ width: `${overallPercentage}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-bold uppercase text-white/80">
                Current Status: {isSafe ? "Eligible for Exams" : "Warning: Below 75% Criteria"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="bg-emerald-50 text-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 size={20} />
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase">Lectures Held</p>
              <p className="text-xl font-bold text-slate-800">{data.overallTotal}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="bg-red-50 text-red-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <Clock size={20} />
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase">Lectures Missed</p>
              <p className="text-xl font-bold text-slate-800">{missedCount}</p>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
            <div className="flex items-center gap-3 mb-3 text-amber-700">
              <Info size={18} />
              <h5 className="font-bold text-sm uppercase tracking-tight">Eligibility Rule</h5>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Minimum **75%** attendance is required per subject to sit for final examinations. Shortage between 65-74% requires valid medical proof.
            </p>
          </div>
        </div>

        {/* Right Column: Subject Breakdown & Chart */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-600" />
              Subject-wise Analysis
            </h4>
            
            <div className="h-64 mb-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.subjects}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="subject" 
                    fontSize={10} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontWeight: 600 }}
                  />
                  <YAxis 
                    fontSize={10} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <ReferenceLine y={75} stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'right', value: '75%', fill: '#f43f5e', fontSize: 10, fontWeight: 700 }} />
                  <Bar 
                    dataKey="percentage" 
                    radius={[8, 8, 0, 0]} 
                    barSize={35}
                    onClick={(entry) => setSelectedSubject(entry)}
                    className="cursor-pointer"
                  >
                    {data.subjects.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.percentage < 75 ? '#f43f5e' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {data.subjects.map((subject, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedSubject(subject)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${subject.percentage < 75 ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'}`}>
                      <GraduationCap size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{subject.subject}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{subject.attended} / {subject.total} Lectures Attended</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className={`text-sm font-black ${subject.percentage < 75 ? 'text-red-600' : 'text-slate-800'}`}>
                        {subject.percentage}%
                      </p>
                      {subject.percentage < 75 && (
                        <span className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">Needs Attention</span>
                      )}
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 leading-none">{selectedSubject.subject}</h3>
                  <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">Detailed Lecture Log</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSubject(null)}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Attendance</span>
                <span className={`text-xl font-black ${selectedSubject.percentage < 75 ? 'text-red-600' : 'text-indigo-600'}`}>
                  {selectedSubject.percentage}%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ratio</span>
                <span className="text-xl font-black text-slate-800">
                  {selectedSubject.attended}/{selectedSubject.total}
                </span>
              </div>
            </div>

            <div className="p-8 overflow-y-auto space-y-3">
              {selectedSubject.history ? (
                selectedSubject.history.map((lecture, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl border ${
                        lecture.status === 'Attended' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                          : 'bg-rose-50 border-rose-100 text-rose-600'
                      }`}>
                        {lecture.status === 'Attended' ? <CheckCircle2 size={16} /> : <X size={16} />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">{lecture.date}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Regular Lecture • Lab Block</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      lecture.status === 'Attended' ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      {lecture.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-400 text-sm italic">No history available for this view.</p>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedSubject(null)}
                className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GraduationCap: React.FC<{size?: number, className?: string}> = ({size=24, className=""}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

export default AttendanceTracker;
