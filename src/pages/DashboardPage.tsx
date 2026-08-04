import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { 
  FolderKanban, 
  Image, 
  HardDrive, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Zap,
  Activity
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { projects, setActiveProjectId, setActiveTab, setIsNewProjectModalOpen, activityLogs } = useProjects();

  const totalProjects = projects.length;
  const totalMedia = projects.reduce((acc, p) => acc + p.media.length, 0);
  const avgReadiness = Math.round(
    projects.reduce((acc, p) => acc + p.readinessScore, 0) / (totalProjects || 1)
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & Primary CTA Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#052b66] dark:text-[#45cc42]">
            Platform Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Aura Launch AI Workspace
          </h1>
        </div>

        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs shadow-lg hover:bg-[#0a3d8f] transition flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4 text-[#45cc42]" />
          <span>New AI Project</span>
        </button>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Pipelines</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalProjects}</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +2 this week
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 text-[#052b66] dark:bg-blue-950/50 dark:text-blue-400">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        {/* Media Processed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Media Processed</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalMedia} Assets</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Indexing
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Image className="w-6 h-6" />
          </div>
        </div>

        {/* AI Readiness */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg. Readiness Score</p>
            <p className="text-2xl font-black text-[#052b66] dark:text-[#45cc42] mt-1">{avgReadiness}%</p>
            <p className="text-[11px] text-slate-500 mt-1">Ready for v2 AI Generation</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        {/* Storage Usage */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Storage Used</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">2.8 / 10 GB</p>
            <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#45cc42] w-[28%]" />
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
            <HardDrive className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Projects + Charts & Storage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Recent Projects Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-[#052b66] dark:text-blue-400" />
                Recent Transformation Projects
              </h2>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs font-semibold text-[#052b66] dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/80 dark:hover:bg-slate-800 transition flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={p.branding.logoUrl || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100'}
                      alt={p.businessName}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {p.businessName}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">{p.businessInfo.instagramHandle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        p.status === 'ready' || p.status === 'exported'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                      }`}
                    >
                      {p.status}
                    </span>

                    <button
                      onClick={() => {
                        setActiveProjectId(p.id);
                        setActiveTab('projects');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#052b66] text-white font-semibold text-xs hover:bg-[#0a3d8f] transition"
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              Recent Platform Activity
            </h2>

            <div className="space-y-4">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#45cc42] mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{log.action}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">{log.projectTitle} • {log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Quick Actions & Interactive Charts */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-[#052b66] text-white rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-[#45cc42]">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-bold text-sm">Quick Pipeline Actions</h3>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setIsNewProjectModalOpen(true)}
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 text-left text-xs font-semibold text-white flex items-center justify-between transition"
              >
                <span>Extract Instagram Profile</span>
                <Plus className="w-4 h-4 text-[#45cc42]" />
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 text-left text-xs font-semibold text-white flex items-center justify-between transition"
              >
                <span>Browse Global Media</span>
                <Image className="w-4 h-4 text-blue-300" />
              </button>
              <button
                onClick={() => setActiveTab('exports')}
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 text-left text-xs font-semibold text-white flex items-center justify-between transition"
              >
                <span>View AI Export Packages</span>
                <ExternalLink className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>

          {/* Interactive Placeholder Chart Component */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Extraction Analytics
            </h3>

            {/* SVG Visual Chart */}
            <div className="h-40 w-full pt-4 flex items-end justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              {[40, 65, 30, 85, 95, 70, 90].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="text-[9px] text-slate-400 opacity-0 group-hover:opacity-100 transition">
                    {val}%
                  </div>
                  <div
                    className="w-full bg-[#052b66] dark:bg-blue-600 group-hover:bg-[#45cc42] rounded-t-lg transition-all duration-300"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[10px] text-slate-400 font-mono">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 text-center">Daily Instagram profile processing velocity</p>
          </div>
        </div>
      </div>
    </div>
  );
};
