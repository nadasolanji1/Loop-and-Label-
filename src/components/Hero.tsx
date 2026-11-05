/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, MapPin, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HERO_IMAGE } from '../data/mockData';

export const Hero: React.FC = () => {
  const { navigateTo, activeCampus } = useApp();

  return (
    <section className="relative bg-[#F7F3ED] overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-[#B3A49A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Campus Micro Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EADDDC]/70 border border-[#B3A49A]/40 rounded-full text-xs text-[#252525]">
              <MapPin className="w-3.5 h-3.5 text-[#743C4A]" />
              <span>Campus Resale Network</span>
              <span aria-hidden="true" className="text-[#B3A49A]">·</span>
              <strong className="text-[#743C4A] font-medium">{activeCampus.shortName}</strong>
            </div>

            {/* Editorial Title */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#252525] leading-[1.08]">
              Good style deserves <br />
              <span className="italic font-normal text-[#743C4A]">another loop.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#252525]/75 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The college fashion resale marketplace. Discover vintage gems, build campus outfit mood boards, and swap verified clothing in safe university spots between classes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#743C4A] text-[#FFFCF8] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#5E303B] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop Campus Closet</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('loop-closet')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FFFCF8] text-[#252525] border border-[#B3A49A]/50 text-xs font-semibold uppercase tracking-wider rounded-sm hover:border-[#743C4A] hover:text-[#743C4A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#743C4A]" />
                <span>The Loop Closet</span>
              </button>
            </div>

            {/* Micro Trust & Values Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#252525]/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#743C4A]" />
                <span>Designated Safety Zones</span>
              </div>
              <span className="hidden sm:inline text-[#B3A49A]">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#743C4A]" />
                <span>Zero Shipping Wait</span>
              </div>
              <span className="hidden sm:inline text-[#B3A49A]">·</span>
              <div className="flex items-center gap-1.5">
                <span>100% Student Curated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Editorial Lookbook Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-sm overflow-hidden border border-[#B3A49A]/40 shadow-xl bg-[#EADDDC]/40 relative">
                <img
                  src={HERO_IMAGE}
                  alt="Indiana University students campus fashion"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Editorial Quote Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#FFFCF8]/95 backdrop-blur-xs rounded-xs border border-[#B3A49A]/30 shadow-md">
                  <div className="flex items-center justify-between text-[11px] text-[#743C4A] font-semibold tracking-wider uppercase mb-0.5">
                    <span>Fall Drop Edition</span>
                    <span>{activeCampus.shortName}</span>
                  </div>
                  <p className="font-editorial text-base text-[#252525] italic leading-snug">
                    "Secondhand means your closet is constantly circulating, never wasteful."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
