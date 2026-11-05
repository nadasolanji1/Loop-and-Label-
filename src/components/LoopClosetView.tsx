/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  Bookmark,
  Share2,
  Tag,
  ArrowRight,
  Eye,
  Check,
  RotateCcw,
  ShoppingBag,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  OutfitCategory,
  OutfitTheme,
  OutfitBoard,
  ListingItem,
} from '../types';

export const LoopClosetView: React.FC = () => {
  const {
    items,
    outfitBoards,
    saveOutfitBoard,
    deleteOutfitBoard,
    openProductModal,
    addToBag,
    showToast,
    navigateTo,
  } = useApp();

  const themes: OutfitTheme[] = [
    'Class Day',
    'Going Out',
    'Game Day',
    'Coffee Date',
    'Weekend Brunch',
    'Vacation',
    'Pilates & Activewear',
  ];

  const categories: OutfitCategory[] = [
    'Tops',
    'Bottoms',
    'Dresses',
    'Shoes',
    'Bags',
    'Accessories',
  ];

  // Studio State
  const [selectedTheme, setSelectedTheme] = useState<OutfitTheme>('Coffee Date');
  const [outfitName, setOutfitName] = useState('Autumn Layered Fit');
  const [activeSlotToPick, setActiveSlotToPick] = useState<OutfitCategory | null>('Tops');

  // Currently selected item IDs for the board
  const [selectedItems, setSelectedItems] = useState<{
    topId?: string;
    bottomId?: string;
    dressId?: string;
    shoesId?: string;
    bagId?: string;
    accessoryId?: string;
  }>({
    topId: 'item-13',
    bottomId: 'item-4',
    bagId: 'item-6',
    shoesId: 'item-17',
    accessoryId: 'item-20',
  });

  // Filter boards by theme tab
  const [activeFilterTheme, setActiveFilterTheme] = useState<OutfitTheme | 'All'>('All');

  // Helper to resolve listing by ID
  const getItem = (id?: string): ListingItem | undefined => {
    if (!id) return undefined;
    return items.find((i) => i.id === id);
  };

  const topItem = getItem(selectedItems.topId);
  const bottomItem = getItem(selectedItems.bottomId);
  const dressItem = getItem(selectedItems.dressId);
  const shoesItem = getItem(selectedItems.shoesId);
  const bagItem = getItem(selectedItems.bagId);
  const accessoryItem = getItem(selectedItems.accessoryId);

  const activePieces = [topItem, bottomItem, dressItem, shoesItem, bagItem, accessoryItem].filter(
    (it): it is ListingItem => Boolean(it)
  );

  const totalOutfitPrice = activePieces.reduce((acc, curr) => acc + curr.price, 0);

  // Available marketplace items for the active slot
  const slotAvailableItems = items.filter((item) => {
    if (item.status === 'sold') return false;
    if (!activeSlotToPick) return true;

    if (item.itemSlot) {
      return item.itemSlot === activeSlotToPick;
    }

    // Heuristic categorization fallback
    const title = item.title.toLowerCase();
    const cat = item.category;
    switch (activeSlotToPick) {
      case 'Tops':
        return (
          cat === 'Everyday Essentials' ||
          cat === 'Going Out' ||
          cat === 'Game Day' ||
          title.includes('sweater') ||
          title.includes('jacket') ||
          title.includes('top') ||
          title.includes('cardigan') ||
          title.includes('sweatshirt') ||
          title.includes('corset')
        );
      case 'Bottoms':
        return (
          title.includes('denim') ||
          title.includes('jeans') ||
          title.includes('skirt') ||
          title.includes('shorts') ||
          title.includes('trousers') ||
          title.includes('pants')
        );
      case 'Dresses':
        return title.includes('dress') || cat === 'Going Out';
      case 'Shoes':
        return (
          title.includes('boots') ||
          title.includes('sneakers') ||
          title.includes('sambas') ||
          title.includes('shoes')
        );
      case 'Bags':
        return (
          cat === 'Accessories' &&
          (title.includes('bag') || title.includes('tote') || title.includes('carryall'))
        );
      case 'Accessories':
        return (
          cat === 'Accessories' ||
          title.includes('sunglasses') ||
          title.includes('ring') ||
          title.includes('necklace') ||
          title.includes('belt')
        );
      default:
        return true;
    }
  });

  const handleSelectItemForSlot = (item: ListingItem) => {
    if (!activeSlotToPick) return;
    switch (activeSlotToPick) {
      case 'Tops':
        setSelectedItems((prev) => ({ ...prev, topId: item.id }));
        break;
      case 'Bottoms':
        setSelectedItems((prev) => ({ ...prev, bottomId: item.id }));
        break;
      case 'Dresses':
        setSelectedItems((prev) => ({ ...prev, dressId: item.id }));
        break;
      case 'Shoes':
        setSelectedItems((prev) => ({ ...prev, shoesId: item.id }));
        break;
      case 'Bags':
        setSelectedItems((prev) => ({ ...prev, bagId: item.id }));
        break;
      case 'Accessories':
        setSelectedItems((prev) => ({ ...prev, accessoryId: item.id }));
        break;
    }
    showToast(`Added "${item.title}" to ${activeSlotToPick}`, 'info');
  };

  const handleRemoveSlot = (slot: OutfitCategory) => {
    switch (slot) {
      case 'Tops':
        setSelectedItems((prev) => ({ ...prev, topId: undefined }));
        break;
      case 'Bottoms':
        setSelectedItems((prev) => ({ ...prev, bottomId: undefined }));
        break;
      case 'Dresses':
        setSelectedItems((prev) => ({ ...prev, dressId: undefined }));
        break;
      case 'Shoes':
        setSelectedItems((prev) => ({ ...prev, shoesId: undefined }));
        break;
      case 'Bags':
        setSelectedItems((prev) => ({ ...prev, bagId: undefined }));
        break;
      case 'Accessories':
        setSelectedItems((prev) => ({ ...prev, accessoryId: undefined }));
        break;
    }
  };

  const handleSaveBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outfitName.trim()) {
      showToast('Please enter an outfit board name', 'error');
      return;
    }

    if (activePieces.length === 0) {
      showToast('Select at least one clothing piece for your board', 'error');
      return;
    }

    saveOutfitBoard({
      name: outfitName.trim(),
      theme: selectedTheme,
      itemIds: selectedItems,
      description: `Curated ${selectedTheme} outfit featuring ${activePieces.length} marketplace pieces.`,
    });
  };

  const handleLoadBoard = (board: OutfitBoard) => {
    setSelectedTheme(board.theme);
    setOutfitName(board.name);
    setSelectedItems(board.itemIds);
    window.scrollTo({ top: 300, behavior: 'smooth' });
    showToast(`Loaded "${board.name}" onto your styling canvas`, 'info');
  };

  const filteredBoards = outfitBoards.filter((b) =>
    activeFilterTheme === 'All' ? true : b.theme === activeFilterTheme
  );

  return (
    <div className="bg-[#F7F3ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Header */}
        <div className="pb-6 border-b border-[#B3A49A]/30 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#743C4A] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Outfit Collage</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#252525] tracking-tight">
              The Loop Closet
            </h1>
            <p className="text-xs sm:text-sm text-[#252525]/75 mt-1 max-w-xl">
              Curate Pinterest-style outfit boards by pairing real secondhand items currently circulating across student closets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#252525]/70">
              <strong className="font-mono text-[#743C4A]">{outfitBoards.length}</strong> Saved Boards
            </span>
          </div>
        </div>

        {/* Studio Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas: Mood Board Collage (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/40 p-5 sm:p-7 shadow-sm space-y-6">
            {/* Top Board Meta & Theme Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#B3A49A]/30">
              <div className="flex-1">
                <input
                  type="text"
                  value={outfitName}
                  onChange={(e) => setOutfitName(e.target.value)}
                  placeholder="Name your outfit board..."
                  className="font-editorial text-2xl sm:text-3xl text-[#252525] w-full bg-transparent focus:outline-none focus:border-b focus:border-[#743C4A] pb-0.5"
                />
                <span className="text-[11px] text-[#252525]/60 mt-0.5 block">
                  Click to edit board title · Theme: <strong className="text-[#743C4A]">{selectedTheme}</strong>
                </span>
              </div>

              {/* Total Price Tag */}
              <div className="text-right shrink-0 bg-[#EADDDC]/40 px-3.5 py-2 rounded-xs border border-[#B3A49A]/30">
                <span className="text-[10px] uppercase font-semibold text-[#743C4A] block">
                  Combined Total
                </span>
                <span className="text-xl font-bold font-mono text-[#252525] tabular-nums">
                  ${totalOutfitPrice}
                </span>
              </div>
            </div>

            {/* Theme Selector Pills */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#252525]/70 block mb-2">
                Select Outfit Occasion
              </span>
              <div className="flex flex-wrap gap-1.5">
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTheme(t)}
                    className={`px-3 py-1 text-xs rounded-xs border transition-colors cursor-pointer ${
                      selectedTheme === t
                        ? 'bg-[#743C4A] text-[#FFFCF8] border-[#743C4A] font-medium'
                        : 'bg-[#FFFCF8] text-[#252525]/75 border-[#B3A49A]/40 hover:border-[#743C4A]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Collage Board (6-slot visual mood board) */}
            <div className="bg-[#F7F3ED]/70 p-4 sm:p-5 rounded-xs border border-[#B3A49A]/30">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {/* 1. Top Slot */}
                <div
                  onClick={() => setActiveSlotToPick('Tops')}
                  className={`relative aspect-[3/4] rounded-xs border transition-all cursor-pointer overflow-hidden flex flex-col justify-between p-2.5 ${
                    activeSlotToPick === 'Tops'
                      ? 'border-[#743C4A] ring-1 ring-[#743C4A] bg-[#FFFCF8]'
                      : 'border-[#B3A49A]/40 bg-[#FFFCF8] hover:border-[#743C4A]/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#743C4A] z-10">
                    <span>Tops / Layers</span>
                    {topItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSlot('Tops');
                        }}
                        className="text-[#252525]/40 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {topItem ? (
                    <>
                      <img
                        src={topItem.images[0]}
                        alt={topItem.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[#FFFCF8] text-[11px]">
                        <p className="font-medium truncate">{topItem.title}</p>
                        <p className="font-mono">${topItem.price}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-[#252525]/40 text-xs">
                      <Plus className="w-5 h-5 mb-1" />
                      <span>Choose Top</span>
                    </div>
                  )}
                </div>

                {/* 2. Bottom Slot */}
                <div
                  onClick={() => setActiveSlotToPick('Bottoms')}
                  className={`relative aspect-[3/4] rounded-xs border transition-all cursor-pointer overflow-hidden flex flex-col justify-between p-2.5 ${
                    activeSlotToPick === 'Bottoms'
                      ? 'border-[#743C4A] ring-1 ring-[#743C4A] bg-[#FFFCF8]'
                      : 'border-[#B3A49A]/40 bg-[#FFFCF8] hover:border-[#743C4A]/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#743C4A] z-10">
                    <span>Bottoms</span>
                    {bottomItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSlot('Bottoms');
                        }}
                        className="text-[#252525]/40 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {bottomItem ? (
                    <>
                      <img
                        src={bottomItem.images[0]}
                        alt={bottomItem.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[#FFFCF8] text-[11px]">
                        <p className="font-medium truncate">{bottomItem.title}</p>
                        <p className="font-mono">${bottomItem.price}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-[#252525]/40 text-xs">
                      <Plus className="w-5 h-5 mb-1" />
                      <span>Choose Bottom</span>
                    </div>
                  )}
                </div>

                {/* 3. Dress Slot */}
                <div
                  onClick={() => setActiveSlotToPick('Dresses')}
                  className={`relative aspect-[3/4] rounded-xs border transition-all cursor-pointer overflow-hidden flex flex-col justify-between p-2.5 ${
                    activeSlotToPick === 'Dresses'
                      ? 'border-[#743C4A] ring-1 ring-[#743C4A] bg-[#FFFCF8]'
                      : 'border-[#B3A49A]/40 bg-[#FFFCF8] hover:border-[#743C4A]/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#743C4A] z-10">
                    <span>Dress / Set</span>
                    {dressItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSlot('Dresses');
                        }}
                        className="text-[#252525]/40 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {dressItem ? (
                    <>
                      <img
                        src={dressItem.images[0]}
                        alt={dressItem.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[#FFFCF8] text-[11px]">
                        <p className="font-medium truncate">{dressItem.title}</p>
                        <p className="font-mono">${dressItem.price}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-[#252525]/40 text-xs">
                      <Plus className="w-5 h-5 mb-1" />
                      <span>Optional Dress</span>
                    </div>
                  )}
                </div>

                {/* 4. Shoes Slot */}
                <div
                  onClick={() => setActiveSlotToPick('Shoes')}
                  className={`relative aspect-[3/4] rounded-xs border transition-all cursor-pointer overflow-hidden flex flex-col justify-between p-2.5 ${
                    activeSlotToPick === 'Shoes'
                      ? 'border-[#743C4A] ring-1 ring-[#743C4A] bg-[#FFFCF8]'
                      : 'border-[#B3A49A]/40 bg-[#FFFCF8] hover:border-[#743C4A]/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#743C4A] z-10">
                    <span>Footwear</span>
                    {shoesItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSlot('Shoes');
                        }}
                        className="text-[#252525]/40 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {shoesItem ? (
                    <>
                      <img
                        src={shoesItem.images[0]}
                        alt={shoesItem.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[#FFFCF8] text-[11px]">
                        <p className="font-medium truncate">{shoesItem.title}</p>
                        <p className="font-mono">${shoesItem.price}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-[#252525]/40 text-xs">
                      <Plus className="w-5 h-5 mb-1" />
                      <span>Choose Shoes</span>
                    </div>
                  )}
                </div>

                {/* 5. Bag Slot */}
                <div
                  onClick={() => setActiveSlotToPick('Bags')}
                  className={`relative aspect-[3/4] rounded-xs border transition-all cursor-pointer overflow-hidden flex flex-col justify-between p-2.5 ${
                    activeSlotToPick === 'Bags'
                      ? 'border-[#743C4A] ring-1 ring-[#743C4A] bg-[#FFFCF8]'
                      : 'border-[#B3A49A]/40 bg-[#FFFCF8] hover:border-[#743C4A]/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#743C4A] z-10">
                    <span>Bag</span>
                    {bagItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSlot('Bags');
                        }}
                        className="text-[#252525]/40 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {bagItem ? (
                    <>
                      <img
                        src={bagItem.images[0]}
                        alt={bagItem.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[#FFFCF8] text-[11px]">
                        <p className="font-medium truncate">{bagItem.title}</p>
                        <p className="font-mono">${bagItem.price}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-[#252525]/40 text-xs">
                      <Plus className="w-5 h-5 mb-1" />
                      <span>Choose Bag</span>
                    </div>
                  )}
                </div>

                {/* 6. Accessory Slot */}
                <div
                  onClick={() => setActiveSlotToPick('Accessories')}
                  className={`relative aspect-[3/4] rounded-xs border transition-all cursor-pointer overflow-hidden flex flex-col justify-between p-2.5 ${
                    activeSlotToPick === 'Accessories'
                      ? 'border-[#743C4A] ring-1 ring-[#743C4A] bg-[#FFFCF8]'
                      : 'border-[#B3A49A]/40 bg-[#FFFCF8] hover:border-[#743C4A]/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#743C4A] z-10">
                    <span>Accessory</span>
                    {accessoryItem && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSlot('Accessories');
                        }}
                        className="text-[#252525]/40 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {accessoryItem ? (
                    <>
                      <img
                        src={accessoryItem.images[0]}
                        alt={accessoryItem.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[#FFFCF8] text-[11px]">
                        <p className="font-medium truncate">{accessoryItem.title}</p>
                        <p className="font-mono">${accessoryItem.price}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-[#252525]/40 text-xs">
                      <Plus className="w-5 h-5 mb-1" />
                      <span>Add Accessory</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() =>
                  setSelectedItems({
                    topId: undefined,
                    bottomId: undefined,
                    dressId: undefined,
                    shoesId: undefined,
                    bagId: undefined,
                    accessoryId: undefined,
                  })
                }
                className="text-xs text-[#252525]/60 hover:text-[#743C4A] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Board</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveBoard}
                  className="px-5 py-2.5 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Outfit Board</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Selector: Catalog Item Picker for Active Slot (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/40 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#B3A49A]/30">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#743C4A]">
                  Marketplace Rack
                </span>
                <h3 className="font-editorial text-xl text-[#252525]">
                  Select {activeSlotToPick || 'Item'}
                </h3>
              </div>

              {/* Slot Category Switcher */}
              <select
                value={activeSlotToPick || 'Tops'}
                onChange={(e) => setActiveSlotToPick(e.target.value as OutfitCategory)}
                className="bg-[#F7F3ED] border border-[#B3A49A]/40 text-xs py-1.5 px-2.5 rounded-xs focus:outline-none focus:border-[#743C4A] cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-xs text-[#252525]/70">
              Browse available campus pieces to slot into your {activeSlotToPick} slot:
            </p>

            {/* List of items available */}
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {slotAvailableItems.map((item) => {
                const isChosen =
                  selectedItems.topId === item.id ||
                  selectedItems.bottomId === item.id ||
                  selectedItems.dressId === item.id ||
                  selectedItems.shoesId === item.id ||
                  selectedItems.bagId === item.id ||
                  selectedItems.accessoryId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xs border transition-colors flex items-center justify-between gap-3 ${
                      isChosen
                        ? 'border-[#743C4A] bg-[#EADDDC]/35'
                        : 'border-[#B3A49A]/30 bg-[#FFFCF8] hover:border-[#743C4A]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-12 h-14 object-cover rounded-xs border border-[#B3A49A]/20 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold uppercase text-[#743C4A] tracking-wider block">
                          {item.brand}
                        </span>
                        <h4 className="text-xs font-medium text-[#252525] truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#252525]/70 mt-0.5">
                          <span className="font-mono font-semibold">${item.price}</span>
                          <span>· Size {item.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openProductModal(item)}
                        className="p-1.5 text-[#252525]/60 hover:text-[#743C4A] rounded-xs cursor-pointer"
                        title="Quick View Piece"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleSelectItemForSlot(item)}
                        className={`px-2.5 py-1 text-xs rounded-xs font-medium transition-colors cursor-pointer ${
                          isChosen
                            ? 'bg-[#743C4A] text-[#FFFCF8]'
                            : 'bg-[#FFFCF8] border border-[#743C4A] text-[#743C4A] hover:bg-[#743C4A] hover:text-[#FFFCF8]'
                        }`}
                      >
                        {isChosen ? (
                          <span className="flex items-center gap-1">
                            <Check className="w-3 h-3" /> Added
                          </span>
                        ) : (
                          'Add to Board'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Saved Outfit Boards Gallery Shelf */}
        <div className="pt-8 border-t border-[#B3A49A]/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#743C4A] mb-1">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Your Curated Wardrobe Boards</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#252525]">
                Saved Outfit Mood Boards
              </h2>
            </div>

            {/* Filter boards by theme */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              <button
                onClick={() => setActiveFilterTheme('All')}
                className={`px-3 py-1 text-xs rounded-xs border transition-colors cursor-pointer shrink-0 ${
                  activeFilterTheme === 'All'
                    ? 'bg-[#743C4A] text-[#FFFCF8] border-[#743C4A]'
                    : 'bg-[#FFFCF8] text-[#252525]/75 border-[#B3A49A]/30'
                }`}
              >
                All Themes
              </button>
              {themes.map((th) => (
                <button
                  key={th}
                  onClick={() => setActiveFilterTheme(th)}
                  className={`px-3 py-1 text-xs rounded-xs border transition-colors cursor-pointer shrink-0 ${
                    activeFilterTheme === th
                      ? 'bg-[#743C4A] text-[#FFFCF8] border-[#743C4A]'
                      : 'bg-[#FFFCF8] text-[#252525]/75 border-[#B3A49A]/30'
                  }`}
                >
                  {th}
                </button>
              ))}
            </div>
          </div>

          {/* Boards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoards.map((board) => {
              const bTop = getItem(board.itemIds.topId);
              const bBottom = getItem(board.itemIds.bottomId);
              const bDress = getItem(board.itemIds.dressId);
              const bShoes = getItem(board.itemIds.shoesId);
              const bBag = getItem(board.itemIds.bagId);
              const bAccessory = getItem(board.itemIds.accessoryId);

              const pieces = [bTop, bBottom, bDress, bShoes, bBag, bAccessory].filter(
                (p): p is ListingItem => Boolean(p)
              );

              const bPrice = pieces.reduce((sum, item) => sum + item.price, 0);

              return (
                <div
                  key={board.id}
                  className="bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/35 p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#743C4A] bg-[#EADDDC]/60 px-2 py-0.5 rounded-xs">
                        {board.theme}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#252525]">
                        ${bPrice} total
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl text-[#252525] group-hover:text-[#743C4A] transition-colors">
                      {board.name}
                    </h3>
                    {board.description && (
                      <p className="text-xs text-[#252525]/70 mt-1 line-clamp-2">
                        {board.description}
                      </p>
                    )}

                    {/* Collage Preview Mosaic */}
                    <div className="grid grid-cols-3 gap-2 mt-4 aspect-[4/3] bg-[#F7F3ED] p-2 rounded-xs border border-[#B3A49A]/20">
                      {pieces.slice(0, 6).map((pc) => (
                        <div
                          key={pc.id}
                          onClick={() => openProductModal(pc)}
                          className="relative rounded-xs overflow-hidden border border-[#B3A49A]/30 group/pc cursor-pointer"
                          title={`${pc.title} — $${pc.price}`}
                        >
                          <img
                            src={pc.images[0]}
                            alt={pc.title}
                            className="w-full h-full object-cover group-hover/pc:scale-105 transition-transform"
                          />
                          <div className="absolute inset-x-0 bottom-0 p-1 bg-black/60 text-[#FFFCF8] text-[9px] font-mono opacity-0 group-hover/pc:opacity-100 transition-opacity truncate">
                            ${pc.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Card Controls */}
                  <div className="mt-4 pt-3 border-t border-[#B3A49A]/25 flex items-center justify-between">
                    <button
                      onClick={() => handleLoadBoard(board)}
                      className="text-xs font-medium text-[#743C4A] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Edit on Canvas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteOutfitBoard(board.id)}
                      className="text-[#252525]/40 hover:text-red-700 p-1 transition-colors cursor-pointer"
                      title="Delete Outfit Board"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
