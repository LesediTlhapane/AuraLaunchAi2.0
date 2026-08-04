import React from 'react';
import { useProjects } from '../context/ProjectContext';
import { FileQuestion, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setActiveTab } = useProjects();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">404 - Resource Not Found</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
        The pipeline project or page view you requested does not exist or was removed.
      </p>
      <button
        onClick={() => setActiveTab('dashboard')}
        className="px-6 py-2.5 rounded-xl bg-[#052b66] dark:bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-[#0a3d8f] transition flex items-center gap-2"
      >
        <Home className="w-4 h-4 text-[#45cc42]" /> Return to Dashboard
      </button>
    </div>
  );
};
