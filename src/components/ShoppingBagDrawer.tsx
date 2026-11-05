/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Trash2,
  MapPin,
  Check,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ShoppingBagDrawer: React.FC = () => {
  const {
    bagItems,
    isBagOpen,
    closeBagDrawer,
    removeFromBag,
    checkoutBag,
    activeCampus,
    lastOrderReceipt,
    dismissReceipt,
  } = useApp();

  const [selectedMeetupLocation, setSelectedMeetupLocation] = useState<string>(
    activeCampus.safeMeetupSpots[0]
  );

  if (!isBagOpen) return null;

  const subtotal = bagItems.reduce((acc, curr) => acc + curr.item.price, 0);

  const handleCheckout = () => {
    checkoutBag(selectedMeetupLocation);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeBagDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFCF8] border-l border-[#B3A49A]/30 shadow-2xl flex flex-col justify-between">
          {/* Top Drawer Header */}
          <div className="p-5 border-b border-[#B3A49A]/30 flex items-center justify-between bg-[#F7F3ED]/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#743C4A]" />
              <h2 className="font-editorial text-2xl text-[#252525]">Campus Bag</h2>
              <span className="font-mono text-xs text-[#252525]/60">
                ({bagItems.length})
              </span>
            </div>

            <button
              onClick={closeBagDrawer}
              className="p-1.5 text-[#252525]/60 hover:text-[#743C4A] rounded-full cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body: Order Receipt Modal OR Bag Items */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {lastOrderReceipt ? (
              <div className="space-y-4 py-4">
                <div className="w-12 h-12 rounded-full bg-[#EADDDC] text-[#743C4A] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-[#743C4A] tracking-wider">
                    Exchange Requested
                  </span>
                  <h3 className="font-editorial text-2xl text-[#252525]">
                    Order #{lastOrderReceipt.orderId}
                  </h3>
                  <p className="text-xs text-[#252525]/70">
                    A notification has been sent to the seller to coordinate pickup.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#252525]">
                    <span className="text-[#252525]/60">Pickup Location:</span>
                    <span className="font-medium text-right max-w-[200px] truncate">
                      {lastOrderReceipt.meetupLocation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#252525]">
                    <span className="text-[#252525]/60">Total Cost:</span>
                    <span className="font-mono font-bold">${lastOrderReceipt.total}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#252525]">
                    <span className="text-[#252525]/60">Campus:</span>
                    <span>{activeCampus.name}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#EADDDC]/40 rounded-xs border border-[#B3A49A]/30 flex items-start gap-2 text-[11px] text-[#252525]/80">
                  <ShieldCheck className="w-4 h-4 text-[#743C4A] shrink-0 mt-0.5" />
                  <span>
                    Bring your student ID to the exchange. Payment is made directly to the seller via Venmo/Zelle upon physical inspection.
                  </span>
                </div>

                <button
                  onClick={() => {
                    dismissReceipt();
                    closeBagDrawer();
                  }}
                  className="w-full py-2.5 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : bagItems.length > 0 ? (
              <div className="space-y-3">
                {bagItems.map(({ item }) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xs border border-[#B3A49A]/30 flex items-center justify-between gap-3 bg-[#FFFCF8]"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-14 h-16 object-cover rounded-xs border border-[#B3A49A]/20 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold uppercase text-[#743C4A] block">
                        {item.brand}
                      </span>
                      <h4 className="text-xs font-medium text-[#252525] truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#252525]/70 mt-1">
                        <span className="font-mono font-semibold">${item.price}</span>
                        <span>· Size {item.size}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromBag(item.id)}
                      className="text-[#252525]/40 hover:text-red-700 p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Pickup Spot Selector */}
                <div className="pt-3 border-t border-[#B3A49A]/20 space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#252525]/80 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#743C4A]" />
                    <span>Select Campus Safety Spot</span>
                  </label>
                  <select
                    value={selectedMeetupLocation}
                    onChange={(e) => setSelectedMeetupLocation(e.target.value)}
                    className="w-full bg-[#F7F3ED] border border-[#B3A49A]/40 text-xs py-2 px-2.5 rounded-xs focus:outline-none focus:border-[#743C4A] cursor-pointer"
                  >
                    {activeCampus.safeMeetupSpots.map((spot, idx) => (
                      <option key={idx} value={spot}>
                        {spot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-[#252525]/60 text-xs space-y-2">
                <ShoppingBag className="w-8 h-8 text-[#B3A49A] mx-auto" />
                <p>Your campus shopping bag is empty.</p>
              </div>
            )}
          </div>

          {/* Drawer Footer with Checkout */}
          {!lastOrderReceipt && bagItems.length > 0 && (
            <div className="p-5 border-t border-[#B3A49A]/30 bg-[#F7F3ED]/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#252525]/70">Campus Exchange Subtotal:</span>
                <span className="font-mono font-bold text-base text-[#252525]">
                  ${subtotal}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Request Campus Exchange · ${subtotal}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
