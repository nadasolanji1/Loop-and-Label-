/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Upload,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Eye,
  Camera,
  Save,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category, GarmentSize, GarmentCondition, OutfitCategory } from '../types';

export const SellModal: React.FC = () => {
  const {
    isSellModalOpen,
    closeSellModal,
    createListing,
    saveDraft,
    activeCampus,
    showToast,
  } = useApp();

  // Multi-step listing flow (Steps 1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
  ]);
  const [coverImageIndex, setCoverImageIndex] = useState<number>(0);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<Category>('Everyday Essentials');
  const [itemSlot, setItemSlot] = useState<OutfitCategory>('Tops');
  const [size, setSize] = useState<GarmentSize>('S');
  const [color, setColor] = useState('Crimson Red');
  const [condition, setCondition] = useState<GarmentCondition>('Like New');
  const [description, setDescription] = useState('');
  const [fitNotes, setFitNotes] = useState('');

  const [originalPrice, setOriginalPrice] = useState<string>('95');
  const [resalePrice, setResalePrice] = useState<string>('38');
  const [safeMeetupSpot, setSafeMeetupSpot] = useState<string>(
    activeCampus.safeMeetupSpots[0]
  );

  if (!isSellModalOpen) return null;

  // Preset curated sample photos for quick demo selection
  const sampleStockPhotos = [
    { label: 'Leather Jacket', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' },
    { label: 'Merino Knit', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
    { label: 'Denim Jeans', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80' },
    { label: 'Slip Dress', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80' },
    { label: 'Athletic Set', url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80' },
    { label: 'Tote Bag', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' },
  ];

  // Smart Prewritten Description Templates
  const handleApplyDescriptionTemplate = (type: 'gameday' | 'nightout' | 'staple' | 'minimalist') => {
    let text = '';
    const brandName = brand || 'authentic';
    switch (type) {
      case 'gameday':
        text = `Gently worn once for an ${activeCampus.shortName} game day! Incredible ${color || 'collegiate'} color, super cozy and flattering. In ${condition.toLowerCase()} condition with no flaws. Perfect for Saturday tailgates.`;
        break;
      case 'nightout':
        text = `Stunning ${brandName} piece worn once for a chapter formal. Flattering drape in ${color || 'noir'}, pairs effortlessly with strappy heels or boots. Immaculate condition.`;
        break;
      case 'staple':
        text = `Classic everyday ${brandName} wardrobe staple. Great quality fabric, soft feel, and versatile fit. True to size ${size}. Ready to meet between classes on campus!`;
        break;
      case 'minimalist':
        text = `Elevated minimalist essential from ${brandName}. Clean lines, beautiful natural texture in ${color || 'neutral tone'}, and comfortable silhouette for campus days.`;
        break;
    }
    setDescription(text);
    showToast('Applied description template!', 'info');
  };

  const handleAddSampleImage = (url: string) => {
    if (!uploadedImages.includes(url)) {
      setUploadedImages((prev) => [...prev, url]);
    }
  };

  const handleAddCustomImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl.trim() && !uploadedImages.includes(customImageUrl.trim())) {
      setUploadedImages((prev) => [...prev, customImageUrl.trim()]);
      setCustomImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    if (uploadedImages.length <= 1) {
      showToast('You must keep at least 1 image for your listing', 'error');
      return;
    }
    const filtered = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(filtered);
    if (coverImageIndex >= filtered.length) {
      setCoverImageIndex(0);
    }
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (uploadedImages.length === 0) {
        showToast('Please add at least one photo', 'error');
        return false;
      }
    }
    if (step === 2) {
      if (!title.trim() || !brand.trim()) {
        showToast('Please provide both an item title and brand', 'error');
        return false;
      }
    }
    if (step === 3) {
      const price = parseFloat(resalePrice);
      if (isNaN(price) || price <= 0) {
        showToast('Please enter a valid resale price', 'error');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(5, prev + 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSaveDraft = () => {
    saveDraft({
      title: title || 'Untitled Draft',
      brand: brand || 'Brand',
      category,
      size,
      color,
      condition,
      description,
      originalPrice: parseFloat(originalPrice) || 0,
      price: parseFloat(resalePrice) || 0,
      images: uploadedImages,
      coverImageIndex,
      safeMeetupSpot,
    });
    closeSellModal();
  };

  const handlePublish = () => {
    const finalPrice = parseFloat(resalePrice) || 25;
    const origPrice = parseFloat(originalPrice) || finalPrice * 2;

    createListing({
      title: title.trim(),
      brand: brand.trim(),
      price: finalPrice,
      originalPrice: origPrice,
      size,
      category,
      condition,
      images: [uploadedImages[coverImageIndex], ...uploadedImages.filter((_, i) => i !== coverImageIndex)],
      description: description.trim() || `Authentic ${brand} piece in ${condition.toLowerCase()} condition.`,
      fitNotes: fitNotes.trim() || `True to size ${size}.`,
      safeMeetupSpot: safeMeetupSpot || activeCampus.safeMeetupSpots[0],
      itemSlot,
    });

    closeSellModal();
  };

  const stepTitles = [
    '1. Upload & Cover Photo',
    '2. Item Details',
    '3. Resale Pricing',
    '4. Buyer Preview',
    '5. Publish on Campus',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="fixed inset-0" onClick={closeSellModal} aria-hidden="true" />

      <div className="relative bg-[#FFFCF8] w-full max-w-3xl rounded-sm border border-[#B3A49A]/40 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header with Step Progress Bar */}
        <div className="p-4 sm:p-6 border-b border-[#B3A49A]/30 bg-[#F7F3ED]/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#743C4A]">
              Step {currentStep} of 5 · Multi-Step Listing Flow
            </span>
            <h2 className="font-editorial text-2xl text-[#252525]">
              {stepTitles[currentStep - 1]}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraft}
              className="text-xs text-[#743C4A] hover:underline flex items-center gap-1 cursor-pointer mr-2"
              title="Save progress locally"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save Draft</span>
            </button>
            <button
              onClick={closeSellModal}
              className="w-8 h-8 rounded-full bg-[#FFFCF8] text-[#252525] hover:text-[#743C4A] flex items-center justify-center border border-[#B3A49A]/30 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Step Indicator Bar */}
        <div className="h-1 bg-[#EADDDC] w-full">
          <div
            className="h-full bg-[#743C4A] transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Scrollable Step Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-xs text-[#252525]">
          {/* STEP 1: Upload Photos & Select Cover Image */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-editorial text-xl text-[#252525]">
                  Select Listing Photos & Choose Cover Image
                </h3>
                <p className="text-xs text-[#252525]/70 mt-1">
                  Upload photos of your garment. Click any photo to mark it as the main cover photo buyers see first.
                </p>
              </div>

              {/* Photo Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {uploadedImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setCoverImageIndex(i)}
                    className={`relative aspect-[3/4] rounded-xs border overflow-hidden cursor-pointer group ${
                      coverImageIndex === i
                        ? 'border-[#743C4A] ring-2 ring-[#743C4A]'
                        : 'border-[#B3A49A]/40 hover:border-[#743C4A]/60'
                    }`}
                  >
                    <img src={img} alt="listing" className="w-full h-full object-cover" />
                    {coverImageIndex === i && (
                      <span className="absolute top-1.5 left-1.5 bg-[#743C4A] text-[#FFFCF8] text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-xs">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(i);
                      }}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Add Styled Aesthetic Photos */}
              <div className="p-4 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/30 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#743C4A] block">
                  Quick Demo: Pick From Curated Fashion Sample Photos
                </span>
                <div className="flex flex-wrap gap-2">
                  {sampleStockPhotos.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddSampleImage(s.url)}
                      className="px-2.5 py-1 text-xs bg-[#FFFCF8] border border-[#B3A49A]/40 rounded-xs hover:border-[#743C4A] cursor-pointer flex items-center gap-1.5"
                    >
                      <Camera className="w-3 h-3 text-[#743C4A]" />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Image URL input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Or paste external image URL (e.g. Unsplash, Pinterest)..."
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="flex-1 bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-3 rounded-xs focus:border-[#743C4A] focus:outline-none text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddCustomImageUrl}
                  className="px-4 py-2 bg-[#252525] text-[#FFFCF8] rounded-xs text-xs hover:bg-[#743C4A] cursor-pointer"
                >
                  Add Photo
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Item Details & Suggested Templates */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75 mb-1">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vintage IU Crimson Wool Varsity Jacket"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-3 rounded-xs focus:border-[#743C4A] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75 mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aritzia, Champion, Levi's, Reformation"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-3 rounded-xs focus:border-[#743C4A] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-2.5 rounded-xs focus:border-[#743C4A] focus:outline-none cursor-pointer"
                  >
                    <option value="Going Out">Going Out</option>
                    <option value="Game Day">Game Day</option>
                    <option value="Everyday Essentials">Everyday Essentials</option>
                    <option value="Vintage Finds">Vintage Finds</option>
                    <option value="Activewear">Activewear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75 mb-1">
                    Outfit Board Slot
                  </label>
                  <select
                    value={itemSlot}
                    onChange={(e) => setItemSlot(e.target.value as OutfitCategory)}
                    className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-2.5 rounded-xs focus:border-[#743C4A] focus:outline-none cursor-pointer"
                  >
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Bags">Bags</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75 mb-1">
                    Garment Size
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as GarmentSize)}
                    className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-2.5 rounded-xs focus:border-[#743C4A] focus:outline-none cursor-pointer"
                  >
                    <option value="XXS">XXS</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="One Size">One Size</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75 mb-1">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as GarmentCondition)}
                    className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-2.5 rounded-xs focus:border-[#743C4A] focus:outline-none cursor-pointer"
                  >
                    <option value="Brand New with Tags">Brand New with Tags</option>
                    <option value="Like New">Like New</option>
                    <option value="Gently Used">Gently Used</option>
                    <option value="Vintage Character">Vintage Character</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75 mb-1">
                  Color / Shade
                </label>
                <input
                  type="text"
                  placeholder="e.g. Crimson Red, Oatmeal Cream, Washed Black"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-3 rounded-xs focus:border-[#743C4A] focus:outline-none"
                />
              </div>

              {/* Description & Suggested Templates */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75">
                    Description
                  </label>
                  {/* Smart prewritten templates */}
                  <div className="flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3 text-[#743C4A]" />
                    <span className="text-[#252525]/60 mr-1">Insert template:</span>
                    <button
                      type="button"
                      onClick={() => handleApplyDescriptionTemplate('gameday')}
                      className="text-[#743C4A] hover:underline cursor-pointer"
                    >
                      Game Day
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => handleApplyDescriptionTemplate('nightout')}
                      className="text-[#743C4A] hover:underline cursor-pointer"
                    >
                      Night Out
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => handleApplyDescriptionTemplate('staple')}
                      className="text-[#743C4A] hover:underline cursor-pointer"
                    >
                      Staple
                    </button>
                  </div>
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe fit, fabric feel, styling ideas, and garment history..."
                  className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 p-3 rounded-xs focus:border-[#743C4A] focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75 mb-1">
                  Fit Notes & Model Measurements (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fits relaxed on 5'6'' frame, slightly cropped length"
                  value={fitNotes}
                  onChange={(e) => setFitNotes(e.target.value)}
                  className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-3 rounded-xs focus:border-[#743C4A] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Pricing & Campus Meetup */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-editorial text-xl text-[#252525]">
                  Set Fair Resale Pricing & Pickup Point
                </h3>
                <p className="text-xs text-[#252525]/70 mt-1">
                  College resale shoppers love knowing their savings. Enter your original price to display a discount percentage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/30 space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#252525]/75">
                    Original Retail Price ($)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="95"
                    className="w-full bg-[#FFFCF8] border border-[#B3A49A]/40 py-2 px-3 rounded-xs focus:border-[#743C4A] focus:outline-none font-mono text-base"
                  />
                  <span className="text-[11px] text-[#252525]/60 block">
                    What did you pay brand new? (Leave blank if vintage/unknown)
                  </span>
                </div>

                <div className="p-4 bg-[#EADDDC]/40 rounded-xs border border-[#B3A49A]/40 space-y-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#743C4A]">
                    Your Resale Price ($) *
                  </label>
                  <input
                    type="number"
                    value={resalePrice}
                    onChange={(e) => setResalePrice(e.target.value)}
                    placeholder="38"
                    className="w-full bg-[#FFFCF8] border border-[#743C4A] py-2 px-3 rounded-xs focus:outline-none font-mono text-xl font-bold text-[#252525]"
                    required
                  />
                  {parseFloat(originalPrice) > parseFloat(resalePrice) && (
                    <span className="text-xs font-semibold text-[#743C4A] block">
                      Buyers save{' '}
                      {Math.round(
                        ((parseFloat(originalPrice) - parseFloat(resalePrice)) /
                          parseFloat(originalPrice)) *
                          100
                      )}
                      % off retail!
                    </span>
                  )}
                </div>
              </div>

              {/* Safe Meetup Spot */}
              <div className="p-4 bg-[#FFFCF8] rounded-xs border border-[#B3A49A]/40 space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#252525]/80 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#743C4A]" />
                  <span>Designated Safe Campus Meetup Point ({activeCampus.shortName})</span>
                </label>
                <select
                  value={safeMeetupSpot}
                  onChange={(e) => setSafeMeetupSpot(e.target.value)}
                  className="w-full bg-[#F7F3ED] border border-[#B3A49A]/40 text-xs py-2 px-3 rounded-xs focus:border-[#743C4A] focus:outline-none cursor-pointer"
                >
                  {activeCampus.safeMeetupSpots.map((spot, i) => (
                    <option key={i} value={spot}>
                      {spot}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-[#252525]/60 block">
                  Public safety zones only. Never arrange private residence or solitary exchanges.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Live Buyer Preview */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#B3A49A]/30">
                <div>
                  <h3 className="font-editorial text-xl text-[#252525]">
                    Buyer Card Preview
                  </h3>
                  <p className="text-xs text-[#252525]/70">
                    This is exactly how students at {activeCampus.shortName} will view your piece.
                  </p>
                </div>
                <span className="text-xs text-[#743C4A] font-medium bg-[#EADDDC]/60 px-2.5 py-1 rounded-xs">
                  Ready to Publish
                </span>
              </div>

              <div className="max-w-xs mx-auto bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/40 overflow-hidden shadow-md">
                <div className="aspect-[4/5] bg-[#EADDDC]/50 relative">
                  <img
                    src={uploadedImages[coverImageIndex] || uploadedImages[0]}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#FFFCF8]/90 text-[#743C4A] text-[9px] font-semibold uppercase px-2 py-0.5 rounded-xs">
                    New This Week
                  </span>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#252525]/70">
                    <span className="font-semibold uppercase text-[11px] text-[#743C4A]">
                      {brand || 'Brand'}
                    </span>
                    <span className="font-mono text-[11px]">Size {size}</span>
                  </div>
                  <h4 className="text-sm font-medium text-[#252525] truncate">
                    {title || 'Untitled Piece'}
                  </h4>
                  <div className="pt-2 border-t border-[#B3A49A]/20 flex items-baseline justify-between">
                    <span className="text-base font-bold font-mono text-[#252525]">
                      ${resalePrice || '25'}
                    </span>
                    <span className="text-[11px] text-[#252525]/60 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#743C4A]" />
                      <span>{activeCampus.shortName}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Final Review & Publish Confirmation */}
          {currentStep === 5 && (
            <div className="text-center py-6 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#EADDDC] text-[#743C4A] flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-7 h-7" />
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#252525]">
                Ready to Circulate Your Style?
              </h3>

              <p className="text-xs text-[#252525]/75 leading-relaxed">
                By publishing, your piece will appear on the <strong>{activeCampus.name}</strong> marketplace feed and in the <strong>Loop Closet</strong> for students to browse and include in outfit boards.
              </p>

              {/* Local Storage Disclaimer */}
              <div className="p-3 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/40 text-left flex items-start gap-2.5 text-[11px] text-[#252525]/80">
                <AlertCircle className="w-4 h-4 text-[#743C4A] shrink-0 mt-0.5" />
                <span>
                  <strong>Client Session Notice:</strong> In this prototype deployment, newly created listings are stored locally in your browser’s localStorage. A production cloud database is required to broadcast listings in real time across multiple separate user accounts.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 sm:p-6 border-t border-[#B3A49A]/30 bg-[#F7F3ED]/40 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 text-xs font-medium text-[#252525] border border-[#B3A49A]/40 rounded-xs hover:border-[#743C4A] flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={closeSellModal}
              className="px-4 py-2 text-xs text-[#252525]/60 hover:text-[#252525] cursor-pointer"
            >
              Cancel
            </button>
          )}

          {currentStep < 5 ? (
            <button
              onClick={handleNextStep}
              className="px-6 py-2 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="px-7 py-2.5 bg-[#743C4A] text-[#FFFCF8] text-xs font-medium rounded-xs hover:bg-[#5E303B] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Publish to Campus Closet</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
