/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category, GarmentSize, GarmentCondition } from '../types';

export const EditListingModal: React.FC = () => {
  const { itemToEdit, closeEditModal, editListing, activeCampus } = useApp();

  if (!itemToEdit) return null;

  const [title, setTitle] = useState(itemToEdit.title);
  const [brand, setBrand] = useState(itemToEdit.brand);
  const [price, setPrice] = useState(itemToEdit.price.toString());
  const [size, setSize] = useState<GarmentSize>(itemToEdit.size);
  const [condition, setCondition] = useState<GarmentCondition>(itemToEdit.condition);
  const [category, setCategory] = useState<Category>(itemToEdit.category);
  const [description, setDescription] = useState(itemToEdit.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    editListing(itemToEdit.id, {
      title,
      brand,
      price: !isNaN(parsedPrice) && parsedPrice > 0 ? parsedPrice : itemToEdit.price,
      size,
      condition,
      category,
      description,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="fixed inset-0" onClick={closeEditModal} aria-hidden="true" />

      <div className="relative bg-[#FFFCF8] w-full max-w-lg rounded-sm border border-[#B3A49A]/40 shadow-2xl p-6 z-10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#B3A49A]/30">
          <h2 className="font-editorial text-2xl text-[#252525]">
            Edit Listing
          </h2>
          <button
            onClick={closeEditModal}
            className="w-7 h-7 rounded-full bg-[#F7F3ED] text-[#252525] hover:text-[#743C4A] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#252525]/75 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F7F3ED] border border-[#B3A49A]/40 p-2 rounded-xs focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#252525]/75 mb-1">
                Brand
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-[#F7F3ED] border border-[#B3A49A]/40 p-2 rounded-xs focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#252525]/75 mb-1">
                Resale Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#F7F3ED] border border-[#B3A49A]/40 p-2 rounded-xs focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#252525]/75 mb-1">
                Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as GarmentSize)}
                className="w-full bg-[#F7F3ED] border border-[#B3A49A]/40 p-2 rounded-xs"
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
              <label className="block text-[11px] font-semibold uppercase text-[#252525]/75 mb-1">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as GarmentCondition)}
                className="w-full bg-[#F7F3ED] border border-[#B3A49A]/40 p-2 rounded-xs"
              >
                <option value="Brand New with Tags">Brand New with Tags</option>
                <option value="Like New">Like New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Vintage Character">Vintage Character</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#252525]/75 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F7F3ED] border border-[#B3A49A]/40 p-2 rounded-xs focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#B3A49A]/20">
            <button
              type="button"
              onClick={closeEditModal}
              className="px-4 py-2 text-xs text-[#252525]/70"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#743C4A] text-white rounded-xs text-xs font-medium hover:bg-[#5E303B]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
