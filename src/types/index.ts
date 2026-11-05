/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category =
  | 'Going Out'
  | 'Game Day'
  | 'Everyday Essentials'
  | 'Vintage Finds'
  | 'Activewear'
  | 'Accessories';

export type GarmentSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'One Size';

export type GarmentCondition =
  | 'Brand New with Tags'
  | 'Like New'
  | 'Gently Used'
  | 'Vintage Character';

export interface Campus {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  primaryColor: string;
  safeMeetupSpots: string[];
}

export type CuratedCollectionKey =
  | 'all'
  | 'new-this-week'
  | 'trending-campus'
  | 'under-25'
  | 'game-day'
  | 'going-out'
  | 'vintage-unique';

export type StylePreference =
  | 'Minimalist'
  | 'Vintage 90s'
  | 'Collegiate'
  | 'Night Out'
  | 'Athleisure';

export type OutfitCategory =
  | 'Tops'
  | 'Bottoms'
  | 'Dresses'
  | 'Shoes'
  | 'Bags'
  | 'Accessories';

export type OutfitTheme =
  | 'Class Day'
  | 'Going Out'
  | 'Game Day'
  | 'Coffee Date'
  | 'Weekend Brunch'
  | 'Vacation'
  | 'Pilates & Activewear';

export interface ListingItem {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  size: GarmentSize;
  category: Category;
  condition: GarmentCondition;
  images: string[];
  description: string;
  fitNotes?: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerUniversity: string;
  sellerGraduationYear?: string;
  sellerRating: number;
  sellerSalesCount: number;
  safeMeetupSpot: string;
  createdAt: string;
  isFeatured?: boolean;
  isNewThisWeek?: boolean;
  styles?: StylePreference[];
  tags?: string[];
  status: 'available' | 'reserved' | 'sold';
  itemSlot?: OutfitCategory;
}

export interface OutfitBoard {
  id: string;
  name: string;
  theme: OutfitTheme;
  description?: string;
  itemIds: {
    topId?: string;
    bottomId?: string;
    dressId?: string;
    shoesId?: string;
    bagId?: string;
    accessoryId?: string;
  };
  createdAt: string;
  isCustom?: boolean;
}

export interface ListingDraft {
  id: string;
  title: string;
  brand: string;
  category: Category;
  size: GarmentSize;
  color?: string;
  condition: GarmentCondition;
  description: string;
  originalPrice?: number;
  price?: number;
  images: string[];
  coverImageIndex: number;
  safeMeetupSpot?: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  text: string;
  timestamp: string;
  proposedMeetupLocation?: string;
  proposedMeetupTime?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantUniversity: string;
  itemId?: string;
  itemTitle?: string;
  itemPrice?: number;
  itemImage?: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: boolean;
}

export interface BagItem {
  item: ListingItem;
  addedAt: string;
  selectedMeetupSpot: string;
}

export interface OrderReceipt {
  orderId: string;
  items: BagItem[];
  subtotal: number;
  serviceFee: number;
  total: number;
  meetupLocation: string;
  date: string;
  buyerName: string;
  buyerEmail: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export type ActiveView =
  | 'home'
  | 'shop'
  | 'loop-closet'
  | 'budget-style'
  | 'campus-loop'
  | 'sell'
  | 'saved'
  | 'messages'
  | 'profile';
