/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  MessageSquare,
  Plus,
  ChevronDown,
  User,
  MapPin,
  Menu,
  X,
  Layers,
  DollarSign,
  School,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAMPUSES } from '../data/campuses';

export const Navbar: React.FC = () => {
  const {
    activeView,
    navigateTo,
    activeCampus,
    changeCampus,
    savedItemIds,
    bagItems,
    openBagDrawer,
    openSellModal,
    searchQuery,
    setSearchQuery,
    conversations,
  } = useApp();

  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalBagCount = bagItems.length;
  const unreadMessagesCount = conversations.filter((c) => c.unread).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeView !== 'shop') {
      navigateTo('shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3ED]/95 backdrop-blur-md border-b border-[#B3A49A]/30 transition-colors">
      {/* Top micro campus & values announcement strip */}
      <div className="bg-[#EADDDC]/60 border-b border-[#B3A49A]/20 px-4 py-1 text-xs text-[#252525]/80">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#743C4A]">Loop & Label</span>
            <span aria-hidden="true" className="text-[#B3A49A]">·</span>
            <span>Good style deserves another loop.</span>
          </div>

          {/* Quick Campus Switcher in top bar */}
          <div className="relative">
            <button
              onClick={() => setIsCampusDropdownOpen(!isCampusDropdownOpen)}
              className="flex items-center gap-1.5 font-medium text-[#252525] hover:text-[#743C4A] transition-colors focus:outline-none cursor-pointer"
              aria-label="Change Campus"
            >
              <MapPin className="w-3.5 h-3.5 text-[#743C4A]" />
              <span className="underline decoration-[#743C4A]/40 underline-offset-2">
                {activeCampus.shortName}
              </span>
              <ChevronDown className="w-3 h-3 text-[#B3A49A]" />
            </button>

            {isCampusDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsCampusDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-64 bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/40 shadow-xl py-2 z-20">
                  <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#B3A49A]">
                    Select Your University
                  </div>
                  {CAMPUSES.map((campus) => (
                    <button
                      key={campus.id}
                      onClick={() => {
                        changeCampus(campus.id);
                        setIsCampusDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex flex-col transition-colors cursor-pointer ${
                        activeCampus.id === campus.id
                          ? 'bg-[#EADDDC]/70 font-semibold text-[#743C4A]'
                          : 'text-[#252525] hover:bg-[#F7F3ED]'
                      }`}
                    >
                      <span className="text-[13px] flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: campus.primaryColor }}
                        />
                        {campus.name}
                      </span>
                      <span className="text-[11px] text-[#252525]/60 ml-4">
                        {campus.city}, {campus.state}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 md:gap-6">
          {/* Brand Wordmark */}
          <button
            onClick={() => navigateTo('home')}
            className="text-left group focus:outline-none whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="font-editorial text-2xl sm:text-3xl tracking-tight text-[#252525] group-hover:text-[#743C4A] transition-colors">
              loop <span className="text-[#743C4A] italic font-normal">&</span> label
            </span>
          </button>

          {/* Quick Search on Desktop */}
          <div className="hidden xl:flex flex-1 max-w-xs">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder={`Search ${activeCampus.shortName} closet...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFCF8] text-xs text-[#252525] pl-8 pr-7 py-2 rounded-sm border border-[#B3A49A]/40 focus:border-[#743C4A] focus:outline-none placeholder:text-[#252525]/45 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-[#B3A49A] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#252525]/40 hover:text-[#252525] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </form>
          </div>

          {/* Primary Nav Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs lg:text-sm font-medium text-[#252525]">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-[#743C4A] transition-colors whitespace-nowrap relative py-1 cursor-pointer ${
                activeView === 'home'
                  ? 'text-[#743C4A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#743C4A]'
                  : 'text-[#252525]'
              }`}
            >
              Discover
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className={`hover:text-[#743C4A] transition-colors whitespace-nowrap relative py-1 cursor-pointer ${
                activeView === 'shop'
                  ? 'text-[#743C4A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#743C4A]'
                  : 'text-[#252525]'
              }`}
            >
              Shop
            </button>

            <button
              onClick={() => navigateTo('loop-closet')}
              className={`hover:text-[#743C4A] transition-colors whitespace-nowrap relative py-1 flex items-center gap-1 cursor-pointer ${
                activeView === 'loop-closet'
                  ? 'text-[#743C4A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#743C4A]'
                  : 'text-[#252525]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#743C4A]" />
              <span>The Loop Closet</span>
            </button>

            <button
              onClick={() => navigateTo('budget-style')}
              className={`hover:text-[#743C4A] transition-colors whitespace-nowrap relative py-1 flex items-center gap-1 cursor-pointer ${
                activeView === 'budget-style'
                  ? 'text-[#743C4A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#743C4A]'
                  : 'text-[#252525]'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-[#743C4A]" />
              <span>Budget Style</span>
            </button>

            <button
              onClick={() => navigateTo('campus-loop')}
              className={`hover:text-[#743C4A] transition-colors whitespace-nowrap relative py-1 flex items-center gap-1 cursor-pointer ${
                activeView === 'campus-loop'
                  ? 'text-[#743C4A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#743C4A]'
                  : 'text-[#252525]'
              }`}
            >
              <School className="w-3.5 h-3.5 text-[#743C4A]" />
              <span>Campus Loop</span>
            </button>

            <button
              onClick={() => navigateTo('saved')}
              className={`hover:text-[#743C4A] transition-colors whitespace-nowrap relative py-1 flex items-center gap-1 cursor-pointer ${
                activeView === 'saved'
                  ? 'text-[#743C4A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#743C4A]'
                  : 'text-[#252525]'
              }`}
            >
              Saved
              {savedItemIds.length > 0 && (
                <span className="text-[11px] font-mono text-[#743C4A]">
                  ({savedItemIds.length})
                </span>
              )}
            </button>

            <button
              onClick={() => navigateTo('messages')}
              className={`hover:text-[#743C4A] transition-colors whitespace-nowrap relative py-1 flex items-center gap-1 cursor-pointer ${
                activeView === 'messages'
                  ? 'text-[#743C4A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#743C4A]'
                  : 'text-[#252525]'
              }`}
            >
              Messages
              {unreadMessagesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#743C4A]" />
              )}
            </button>

            <button
              onClick={() => navigateTo('profile')}
              className={`hover:text-[#743C4A] transition-colors whitespace-nowrap relative py-1 cursor-pointer ${
                activeView === 'profile'
                  ? 'text-[#743C4A] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#743C4A]'
                  : 'text-[#252525]'
              }`}
            >
              My Storefront
            </button>
          </nav>

          {/* Right Actions: Sell Item & Bag */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={openSellModal}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-sm hover:bg-[#5E303B] transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Sell Item</span>
            </button>

            <button
              onClick={openBagDrawer}
              className="relative p-2 text-[#252525] hover:text-[#743C4A] transition-colors rounded-sm cursor-pointer"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalBagCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#743C4A] text-[#FFFCF8] text-[10px] font-bold font-mono flex items-center justify-center">
                  {totalBagCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#252525] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#B3A49A]/30 py-3 space-y-2 bg-[#F7F3ED]">
            <button
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-[#252525] hover:bg-[#EADDDC]/50 rounded-sm"
            >
              Discover
            </button>
            <button
              onClick={() => {
                navigateTo('shop');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-[#252525] hover:bg-[#EADDDC]/50 rounded-sm"
            >
              Shop All Pieces
            </button>
            <button
              onClick={() => {
                navigateTo('loop-closet');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-[#252525] hover:bg-[#EADDDC]/50 rounded-sm flex items-center gap-2"
            >
              <Layers className="w-3.5 h-3.5 text-[#743C4A]" />
              <span>The Loop Closet (Outfit Boards)</span>
            </button>
            <button
              onClick={() => {
                navigateTo('budget-style');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-[#252525] hover:bg-[#EADDDC]/50 rounded-sm flex items-center gap-2"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#743C4A]" />
              <span>Style Within Your Budget</span>
            </button>
            <button
              onClick={() => {
                navigateTo('campus-loop');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-[#252525] hover:bg-[#EADDDC]/50 rounded-sm flex items-center gap-2"
            >
              <School className="w-3.5 h-3.5 text-[#743C4A]" />
              <span>The Campus Loop ({activeCampus.shortName})</span>
            </button>
            <button
              onClick={() => {
                navigateTo('saved');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-[#252525] hover:bg-[#EADDDC]/50 rounded-sm flex items-center justify-between"
            >
              <span>Saved Pieces</span>
              <span className="text-xs text-[#743C4A] font-mono">
                {savedItemIds.length}
              </span>
            </button>
            <button
              onClick={() => {
                navigateTo('messages');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-[#252525] hover:bg-[#EADDDC]/50 rounded-sm flex items-center justify-between"
            >
              <span>Messages & Meetups</span>
              {unreadMessagesCount > 0 && (
                <span className="text-xs text-[#743C4A] font-medium">New</span>
              )}
            </button>
            <button
              onClick={() => {
                navigateTo('profile');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-[#252525] hover:bg-[#EADDDC]/50 rounded-sm"
            >
              My Storefront & Seller Dashboard
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
