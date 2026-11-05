/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Tag,
  CheckCircle,
  FileText,
  Clock,
  Edit,
  Trash2,
  Plus,
  AlertCircle,
  Check,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ListingItem, ListingDraft } from '../types';

export const SellerDashboard: React.FC = () => {
  const {
    items,
    listingDrafts,
    openSellModal,
    openEditModal,
    deleteListing,
    markItemAsSold,
    deleteDraft,
    activeCampus,
    openProductModal,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'sold' | 'drafts'>('active');

  // Listings owned by the current demo user (Maya Lin / user-maya)
  const myItems = items.filter(
    (i) => i.sellerId === 'user-maya' || i.sellerName.includes('You')
  );

  const activeListings = myItems.filter((i) => i.status !== 'sold');
  const soldListings = myItems.filter((i) => i.status === 'sold');

  const totalEarnings = soldListings.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/35 p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#B3A49A]/30 gap-4">
        <div>
          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#743C4A]">
            Student Storefront Management
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#252525]">
            Seller Dashboard
          </h2>
          <p className="text-xs text-[#252525]/70 mt-0.5">
            Manage your active closet pieces, track campus exchanges, and resume draft listings.
          </p>
        </div>

        <button
          onClick={openSellModal}
          className="px-4 py-2.5 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Listing</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/20">
          <span className="text-[10px] uppercase font-semibold text-[#252525]/60 block">
            Active Listings
          </span>
          <span className="font-mono text-xl font-bold text-[#252525] mt-1 block">
            {activeListings.length}
          </span>
        </div>

        <div className="p-3.5 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/20">
          <span className="text-[10px] uppercase font-semibold text-[#252525]/60 block">
            Completed Sales
          </span>
          <span className="font-mono text-xl font-bold text-[#743C4A] mt-1 block">
            {soldListings.length}
          </span>
        </div>

        <div className="p-3.5 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/20">
          <span className="text-[10px] uppercase font-semibold text-[#252525]/60 block">
            Total Earned
          </span>
          <span className="font-mono text-xl font-bold text-[#252525] mt-1 block">
            ${totalEarnings}
          </span>
        </div>

        <div className="p-3.5 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/20">
          <span className="text-[10px] uppercase font-semibold text-[#252525]/60 block">
            Draft Progress
          </span>
          <span className="font-mono text-xl font-bold text-[#252525] mt-1 block">
            {listingDrafts.length}
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#B3A49A]/30 pb-3">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
            activeTab === 'active'
              ? 'bg-[#743C4A] text-[#FFFCF8]'
              : 'bg-[#F7F3ED] text-[#252525]/75 hover:text-[#252525]'
          }`}
        >
          Active Listings ({activeListings.length})
        </button>

        <button
          onClick={() => setActiveTab('sold')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
            activeTab === 'sold'
              ? 'bg-[#743C4A] text-[#FFFCF8]'
              : 'bg-[#F7F3ED] text-[#252525]/75 hover:text-[#252525]'
          }`}
        >
          Sold Pieces ({soldListings.length})
        </button>

        <button
          onClick={() => setActiveTab('drafts')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
            activeTab === 'drafts'
              ? 'bg-[#743C4A] text-[#FFFCF8]'
              : 'bg-[#F7F3ED] text-[#252525]/75 hover:text-[#252525]'
          }`}
        >
          Saved Drafts ({listingDrafts.length})
        </button>
      </div>

      {/* Tab 1: Active Listings */}
      {activeTab === 'active' && (
        <div className="space-y-3">
          {activeListings.length > 0 ? (
            activeListings.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xs border border-[#B3A49A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFCF8]"
              >
                <div
                  onClick={() => openProductModal(item)}
                  className="flex items-center gap-3.5 cursor-pointer min-w-0"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-14 h-16 object-cover rounded-xs border border-[#B3A49A]/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold uppercase text-[#743C4A] tracking-wider block">
                      {item.brand}
                    </span>
                    <h4 className="text-sm font-medium text-[#252525] truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#252525]/70 mt-1">
                      <span className="font-mono font-bold text-[#252525]">
                        ${item.price}
                      </span>
                      <span>· Size {item.size}</span>
                      <span>· {item.condition}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => markItemAsSold(item.id)}
                    className="px-2.5 py-1.5 text-xs bg-[#EADDDC]/70 text-[#743C4A] rounded-xs font-medium hover:bg-[#EADDDC] cursor-pointer flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Mark as Sold</span>
                  </button>

                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-[#252525]/70 hover:text-[#743C4A] border border-[#B3A49A]/40 rounded-xs cursor-pointer"
                    title="Edit listing details"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteListing(item.id)}
                    className="p-1.5 text-[#252525]/70 hover:text-red-700 border border-[#B3A49A]/40 rounded-xs cursor-pointer"
                    title="Delete listing"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-[#252525]/60 text-xs">
              No active listings currently. Click "New Listing" to start selling on campus.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Sold Pieces */}
      {activeTab === 'sold' && (
        <div className="space-y-3">
          {soldListings.length > 0 ? (
            soldListings.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xs border border-[#B3A49A]/20 bg-[#F7F3ED]/40 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0 opacity-75">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-14 h-16 object-cover rounded-xs border border-[#B3A49A]/20 shrink-0 grayscale"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold uppercase text-[#743C4A] tracking-wider block">
                      {item.brand}
                    </span>
                    <h4 className="text-sm font-medium text-[#252525] truncate line-through">
                      {item.title}
                    </h4>
                    <span className="font-mono text-xs font-bold text-[#252525] mt-1 block">
                      Sold for ${item.price}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#743C4A] bg-[#EADDDC]/60 px-2 py-0.5 rounded-xs">
                  Exchanged
                </span>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-[#252525]/60 text-xs">
              No pieces marked as sold yet.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Drafts */}
      {activeTab === 'drafts' && (
        <div className="space-y-3">
          {listingDrafts.length > 0 ? (
            listingDrafts.map((draft) => (
              <div
                key={draft.id}
                className="p-3.5 rounded-xs border border-[#B3A49A]/30 flex items-center justify-between gap-4 bg-[#FFFCF8]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-14 bg-[#EADDDC]/40 rounded-xs flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#743C4A]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-medium text-[#252525] truncate">
                      {draft.title || 'Untitled Draft'}
                    </h4>
                    <span className="text-[11px] text-[#252525]/60 block mt-0.5">
                      Last edited {new Date(draft.updatedAt).toLocaleDateString()} · Brand: {draft.brand || 'Unspecified'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={openSellModal}
                    className="px-3 py-1.5 text-xs bg-[#743C4A] text-[#FFFCF8] rounded-xs font-medium hover:bg-[#5E303B] cursor-pointer"
                  >
                    Resume
                  </button>
                  <button
                    onClick={() => deleteDraft(draft.id)}
                    className="p-1.5 text-[#252525]/60 hover:text-red-700 cursor-pointer"
                    title="Delete Draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-[#252525]/60 text-xs">
              No saved draft listings found.
            </div>
          )}
        </div>
      )}

      {/* Persistence Notice */}
      <div className="p-3 bg-[#EADDDC]/30 rounded-xs border border-[#B3A49A]/30 flex items-start gap-2 text-[11px] text-[#252525]/75">
        <AlertCircle className="w-3.5 h-3.5 text-[#743C4A] shrink-0 mt-0.5" />
        <span>
          <strong>Local Prototype Storage:</strong> Listings and drafts created on this device persist in your browser's local cache. Connect a production Cloud SQL / Firestore database to sync across multiple accounts and devices.
        </span>
      </div>
    </div>
  );
};
