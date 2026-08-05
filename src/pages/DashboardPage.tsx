import React from 'react';
import { motion } from 'motion/react';
import { useProjects } from '../context/ProjectContext';
import { StatusBadge } from '../components/common/StatusBadge';
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
  Zap,
  Activity,
  Layers,
  BarChart3,
  ExternalLink
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { projects, setActiveProjectId, setActiveTab, setIsNewProjectModalOpen, activityLogs } = useProjects();

  const totalProjects = projects.length;
  const totalMedia = projects.reduce((acc, p) => acc + p.media.length, 0);
  const avgReadiness = Math.round(
    projects.reduce((acc, p) => acc + p.readinessScore, 0) / (totalProjects || 1)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-12"
    >
      {/* Hero Section */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-[28px] lg:rounded-[32px] bg-gradient-to-br from-[#052b66] via-[#083a82] to-[#0a2347] text-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#45cc42]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-[#45cc42] border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Transformation Engine Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Aura Launch AI Workspace
            </h1>
            <p className="text-sm text-blue-100/80 leading-relaxed max-w-xl">
              Convert raw Instagram business profiles into structured AI data models, high-converting copy, and deployment-ready website exports.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsNewProjectModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#45cc42] to-emerald-400 text-[#052b66] font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#45cc42]/25 hover:shadow-xl transition flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New AI Project</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Large KPI Cards Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Active Pipelines */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-[28px] p-6 flex flex-col justify-between card-hover"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Active Pipelines</span>
            <div className="p-3 rounded-2xl bg-blue-500/10 text-[#052b66] dark:text-blue-400">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{totalProjects}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +2 projects synced
            </p>
          </div>
        </motion.div>

        {/* Media Processed */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-[28px] p-6 flex flex-col justify-between card-hover"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Media Processed</span>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Image className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{totalMedia}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High-res asset indexing
            </p>
          </div>
        </motion.div>

        {/* AI Readiness Score */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-[28px] p-6 flex flex-col justify-between card-hover"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Avg. Readiness</span>
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-[#052b66] dark:text-[#45cc42] tracking-tight">{avgReadiness}%</p>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#45cc42] transition-all duration-500" style={{ width: `${avgReadiness}%` }} />
            </div>
          </div>
        </motion.div>

        {/* Storage Usage */}
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-card rounded-[28px] p-6 flex flex-col justify-between card-hover"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Storage Cloud</span>
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <HardDrive className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">2.8 / 10 GB</p>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-purple-500 w-[28%]" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Grid: Recent Projects + Actions & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Recent Projects */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-6 lg:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-[#052b66] dark:text-[#45cc42]" />
                  Recent Transformation Pipelines
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active Instagram scraping & website synthesis runs</p>
              </div>

              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs font-bold text-[#052b66] dark:text-[#45cc42] hover:underline flex items-center gap-1 transition"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {projects.length === 0 ? (
                <div className="py-12 text-center bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#052b66] dark:text-[#45cc42] flex items-center justify-center mx-auto">
                    <FolderKanban className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">No AI Transformations Yet</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Create your first project to begin generating websites.</p>
                  </div>
                  <button
                    onClick={() => setIsNewProjectModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-[#052b66] text-white font-bold text-xs hover:bg-[#0a3d8f] transition"
                  >
                    + Create Your First Project
                  </button>
                </div>
              ) : (
                projects.slice(0, 4).map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="p-4 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 transition flex items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={p.branding?.logoUrl || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100'}
                        alt={p.businessName}
                        className="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-200/80 dark:ring-white/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                          {p.businessName}
                        </h3>
                        <p className="text-xs text-slate-400 truncate">{p.businessInfo?.instagramHandle || p.instagramUrl}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={p.status} />

                      <button
                        onClick={() => {
                          setActiveProjectId(p.id);
                          setActiveTab('projects');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#052b66] text-white font-bold text-xs hover:bg-[#0a3d8f] transition shadow-xs"
                      >
                        Open
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Platform Activity Feed */}
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-6 lg:p-8 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#45cc42]" />
              Real-time Pipeline Activity
            </h2>

            <div className="space-y-3.5">
              {activityLogs.map((log, idx) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 flex items-start gap-3 text-xs"
                >
                  <div className="w-2 h-2 rounded-full bg-[#45cc42] mt-1.5 shrink-0 animate-ping" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{log.action}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{log.projectTitle} • {log.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column (1 col): Quick Actions & Analytics */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#052b66] to-[#0a3d8f] text-white rounded-[28px] p-6 lg:p-8 shadow-xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-[#45cc42]">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Quick Pipeline Triggers</h3>
            </div>

            <div className="space-y-2.5">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setIsNewProjectModalOpen(true)}
                className="w-full p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-left text-xs font-bold text-white flex items-center justify-between transition border border-white/10"
              >
                <span>Extract Instagram Profile</span>
                <Plus className="w-4 h-4 text-[#45cc42]" />
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setActiveTab('media')}
                className="w-full p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-left text-xs font-bold text-white flex items-center justify-between transition border border-white/10"
              >
                <span>Browse Global Media Assets</span>
                <Image className="w-4 h-4 text-blue-300" />
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setActiveTab('exports')}
                className="w-full p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-left text-xs font-bold text-white flex items-center justify-between transition border border-white/10"
              >
                <span>Export Code Packages</span>
                <ExternalLink className="w-4 h-4 text-emerald-300" />
              </motion.button>
            </div>
          </motion.div>

          {/* Extraction Analytics Chart */}
          <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-6 lg:p-8 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              Extraction Velocity
            </h3>

            {/* Animated Chart Bars */}
            <div className="h-44 w-full pt-4 flex items-end justify-between gap-2.5 border-b border-slate-200/60 dark:border-slate-800 pb-3">
              {[45, 70, 35, 88, 98, 75, 92].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <span className="text-[10px] font-bold font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition">
                    {val}%
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                    className="w-full bg-gradient-to-t from-[#052b66] to-blue-500 group-hover:from-[#45cc42] group-hover:to-emerald-400 rounded-t-xl transition-all duration-300 shadow-xs"
                  />
                  <span className="text-[10px] text-slate-400 font-bold">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 text-center font-medium">Weekly profile parsing throughput</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

