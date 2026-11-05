/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, MapPin, Eye, Sparkles } from 'lucide-react';
import { ListingItem } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  item: ListingItem;
  layoutVariant?: 'standard' | 'editorial' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  layoutVariant = 'standard',
}) => {
  const { savedItemIds, toggleSave, openProductModal } = useApp();
  const [imageError, setImageError] = useState(false);
  const isSaved = savedItemIds.includes(item.id);

  const discountPercent = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : null;

  const isTall = layoutVariant === 'editorial' && (parseInt(item.id.replace(/\D/g, ''), 10) % 2 === 0);

  return (
    <article
      onClick={() => openProductModal(item)}
      className="group flex flex-col bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/30 overflow-hidden cursor-pointer hover:border-[#743C4A]/60 hover:shadow-lg transition-all duration-300 relative"
    >
      {/* Product Image Frame */}
      <div
        className={`relative w-full bg-[#EADDDC]/40 overflow-hidden ${
          isTall ? 'aspect-[3/4.2]' : 'aspect-[4/5]'
        }`}
      >
        {!imageError ? (
          <img
            src={item.images[0]}
            alt={item.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#EADDDC]/50 text-[#743C4A]">
            <span className="font-editorial text-lg italic">{item.brand}</span>
            <span className="text-xs text-[#252525]/70 mt-1">{item.title}</span>
          </div>
        )}

        {/* Hover Micro-Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {item.isNewThisWeek && (
            <span className="bg-[#FFFCF8]/95 backdrop-blur-xs text-[#743C4A] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs border border-[#B3A49A]/30 shadow-2xs">
              New This Week
            </span>
          )}
          {item.price <= 25 && !item.isNewThisWeek && (
            <span className="bg-[#EADDDC]/90 backdrop-blur-xs text-[#252525] text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-xs border border-[#B3A49A]/30 shadow-2xs">
              Under $25
            </span>
          )}
          {item.status === 'reserved' && (
            <span className="bg-[#252525]/90 text-[#FFFCF8] text-[10px] tracking-wider uppercase px-2 py-0.5 font-medium rounded-xs">
              Reserved
            </span>
          )}
          {item.status === 'sold' && (
            <span className="bg-[#743C4A]/90 text-[#FFFCF8] text-[10px] tracking-wider uppercase px-2 py-0.5 font-medium rounded-xs">
              Sold
            </span>
          )}
        </div>

        {/* Save to Wishlist Heart Button (Elevated on Hover) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(item.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-[#FFFCF8]/95 backdrop-blur-xs flex items-center justify-center text-[#252525] hover:text-[#743C4A] shadow-xs transition-all duration-200 z-10 ${
            isSaved
              ? 'opacity-100 scale-105'
              : 'opacity-85 sm:opacity-0 sm:group-hover:opacity-100'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save item'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isSaved
                ? 'fill-[#743C4A] text-[#743C4A] scale-110'
                : 'text-[#252525]/70 hover:scale-110'
            }`}
          />
        </button>

        {/* Quick View Hover Prompt Banner */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(item);
            }}
            className="w-full py-2 px-3 bg-[#FFFCF8]/95 backdrop-blur-xs text-[#252525] hover:bg-[#743C4A] hover:text-[#FFFCF8] text-[11px] font-medium rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-[#FFFCF8]">
        <div>
          {/* Brand & Size line */}
          <div className="flex items-center justify-between text-xs text-[#252525]/70 mb-1">
            <span className="font-semibold tracking-wider uppercase text-[11px] text-[#743C4A] truncate max-w-[140px]">
              {item.brand}
            </span>
            <span className="font-mono text-[11px] text-[#252525]/75">
              Size {item.size}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-medium text-[#252525] line-clamp-1 group-hover:text-[#743C4A] transition-colors">
            {item.title}
          </h3>

          {/* Condition & Campus Line */}
          <div className="flex items-center gap-1.5 text-xs text-[#252525]/60 mt-1">
            <span>{item.condition}</span>
            <span aria-hidden="true" className="text-[#B3A49A]">·</span>
            <span className="truncate">{item.sellerUniversity.split(' ')[0]}</span>
          </div>
        </div>

        {/* Price & Meetup Footnote */}
        <div className="mt-3 pt-2.5 border-t border-[#B3A49A]/20 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold font-mono tabular-nums text-[#252525]">
              ${item.price}
            </span>
            {item.originalPrice && (
              <span className="text-xs line-through text-[#252525]/40 font-mono tabular-nums">
                ${item.originalPrice}
              </span>
            )}
            {discountPercent && (
              <span className="text-[11px] text-[#743C4A] font-medium">
                {discountPercent}% off
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#252525]/70">
            <MapPin className="w-3 h-3 text-[#743C4A]" />
            <span className="truncate max-w-[90px]">{item.safeMeetupSpot.split('—')[0].trim()}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
