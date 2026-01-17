
import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Lock, 
  Loader2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Role } from '../types';

interface LoginProps {
  onLogin: (role: Role) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<Role>('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onLogin(selectedRole);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-600 -skew-y-6 origin-top-left -translate-y-24"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl shadow-indigo-200/50 overflow-hidden relative z-10 border border-slate-100">
        
        {/* Left Side: Branding & Info */}
        <div className="bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <GraduationCap size={200} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <GraduationCap size={28} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter">CampusDesk</h1>
            </div>
            
            <h2 className="text-4xl font-black leading-tight mb-6">
              Empowering the <br />
              <span className="text-indigo-400">Next Generation</span> <br />
              of Scholars.
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
              Your intelligent gateway to academic excellence, administrative support, and seamless campus life management.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
              <CheckCircle2 size={18} className="text-indigo-400" />
              AI-Powered Academic Support
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
              <CheckCircle2 size={18} className="text-indigo-400" />
              Real-time Issue Resolution
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
              <CheckCircle2 size={18} className="text-indigo-400" />
              Unified Student Dashboard
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-12">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Welcome Back</h3>
            <p className="text-slate-400 text-sm font-medium">Select your portal to continue</p>
          </div>

          <div className="flex gap-4 mb-10">
            <button 
              onClick={() => setSelectedRole('Student')}
              className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                selectedRole === 'Student' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${selectedRole === 'Student' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300'}`}>
                <GraduationCap size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Student</span>
            </button>
            <button 
              onClick={() => setSelectedRole('Admin')}
              className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                selectedRole === 'Admin' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${selectedRole === 'Admin' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300'}`}>
                <ShieldCheck size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Teacher</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.student@college.edu"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-600 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-600 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-xs font-bold text-slate-500">Remember me</span>
              </label>
              <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot Password?</a>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white rounded-2xl py-5 font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Login to Portal
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100">
              <Sparkles size={14} className="text-indigo-600" />
              <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Powered by Gemini AI Engine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
