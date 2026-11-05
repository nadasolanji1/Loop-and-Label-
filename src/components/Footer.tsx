/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo, activeCampus } = useApp();

  return (
    <footer className="bg-[#252525] text-[#F7F3ED] py-14 border-t border-[#B3A49A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-[#F7F3ED]/15">
          <div className="space-y-3 max-w-sm">
            <span className="font-editorial text-3xl tracking-tight text-[#FFFCF8]">
              loop <span className="text-[#EADDDC] italic">&</span> label
            </span>
            <p className="text-xs text-[#F7F3ED]/70 leading-relaxed">
              Good style deserves another loop. The collegiate peer-to-peer fashion resale marketplace making circular style accessible and affordable on campus.
            </p>
            <div className="text-[11px] text-[#F7F3ED]/50 pt-1">
              Active Chapter: <strong className="text-[#EADDDC]">{activeCampus.name}</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs text-[#F7F3ED]/80">
            <div className="space-y-2.5">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-[#EADDDC] block">
                Marketplace
              </span>
              <button
                onClick={() => navigateTo('home')}
                className="block hover:text-[#EADDDC] transition-colors cursor-pointer"
              >
                Discover
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="block hover:text-[#EADDDC] transition-colors cursor-pointer"
              >
                Shop All Drops
              </button>
              <button
                onClick={() => navigateTo('loop-closet')}
                className="block hover:text-[#EADDDC] transition-colors cursor-pointer"
              >
                The Loop Closet
              </button>
              <button
                onClick={() => navigateTo('budget-style')}
                className="block hover:text-[#EADDDC] transition-colors cursor-pointer"
              >
                Style Within Budget
              </button>
            </div>

            <div className="space-y-2.5">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-[#EADDDC] block">
                Campus Loop
              </span>
              <button
                onClick={() => navigateTo('campus-loop')}
                className="block hover:text-[#EADDDC] transition-colors cursor-pointer"
              >
                University Hubs
              </button>
              <button
                onClick={() => navigateTo('sell')}
                className="block hover:text-[#EADDDC] transition-colors cursor-pointer"
              >
                List a Piece
              </button>
              <button
                onClick={() => navigateTo('profile')}
                className="block hover:text-[#EADDDC] transition-colors cursor-pointer"
              >
                Seller Dashboard
              </button>
            </div>

            <div className="space-y-2.5">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-[#EADDDC] block">
                Safety & Trust
              </span>
              <span className="block text-[#F7F3ED]/60">Designated Meetup Spots</span>
              <span className="block text-[#F7F3ED]/60">Student In-Person Check</span>
              <span className="block text-[#F7F3ED]/60">Zero Waste Packaging</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F7F3ED]/50 gap-4">
          <span>© {new Date().getFullYear()} Loop & Label Inc. Built for student campus life.</span>
          <span>Indiana University Bloomington Flagship · Expanding to Big Ten & peer universities</span>
        </div>
      </div>
    </footer>
  );
};
