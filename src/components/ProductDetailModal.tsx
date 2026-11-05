/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Star,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedListingModal,
    closeProductModal,
    savedItemIds,
    toggleSave,
    addToBag,
    startConversationForItem,
    activeCampus,
    showToast,
  } = useApp();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedMeetupLocation, setSelectedMeetupLocation] = useState<string>('');

  if (!selectedListingModal) return null;

  const item = selectedListingModal;
  const isSaved = savedItemIds.includes(item.id);
  const discountPercent = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : null;

  const currentMeetup = selectedMeetupLocation || item.safeMeetupSpot || activeCampus.safeMeetupSpots[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Listing link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={closeProductModal}
        aria-hidden="true"
      />

      <div className="relative bg-[#FFFCF8] w-full max-w-4xl rounded-sm border border-[#B3A49A]/40 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#FFFCF8]/90 text-[#252525] hover:text-[#743C4A] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 bg-[#EADDDC]/30 flex flex-col justify-between p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[#B3A49A]/30">
          <div className="relative w-full aspect-[4/5] rounded-xs overflow-hidden bg-[#EADDDC]/40 shadow-inner">
            <img
              src={item.images[currentImageIndex] || item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />

            {/* Gallery Navigation Arrows if multiple */}
            {item.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? item.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FFFCF8]/85 hover:bg-[#FFFCF8] text-[#252525] flex items-center justify-center shadow-xs cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === item.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FFFCF8]/85 hover:bg-[#FFFCF8] text-[#252525] flex items-center justify-center shadow-xs cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Image Indicator Dots */}
            {item.images.length > 1 && (
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                {item.images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentImageIndex ? 'bg-[#743C4A]' : 'bg-[#FFFCF8]/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail row if multiple images */}
          {item.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-14 h-14 rounded-xs overflow-hidden border-2 shrink-0 cursor-pointer ${
                    currentImageIndex === idx
                      ? 'border-[#743C4A]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Public Exchange Security Notice */}
          <div className="mt-4 pt-3 border-t border-[#B3A49A]/30 flex items-start gap-2 text-xs text-[#252525]/75">
            <ShieldCheck className="w-4 h-4 text-[#743C4A] shrink-0 mt-0.5" />
            <span>
              <strong>Safe Campus Handoff:</strong> Always meet during daylight hours at designated student centers, libraries, or dining halls.
            </span>
          </div>
        </div>

        {/* Right Column: Listing Details & Actions */}
        <div className="md:w-1/2 p-5 sm:p-7 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Top Brand & Actions */}
            <div className="flex items-center justify-between">
              <span className="font-semibold tracking-widest uppercase text-xs text-[#743C4A]">
                {item.brand}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-1.5 text-[#252525]/60 hover:text-[#743C4A] transition-colors cursor-pointer"
                  title="Share Listing"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleSave(item.id)}
                  className="p-1.5 text-[#252525]/70 hover:text-[#743C4A] transition-colors cursor-pointer"
                  title={isSaved ? 'Remove from saved' : 'Save piece'}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isSaved ? 'fill-[#743C4A] text-[#743C4A]' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#252525] leading-tight">
              {item.title}
            </h2>

            {/* Price & Savings */}
            <div className="flex items-baseline gap-3 pb-3 border-b border-[#B3A49A]/30">
              <span className="text-2xl font-bold font-mono tabular-nums text-[#252525]">
                ${item.price}
              </span>
              {item.originalPrice && (
                <span className="text-sm line-through text-[#252525]/45 font-mono tabular-nums">
                  Retail ${item.originalPrice}
                </span>
              )}
              {discountPercent && (
                <span className="text-xs font-semibold text-[#743C4A] uppercase tracking-wider bg-[#EADDDC]/60 px-2 py-0.5 rounded-xs">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 gap-3 py-1 text-xs">
              <div className="p-2.5 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/20">
                <span className="text-[#252525]/60 block text-[11px] uppercase tracking-wider">
                  Size
                </span>
                <span className="font-semibold text-[#252525] mt-0.5 block">
                  {item.size}
                </span>
              </div>
              <div className="p-2.5 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/20">
                <span className="text-[#252525]/60 block text-[11px] uppercase tracking-wider">
                  Condition
                </span>
                <span className="font-semibold text-[#252525] mt-0.5 block truncate">
                  {item.condition}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#252525]/80">
                Seller Description
              </h4>
              <p className="text-xs sm:text-sm text-[#252525]/80 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* Fit Notes */}
            {item.fitNotes && (
              <div className="p-3 bg-[#EADDDC]/35 rounded-xs border border-[#B3A49A]/30 text-xs space-y-1">
                <span className="font-semibold text-[#743C4A] block">
                  Sizing & Fit Notes:
                </span>
                <p className="text-[#252525]/80">{item.fitNotes}</p>
              </div>
            )}

            {/* Seller Campus Card */}
            <div className="p-3 bg-[#FFFCF8] rounded-xs border border-[#B3A49A]/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={item.sellerAvatar}
                  alt={item.sellerName}
                  className="w-10 h-10 rounded-full border border-[#B3A49A]/40 object-cover"
                />
                <div>
                  <div className="text-xs font-semibold text-[#252525]">
                    {item.sellerName}
                  </div>
                  <div className="text-[11px] text-[#252525]/65">
                    {item.sellerUniversity}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#743C4A] mt-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{item.sellerRating.toFixed(1)}</span>
                    <span className="text-[#252525]/50">({item.sellerSalesCount} sales)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safe Meetup Spot Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#252525]/80 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#743C4A]" />
                <span>Preferred Campus Meetup Spot</span>
              </label>
              <select
                value={currentMeetup}
                onChange={(e) => setSelectedMeetupLocation(e.target.value)}
                className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 text-xs py-2 px-3 rounded-xs text-[#252525] focus:outline-none focus:border-[#743C4A] cursor-pointer"
              >
                {activeCampus.safeMeetupSpots.map((spot) => (
                  <option key={spot} value={spot}>
                    {spot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#B3A49A]/30 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addToBag(item, currentMeetup)}
              className="flex-1 py-3 px-4 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-sm hover:bg-[#5E303B] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Campus Bag · ${item.price}</span>
            </button>

            <button
              onClick={() => startConversationForItem(item)}
              className="py-3 px-4 bg-[#FFFCF8] text-[#252525] border border-[#B3A49A]/50 text-xs font-medium rounded-sm hover:border-[#743C4A] hover:text-[#743C4A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message Seller</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
