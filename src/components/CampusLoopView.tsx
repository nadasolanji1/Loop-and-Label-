/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin,
  ShieldCheck,
  Flame,
  Trophy,
  Clock,
  Sparkles,
  ChevronRight,
  School,
  AlertCircle,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAMPUSES } from '../data/campuses';
import { ProductCard } from './ProductCard';

export const CampusLoopView: React.FC = () => {
  const {
    items,
    activeCampus,
    changeCampus,
    navigateTo,
  } = useApp();

  const [activeCampusTab, setActiveCampusTab] = useState<'all' | 'gameday' | 'just-listed'>(
    'all'
  );

  // Campus listings
  const campusListings = items.filter((i) => {
    if (i.status === 'sold') return false;
    return i.sellerUniversity === activeCampus.name;
  });

  // Game day specific for this campus
  const gameDayListings = campusListings.filter((i) => i.category === 'Game Day');

  // Just listed near this campus
  const justListedNearCampus = campusListings.filter((i) => i.isNewThisWeek || true).slice(0, 4);

  // Current displayed items based on tab
  const displayedItems =
    activeCampusTab === 'gameday'
      ? gameDayListings.length > 0
        ? gameDayListings
        : campusListings.slice(0, 4)
      : activeCampusTab === 'just-listed'
      ? justListedNearCampus
      : campusListings;

  return (
    <div className="bg-[#F7F3ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with Campus Banner */}
        <div className="pb-8 border-b border-[#B3A49A]/30">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#743C4A] mb-1">
                <School className="w-3.5 h-3.5" />
                <span>Hyperlocal Campus Fashion Network</span>
              </div>
              <h1 className="font-editorial text-3xl sm:text-5xl text-[#252525] tracking-tight">
                The Campus Loop
              </h1>
              <p className="text-xs sm:text-sm text-[#252525]/75 mt-1 max-w-xl">
                Swap, buy, and pass forward vintage wardrobe gems directly within your student community. Meet between lectures — zero shipping delays or packaging waste.
              </p>
            </div>

            {/* University Switcher Pill Matrix */}
            <div className="bg-[#FFFCF8] p-3 rounded-xs border border-[#B3A49A]/40">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#743C4A] block mb-2">
                Active University Hub
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CAMPUSES.map((camp) => (
                  <button
                    key={camp.id}
                    onClick={() => changeCampus(camp.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeCampus.id === camp.id
                        ? 'bg-[#743C4A] text-[#FFFCF8] border-[#743C4A] shadow-xs'
                        : 'bg-[#FFFCF8] text-[#252525] border-[#B3A49A]/30 hover:border-[#743C4A]'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: camp.primaryColor }}
                    />
                    <span>{camp.shortName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Campus Identity Showcase */}
        <div className="bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/40 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#EADDDC]/60 rounded-xs text-[#743C4A] text-xs font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>{activeCampus.city}, {activeCampus.state}</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#252525]">
              {activeCampus.name} Closet
            </h2>
            <p className="text-xs sm:text-sm text-[#252525]/75 max-w-lg">
              {campusListings.length} authentic pieces currently listed by students living in off-campus apartments, dorms, and Greek houses.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('sell')}
              className="px-5 py-2.5 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] transition-colors shadow-xs cursor-pointer"
            >
              List a Piece at {activeCampus.shortName}
            </button>
          </div>
        </div>

        {/* Safe Campus Meetup spots & Guidelines Card */}
        <div className="bg-[#EADDDC]/35 rounded-sm border border-[#B3A49A]/40 p-6 space-y-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#743C4A] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-editorial text-xl text-[#252525]">
                Public Campus Meetup Safety Constitution
              </h3>
              <p className="text-xs text-[#252525]/80 leading-relaxed">
                Loop & Label was founded on trusted peer-to-peer student exchanges. To ensure complete student safety, exchanges must occur in open, high-visibility public campus landmarks.
              </p>
            </div>
          </div>

          {/* Verified Safe Meetup Spots for this Campus */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#743C4A] block mb-2">
              Designated Safety Zones at {activeCampus.shortName}:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-[#252525]">
              {activeCampus.safeMeetupSpots.map((spot, i) => (
                <div
                  key={i}
                  className="p-2.5 bg-[#FFFCF8] rounded-xs border border-[#B3A49A]/30 flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#743C4A] shrink-0" />
                  <span className="truncate">{spot}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Demo Notice */}
          <div className="flex items-start gap-2 pt-2 text-[11px] text-[#252525]/70 border-t border-[#B3A49A]/30">
            <AlertCircle className="w-4 h-4 text-[#743C4A] shrink-0 mt-0.5" />
            <p>
              <strong>Safety Policy:</strong> Precise private residential locations (e.g. specific dorm room numbers or private apartment units) are never displayed. Student demo profiles illustrate campus interaction and are not officially university-affiliated or institutionally accredited.
            </p>
          </div>
        </div>

        {/* Campus Feed Filter Tabs */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#B3A49A]/30">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#252525]">
                Circulating at {activeCampus.shortName}
              </h2>
              <p className="text-xs text-[#252525]/70 mt-0.5">
                Pick up in person between lectures — no shipping fees.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCampusTab('all')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                  activeCampusTab === 'all'
                    ? 'bg-[#743C4A] text-[#FFFCF8]'
                    : 'bg-[#FFFCF8] text-[#252525]/80 border border-[#B3A49A]/30'
                }`}
              >
                All Campus Pieces ({campusListings.length})
              </button>
              <button
                onClick={() => setActiveCampusTab('gameday')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer flex items-center gap-1 ${
                  activeCampusTab === 'gameday'
                    ? 'bg-[#743C4A] text-[#FFFCF8]'
                    : 'bg-[#FFFCF8] text-[#252525]/80 border border-[#B3A49A]/30'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-[#743C4A]" />
                <span>Game Day Fits</span>
              </button>
              <button
                onClick={() => setActiveCampusTab('just-listed')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer flex items-center gap-1 ${
                  activeCampusTab === 'just-listed'
                    ? 'bg-[#743C4A] text-[#FFFCF8]'
                    : 'bg-[#FFFCF8] text-[#252525]/80 border border-[#B3A49A]/30'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-[#743C4A]" />
                <span>Just Listed</span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {displayedItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayedItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/30 p-8 max-w-md mx-auto">
              <School className="w-8 h-8 text-[#743C4A] mx-auto mb-3" />
              <h3 className="font-editorial text-2xl text-[#252525]">
                Be the First to List at {activeCampus.shortName}
              </h3>
              <p className="text-xs text-[#252525]/75 mt-1">
                No pieces currently in this filter. Clean out your closet and start the campus circular loop!
              </p>
              <button
                onClick={() => navigateTo('sell')}
                className="mt-4 px-5 py-2 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] cursor-pointer"
              >
                Create Listing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
