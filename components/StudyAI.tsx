
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  User, 
  BrainCircuit, 
  Loader2, 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  Paperclip, 
  X, 
  FileText, 
  Zap,
  Bot
} from 'lucide-react';
import { ChatMessage } from '../types';
import { GoogleGenAI } from "@google/genai";

const PRO_SYSTEM_PROMPT = `
You are the Campus Pro AI, an elite intelligent assistant powered by the latest large language model technology. 
Your goal is to provide world-class reasoning, creative writing, and technical problem-solving for college students.
Capabilities:
- Solve complex mathematics, physics, and engineering problems step-by-step.
- Write, debug, and explain code in any language.
- Summarize long academic papers and extract key insights.
- Provide career advice, essay feedback, and creative brainstorming.
- Vision Support: Analyze uploaded images of charts, handwritten notes, or diagrams.
Tone: Sophisticated, highly intelligent, helpful, and concise. 
Format: Use Markdown for all structures (bullet points, bold text, code blocks).
`;

const StudyAI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('pro_ai_history');
    return saved ? JSON.parse(saved) : [
      { 
        role: 'model', 
        text: "Welcome to the Pro AI Assistant. I am equipped with deep reasoning capabilities to help you with your most complex academic and creative challenges. How can I assist you today?", 
        timestamp: new Date().toISOString() 
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const [selectedFile, setSelectedFile] = useState<{ name: string; type: string; data: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('pro_ai_history', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isThinking]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid Image (JPG/PNG) or PDF document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = (event.target?.result as string).split(',')[1];
      setSelectedFile({
        name: file.name,
        type: file.type,
        data: base64
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedFile) || isLoading) return;

    const userMsg: ChatMessage = { 
      role: 'user', 
      text: input || (selectedFile ? `Analyzing: ${selectedFile.name}` : ""), 
      timestamp: new Date().toISOString(),
      fileData: selectedFile ? { 
        mimeType: selectedFile.type, 
        data: selectedFile.data, 
        name: selectedFile.name 
      } : undefined
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    const currentFile = selectedFile;
    
    setInput('');
    setSelectedFile(null);
    setIsLoading(true);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const parts: any[] = [];
      if (currentFile) {
        parts.push({
          inlineData: {
            mimeType: currentFile.type,
            data: currentFile.data
          }
        });
      }
      parts.push({ text: currentInput || "Please provide a comprehensive analysis of the attached material." });

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', // Upgraded to Pro model
        contents: { parts },
        config: {
          systemInstruction: PRO_SYSTEM_PROMPT,
          temperature: 0.4, // Lower temperature for more precise reasoning
          thinkingConfig: { thinkingBudget: 16000 } // Enable deep thinking
        },
      });

      const aiText = response.text || "My analysis is complete. Is there a specific detail you'd like to dive into?";

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: aiText, 
        timestamp: new Date().toISOString() 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I encountered an error processing that complex request. Please try a simpler prompt or check your file.", 
        timestamp: new Date().toISOString() 
      }]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-10rem)] flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in duration-700">
      {/* Sleeker Header */}
      <div className="bg-slate-900 px-8 py-6 text-white flex items-center justify-between relative">
        <div className="flex items-center gap-5">
          <div className="bg-indigo-500/20 p-3 rounded-2xl border border-indigo-500/30">
            <Zap className="text-indigo-400 fill-indigo-400" size={24} />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tight">Pro AI Assistant</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_10px_#818cf8]"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deep Reasoning Active</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([])}
          className="p-3 hover:bg-white/10 rounded-2xl transition-all text-slate-400 hover:text-white"
          title="Clear History"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Messages Area */}
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
                  {msg.fileData && (
                    <div className="mb-4 p-3 bg-black/5 rounded-2xl flex items-center gap-4">
                      {msg.fileData.mimeType.startsWith('image/') ? (
                        <img 
                          src={`data:${msg.fileData.mimeType};base64,${msg.fileData.data}`} 
                          alt="Context" 
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-white/50 rounded-xl flex items-center justify-center text-indigo-500">
                          <FileText size={40} />
                        </div>
                      )}
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Reference Uploaded</p>
                        <p className="text-xs font-bold truncate max-w-[150px]">{msg.fileData.name || 'document'}</p>
                      </div>
                    </div>
                  )}
                  <div className="prose prose-slate prose-sm max-w-none whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>
                {msg.role === 'model' && (
                  <button 
                    onClick={() => copyToClipboard(msg.text, i)}
                    className="absolute -bottom-7 left-1 opacity-0 group-hover:opacity-100 transition-all text-[10px] font-bold text-slate-400 flex items-center gap-1.5 hover:text-indigo-600"
                  >
                    {copiedIndex === i ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy Output</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 px-6 py-4 rounded-[28px] rounded-tl-none flex items-center gap-4 shadow-xl">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.15em]">Processing Deep Thoughts</span>
                <span className="text-[9px] text-slate-400 font-bold italic">Synthesizing multiple reasoning pathways...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modernized Input */}
      <div className="p-8 border-t border-slate-100 bg-white">
        {selectedFile && (
          <div className="mb-6 animate-in slide-in-from-bottom-2 duration-300">
            <div className="inline-flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl relative shadow-sm">
              <button 
                onClick={() => setSelectedFile(null)}
                className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full p-1 shadow-xl hover:scale-110 transition-transform"
              >
                <X size={12} />
              </button>
              <div className="w-14 h-14 bg-white rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center">
                {selectedFile.type.startsWith('image/') ? (
                  <img src={`data:${selectedFile.type};base64,${selectedFile.data}`} className="w-full h-full object-cover" />
                ) : (
                  <FileText className="text-indigo-500" size={24} />
                )}
              </div>
              <div className="pr-4">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Context Active</p>
                <p className="text-xs font-black text-slate-700 max-w-[200px] truncate">{selectedFile.name}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 items-end">
          <div className="flex-1 relative flex items-center bg-slate-50 rounded-[28px] border border-slate-200 shadow-inner group focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:bg-white transition-all">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="ml-4 p-3 text-slate-400 hover:text-indigo-600 transition-colors"
              title="Attach File"
            >
              <Paperclip size={22} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/png, image/jpeg, application/pdf"
            />
            <textarea
              className="flex-1 bg-transparent py-5 px-4 outline-none text-sm font-medium resize-none max-h-32"
              placeholder="Ask me to solve, code, explain, or analyze..."
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
                  handleSend();
                }
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={(!input.trim() && !selectedFile) || isLoading}
            className="h-[62px] w-[62px] bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-indigo-600 disabled:opacity-20 disabled:grayscale transition-all active:scale-95 shadow-2xl shadow-slate-200"
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyAI;
