/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Sparkles,
  Flame,
  BadgeDollarSign,
  Trophy,
  PartyPopper,
  Clock,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CuratedCollectionKey } from '../types';
import { CURATED_COLLECTIONS } from '../data/mockData';

interface CuratedCollectionsBarProps {
  onSelect?: (key: CuratedCollectionKey) => void;
  className?: string;
}

export const CuratedCollectionsBar: React.FC<CuratedCollectionsBarProps> = ({
  onSelect,
  className = '',
}) => {
  const {
    selectedCollectionFilter,
    setSelectedCollectionFilter,
    navigateTo,
    activeView,
    items,
    activeCampus,
  } = useApp();

  const getCollectionIcon = (key: CuratedCollectionKey) => {
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
        return <Compass className="w-3.5 h-3.5" />;
    }
  };

  const getCollectionCount = (key: CuratedCollectionKey): number => {
    switch (key) {
      case 'new-this-week':
        return items.filter((i) => i.isNewThisWeek).length;
      case 'trending-campus':
        return items.filter((i) => i.isFeatured && i.sellerUniversity === activeCampus.name).length || 6;
      case 'under-25':
        return items.filter((i) => i.price <= 25).length;
      case 'game-day':
        return items.filter((i) => i.category === 'Game Day').length;
      case 'going-out':
        return items.filter((i) => i.category === 'Going Out').length;
      case 'vintage-unique':
        return items.filter((i) => i.category === 'Vintage Finds').length;
      default:
        return items.length;
    }
  };

  const handleCollectionClick = (key: CuratedCollectionKey) => {
    if (activeView !== 'shop') {
      navigateTo('shop', undefined, key);
    } else {
      setSelectedCollectionFilter(key);
      if (onSelect) onSelect(key);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => handleCollectionClick('all')}
          className={`px-3.5 py-2 text-xs font-medium rounded-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer ${
            selectedCollectionFilter === 'all'
              ? 'bg-[#743C4A] text-[#FFFCF8] shadow-xs'
              : 'bg-[#FFFCF8] text-[#252525] border border-[#B3A49A]/30 hover:border-[#743C4A]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>All Curations</span>
          <span className="font-mono text-[11px] opacity-70">({items.length})</span>
        </button>

        {CURATED_COLLECTIONS.map((col) => {
          const isSelected = selectedCollectionFilter === col.key;
          const count = getCollectionCount(col.key);

          return (
            <button
              key={col.key}
              onClick={() => handleCollectionClick(col.key)}
              className={`px-3.5 py-2 text-xs font-medium rounded-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-[#743C4A] text-[#FFFCF8] shadow-xs'
                  : 'bg-[#FFFCF8] text-[#252525] border border-[#B3A49A]/30 hover:border-[#743C4A]'
              }`}
            >
              <span className={isSelected ? 'text-[#FFFCF8]' : 'text-[#743C4A]'}>
                {getCollectionIcon(col.key)}
              </span>
              <span>{col.title}</span>
              <span className="font-mono text-[11px] opacity-70">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
