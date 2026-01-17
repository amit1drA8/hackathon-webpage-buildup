
import React, { useState } from 'react';
import { IssueCategory, IssuePriority, Issue } from '../types';
import { Send, AlertTriangle } from 'lucide-react';

interface Props {
  onSubmit: (data: Partial<Issue>) => void;
}

const IssueForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: IssueCategory.ACADEMIC,
    priority: IssuePriority.MEDIUM
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white">
          <h3 className="text-2xl font-bold mb-2 text-white">Report an Issue</h3>
          <p className="text-indigo-100 text-sm font-medium">Please provide specific details. Our admin team monitors reports in real-time.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Issue Title</label>
            <input
              type="text"
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Briefly state the problem..."
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <select
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as IssueCategory })}
              >
                {Object.values(IssueCategory).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
              <select
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value as IssuePriority })}
              >
                {Object.values(IssuePriority).map(prio => (
                  <option key={prio} value={prio}>{prio}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Detailed Description</label>
            <textarea
              required
              rows={5}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              placeholder="Explain the issue clearly. Mention locations or names if necessary..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="bg-amber-50 p-5 rounded-2xl flex gap-4 border border-amber-100">
            <AlertTriangle size={24} className="shrink-0 text-amber-500" />
            <div className="text-xs text-amber-800 leading-relaxed font-medium">
              By submitting, you confirm this information is accurate. Deliberate false reporting impacts campus efficiency and may result in disciplinary action.
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-indigo-100"
          >
            Submit Official Report
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueForm;
