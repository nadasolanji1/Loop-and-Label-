/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Compass,
  ShoppingBag,
  Layers,
  School,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileNav: React.FC = () => {
  const { activeView, navigateTo } = useApp();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#FFFCF8]/95 backdrop-blur-md border-t border-[#B3A49A]/30 py-2 px-3 flex items-center justify-around">
      <button
        onClick={() => navigateTo('home')}
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          activeView === 'home' ? 'text-[#743C4A]' : 'text-[#252525]/60'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>Discover</span>
      </button>

      <button
        onClick={() => navigateTo('shop')}
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          activeView === 'shop' ? 'text-[#743C4A]' : 'text-[#252525]/60'
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Shop</span>
      </button>

      <button
        onClick={() => navigateTo('loop-closet')}
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          activeView === 'loop-closet' ? 'text-[#743C4A]' : 'text-[#252525]/60'
        }`}
      >
        <Layers className="w-5 h-5" />
        <span>Outfits</span>
      </button>

      <button
        onClick={() => navigateTo('campus-loop')}
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          activeView === 'campus-loop' ? 'text-[#743C4A]' : 'text-[#252525]/60'
        }`}
      >
        <School className="w-5 h-5" />
        <span>Campus</span>
      </button>

      <button
        onClick={() => navigateTo('profile')}
        className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
          activeView === 'profile' ? 'text-[#743C4A]' : 'text-[#252525]/60'
        }`}
      >
        <User className="w-5 h-5" />
        <span>Closet</span>
      </button>
    </nav>
  );
};
