/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, MapPin, Repeat, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { activeCampus } = useApp();

  const steps = [
    {
      icon: <Camera className="w-5 h-5 text-[#743C4A]" />,
      step: '01',
      title: 'List in 2 Minutes',
      description:
        'Snap 3 photos of unworn clothing, add size, condition, and price right from your phone.',
    },
    {
      icon: <Repeat className="w-5 h-5 text-[#743C4A]" />,
      step: '02',
      title: 'Browse Campus Closets',
      description:
        'Discover trending fashion, build outfit boards, and chat with sellers attending your university.',
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#743C4A]" />,
      step: '03',
      title: 'Exchange In-Person',
      description: `Meet at verified safety spots like ${activeCampus.safeMeetupSpots[0].split('—')[0].trim()} between classes.`,
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#743C4A]" />,
      step: '04',
      title: 'Loop It Forward',
      description:
        'Keep college fashion circular, save hundreds per semester, and eliminate packaging waste.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FFFCF8] border-t border-[#B3A49A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#743C4A]">
            Circular Campus Resale
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#252525] tracking-tight">
            How Loop & Label Works
          </h2>
          <p className="text-xs sm:text-sm text-[#252525]/75 leading-relaxed">
            A safe, hyper-local fashion loop designed specifically for the rhythm of college life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.step}
              className="p-6 bg-[#F7F3ED]/60 rounded-sm border border-[#B3A49A]/30 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xs bg-[#FFFCF8] border border-[#B3A49A]/30 flex items-center justify-center shadow-2xs">
                  {st.icon}
                </div>
                <span className="font-mono text-xs font-bold text-[#743C4A]/60">
                  {st.step}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl text-[#252525]">
                  {st.title}
                </h3>
                <p className="text-xs text-[#252525]/70 leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
