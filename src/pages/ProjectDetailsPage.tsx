import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { TabOverview } from '../components/project-details/TabOverview';
import { TabMedia } from '../components/project-details/TabMedia';
import { TabBusinessInfo } from '../components/project-details/TabBusinessInfo';
import { TabBranding } from '../components/project-details/TabBranding';
import { TabGeneratedCopy } from '../components/project-details/TabGeneratedCopy';
import { TabWebsitePreview } from '../components/project-details/TabWebsitePreview';
import { TabExports } from '../components/project-details/TabExports';
import { NotFoundPage } from './NotFoundPage';
import { 
  ArrowLeft, 
  LayoutDashboard, 
  Image, 
  Building2, 
  Palette, 
  FileText, 
  Eye, 
  Download, 
  Sparkles 
} from 'lucide-react';

export const ProjectDetailsPage: React.FC = () => {
  const { activeProject, setActiveProjectId } = useProjects();
  const [activeDetailTab, setActiveDetailTab] = useState<
    'overview' | 'media' | 'info' | 'branding' | 'copy' | 'preview' | 'exports'
  >('overview');

  if (!activeProject) {
    return <NotFoundPage />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'media', label: 'Media', icon: <Image className="w-4 h-4" /> },
    { id: 'info', label: 'Business Info', icon: <Building2 className="w-4 h-4" /> },
    { id: 'branding', label: 'Branding', icon: <Palette className="w-4 h-4" /> },
    { id: 'copy', label: 'Generated Copy', icon: <FileText className="w-4 h-4" /> },
    { id: 'preview', label: 'Website Preview', icon: <Eye className="w-4 h-4" /> },
    { id: 'exports', label: 'Exports', icon: <Download className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Navigation Back Button & Project Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveProjectId(null)}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {activeProject.businessName}
              </h1>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  activeProject.status === 'ready' || activeProject.status === 'exported'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                }`}
              >
                {activeProject.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">{activeProject.businessInfo.instagramHandle}</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#052b66] text-white text-xs font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-[#45cc42]" />
          <span>v1.0 SaaS Data Architecture</span>
        </div>
      </div>

      {/* Tab Navigation Menu */}
      <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeDetailTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveDetailTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-[#052b66] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className={isActive ? 'text-[#45cc42]' : 'text-slate-400'}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="pt-2">
        {activeDetailTab === 'overview' && (
          <TabOverview project={activeProject} onNavigateTab={(t) => setActiveDetailTab(t as any)} />
        )}
        {activeDetailTab === 'media' && <TabMedia project={activeProject} />}
        {activeDetailTab === 'info' && <TabBusinessInfo project={activeProject} />}
        {activeDetailTab === 'branding' && <TabBranding project={activeProject} />}
        {activeDetailTab === 'copy' && <TabGeneratedCopy project={activeProject} />}
        {activeDetailTab === 'preview' && <TabWebsitePreview project={activeProject} />}
        {activeDetailTab === 'exports' && <TabExports project={activeProject} />}
      </div>
    </div>
  );
};
