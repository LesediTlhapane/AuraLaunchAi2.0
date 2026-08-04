import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Building2, Shield, HardDrive, CheckCircle2, Save } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email] = useState(user?.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [companyName, setCompanyName] = useState(user?.companyName || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, avatarUrl, companyName });
    addToast('success', 'Profile Updated', 'Your profile details were updated.');
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#052b66] dark:text-[#45cc42]">
          User Profile
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Account & Quotas
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center space-y-4">
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt={fullName}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#052b66]/20 shadow-md"
          />
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{fullName}</h3>
            <p className="text-xs text-slate-400">{user?.role || 'Product Lead'}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> Authenticated
          </span>
        </div>

        {/* Quota Usage Cards */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#052b66] dark:text-blue-400" /> Subscription Quotas
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Transformation Pipelines</span>
                  <span>{user?.usageQuota.projectsUsed} / {user?.usageQuota.projectsLimit} Projects</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-[#052b66] dark:bg-blue-500" style={{ width: '28%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Media Assets Processed</span>
                  <span>{user?.usageQuota.mediaProcessed} / 1,000 Items</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-[#45cc42]" style={{ width: '15%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Storage Usage</span>
                  <span>{user?.usageQuota.storageUsedGb} GB / {user?.usageQuota.storageLimitGb} GB</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-600" style={{ width: '28%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">Edit Profile Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              Email Address (Read only)
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-sm font-semibold text-slate-500 cursor-not-allowed"
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Avatar Image URL
            </label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs shadow-md flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Profile
        </button>
      </form>
    </div>
  );
};
