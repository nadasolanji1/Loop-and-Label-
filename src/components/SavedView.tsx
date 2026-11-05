/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const SavedView: React.FC = () => {
  const { items, savedItemIds, navigateTo } = useApp();

  const savedItems = items.filter((item) => savedItemIds.includes(item.id));

  return (
    <div className="bg-[#F7F3ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-[#B3A49A]/30 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#743C4A] mb-1">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Personal Wishlist</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#252525]">
              Saved Pieces
            </h1>
            <p className="text-xs sm:text-sm text-[#252525]/70 mt-1">
              Garments you're watching for campus drops and price reductions.
            </p>
          </div>

          <span className="text-xs text-[#252525]/70 font-mono">
            {savedItems.length} {savedItems.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        {savedItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {savedItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#EADDDC] text-[#743C4A] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#252525]">No Saved Pieces Yet</h3>
            <p className="text-xs text-[#252525]/70">
              Browse the campus closet and tap the heart icon on any piece to save it for later.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="mt-3 px-5 py-2.5 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] transition-colors cursor-pointer"
            >
              Explore Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
