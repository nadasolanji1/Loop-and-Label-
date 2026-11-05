/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#FFFCF8] border border-[#B3A49A]/50 shadow-xl rounded-sm p-3.5 flex items-start gap-3 transition-all animate-slide-up"
        >
          {toast.type === 'success' && (
            <CheckCircle className="w-4 h-4 text-[#743C4A] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-4 h-4 text-[#743C4A] shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}

          <p className="text-xs text-[#252525] flex-1 leading-snug">
            {toast.message}
          </p>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-[#252525]/40 hover:text-[#252525] p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
