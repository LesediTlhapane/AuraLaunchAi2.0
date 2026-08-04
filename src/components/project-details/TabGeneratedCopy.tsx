import React, { useState } from 'react';
import { Project, GeneratedCopySection } from '../../types';
import { useProjects } from '../../context/ProjectContext';
import { Sparkles, FileText, ChevronDown, Save, CheckCircle2, Search } from 'lucide-react';

interface TabGeneratedCopyProps {
  project: Project;
}

export const TabGeneratedCopy: React.FC<TabGeneratedCopyProps> = ({ project }) => {
  const { updateProject } = useProjects();
  const [copy, setCopy] = useState<GeneratedCopySection>(project.generatedCopy);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateProject(project.id, { generatedCopy: copy });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Save Action */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#45cc42]" />
            Generated Website Copy & SEO
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Structured copy generated from Instagram caption context & brand parameters.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-[#0a3d8f] transition flex items-center gap-2"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-[#45cc42]" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Saved Copy!' : 'Save All Copy'}</span>
        </button>
      </div>

      {/* Hero Section Copy */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#052b66] dark:text-blue-400 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <FileText className="w-4 h-4" /> 1. Hero Section Copy
        </h4>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Hero Headline
          </label>
          <input
            type="text"
            value={copy.heroHeadline}
            onChange={(e) => setCopy({ ...copy, heroHeadline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#052b66]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Hero Subheadline
          </label>
          <textarea
            rows={2}
            value={copy.heroSubheadline}
            onChange={(e) => setCopy({ ...copy, heroSubheadline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
          />
        </div>
      </div>

      {/* About Section Copy */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#052b66] dark:text-blue-400 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <FileText className="w-4 h-4" /> 2. About & Brand Story
        </h4>

        <textarea
          rows={3}
          value={copy.aboutText}
          onChange={(e) => setCopy({ ...copy, aboutText: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
        />
      </div>

      {/* Services Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#052b66] dark:text-blue-400 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <FileText className="w-4 h-4" /> 3. Services & Offerings Cards
        </h4>

        <div className="space-y-3">
          {copy.servicesList.map((srv, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
              <input
                type="text"
                value={srv.title}
                onChange={(e) => {
                  const updated = [...copy.servicesList];
                  updated[idx].title = e.target.value;
                  setCopy({ ...copy, servicesList: updated });
                }}
                className="w-full font-bold text-sm bg-transparent text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1 outline-none"
              />
              <textarea
                rows={2}
                value={srv.description}
                onChange={(e) => {
                  const updated = [...copy.servicesList];
                  updated[idx].description = e.target.value;
                  setCopy({ ...copy, servicesList: updated });
                }}
                className="w-full text-xs bg-transparent text-slate-600 dark:text-slate-300 outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#052b66] dark:text-blue-400 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <FileText className="w-4 h-4" /> 4. Call-To-Action (CTA) Section
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              CTA Headline
            </label>
            <input
              type="text"
              value={copy.ctaHeadline}
              onChange={(e) => setCopy({ ...copy, ctaHeadline: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Button Action Text
            </label>
            <input
              type="text"
              value={copy.ctaButtonText}
              onChange={(e) => setCopy({ ...copy, ctaButtonText: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-[#052b66] dark:text-[#45cc42]"
            />
          </div>
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#052b66] dark:text-blue-400 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <FileText className="w-4 h-4" /> 5. Frequently Asked Questions
        </h4>

        <div className="space-y-2">
          {copy.faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left font-semibold text-xs text-slate-800 dark:text-slate-200"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 transition ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SEO Metadata Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#45cc42] flex items-center gap-2">
          <Search className="w-4 h-4" /> SEO Metadata Preview
        </h4>

        <div className="bg-white text-slate-900 p-4 rounded-xl space-y-1 font-sans">
          <p className="text-xs text-slate-500 truncate">{project.businessInfo.websiteUrl || 'https://example.com'}</p>
          <p className="text-base font-bold text-blue-800 hover:underline cursor-pointer">{copy.seoMeta.title}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{copy.seoMeta.description}</p>
        </div>
      </div>
    </div>
  );
};
