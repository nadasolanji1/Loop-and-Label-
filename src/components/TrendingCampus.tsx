/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Flame, Clock, BadgeDollarSign, Trophy, PartyPopper } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { CuratedCollectionKey } from '../types';
import { CURATED_COLLECTIONS } from '../data/mockData';
import { PersonalizedRecommendations } from './PersonalizedRecommendations';
import { RecentlyViewedBar } from './RecentlyViewedBar';

export const TrendingCampus: React.FC = () => {
  const { items, activeCampus, navigateTo, selectedCollectionFilter, setSelectedCollectionFilter } = useApp();
  const [activeTab, setActiveTab] = useState<CuratedCollectionKey>('trending-campus');

  // Filter items based on the active collection tab on Discover
  const collectionFilteredItems = items.filter((item) => {
    if (item.status === 'sold') return false;
    switch (activeTab) {
      case 'new-this-week':
        return item.isNewThisWeek;
      case 'trending-campus':
        return item.isFeatured || item.sellerUniversity === activeCampus.name;
      case 'under-25':
        return item.price <= 25;
      case 'game-day':
        return item.category === 'Game Day';
      case 'going-out':
        return item.category === 'Going Out';
      case 'vintage-unique':
        return item.category === 'Vintage Finds';
      default:
        return true;
    }
  });

  const displayItems = collectionFilteredItems.slice(0, 8);

  const getTabIcon = (key: CuratedCollectionKey) => {
    switch (key) {
      case 'new-this-week':
        return <Clock className="w-3.5 h-3.5" />;
      case 'trending-campus':
        return <Flame className="w-3.5 h-3.5" />;
      case 'under-25':
        return <BadgeDollarSign className="w-3.5 h-3.5" />;
      case 'game-day':
        return <Trophy className="w-3.5 h-3.5" />;
      case 'going-out':
        return <PartyPopper className="w-3.5 h-3.5" />;
      case 'vintage-unique':
        return <Sparkles className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const handleTabClick = (key: CuratedCollectionKey) => {
    setActiveTab(key);
  };

  const handleViewAllInShop = () => {
    setSelectedCollectionFilter(activeTab);
    navigateTo('shop', undefined, activeTab);
  };

  return (
    <>
      <section className="py-12 sm:py-16 bg-[#F7F3ED] border-t border-[#B3A49A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-[#B3A49A]/30 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#743C4A] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Campus Drops</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#252525] tracking-tight">
                Discover Fresh Closets at {activeCampus.shortName}
              </h2>
              <p className="text-xs sm:text-sm text-[#252525]/70 mt-1 max-w-xl">
                Trending styles, game day fits, and under-$25 steals curated directly from peer students.
              </p>
            </div>

            <button
              onClick={handleViewAllInShop}
              className="flex items-center gap-1.5 text-sm font-medium text-[#743C4A] hover:text-[#5E303B] transition-colors group cursor-pointer shrink-0"
            >
              <span>Explore All in Shop</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Curated Collection Switcher Tabs */}
          <div className="mb-8 overflow-x-auto scrollbar-none pb-2">
            <div className="flex items-center gap-2 min-w-max">
              {CURATED_COLLECTIONS.map((col) => {
                const isActive = activeTab === col.key;
                return (
                  <button
                    key={col.key}
                    onClick={() => handleTabClick(col.key)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-xs transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#743C4A] text-[#FFFCF8] shadow-xs'
                        : 'bg-[#FFFCF8] text-[#252525]/85 border border-[#B3A49A]/30 hover:border-[#743C4A]'
                    }`}
                  >
                    <span className={isActive ? 'text-[#FFFCF8]' : 'text-[#743C4A]'}>
                      {getTabIcon(col.key)}
                    </span>
                    <span>{col.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial Masonry Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayItems.map((item) => (
              <ProductCard key={item.id} item={item} layoutVariant="editorial" />
            ))}
          </div>

          {/* Quick See More Trigger */}
          <div className="mt-8 text-center">
            <button
              onClick={handleViewAllInShop}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FFFCF8] border border-[#743C4A] text-[#743C4A] hover:bg-[#743C4A] hover:text-[#FFFCF8] text-xs font-medium rounded-xs transition-colors cursor-pointer shadow-xs"
            >
              <span>Browse All {collectionFilteredItems.length} Pieces in this Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Banner */}
          <div className="mt-12 p-6 sm:p-8 bg-[#EADDDC]/45 border border-[#B3A49A]/40 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-editorial text-2xl text-[#252525]">
                Have unworn pieces sitting in your dorm or apartment closet?
              </h3>
              <p className="text-sm text-[#252525]/75">
                Snap 3 quick photos, set your price, and arrange a safe exchange at {activeCampus.shortName} between classes.
              </p>
            </div>
            <button
              onClick={() => navigateTo('sell')}
              className="px-6 py-3 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-sm hover:bg-[#5E303B] transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-xs"
            >
              Create a Listing
            </button>
          </div>
        </div>
      </section>

      {/* Tailored Personalized Recommendations Section */}
      <PersonalizedRecommendations />

      {/* Recently Viewed Shelf */}
      <RecentlyViewedBar />
    </>
  );
};
