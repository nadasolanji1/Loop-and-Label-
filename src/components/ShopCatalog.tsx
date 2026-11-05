/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Sparkles,
  RotateCcw,
  LayoutGrid,
  Grid3X3,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Category, GarmentSize, GarmentCondition } from '../types';
import { CuratedCollectionsBar } from './CuratedCollectionsBar';
import { PersonalizedRecommendations } from './PersonalizedRecommendations';
import { RecentlyViewedBar } from './RecentlyViewedBar';
import { CURATED_COLLECTIONS } from '../data/mockData';

export const ShopCatalog: React.FC = () => {
  const {
    items,
    activeCampus,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedCollectionFilter,
    setSelectedCollectionFilter,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [selectedSize, setSelectedSize] = useState<GarmentSize | 'All'>('All');
  const [selectedCondition, setSelectedCondition] = useState<GarmentCondition | 'All'>('All');
  const [priceRange, setPriceRange] = useState<'all' | 'under30' | '30to60' | '60to100' | 'over100'>('all');
  const [campusOnly, setCampusOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'standard'>('editorial');

  const categories: (Category | 'All')[] = [
    'All',
    'Going Out',
    'Game Day',
    'Everyday Essentials',
    'Vintage Finds',
    'Activewear',
    'Accessories',
  ];

  const sizes: (GarmentSize | 'All')[] = ['All', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'One Size'];

  const currentCollection = CURATED_COLLECTIONS.find((c) => c.key === selectedCollectionFilter);

  // Filter & Sort logic
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchBrand = item.brand.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          if (!matchTitle && !matchBrand && !matchDesc) return false;
        }

        // Curated Collection Filter
        if (selectedCollectionFilter && selectedCollectionFilter !== 'all') {
          switch (selectedCollectionFilter) {
            case 'new-this-week':
              if (!item.isNewThisWeek) return false;
              break;
            case 'trending-campus':
              if (!item.isFeatured && item.sellerUniversity !== activeCampus.name) return false;
              break;
            case 'under-25':
              if (item.price > 25) return false;
              break;
            case 'game-day':
              if (item.category !== 'Game Day') return false;
              break;
            case 'going-out':
              if (item.category !== 'Going Out') return false;
              break;
            case 'vintage-unique':
              if (item.category !== 'Vintage Finds') return false;
              break;
          }
        }

        // Category
        if (selectedCategoryFilter !== 'All' && item.category !== selectedCategoryFilter) {
          return false;
        }

        // Size
        if (selectedSize !== 'All' && item.size !== selectedSize) {
          return false;
        }

        // Condition
        if (selectedCondition !== 'All' && item.condition !== selectedCondition) {
          return false;
        }

        // Price
        if (priceRange === 'under30' && item.price >= 30) return false;
        if (priceRange === '30to60' && (item.price < 30 || item.price > 60)) return false;
        if (priceRange === '60to100' && (item.price < 60 || item.price > 100)) return false;
        if (priceRange === 'over100' && item.price < 100) return false;

        // Campus
        if (campusOnly && item.sellerUniversity !== activeCampus.name) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    items,
    searchQuery,
    selectedCollectionFilter,
    selectedCategoryFilter,
    selectedSize,
    selectedCondition,
    priceRange,
    campusOnly,
    sortBy,
    activeCampus,
  ]);

  const resetAllFilters = () => {
    setSelectedCategoryFilter('All');
    setSelectedCollectionFilter('all');
    setSelectedSize('All');
    setSelectedCondition('All');
    setPriceRange('all');
    setCampusOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    (selectedCollectionFilter && selectedCollectionFilter !== 'all') ||
    selectedCategoryFilter !== 'All' ||
    selectedSize !== 'All' ||
    selectedCondition !== 'All' ||
    priceRange !== 'all' ||
    campusOnly ||
    searchQuery.trim().length > 0;

  return (
    <div className="bg-[#F7F3ED] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Search Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#B3A49A]/30 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#743C4A] block mb-1">
              Campus Fashion Resale
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#252525] tracking-tight">
              {currentCollection ? currentCollection.title : 'The Campus Closet'}
            </h1>
            <p className="text-xs sm:text-sm text-[#252525]/70 mt-1 max-w-xl">
              {currentCollection
                ? currentCollection.subtitle
                : `Authentic secondhand clothing circulating through ${activeCampus.name} and neighboring campuses.`}
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Search by brand, item, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFCF8] text-xs text-[#252525] pl-9 pr-8 py-2.5 rounded-sm border border-[#B3A49A]/40 focus:border-[#743C4A] focus:outline-none placeholder:text-[#252525]/45"
            />
            <Search className="w-4 h-4 text-[#B3A49A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#252525]/50 hover:text-[#252525] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Curated Collections Bar */}
        <div className="pt-6 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#743C4A]">
              Curated Edit & Moods
            </span>
            {selectedCollectionFilter !== 'all' && (
              <button
                onClick={() => setSelectedCollectionFilter('all')}
                className="text-[11px] text-[#743C4A] hover:underline cursor-pointer"
              >
                View All Curations
              </button>
            )}
          </div>
          <CuratedCollectionsBar />
        </div>

        {/* Category Filter Tabs Bar */}
        <div className="py-4 border-b border-[#B3A49A]/20 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                  selectedCategoryFilter === cat
                    ? 'bg-[#743C4A] text-[#FFFCF8] shadow-xs'
                    : 'bg-[#FFFCF8] text-[#252525]/80 border border-[#B3A49A]/30 hover:border-[#743C4A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Controls Bar */}
        <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left filters: Size, Condition, Price, Campus */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Size Dropdown */}
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value as any)}
              className="bg-[#FFFCF8] border border-[#B3A49A]/40 text-[#252525] py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#743C4A] cursor-pointer"
            >
              <option value="All">Size: All</option>
              {sizes.filter((s) => s !== 'All').map((s) => (
                <option key={s} value={s}>
                  Size: {s}
                </option>
              ))}
            </select>

            {/* Condition Dropdown */}
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value as any)}
              className="bg-[#FFFCF8] border border-[#B3A49A]/40 text-[#252525] py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#743C4A] cursor-pointer"
            >
              <option value="All">Condition: All</option>
              <option value="Brand New with Tags">Brand New with Tags</option>
              <option value="Like New">Like New</option>
              <option value="Gently Used">Gently Used</option>
              <option value="Vintage Character">Vintage Character</option>
            </select>

            {/* Price Dropdown */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as any)}
              className="bg-[#FFFCF8] border border-[#B3A49A]/40 text-[#252525] py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#743C4A] cursor-pointer"
            >
              <option value="all">Price: Any</option>
              <option value="under30">Under $30</option>
              <option value="30to60">$30 – $60</option>
              <option value="60to100">$60 – $100</option>
              <option value="over100">$100+</option>
            </select>

            {/* Campus Toggle */}
            <button
              onClick={() => setCampusOnly(!campusOnly)}
              className={`py-1.5 px-3 border rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                campusOnly
                  ? 'bg-[#EADDDC] border-[#743C4A] text-[#743C4A] font-semibold'
                  : 'bg-[#FFFCF8] border-[#B3A49A]/40 text-[#252525] hover:border-[#743C4A]'
              }`}
            >
              <span>{activeCampus.shortName} Only</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="py-1.5 px-2.5 text-[#743C4A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Layout Toggle & Sort By */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-[#FFFCF8] border border-[#B3A49A]/40 rounded-xs p-0.5">
              <button
                onClick={() => setLayoutMode('editorial')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-xs flex items-center gap-1 transition-colors cursor-pointer ${
                  layoutMode === 'editorial'
                    ? 'bg-[#743C4A] text-[#FFFCF8]'
                    : 'text-[#252525]/70 hover:text-[#252525]'
                }`}
                title="Editorial Lookbook View (dynamic aspect ratios)"
              >
                <Grid3X3 className="w-3 h-3" />
                <span>Editorial</span>
              </button>
              <button
                onClick={() => setLayoutMode('standard')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-xs flex items-center gap-1 transition-colors cursor-pointer ${
                  layoutMode === 'standard'
                    ? 'bg-[#743C4A] text-[#FFFCF8]'
                    : 'text-[#252525]/70 hover:text-[#252525]'
                }`}
                title="Standard E-commerce Grid"
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Grid</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#252525]/60 text-[11px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFFCF8] border border-[#B3A49A]/40 text-[#252525] py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#743C4A] cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="newest">Just Listed</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="py-2.5 flex flex-wrap items-center gap-2 text-xs border-b border-[#B3A49A]/20">
            <span className="text-[#252525]/60 text-[11px] uppercase tracking-wider">Active Filters:</span>
            {selectedCollectionFilter !== 'all' && (
              <button
                onClick={() => setSelectedCollectionFilter('all')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFCF8] border border-[#743C4A]/50 rounded-xs text-[#743C4A] hover:bg-[#EADDDC]/40 cursor-pointer"
              >
                <span>Curated: {currentCollection?.title || selectedCollectionFilter}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedCategoryFilter !== 'All' && (
              <button
                onClick={() => setSelectedCategoryFilter('All')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFCF8] border border-[#743C4A]/50 rounded-xs text-[#743C4A] hover:bg-[#EADDDC]/40 cursor-pointer"
              >
                <span>Category: {selectedCategoryFilter}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedSize !== 'All' && (
              <button
                onClick={() => setSelectedSize('All')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFCF8] border border-[#743C4A]/50 rounded-xs text-[#743C4A] hover:bg-[#EADDDC]/40 cursor-pointer"
              >
                <span>Size: {selectedSize}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedCondition !== 'All' && (
              <button
                onClick={() => setSelectedCondition('All')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFCF8] border border-[#743C4A]/50 rounded-xs text-[#743C4A] hover:bg-[#EADDDC]/40 cursor-pointer"
              >
                <span>Condition: {selectedCondition}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {priceRange !== 'all' && (
              <button
                onClick={() => setPriceRange('all')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFCF8] border border-[#743C4A]/50 rounded-xs text-[#743C4A] hover:bg-[#EADDDC]/40 cursor-pointer"
              >
                <span>
                  Price:{' '}
                  {priceRange === 'under30'
                    ? '< $30'
                    : priceRange === '30to60'
                    ? '$30–$60'
                    : priceRange === '60to100'
                    ? '$60–$100'
                    : '$100+'}
                </span>
                <X className="w-3 h-3" />
              </button>
            )}
            {campusOnly && (
              <button
                onClick={() => setCampusOnly(false)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFCF8] border border-[#743C4A]/50 rounded-xs text-[#743C4A] hover:bg-[#EADDDC]/40 cursor-pointer"
              >
                <span>{activeCampus.shortName} Only</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFCF8] border border-[#743C4A]/50 rounded-xs text-[#743C4A] hover:bg-[#EADDDC]/40 cursor-pointer"
              >
                <span>Search: "{searchQuery}"</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Results Metadata Bar */}
        <div className="pt-2 pb-6 flex items-center justify-between text-xs text-[#252525]/60 border-b border-[#B3A49A]/20">
          <span>
            Showing <strong className="text-[#252525] font-mono">{filteredItems.length}</strong>{' '}
            {filteredItems.length === 1 ? 'piece' : 'pieces'}
          </span>
          <span className="flex items-center gap-2">
            {selectedCollectionFilter !== 'all' && (
              <span className="text-[#743C4A] font-medium">
                Curation: {currentCollection?.title}
              </span>
            )}
            {selectedCategoryFilter !== 'All' && (
              <span>· Category: {selectedCategoryFilter}</span>
            )}
          </span>
        </div>

        {/* Product Grid or Empty State */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                layoutVariant={layoutMode}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#EADDDC] text-[#743C4A] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl text-[#252525]">No Pieces Found</h3>
            <p className="text-xs text-[#252525]/70 mt-1 leading-relaxed">
              We couldn’t find any clothing matching your current search and filters in this curation. Try clearing some filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-5 px-5 py-2.5 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-sm hover:bg-[#5E303B] transition-colors cursor-pointer shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Embedded Tailored Recommendations */}
      <div className="mt-16">
        <PersonalizedRecommendations />
      </div>

      {/* Embedded Recently Viewed Shelf */}
      <RecentlyViewedBar />
    </div>
  );
};
