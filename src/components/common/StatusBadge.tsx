import React from 'react';
import { motion } from 'motion/react';
import { ProjectStatus } from '../../types';
import { CheckCircle2, Clock, Loader2, Sparkles, Search, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const getStatusDetails = (status: ProjectStatus) => {
  switch (status) {
    case 'pending':
      return {
        label: 'Pending',
        percentage: 25,
        badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60',
        progressClass: 'bg-amber-500',
        icon: Clock,
        spin: false,
        pulse: false,
      };
    case 'researching':
      return {
        label: 'Researching',
        percentage: 50,
        badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/60 shadow-xs shadow-blue-500/10',
        progressClass: 'bg-blue-500',
        icon: Search,
        spin: true,
        pulse: true,
      };
    case 'generating':
      return {
        label: 'Generating',
        percentage: 75,
        badgeClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200/60 dark:border-purple-800/60 shadow-xs shadow-purple-500/10',
        progressClass: 'bg-purple-500',
        icon: Sparkles,
        spin: true,
        pulse: true,
      };
    case 'processing':
      return {
        label: 'Processing',
        percentage: 60,
        badgeClass: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/60 shadow-xs shadow-indigo-500/10',
        progressClass: 'bg-indigo-500',
        icon: Loader2,
        spin: true,
        pulse: true,
      };
    case 'completed':
      return {
        label: 'Completed',
        percentage: 100,
        badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
        progressClass: 'bg-[#45cc42]',
        icon: CheckCircle2,
        spin: false,
        pulse: false,
      };
    case 'failed':
      return {
        label: 'Failed',
        percentage: 0,
        badgeClass: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60',
        progressClass: 'bg-rose-500',
        icon: AlertCircle,
        spin: false,
        pulse: false,
      };
    default:
      return {
        label: String(status),
        percentage: 0,
        badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
        progressClass: 'bg-slate-400',
        icon: Clock,
        spin: false,
        pulse: false,
      };
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  showIcon = true,
}) => {
  const details = getStatusDetails(status);
  const IconComponent = details.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`relative inline-flex items-center font-bold uppercase tracking-wider rounded-full border shadow-2xs transition-colors ${details.badgeClass} ${sizeClasses}`}
    >
      {details.pulse && (
        <span className="absolute -inset-0.5 rounded-full bg-current opacity-20 animate-ping pointer-events-none" />
      )}
      {showIcon && (
        <IconComponent className={`${iconSizes} ${details.spin ? 'animate-spin' : ''}`} />
      )}
      <span>{details.label}</span>
    </motion.span>
  );
};
