
import React, { useState } from 'react';
import { Issue, IssueStatus } from '../types';
import { STATUS_ICONS, CATEGORY_ICONS } from '../constants';
import { 
  Filter, 
  Search, 
  MoreVertical, 
  TrendingUp, 
  Users, 
  CheckCircle,
  FileText,
  BrainCircuit,
  Loader2,
  X
} from 'lucide-react';
import { getAdminSummary } from '../services/gemini';
import Analytics from './Analytics';

interface Props {
  issues: Issue[];
  onUpdateStatus: (id: string, status: IssueStatus) => void;
  showAnalytics: boolean;
}

const AdminDashboard: React.FC<Props> = ({ issues, onUpdateStatus, showAnalytics }) => {
  const [filter, setFilter] = useState<IssueStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const filteredIssues = issues.filter(issue => {
    const matchesFilter = filter === 'All' || issue.status === filter;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const generateSummary = async () => {
    setIsSummarizing(true);
    try {
      const res = await getAdminSummary(issues);
      setSummary(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSummarizing(false);
    }
  };

  if (showAnalytics) {
    return <Analytics issues={issues} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Tickets" value={issues.length} icon={<FileText />} color="indigo" />
        <StatCard title="Open" value={issues.filter(i => i.status === IssueStatus.OPEN).length} icon={<TrendingUp />} color="red" />
        <StatCard title="In Progress" value={issues.filter(i => i.status === IssueStatus.IN_PROGRESS).length} icon={<Users />} color="amber" />
        <StatCard title="Resolved" value={issues.filter(i => i.status === IssueStatus.RESOLVED).length} icon={<CheckCircle />} color="emerald" />
      </div>

      {/* AI Summary Banner */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-slate-800 opacity-20 group-hover:scale-110 transition-transform">
          <BrainCircuit size={120} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold mb-4">
            <Sparkles size={14} />
            AI ADMIN INSIGHTS
          </div>
          <h3 className="text-2xl font-bold mb-2">Generate Executive Summary</h3>
          <p className="text-slate-400 text-sm mb-6">Analyze all student complaints instantly to identify top patterns and critical areas requiring immediate attention.</p>
          <button 
            onClick={generateSummary}
            disabled={isSummarizing}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all"
          >
            {isSummarizing ? <Loader2 className="animate-spin" size={20} /> : <BrainCircuit size={20} />}
            {isSummarizing ? 'Analyzing Patterns...' : 'Get AI Summary'}
          </button>
        </div>
      </div>

      {/* Issue Table Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by ID or title..."
            className="w-full pl-11 pr-4 py-2 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="text-slate-400 mr-2" size={18} />
          {['All', IssueStatus.OPEN, IssueStatus.IN_PROGRESS, IssueStatus.RESOLVED].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === s ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Issue Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Sentiment</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIssues.map(issue => (
                <tr key={issue.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg text-slate-400">
                        {CATEGORY_ICONS[issue.category]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{issue.title}</div>
                        <div className="text-xs text-slate-400">{issue.id} • {issue.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700 font-medium">{issue.studentName}</div>
                    <div className="text-xs text-slate-400">{issue.studentId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      issue.sentiment === 'Frustrated' ? 'bg-red-50 text-red-600' :
                      issue.sentiment === 'Urgent' ? 'bg-orange-50 text-orange-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {issue.sentiment || 'Neutral'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={issue.status}
                      onChange={e => onUpdateStatus(issue.id, e.target.value as IssueStatus)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border-none focus:ring-2 focus:ring-indigo-500 cursor-pointer ${
                        issue.status === IssueStatus.OPEN ? 'bg-red-50 text-red-700' :
                        issue.status === IssueStatus.IN_PROGRESS ? 'bg-amber-50 text-amber-700' :
                        'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {Object.values(IssueStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredIssues.length === 0 && (
            <div className="text-center py-20 text-slate-400 italic">No tickets found matching your criteria.</div>
          )}
        </div>
      </div>

      {/* Summary Modal */}
      {summary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BrainCircuit className="text-indigo-600" />
                <h3 className="text-xl font-bold">Campus Issue Summary</h3>
              </div>
              <button onClick={() => setSummary(null)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto whitespace-pre-wrap text-slate-700 leading-relaxed text-sm">
              {summary}
            </div>
            <div className="p-6 bg-slate-50 rounded-b-3xl flex justify-end">
              <button 
                onClick={() => setSummary(null)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{title: string, value: number, icon: React.ReactNode, color: string}> = ({title, value, icon, color}) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
    <div className={`text-${color}-600 bg-${color}-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
    <p className="text-2xl font-black text-slate-800">{value}</p>
  </div>
);

const Sparkles: React.FC<{size?: number, className?: string}> = ({size=24, className=""}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

export default AdminDashboard;
