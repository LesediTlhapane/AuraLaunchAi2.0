import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6"
        >
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${isDanger ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{message}</p>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            >
              {cancelLabel}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onCancel();
              }}
              className={`px-4 py-2 text-sm font-medium text-white rounded-xl shadow-md transition ${
                isDanger
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
                  : 'bg-[#052b66] hover:bg-[#0a3d8f] shadow-blue-500/20'
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
