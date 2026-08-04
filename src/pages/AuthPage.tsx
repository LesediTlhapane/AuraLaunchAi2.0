import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Layers, Mail, Lock, User, Building2, ArrowRight, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { authMode, setAuthMode, login, register, forgotPassword } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    if (authMode === 'login') {
      const res = await login(email, password);
      setIsLoading(false);
      if (res.success) {
        addToast('success', 'Welcome Back', 'Signed in successfully to Aura Launch AI.');
      } else {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    } else if (authMode === 'register') {
      const res = await register(fullName, companyName, email, password);
      setIsLoading(false);
      if (res.success) {
        addToast('success', 'Account Created', 'Welcome to Aura Launch AI!');
      } else {
        setErrorMsg(res.error || 'Failed to register account');
      }
    } else if (authMode === 'forgot') {
      const res = await forgotPassword(email);
      setIsLoading(false);
      if (res.success) {
        setResetSent(true);
        addToast('info', 'Password Reset Sent', 'Check your email for recovery instructions.');
      } else {
        setErrorMsg(res.error || 'Failed to send reset link');
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] dark:bg-[#0b1329] flex items-center justify-center p-4 selection:bg-[#45cc42] selection:text-[#052b66]">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Branding Showcase Panel */}
        <div className="bg-[#052b66] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#45cc42]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#45cc42] flex items-center justify-center shadow-lg shadow-[#45cc42]/25">
                <Layers className="w-7 h-7 text-[#052b66]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#45cc42]">
                  Aura Tech Intelligence
                </span>
                <h1 className="text-xl font-black tracking-tight">Aura Launch AI</h1>
              </div>
            </div>

            <div className="pt-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#45cc42] border border-white/10">
                <Sparkles className="w-3.5 h-3.5" /> Next-Gen Instagram to Web SaaS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3 leading-snug">
                Turn Instagram Profiles into Production Websites in Minutes.
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/80 mt-3 leading-relaxed">
                Automate brand color token extraction, structured copy synthesis, media library indexing, and Loveable / Framer AI prompt packages.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-blue-900/60 text-xs text-blue-200/70 flex items-center justify-between">
            <span>Version 1.0 SaaS Foundation</span>
            <span className="text-[#45cc42] font-semibold">Supabase Auth Ready</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {authMode === 'login' && 'Sign in to Aura Launch'}
              {authMode === 'register' && 'Create Your Account'}
              {authMode === 'forgot' && 'Reset Password'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {authMode === 'login' && 'Enter your credentials to access your dashboard'}
              {authMode === 'register' && 'Start transforming Instagram profiles today'}
              {authMode === 'forgot' && 'Enter your email to receive a recovery link'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {resetSent && authMode === 'forgot' ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Reset Link Dispatched
              </div>
              <p>We sent a recovery email to {email}. Please check your inbox.</p>
              <button
                onClick={() => setAuthMode('login')}
                className="w-full py-2 bg-[#052b66] text-white font-bold rounded-xl"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Alex Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Aura Tech Intelligence"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="alex.vance@auratech.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
                  />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-xs text-[#052b66] dark:text-blue-400 font-semibold hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-sm shadow-lg hover:bg-[#0a3d8f] transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>
                      {authMode === 'login' && 'Sign In'}
                      {authMode === 'register' && 'Create Account'}
                      {authMode === 'forgot' && 'Send Recovery Email'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#45cc42]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Toggle modes */}
          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
            {authMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setAuthMode('register')}
                  className="font-bold text-[#052b66] dark:text-blue-400 hover:underline"
                >
                  Register now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-[#052b66] dark:text-blue-400 hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
