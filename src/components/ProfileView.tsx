/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  User,
  MapPin,
  Star,
  CheckCircle,
  Plus,
  Heart,
  Package,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SellerDashboard } from './SellerDashboard';

export const ProfileView: React.FC = () => {
  const { activeCampus, openSellModal, savedItemIds, outfitBoards } = useApp();

  return (
    <div className="bg-[#F7F3ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Bio Card */}
        <div className="bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/35 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=eadddc"
              alt="Maya Lin"
              className="w-20 h-20 rounded-full border-2 border-[#743C4A]/40 object-cover"
            />
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-editorial text-2xl sm:text-3xl text-[#252525]">
                  Maya Lin
                </h1>
                <span className="text-[10px] bg-[#EADDDC] text-[#743C4A] font-semibold px-2 py-0.5 rounded-xs">
                  Active Student
                </span>
              </div>
              <p className="text-xs text-[#252525]/75 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#743C4A]" />
                <span>{activeCampus.name} · Senior, Class of 2025</span>
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-[#252525]/70 pt-1">
                <span className="flex items-center gap-1 text-[#743C4A]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <strong>5.0</strong> (15 campus sales)
                </span>
                <span>·</span>
                <span>Favorite spot: {activeCampus.safeMeetupSpots[0].split('—')[0].trim()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={openSellModal}
              className="px-5 py-2.5 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List New Piece</span>
            </button>
          </div>
        </div>

        {/* Embedded Seller Dashboard */}
        <SellerDashboard />
      </div>
    </div>
  );
};
