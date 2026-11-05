/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Sliders,
  Check,
  Tag,
  RotateCcw,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ListingItem } from '../types';
import { ProductCard } from './ProductCard';

export const BudgetStyleView: React.FC = () => {
  const {
    items,
    activeCampus,
    openProductModal,
    addToBag,
    activeBudget,
    setActiveBudget,
  } = useApp();

  const [customInput, setCustomInput] = useState<string>('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('All');
  const [activeTabMode, setActiveTabMode] = useState<'catalog' | 'outfit-recs'>('outfit-recs');

  const budgetPresets = [25, 50, 75, 100];

  const handlePresetClick = (amount: number) => {
    setActiveBudget(amount);
    setCustomInput('');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(customInput);
    if (!isNaN(parsed) && parsed > 0) {
      setActiveBudget(parsed);
    }
  };

  // 1. Items strictly under the chosen budget
  const availableItemsUnderBudget = useMemo(() => {
    return items.filter((item) => {
      if (item.status === 'sold') return false;
      if (item.price > activeBudget) return false;
      if (selectedCategoryTab !== 'All' && item.category !== selectedCategoryTab) return false;
      return true;
    });
  }, [items, activeBudget, selectedCategoryTab]);

  // 2. Build multi-piece outfits under the budget using real items
  const recommendedOutfits = useMemo(() => {
    const available = items.filter((i) => i.status !== 'sold');

    // Separate into categories
    const tops = available.filter(
      (i) =>
        i.itemSlot === 'Tops' ||
        i.category === 'Everyday Essentials' ||
        i.category === 'Game Day' ||
        i.category === 'Going Out'
    );
    const bottoms = available.filter(
      (i) => i.itemSlot === 'Bottoms' || i.title.toLowerCase().includes('denim') || i.title.toLowerCase().includes('skirt')
    );
    const accessories = available.filter(
      (i) =>
        i.itemSlot === 'Accessories' ||
        i.itemSlot === 'Bags' ||
        i.itemSlot === 'Shoes' ||
        i.category === 'Accessories'
    );

    const combos: {
      id: string;
      title: string;
      top: ListingItem;
      bottom?: ListingItem;
      accessory?: ListingItem;
      total: number;
      remaining: number;
    }[] = [];

    // Form smart top + bottom pairings under budget
    for (const top of tops.slice(0, 8)) {
      for (const bottom of bottoms.slice(0, 6)) {
        if (top.id === bottom.id) continue;
        const subtotal = top.price + bottom.price;
        if (subtotal <= activeBudget) {
          // See if an accessory fits too!
          const fittingAcc = accessories.find(
            (acc) => acc.id !== top.id && acc.id !== bottom.id && subtotal + acc.price <= activeBudget
          );

          const finalTotal = fittingAcc ? subtotal + fittingAcc.price : subtotal;

          combos.push({
            id: `rec-${top.id}-${bottom.id}-${fittingAcc?.id || 'none'}`,
            title: `${top.brand} + ${bottom.brand} Campus Look`,
            top,
            bottom,
            accessory: fittingAcc,
            total: finalTotal,
            remaining: Math.max(0, activeBudget - finalTotal),
          });
        }
      }
    }

    // Also include one-piece dress pairings under budget
    const dresses = available.filter((i) => i.itemSlot === 'Dresses' || i.category === 'Going Out');
    for (const dress of dresses.slice(0, 4)) {
      if (dress.price <= activeBudget) {
        const fittingAcc = accessories.find(
          (acc) => acc.id !== dress.id && dress.price + acc.price <= activeBudget
        );
        const finalTotal = fittingAcc ? dress.price + fittingAcc.price : dress.price;
        combos.push({
          id: `rec-dress-${dress.id}-${fittingAcc?.id || 'none'}`,
          title: `${dress.brand} Statement Outfit`,
          top: dress,
          accessory: fittingAcc,
          total: finalTotal,
          remaining: Math.max(0, activeBudget - finalTotal),
        });
      }
    }

    // Sort combos by value / closest to budget without exceeding
    return combos
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, [items, activeBudget]);

  return (
    <div className="bg-[#F7F3ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="pb-6 border-b border-[#B3A49A]/30 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#743C4A] mb-1">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Affordable Campus Circularity</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#252525] tracking-tight">
              Style Within Your Budget
            </h1>
            <p className="text-xs sm:text-sm text-[#252525]/75 mt-1 max-w-xl">
              Tell us what you want to spend. We'll automatically assemble full campus outfits and discover pieces that stay strictly within your target.
            </p>
          </div>

          <div className="bg-[#FFFCF8] p-3 rounded-xs border border-[#B3A49A]/40 flex items-center gap-3">
            <span className="text-xs text-[#252525]/70">Target Budget:</span>
            <span className="text-2xl font-bold font-mono text-[#743C4A] tabular-nums">
              ${activeBudget}
            </span>
          </div>
        </div>

        {/* Interactive Budget Selector Console */}
        <div className="bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/40 p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#743C4A] block mb-2">
                1. Select Maximum Spend
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {budgetPresets.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handlePresetClick(amount)}
                    className={`px-5 py-2 text-xs font-medium rounded-xs border transition-colors cursor-pointer ${
                      activeBudget === amount
                        ? 'bg-[#743C4A] text-[#FFFCF8] border-[#743C4A] shadow-xs'
                        : 'bg-[#FFFCF8] text-[#252525] border-[#B3A49A]/40 hover:border-[#743C4A]'
                    }`}
                  >
                    Under ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Field */}
            <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
              <span className="text-xs text-[#252525]/70 whitespace-nowrap">Or custom:</span>
              <div className="relative w-28">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#252525]/50">$</span>
                <input
                  type="number"
                  placeholder="35"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full bg-[#F7F3ED] text-xs py-2 pl-6 pr-2 rounded-xs border border-[#B3A49A]/40 focus:border-[#743C4A] focus:outline-none"
                  min="5"
                  max="500"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#252525] text-[#FFFCF8] text-xs rounded-xs hover:bg-[#743C4A] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
          </div>

          {/* Mode Switcher: Full Outfit Combos vs Item Catalog */}
          <div className="pt-4 border-t border-[#B3A49A]/20 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTabMode('outfit-recs')}
                className={`px-4 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTabMode === 'outfit-recs'
                    ? 'bg-[#743C4A] text-[#FFFCF8]'
                    : 'bg-[#F7F3ED] text-[#252525]/80 hover:text-[#252525]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complete Outfits Under ${activeBudget} ({recommendedOutfits.length})</span>
              </button>
              <button
                onClick={() => setActiveTabMode('catalog')}
                className={`px-4 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                  activeTabMode === 'catalog'
                    ? 'bg-[#743C4A] text-[#FFFCF8]'
                    : 'bg-[#F7F3ED] text-[#252525]/80 hover:text-[#252525]'
                }`}
              >
                <span>Individual Pieces Under ${activeBudget} ({availableItemsUnderBudget.length})</span>
              </button>
            </div>

            <div className="text-xs text-[#252525]/60 font-mono">
              Strictly available items at {activeCampus.shortName} & peer schools
            </div>
          </div>
        </div>

        {/* Section 1: Complete Recommended Outfits Under Budget */}
        {activeTabMode === 'outfit-recs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#B3A49A]/30">
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#252525]">
                Curated Multi-Piece Looks Under ${activeBudget}
              </h2>
              <span className="text-xs text-[#252525]/60">
                Calculated strictly using available listings
              </span>
            </div>

            {recommendedOutfits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedOutfits.map((combo) => (
                  <div
                    key={combo.id}
                    className="bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/35 p-5 flex flex-col justify-between hover:border-[#743C4A]/60 hover:shadow-md transition-all space-y-4"
                  >
                    <div>
                      {/* Cost Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#B3A49A]/20">
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-[#743C4A] tracking-wider block">
                            Total Outfit Cost
                          </span>
                          <span className="text-2xl font-bold font-mono text-[#252525]">
                            ${combo.total}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase text-[#252525]/60 block">
                            Left in Budget
                          </span>
                          <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                            +${combo.remaining}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-editorial text-lg text-[#252525] mt-3">
                        {combo.title}
                      </h3>

                      {/* Items in this outfit combo */}
                      <div className="space-y-2.5 mt-4">
                        {/* Top / Dress */}
                        <div
                          onClick={() => openProductModal(combo.top)}
                          className="flex items-center justify-between p-2 rounded-xs bg-[#F7F3ED]/80 hover:bg-[#EADDDC]/40 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={combo.top.images[0]}
                              alt={combo.top.title}
                              className="w-10 h-10 object-cover rounded-xs border border-[#B3A49A]/30 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[10px] uppercase font-semibold text-[#743C4A] truncate block">
                                {combo.top.brand}
                              </span>
                              <span className="text-xs text-[#252525] truncate block">
                                {combo.top.title}
                              </span>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-semibold text-[#252525] shrink-0">
                            ${combo.top.price}
                          </span>
                        </div>

                        {/* Bottom (if any) */}
                        {combo.bottom && (
                          <div
                            onClick={() => openProductModal(combo.bottom!)}
                            className="flex items-center justify-between p-2 rounded-xs bg-[#F7F3ED]/80 hover:bg-[#EADDDC]/40 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={combo.bottom.images[0]}
                                alt={combo.bottom.title}
                                className="w-10 h-10 object-cover rounded-xs border border-[#B3A49A]/30 shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="text-[10px] uppercase font-semibold text-[#743C4A] truncate block">
                                  {combo.bottom.brand}
                                </span>
                                <span className="text-xs text-[#252525] truncate block">
                                  {combo.bottom.title}
                                </span>
                              </div>
                            </div>
                            <span className="font-mono text-xs font-semibold text-[#252525] shrink-0">
                              ${combo.bottom.price}
                            </span>
                          </div>
                        )}

                        {/* Accessory (if any) */}
                        {combo.accessory && (
                          <div
                            onClick={() => openProductModal(combo.accessory!)}
                            className="flex items-center justify-between p-2 rounded-xs bg-[#F7F3ED]/80 hover:bg-[#EADDDC]/40 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={combo.accessory.images[0]}
                                alt={combo.accessory.title}
                                className="w-10 h-10 object-cover rounded-xs border border-[#B3A49A]/30 shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="text-[10px] uppercase font-semibold text-[#743C4A] truncate block">
                                  {combo.accessory.brand}
                                </span>
                                <span className="text-xs text-[#252525] truncate block">
                                  {combo.accessory.title}
                                </span>
                              </div>
                            </div>
                            <span className="font-mono text-xs font-semibold text-[#252525] shrink-0">
                              ${combo.accessory.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-[#B3A49A]/20 flex items-center justify-between">
                      <button
                        onClick={() => {
                          addToBag(combo.top);
                          if (combo.bottom) addToBag(combo.bottom);
                          if (combo.accessory) addToBag(combo.accessory);
                        }}
                        className="w-full py-2 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Entire Fit to Bag (${combo.total})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/30 p-8 max-w-lg mx-auto">
                <Sparkles className="w-8 h-8 text-[#743C4A] mx-auto mb-3" />
                <h3 className="font-editorial text-2xl text-[#252525]">
                  Increase Budget for Multi-Piece Outfits
                </h3>
                <p className="text-xs text-[#252525]/75 mt-1">
                  At ${activeBudget}, finding a combined 2-to-3 piece outfit is tight. Try switching to $50, $75, or view the individual single pieces below!
                </p>
                <button
                  onClick={() => setActiveBudget(75)}
                  className="mt-4 px-5 py-2 bg-[#743C4A] text-[#FFFCF8] text-xs rounded-xs hover:bg-[#5E303B] cursor-pointer"
                >
                  Try $75 Budget
                </button>
              </div>
            )}
          </div>
        )}

        {/* Section 2: Individual Clothing Items Under Budget */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#B3A49A]/30">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#252525]">
                Individual Pieces Under ${activeBudget}
              </h2>
              <p className="text-xs text-[#252525]/70 mt-0.5">
                Every single item shown here is priced strictly within your limit.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {['All', 'Going Out', 'Game Day', 'Everyday Essentials', 'Vintage Finds', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryTab(cat)}
                  className={`px-3 py-1 text-xs rounded-xs border transition-colors cursor-pointer shrink-0 ${
                    selectedCategoryTab === cat
                      ? 'bg-[#743C4A] text-[#FFFCF8] border-[#743C4A]'
                      : 'bg-[#FFFCF8] text-[#252525]/75 border-[#B3A49A]/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {availableItemsUnderBudget.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
