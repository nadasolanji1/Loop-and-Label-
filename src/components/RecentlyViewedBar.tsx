/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { History, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const RecentlyViewedBar: React.FC = () => {
  const { items, recentlyViewedIds, clearRecentlyViewed } = useApp();

  const recentItems = recentlyViewedIds
    .map((id) => items.find((i) => i.id === id))
    .filter((it): it is typeof items[0] => Boolean(it))
    .slice(0, 4);

  if (recentItems.length === 0) return null;

  return (
    <section className="py-10 bg-[#F7F3ED] border-t border-[#B3A49A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#B3A49A]/20">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#743C4A]" />
            <h3 className="font-editorial text-2xl text-[#252525]">
              Recently Inspected
            </h3>
            <span className="text-[11px] text-[#252525]/50 font-mono">
              ({recentItems.length})
            </span>
          </div>

          <button
            onClick={clearRecentlyViewed}
            className="text-xs text-[#252525]/50 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear History</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {recentItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
