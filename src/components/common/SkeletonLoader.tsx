import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs animate-pulse">
    <div className="flex items-center justify-between">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16"></div>
    </div>
    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mt-4"></div>
    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mt-2"></div>
    <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-24"></div>
    </div>
  </div>
);

export const SkeletonTable: React.FC = () => (
  <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs animate-pulse space-y-4">
    <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
    <div className="h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xl w-full"></div>
    <div className="h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xl w-full"></div>
    <div className="h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xl w-full"></div>
  </div>
);
