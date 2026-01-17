
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Loader2, Info, MessageSquare, AlertCircle, PlusCircle, ArrowLeft, Bot, Trash2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithGemini } from '../services/gemini';

const QUICK_PROBLEMS = [
  { id: 'attendance', label: 'Attendance Rules', prompt: 'Tell me about the campus attendance rules and eligibility criteria.' },
  { id: 'exams', label: 'Exam Eligibility', prompt: 'What are the requirements to sit for final exams?' },
  { id: 'wifi', label: 'Wi-Fi/IT Issues', prompt: 'I am having trouble with the campus Wi-Fi. How do I fix it?' },
  { id: 'library', label: 'Library Timings', prompt: 'What are the library opening and closing hours?' },
  { id: 'hostel', label: 'Hostel Maintenance', prompt: 'How do I report a maintenance issue in the hostel?' },
  { id: 'reval', label: 'Revaluation Process', prompt: 'How can I apply for paper revaluation?' },
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: "Hi! I'm your Smart Campus Assistant. Please select a category below or choose 'Other' to type your specific problem.", 
      timestamp: new Date().toISOString() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'selection' | 'manual'>('selection');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, mode]);

  const processResponse = async (userText: string) => {
    const userMsg: ChatMessage = { role: 'user', text: userText, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await chatWithGemini(userText, history);
      setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date().toISOString() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again.", timestamp: new Date().toISOString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSelection = (item: typeof QUICK_PROBLEMS[0]) => {
    processResponse(item.prompt);
  };

  const handleSendManual = () => {
    if (!input.trim() || isLoading) return;
    processResponse(input);
    setInput('');
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-10rem)] flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in duration-700">
      {/* Sleeker Header - Matched with Pro AI */}
      <div className="bg-slate-900 px-8 py-6 text-white flex items-center justify-between relative">
        <div className="flex items-center gap-5">
          <div className="bg-indigo-500/20 p-3 rounded-2xl border border-indigo-500/30">
            <Sparkles className="text-indigo-400" size={24} />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tight">Campus Response Hub</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_10px_#818cf8]"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">AI Service Active</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {mode === 'manual' && (
            <button 
              onClick={() => setMode('selection')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-white/80"
            >
              <ArrowLeft size={16} /> Grid Menu
            </button>
          )}
          <button 
            onClick={() => setMessages([{ role: 'model', text: "Hi! How can I help you today?", timestamp: new Date().toISOString() }])}
            className="p-3 hover:bg-white/10 rounded-2xl transition-all text-slate-400 hover:text-white"
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area - Matched with Pro AI */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 bg-[#fafafa] scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border ${
                msg.role === 'user' 
                  ? 'bg-white border-slate-200 text-slate-400' 
                  : 'bg-slate-900 border-slate-800 text-white'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className="group relative">
                <div className={`px-6 py-5 rounded-[28px] text-sm leading-[1.6] shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200/60 rounded-tl-none font-medium'
                }`}>
                  {msg.text}
                </div>
                <div className={`text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 px-6 py-4 rounded-[28px] rounded-tl-none flex items-center gap-4 shadow-xl">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.15em]">Assistant Thinking</span>
                <span className="text-[9px] text-slate-400 font-bold italic">Consulting campus database...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input / Interaction Area - Matched with Pro AI */}
      <div className="p-8 border-t border-slate-100 bg-white">
        {mode === 'selection' ? (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-slate-100"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] whitespace-nowrap">Subject Selection</p>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {QUICK_PROBLEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleQuickSelection(item)}
                  disabled={isLoading}
                  className="group p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center hover:border-indigo-600 hover:bg-indigo-50 transition-all active:scale-95 disabled:opacity-50"
                >
                  <div className="w-8 h-8 bg-white group-hover:bg-indigo-600 group-hover:text-white rounded-lg flex items-center justify-center mx-auto mb-2 transition-all shadow-sm">
                    <MessageSquare size={14} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-700 group-hover:text-indigo-700 truncate">{item.label}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => setMode('manual')}
                disabled={isLoading}
                className="group flex items-center gap-3 px-6 py-3 bg-slate-100 border border-slate-200 rounded-2xl hover:bg-amber-50 hover:border-amber-400 transition-all active:scale-95"
              >
                <div className="p-1.5 bg-amber-500 text-white rounded-lg shadow-sm">
                  <AlertCircle size={14} />
                </div>
                <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Other Problem</p>
              </button>

              <button 
                onClick={() => window.location.hash = 'new-issue'}
                className="group flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-md"
              >
                <div className="p-1.5 bg-white/10 rounded-lg shadow-sm">
                  <PlusCircle size={14} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest">Formal Ticket</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-end animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex-1 relative flex items-center bg-slate-50 rounded-[28px] border border-slate-200 shadow-inner group focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:bg-white transition-all">
              <textarea
                className="flex-1 bg-transparent py-5 px-8 outline-none text-sm font-medium resize-none max-h-32"
                placeholder="Describe your campus problem..."
                rows={1}
                value={input}
                onChange={e => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendManual();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSendManual}
              disabled={!input.trim() || isLoading}
              className="h-[62px] w-[62px] bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-indigo-600 disabled:opacity-20 disabled:grayscale transition-all active:scale-95 shadow-2xl shadow-slate-200"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
            </button>
          </div>
        )}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-slate-100"></div>
          <p className="text-[9px] text-slate-300 font-black tracking-[0.4em] uppercase">
            Gemini AI Engine • Secure Response
          </p>
          <div className="h-px w-8 bg-slate-100"></div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
