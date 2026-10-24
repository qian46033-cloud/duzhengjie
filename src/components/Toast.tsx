import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm pointer-events-none"
        >
          <div className="flex items-center gap-2.5 px-4 py-3 bg-zinc-950/95 border border-zinc-700/80 text-zinc-200 rounded shadow-2xl backdrop-blur-md">
            <div className="w-5 h-5 rounded-full bg-rose-950/80 border border-rose-800/80 flex items-center justify-center shrink-0">
              {type === 'success' ? (
                <Check className="w-3 h-3 text-rose-300" />
              ) : (
                <Info className="w-3 h-3 text-zinc-300" />
              )}
            </div>
            <span className="text-xs tracking-wide font-serif text-zinc-300">{message}</span>
            <span className="ml-1 text-[10px] text-zinc-600 font-mono">†</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
