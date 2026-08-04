import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProjects } from '../../context/ProjectContext';
import { IndustryType } from '../../types';
import { Sparkles, Instagram, Building2, Layers, FileText, X, Loader2 } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INDUSTRIES: IndustryType[] = [
  'Hospitality & Dining',
  'E-commerce & Retail',
  'Fitness & Wellness',
  'Creative Studio',
  'Real Estate',
  'Beauty & Salon',
  'Coaching & Consulting',
  'Other Services',
];

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose }) => {
  const { createProject } = useProjects();

  const [businessName, setBusinessName] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [industry, setIndustry] = useState<IndustryType>('Hospitality & Dining');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setErrorMsg('Please enter a business name.');
      return;
    }
    if (!instagramUrl.trim()) {
      setErrorMsg('Please provide an Instagram profile URL or handle.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await createProject({
        businessName: businessName.trim(),
        instagramUrl: instagramUrl.trim(),
        industry,
        notes: notes.trim(),
      });
      setIsSubmitting(false);
      setBusinessName('');
      setInstagramUrl('');
      setNotes('');
      onClose();
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Failed to create project. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          {/* Modal Header */}
          <div className="bg-[#052b66] p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-blue-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#45cc42] text-[#052b66]">
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
              </span>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Create New AI Transformation Project</h2>
                <p className="text-xs text-blue-200/80 mt-0.5">
                  Convert an Instagram profile into a structured website package
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Business Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Business Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Koa & Coast Coffee Co."
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
                />
              </div>
            </div>

            {/* Instagram URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Instagram Profile URL / Handle <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Instagram className="w-4 h-4 text-pink-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="https://instagram.com/business_name or @business_name"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
                />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Industry Sector
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value as IndustryType)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Project Notes (Optional)
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <textarea
                  rows={3}
                  placeholder="Additional context, target location, or key features to prioritize..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#052b66]"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-bold text-[#052b66] bg-[#45cc42] hover:bg-[#3ebe3b] rounded-xl shadow-md shadow-[#45cc42]/20 flex items-center gap-2 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Project</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
