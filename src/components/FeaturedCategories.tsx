/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { Category } from '../types';

export const FeaturedCategories: React.FC = () => {
  const { navigateTo } = useApp();

  const handleCategoryClick = (categoryName: Category) => {
    navigateTo('shop', categoryName);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F7F3ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#B3A49A]/30 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#743C4A] block mb-1">
              Curated Departments
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#252525] tracking-tight">
              Shop by Campus Aesthetic
            </h2>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-1.5 text-sm font-medium text-[#743C4A] hover:text-[#5E303B] transition-colors group cursor-pointer"
          >
            <span>Explore All Pieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="group cursor-pointer flex flex-col bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/30 overflow-hidden hover:border-[#743C4A]/60 transition-all shadow-2xs hover:shadow-md"
            >
              <div className="aspect-[4/5] bg-[#EADDDC]/40 overflow-hidden relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
                <span className="absolute bottom-2 right-2 bg-[#FFFCF8]/90 text-[#252525] text-[10px] font-mono px-1.5 py-0.5 rounded-xs">
                  {category.count}+ pieces
                </span>
              </div>

              <div className="p-3 text-left">
                <h3 className="text-xs font-semibold text-[#252525] group-hover:text-[#743C4A] transition-colors">
                  {category.name}
                </h3>
                <p className="text-[11px] text-[#252525]/60 mt-0.5 line-clamp-1">
                  {category.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
