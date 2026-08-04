import React from 'react';
import { Project } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  FileText, 
  Image, 
  Palette, 
  ExternalLink,
  Zap,
  TrendingUp
} from 'lucide-react';

interface TabOverviewProps {
  project: Project;
  onNavigateTab: (tabKey: string) => void;
}

export const TabOverview: React.FC<TabOverviewProps> = ({ project, onNavigateTab }) => {
  const pipelineSteps = [
    { title: 'Instagram Profile Parsing', desc: 'Metadata, bio, and business contact extraction', status: 'completed' },
    { title: 'Media Library Indexing', desc: `${project.media.length} image assets extracted with quality scoring`, status: 'completed' },
    { title: 'Brand Design Token Analysis', desc: 'Auto-extracted primary color & typography pairings', status: 'completed' },
    { title: 'Structured AI Copy Synthesis', desc: 'Hero headline, services breakdown & SEO metadata generated', status: 'completed' },
    { title: 'Website Template Assembly', desc: 'Responsive multi-section layout preview built', status: project.readinessScore >= 80 ? 'completed' : 'in_progress' },
    { title: 'AI Export Packages', desc: 'Loveable, Framer & JSON prompts generated', status: project.status === 'exported' ? 'completed' : 'pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Readiness Gauge */}
      <div className="bg-gradient-to-br from-[#052b66] to-[#0a3d8f] rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#45cc42]">
            <Sparkles className="w-3.5 h-3.5" /> Pipeline Status: {project.status.toUpperCase()}
          </div>
          <h2 className="text-2xl font-black tracking-tight">{project.businessName}</h2>
          <p className="text-xs text-blue-100/80 leading-relaxed">
            {project.notes || 'Instagram business transformation pipeline prepared and ready for Version 2 AI execution.'}
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs text-blue-200">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Created {new Date(project.createdAt).toLocaleDateString()}
            </span>
            <a
              href={project.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#45cc42] hover:underline"
            >
              Instagram Profile <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="w-full md:w-auto bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center min-w-[200px]">
          <span className="text-[11px] uppercase font-bold tracking-wider text-blue-200 block">
            AI Readiness Score
          </span>
          <div className="text-4xl font-black text-[#45cc42] my-1 flex items-center justify-center gap-1">
            {project.readinessScore}%
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="w-full h-2 rounded-full bg-blue-950 overflow-hidden mt-2">
            <div
              className="h-full bg-[#45cc42] transition-all duration-500"
              style={{ width: `${project.readinessScore}%` }}
            />
          </div>
          <p className="text-[10px] text-blue-200 mt-2">Ready for instant export</p>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigateTab('media')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#052b66] transition text-left group shadow-xs"
        >
          <Image className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition" />
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-2">{project.media.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Media Assets</p>
        </button>

        <button
          onClick={() => onNavigateTab('branding')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#052b66] transition text-left group shadow-xs"
        >
          <Palette className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition" />
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: project.branding.primaryColor }} />
            <div className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: project.branding.secondaryColor }} />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Design Tokens</p>
        </button>

        <button
          onClick={() => onNavigateTab('copy')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#052b66] transition text-left group shadow-xs"
        >
          <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition" />
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-2">Generated</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Copy & Content</p>
        </button>

        <button
          onClick={() => onNavigateTab('exports')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#052b66] transition text-left group shadow-xs"
        >
          <Zap className="w-5 h-5 text-amber-500 group-hover:scale-110 transition" />
          <p className="text-lg font-bold text-slate-900 dark:text-white mt-2">Ready</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Export Packages</p>
        </button>
      </div>

      {/* Pipeline Progress Checklist */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#052b66] dark:text-blue-400" />
          Transformation Pipeline Architecture
        </h3>

        <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
          {pipelineSteps.map((step, idx) => (
            <div key={idx} className="pt-3 first:pt-0 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {step.status === 'completed' && (
                  <CheckCircle2 className="w-5 h-5 text-[#45cc42] mt-0.5 shrink-0" />
                )}
                {step.status === 'in_progress' && (
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0 animate-spin" />
                )}
                {step.status === 'pending' && (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{step.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{step.desc}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  step.status === 'completed'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : step.status === 'in_progress'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {step.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
