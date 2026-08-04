import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let bgColor = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100';
          let icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;

          if (toast.type === 'success') {
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
          } else if (toast.type === 'error') {
            icon = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
          } else if (toast.type === 'warning') {
            icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start gap-3 glass-panel ${bgColor}`}
            >
              {icon}
              <div className="flex-1 text-sm">
                <p className="font-semibold text-slate-900 dark:text-white">{toast.title}</p>
                {toast.description && (
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
