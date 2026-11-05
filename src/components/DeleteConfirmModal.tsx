/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DeleteConfirmModal: React.FC = () => {
  const { itemToDelete, cancelDeleteListing, confirmDeleteListing } = useApp();

  if (!itemToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="fixed inset-0" onClick={cancelDeleteListing} aria-hidden="true" />

      <div className="relative bg-[#FFFCF8] w-full max-w-md rounded-sm border border-[#B3A49A]/40 shadow-2xl p-6 z-10 space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="font-editorial text-2xl text-[#252525]">
          Delete This Listing?
        </h3>

        <p className="text-xs text-[#252525]/75">
          Are you sure you want to remove <strong>"{itemToDelete.title}"</strong> from your campus storefront? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-3 pt-3">
          <button
            onClick={cancelDeleteListing}
            className="px-4 py-2 border border-[#B3A49A]/40 text-xs rounded-xs text-[#252525] hover:bg-[#F7F3ED]"
          >
            Keep Listing
          </button>
          <button
            onClick={confirmDeleteListing}
            className="px-5 py-2 bg-red-700 text-white text-xs rounded-xs font-medium hover:bg-red-800"
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};
