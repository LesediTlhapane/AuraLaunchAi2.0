import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Folder, Image, FileText, Settings, User, Plus, X } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { ActiveTab } from '../../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({ isOpen, onClose }) => {
  const { projects, setActiveTab, setActiveProjectId, setIsNewProjectModalOpen } = useProjects();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProjects = projects.filter(
    (p) =>
      p.businessName.toLowerCase().includes(query.toLowerCase()) ||
      p.instagramUrl.toLowerCase().includes(query.toLowerCase()) ||
      p.industry.toLowerCase().includes(query.toLowerCase())
  );

  const navigateToTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
  };

  const selectProject = (id: string) => {
    setActiveProjectId(id);
    setActiveTab('projects');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
          {/* Header input */}
          <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800 gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search projects, media, settings, or commands... (Cmd + K)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none"
            />
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results list */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-4">
            {/* Quick Actions */}
            <div>
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Quick Navigation
              </p>
              <div className="space-y-0.5 mt-1">
                <button
                  onClick={() => {
                    setIsNewProjectModalOpen(true);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-left transition"
                >
                  <Plus className="w-4 h-4 text-[#45cc42]" />
                  <span>Create New Project</span>
                </button>
                <button
                  onClick={() => navigateToTab('media')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-left transition"
                >
                  <Image className="w-4 h-4 text-blue-500" />
                  <span>Media Library</span>
                </button>
                <button
                  onClick={() => navigateToTab('exports')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-left transition"
                >
                  <FileText className="w-4 h-4 text-purple-500" />
                  <span>Exports & AI Prompts</span>
                </button>
                <button
                  onClick={() => navigateToTab('settings')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-left transition"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Settings & API Keys</span>
                </button>
                <button
                  onClick={() => navigateToTab('profile')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-left transition"
                >
                  <User className="w-4 h-4 text-emerald-500" />
                  <span>Account Profile</span>
                </button>
              </div>
            </div>

            {/* Projects list */}
            <div>
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Projects ({filteredProjects.length})
              </p>
              <div className="space-y-0.5 mt-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => selectProject(p.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-left transition"
                  >
                    <div className="flex items-center gap-3">
                      <Folder className="w-4 h-4 text-[#052b66] dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{p.businessName}</p>
                        <p className="text-xs text-slate-400">{p.businessInfo.instagramHandle}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {p.industry}
                    </span>
                  </button>
                ))}

                {filteredProjects.length === 0 && (
                  <p className="text-center py-4 text-xs text-slate-400">No matching projects found.</p>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Tip: Navigate with arrow keys or enter</span>
            <span>Esc to close</span>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
