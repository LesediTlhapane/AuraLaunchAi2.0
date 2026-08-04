import React, { useState } from 'react';
import { Project } from '../../types';
import { useProjects } from '../../context/ProjectContext';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe, 
  Instagram, 
  FileText, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

interface TabBusinessInfoProps {
  project: Project;
}

export const TabBusinessInfo: React.FC<TabBusinessInfoProps> = ({ project }) => {
  const { updateProject } = useProjects();
  const [info, setInfo] = useState(project.businessInfo);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateProject(project.id, {
      businessInfo: info,
      businessName: info.businessName,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Extracted Business Profile</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Parsed from Instagram bio, posts & OCR metadata. Edit to update AI generation inputs.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-[#0a3d8f] transition flex items-center gap-2"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-[#45cc42]" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Saved!' : 'Save Info'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Business Name
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={info.businessName}
              onChange={(e) => setInfo({ ...info, businessName: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
            />
          </div>
        </div>

        {/* Instagram Handle */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Instagram Handle
          </label>
          <div className="relative">
            <Instagram className="w-4 h-4 text-pink-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={info.instagramHandle}
              onChange={(e) => setInfo({ ...info, instagramHandle: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-blue-500 absolute left-3.5 top-3" />
            <input
              type="email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Operating Hours
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={info.operatingHours}
              onChange={(e) => setInfo({ ...info, operatingHours: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
            />
          </div>
        </div>

        {/* Website URL */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Existing Website / Linktree
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-indigo-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={info.websiteUrl || ''}
              onChange={(e) => setInfo({ ...info, websiteUrl: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
          Physical Location / Address
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-rose-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
          Extracted Instagram Bio
        </label>
        <div className="relative">
          <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <textarea
            rows={3}
            value={info.bio}
            onChange={(e) => setInfo({ ...info, bio: e.target.value })}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
          />
        </div>
      </div>
    </div>
  );
};
