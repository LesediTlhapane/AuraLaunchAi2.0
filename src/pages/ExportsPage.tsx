import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { useToast } from '../context/ToastContext';
import { Download, Copy, Check, Bot, Code2, FileText, Sparkles, FolderKanban } from 'lucide-react';

export const ExportsPage: React.FC = () => {
  const { projects, activeProjectId } = useProjects();
  const { addToast } = useToast();
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(activeProjectId || projects[0]?.id || null);

  const selectedProject = projects.find((p) => p.id === (selectedProjectId || activeProjectId)) || projects[0];

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    addToast('success', 'Copied to Clipboard', `Copied ${type}`);
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    addToast('success', 'Download Triggered', `Saved ${filename}`);
  };

  if (!selectedProject) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No export packages found.</p>
      </div>
    );
  }

  const promptText = `Create a responsive website for ${selectedProject.businessName} in the ${selectedProject.industry} sector. Primary color ${selectedProject.branding.primaryColor}, accent green ${selectedProject.branding.secondaryColor}. Hero headline: "${selectedProject.generatedCopy.heroHeadline}". Include hero, about story, services grid, gallery, and contact footer.`;

  const jsonText = JSON.stringify({
    businessName: selectedProject.businessName,
    industry: selectedProject.industry,
    branding: selectedProject.branding,
    copy: selectedProject.generatedCopy,
  }, null, 2);

  const markdownText = `# ${selectedProject.businessName} Website Spec\n\n## Overview\n- Business Name: ${selectedProject.businessName}\n- Industry: ${selectedProject.industry}\n- Primary Color: ${selectedProject.branding.primaryColor}\n\n## Hero\nHeadline: ${selectedProject.generatedCopy.heroHeadline}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header & Project Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#052b66] dark:text-[#45cc42]">
            AI Prompt & Artifact Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Generated Export Packages
          </h1>
        </div>

        {/* Project Selector Dropdown */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <FolderKanban className="w-4 h-4 text-[#052b66] dark:text-blue-400" />
          <select
            value={selectedProject.id}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-900 dark:text-white outline-none"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.businessName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Loveable Prompt */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Loveable & Framer Prompt</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Engineered natural language prompt designed to build websites with AI coding platforms.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300 max-h-36 overflow-y-auto">
              {promptText}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => handleCopy(promptText, 'Loveable Prompt')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs hover:bg-[#0a3d8f] transition flex items-center justify-center gap-1.5"
            >
              {copiedType === 'Loveable Prompt' ? <Check className="w-4 h-4 text-[#45cc42]" /> : <Copy className="w-4 h-4" />}
              <span>Copy Prompt</span>
            </button>
            <button
              onClick={() => handleDownload(promptText, `${selectedProject.businessName}_prompt.txt`)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* JSON Export */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Structured JSON Export</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Schema payload containing design tokens, business profiles, and extracted copy.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 text-[#45cc42] font-mono text-[10px] max-h-36 overflow-y-auto">
              {jsonText}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => handleCopy(jsonText, 'JSON Export')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs hover:bg-[#0a3d8f] transition flex items-center justify-center gap-1.5"
            >
              {copiedType === 'JSON Export' ? <Check className="w-4 h-4 text-[#45cc42]" /> : <Copy className="w-4 h-4" />}
              <span>Copy JSON</span>
            </button>
            <button
              onClick={() => handleDownload(jsonText, `${selectedProject.businessName}_spec.json`)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Markdown Export */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Markdown Spec Sheet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Comprehensive Markdown documentation formatted for team review and design handoff.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300 max-h-36 overflow-y-auto">
              {markdownText}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => handleCopy(markdownText, 'Markdown Document')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs hover:bg-[#0a3d8f] transition flex items-center justify-center gap-1.5"
            >
              {copiedType === 'Markdown Document' ? <Check className="w-4 h-4 text-[#45cc42]" /> : <Copy className="w-4 h-4" />}
              <span>Copy Markdown</span>
            </button>
            <button
              onClick={() => handleDownload(markdownText, `${selectedProject.businessName}_doc.md`)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
