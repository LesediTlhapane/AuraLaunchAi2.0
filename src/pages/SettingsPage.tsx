import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useToast } from '../context/ToastContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { 
  User, 
  Bell, 
  Sun, 
  Moon, 
  Key, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Save, 
  Instagram, 
  Sparkles 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { darkMode, toggleDarkMode } = useProjects();
  const { addToast } = useToast();

  const [activeSettingTab, setActiveSettingTab] = useState<'account' | 'notifications' | 'theme' | 'api' | 'danger'>('account');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [companyName, setCompanyName] = useState(user?.companyName || '');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [instaKey, setInstaKey] = useState('IGQVJ...x89A2');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, companyName });
    addToast('success', 'Profile Updated', 'Account preferences saved.');
  };

  const handlePurgeData = () => {
    localStorage.clear();
    addToast('warning', 'Platform Reset', 'Local data cleared. Reloading page...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#052b66] dark:text-[#45cc42]">
          Configuration Center
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Settings
        </h1>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveSettingTab('account')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSettingTab === 'account'
              ? 'bg-[#052b66] text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <User className="w-4 h-4" /> Account
        </button>

        <button
          onClick={() => setActiveSettingTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSettingTab === 'notifications'
              ? 'bg-[#052b66] text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" /> Notifications
        </button>

        <button
          onClick={() => setActiveSettingTab('theme')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSettingTab === 'theme'
              ? 'bg-[#052b66] text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} Theme
        </button>

        <button
          onClick={() => setActiveSettingTab('api')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSettingTab === 'api'
              ? 'bg-[#052b66] text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Key className="w-4 h-4" /> API Connections
        </button>

        <button
          onClick={() => setActiveSettingTab('danger')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeSettingTab === 'danger'
              ? 'bg-rose-600 text-white'
              : 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
          }`}
        >
          <AlertTriangle className="w-4 h-4" /> Danger Zone
        </button>
      </div>

      {/* Account Settings */}
      {activeSettingTab === 'account' && (
        <form onSubmit={handleSaveAccount} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4 max-w-xl">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Account Details</h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Account Preferences
          </button>
        </form>
      )}

      {/* Notifications Settings */}
      {activeSettingTab === 'notifications' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4 max-w-xl">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Notification Preferences</h3>

          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">Email Digest Alerts</p>
              <p className="text-xs text-slate-400">Receive summary reports when extraction pipelines complete.</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-5 h-5 accent-[#052b66]"
            />
          </div>
        </div>
      )}

      {/* Theme Settings */}
      {activeSettingTab === 'theme' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4 max-w-xl">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Appearance & Theme Mode</h3>

          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {darkMode ? 'Dark Slate Mode Active' : 'Light Clean Mode Active'}
              </p>
              <p className="text-xs text-slate-400">Toggle dark mode for reduced eye strain.</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs"
            >
              Toggle Mode
            </button>
          </div>
        </div>
      )}

      {/* API Connections */}
      {activeSettingTab === 'api' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6 max-w-2xl">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">External Service Integrations</h3>

          {/* Supabase Status */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-500" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">Supabase Connection</span>
              </div>
              {isSupabaseConfigured ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                  Fallback Store
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {isSupabaseConfigured
                ? 'Connected via NEXT_PUBLIC_SUPABASE_URL and ANON_KEY env variables.'
                : 'Using persistent reactive local state. Add SUPABASE credentials to .env to connect.'}
            </p>
          </div>

          {/* Instagram Graph API */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-500" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">Instagram Graph API Token</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Active
              </span>
            </div>
            <input
              type="text"
              value={instaKey}
              onChange={(e) => setInstaKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200"
            />
          </div>

          {/* Gemini AI Readiness */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#45cc42]" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">Gemini AI Engine (v2 Prep)</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                Ready for v2
              </span>
            </div>
            <p className="text-xs text-slate-500">
              GEMINI_API_KEY environment variable injected server-side. Prepared for Version 2 automated generation.
            </p>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      {activeSettingTab === 'danger' && (
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-6 space-y-4 max-w-xl">
          <h3 className="font-bold text-base text-rose-800 dark:text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </h3>
          <p className="text-xs text-rose-700 dark:text-rose-400">
            Reset local workspace storage and restore default mock project datasets.
          </p>

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md hover:bg-rose-700 transition"
          >
            Reset Workspace State
          </button>
        </div>
      )}

      {/* Confirm purge modal */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        title="Reset Local Workspace?"
        message="This will clear all custom local storage projects and reset to default dataset."
        confirmLabel="Reset All Data"
        isDanger
        onConfirm={handlePurgeData}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
