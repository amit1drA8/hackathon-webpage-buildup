
import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Receipt, 
  ChevronDown, 
  ChevronUp,
  Wallet,
  History,
  FileText
} from 'lucide-react';
import { MOCK_FEES } from '../constants';
import { FeeRecord } from '../types';

const FeesSection: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const totalPayable = MOCK_FEES.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalPaid = MOCK_FEES.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalOutstanding = totalPayable - totalPaid;

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    // Simulate generation
    setTimeout(() => {
      setDownloadingId(null);
      // In a real app, this would trigger a PDF download
      alert(`Receipt for ${id} has been generated and saved to your downloads.`);
    }, 1500);
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 flex items-center gap-6">
          <div className="bg-white/20 p-4 rounded-2xl">
            <Wallet size={28} />
          </div>
          <div>
            <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mb-1">Total Payable</p>
            <h3 className="text-2xl font-black">₹{totalPayable.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Paid</p>
            <h3 className="text-2xl font-black text-slate-800">₹{totalPaid.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-6">
          <div className={`p-4 rounded-2xl ${totalOutstanding > 0 ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Outstanding</p>
            <h3 className={`text-2xl font-black ${totalOutstanding > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
              ₹{totalOutstanding.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Fee Categories Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileText size={20} className="text-indigo-600" />
                Fee Breakdown
              </h4>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic Year 2024-25</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Particulars</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Date</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_FEES.map((fee) => (
                    <React.Fragment key={fee.id}>
                      <tr className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-6">
                          <p className="text-sm font-bold text-slate-800">{fee.particulars}</p>
                          <p className="text-[10px] text-slate-400 font-medium">Ref ID: {fee.id}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-xs font-semibold text-slate-600">{new Date(fee.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-sm font-black text-slate-800">₹{fee.totalAmount.toLocaleString()}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                            fee.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                            fee.status === 'Partial' ? 'bg-amber-50 text-amber-600' :
                            'bg-rose-50 text-rose-600'
                          }`}>
                            {fee.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            {fee.status !== 'Unpaid' && (
                              <button 
                                onClick={() => handleDownload(fee.id)}
                                disabled={downloadingId === fee.id}
                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                title="Download Receipt"
                              >
                                {downloadingId === fee.id ? <Clock size={18} className="animate-spin" /> : <Download size={18} />}
                              </button>
                            )}
                            <button 
                              onClick={() => toggleRow(fee.id)}
                              className="p-2 text-slate-400 hover:text-slate-800 transition-all"
                            >
                              {expandedRow === fee.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedRow === fee.id && (
                        <tr className="bg-slate-50/50">
                          <td colSpan={5} className="px-8 py-6">
                            <div className="space-y-4">
                              <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Transaction History</h6>
                              {fee.transactions.length > 0 ? (
                                <div className="space-y-3">
                                  {fee.transactions.map((txn) => (
                                    <div key={txn.transactionId} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                      <div className="flex items-center gap-4">
                                        <div className="bg-slate-50 p-2 rounded-lg text-slate-400">
                                          <Receipt size={16} />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-slate-800">{txn.transactionId}</p>
                                          <p className="text-[10px] text-slate-400">{txn.date} • {txn.method}</p>
                                        </div>
                                      </div>
                                      <p className="text-sm font-black text-emerald-600">+ ₹{txn.amount.toLocaleString()}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-6">
                                  <p className="text-xs text-slate-400 italic">No transactions found for this record.</p>
                                </div>
                              )}
                              {fee.status !== 'Paid' && (
                                <button className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                  Pay Outstanding Balance
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Payment Instructions & Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <History size={20} className="text-indigo-600" />
              Quick Actions
            </h4>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group">
                <div className="flex items-center gap-3 text-slate-700">
                  <Receipt size={18} className="group-hover:text-indigo-600" />
                  <span className="text-sm font-bold">Annual Statement</span>
                </div>
                <Download size={16} className="text-slate-300" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group">
                <div className="flex items-center gap-3 text-slate-700">
                  <CreditCard size={18} className="group-hover:text-indigo-600" />
                  <span className="text-sm font-bold">Manage Auto-Pay</span>
                </div>
                <chevron-right size={16} className="text-slate-300" />
              </button>
            </div>
          </div>

          <div className="bg-indigo-50/50 p-8 rounded-[32px] border border-indigo-100">
            <h5 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertCircle size={18} />
              Important Notice
            </h5>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                <p className="text-xs text-indigo-800 leading-relaxed">
                  Late fee of **₹100 per day** applies after the 10th of the billing month.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                <p className="text-xs text-indigo-800 leading-relaxed">
                  Exams hall tickets will be withheld for accounts with balance &gt; ₹5,000.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                <p className="text-xs text-indigo-800 leading-relaxed">
                  For cash payment support, visit **Accounts Window 3** before 3:00 PM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesSection;
