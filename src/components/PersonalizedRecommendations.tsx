/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Sliders, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { StylePreference } from '../types';

export const PersonalizedRecommendations: React.FC = () => {
  const { items, savedItemIds, stylePreferences, toggleStylePreference } = useApp();

  const allStyles: StylePreference[] = [
    'Minimalist',
    'Vintage 90s',
    'Collegiate',
    'Night Out',
    'Athleisure',
  ];

  const savedItems = items.filter((i) => savedItemIds.includes(i.id));
  const savedCategories = new Set(savedItems.map((i) => i.category));

  const recommendedItems = items
    .filter((item) => {
      if (item.status === 'sold') return false;
      const hasStyleMatch = item.styles?.some((s) => stylePreferences.includes(s));
      const hasCategoryMatch = savedCategories.has(item.category);
      return hasStyleMatch || hasCategoryMatch;
    })
    .slice(0, 4);

  const displayItems =
    recommendedItems.length >= 2
      ? recommendedItems
      : items.filter((i) => i.isFeatured && i.status !== 'sold').slice(0, 4);

  return (
    <section className="py-10 bg-[#FFFCF8] border-y border-[#B3A49A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-[#B3A49A]/20 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#743C4A] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Curation</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#252525] tracking-tight">
              Curated for Your Taste
            </h2>
            <p className="text-xs text-[#252525]/70 mt-1">
              Personalized campus drops matching your saved pieces and chosen style aesthetics.
            </p>
          </div>

          {/* Style Preferences Selector */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[#252525]/60 text-[11px] font-medium mr-1 flex items-center gap-1">
              <Sliders className="w-3 h-3 text-[#743C4A]" />
              Aesthetic:
            </span>
            {allStyles.map((style) => {
              const isSelected = stylePreferences.includes(style);
              return (
                <button
                  key={style}
                  onClick={() => toggleStylePreference(style)}
                  className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-[#EADDDC] text-[#743C4A] border-[#743C4A] font-medium'
                      : 'bg-[#FFFCF8] text-[#252525]/75 border-[#B3A49A]/30 hover:border-[#743C4A]'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-[#743C4A]" />}
                  <span>{style}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {displayItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
