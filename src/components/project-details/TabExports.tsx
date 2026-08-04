import React, { useState } from 'react';
import { Project } from '../../types';
import { useToast } from '../../context/ToastContext';
import { Download, Copy, Check, Sparkles, Code2, FileText, Bot } from 'lucide-react';

interface TabExportsProps {
  project: Project;
}

export const TabExports: React.FC<TabExportsProps> = ({ project }) => {
  const { addToast } = useToast();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const exports = project.exports || {
    id: `exp_${project.id}`,
    projectId: project.id,
    loveablePrompt: `Create a responsive website for ${project.businessName} in the ${project.industry} industry. Primary color ${project.branding.primaryColor}, accent green ${project.branding.secondaryColor}. Hero Headline: "${project.generatedCopy.heroHeadline}". Include hero section, story section, services grid, image gallery, and contact footer.`,
    jsonExport: JSON.stringify({
      businessName: project.businessName,
      industry: project.industry,
      instagramUrl: project.instagramUrl,
      branding: project.branding,
      copy: project.generatedCopy,
      mediaCount: project.media.length,
    }, null, 2),
    markdownExport: `# ${project.businessName} Website Specification\n\n## Overview\n- **Business Name:** ${project.businessName}\n- **Industry:** ${project.industry}\n- **Primary Color:** ${project.branding.primaryColor}\n- **Accent Color:** ${project.branding.secondaryColor}\n\n## Hero Section\n- **Headline:** ${project.generatedCopy.heroHeadline}\n- **Subheadline:** ${project.generatedCopy.heroSubheadline}\n\n## Services\n${project.generatedCopy.servicesList.map(s => `- **${s.title}:** ${s.description}`).join('\n')}`,
    createdAt: new Date().toISOString(),
    downloadCount: 0,
  };

  const handleCopy = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    addToast('success', 'Copied to Clipboard', `Copied ${type} specification.`);
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
    addToast('success', 'Download Started', `Downloaded ${filename}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#45cc42]" />
            AI Generator Export Packages
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Structured prompts, JSON specifications, and Markdown docs ready to feed into AI website builders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Loveable / Framer Prompt */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">Loveable & Framer Prompt</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Optimized natural language prompt engineered for AI code generation agents.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300 max-h-36 overflow-y-auto">
              {exports.loveablePrompt}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => handleCopy(exports.loveablePrompt, 'Loveable Prompt')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs hover:bg-[#0a3d8f] transition flex items-center justify-center gap-1.5"
            >
              {copiedType === 'Loveable Prompt' ? <Check className="w-4 h-4 text-[#45cc42]" /> : <Copy className="w-4 h-4" />}
              <span>Copy Prompt</span>
            </button>
            <button
              onClick={() => handleDownload(exports.loveablePrompt, `${project.businessName}_prompt.txt`)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Structured JSON Export */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">Structured JSON Export</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Schema-validated JSON payload ready for direct API consumption & webhooks.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 text-[#45cc42] font-mono text-[10px] max-h-36 overflow-y-auto">
              {exports.jsonExport}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => handleCopy(exports.jsonExport, 'JSON Export')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs hover:bg-[#0a3d8f] transition flex items-center justify-center gap-1.5"
            >
              {copiedType === 'JSON Export' ? <Check className="w-4 h-4 text-[#45cc42]" /> : <Copy className="w-4 h-4" />}
              <span>Copy JSON</span>
            </button>
            <button
              onClick={() => handleDownload(exports.jsonExport, `${project.businessName}_spec.json`)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Markdown Documentation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">Markdown Spec Sheet</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Human-readable specification document for designers, developers and copywriters.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300 max-h-36 overflow-y-auto">
              {exports.markdownExport}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => handleCopy(exports.markdownExport, 'Markdown Document')}
              className="flex-1 py-2 px-3 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs hover:bg-[#0a3d8f] transition flex items-center justify-center gap-1.5"
            >
              {copiedType === 'Markdown Document' ? <Check className="w-4 h-4 text-[#45cc42]" /> : <Copy className="w-4 h-4" />}
              <span>Copy Markdown</span>
            </button>
            <button
              onClick={() => handleDownload(exports.markdownExport, `${project.businessName}_doc.md`)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
