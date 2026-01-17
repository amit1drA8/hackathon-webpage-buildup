
import React, { useState } from 'react';
import { BookOpen, Users, Search, ChevronRight, X, GraduationCap, Calendar, BarChart, Download, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_COURSES, MOCK_ROSTER } from '../constants';
import { Course, StudentAcademicDetail } from '../types';

const TeacherDashboard: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoster = selectedCourse 
    ? (MOCK_ROSTER[selectedCourse.id] || []).filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.rollNo.includes(searchTerm)
      )
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {!selectedCourse ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <BookOpen className="text-indigo-600" size={28} />
              My Issued Courses
            </h3>
            <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 text-xs font-black uppercase tracking-widest">
              Academic Year 2024-25
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COURSES.map((course) => (
              <div 
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="group bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all mb-6">
                  <GraduationCap size={28} />
                </div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{course.code}</h4>
                <h5 className="text-xl font-black text-slate-800 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">{course.name}</h5>
                
                <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                    <Users size={16} />
                    {course.studentCount} Students
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                    <Calendar size={16} />
                    {course.semester}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
          <button 
            onClick={() => { setSelectedCourse(null); setSearchTerm(''); }}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-sm"
          >
            <ChevronRight className="rotate-180" size={18} />
            Back to Course List
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-black text-slate-900 leading-none mb-2">{selectedCourse.name}</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{selectedCourse.code} • {selectedCourse.semester}</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-600 transition-all shadow-lg">
                <Download size={16} /> Export Grades
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Avg. Attendance" value="84.2%" icon={<BarChart />} color="indigo" />
            <StatCard title="Passing %" value="92%" icon={<CheckCircle2 />} color="emerald" />
            <StatCard title="Top Score" value="98/100" icon={<GraduationCap />} color="amber" />
          </div>

          {/* Search & Filter */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search student by name or roll number..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 outline-none transition-all text-sm font-bold"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Info</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Attendance</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRoster.map((student) => (
                    <tr key={student.rollNo} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-sm">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800">{student.name}</p>
                            <p className="text-[10px] font-bold text-slate-400">Roll No: {student.rollNo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col items-center">
                          <div className={`text-sm font-black ${student.attendance < 75 ? 'text-rose-600' : 'text-slate-800'}`}>
                            {student.attendance}%
                          </div>
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div 
                              className={`h-full ${student.attendance < 75 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-wrap gap-2">
                          {student.marks.map((mark, i) => (
                            <div key={i} className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-3">
                              <span className="text-[9px] font-black text-slate-400 uppercase">{mark.subject}</span>
                              <span className="text-xs font-black text-indigo-600">{mark.score}/{mark.maxMarks}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredRoster.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-8 py-12 text-center text-slate-400 italic font-bold">
                        No students found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{title: string, value: string | number, icon: React.ReactNode, color: string}> = ({title, value, icon, color}) => (
  <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-6">
    <div className={`bg-${color}-50 text-${color}-600 p-4 rounded-2xl`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-2xl font-black text-slate-800">{value}</h3>
    </div>
  </div>
);

export default TeacherDashboard;
