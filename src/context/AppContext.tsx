/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ListingItem,
  Campus,
  BagItem,
  Conversation,
  ChatMessage,
  OrderReceipt,
  ActiveView,
  Category,
  ToastNotification,
  CuratedCollectionKey,
  StylePreference,
  OutfitBoard,
  ListingDraft,
} from '../types';
import { CAMPUSES, DEFAULT_CAMPUS } from '../data/campuses';
import {
  INITIAL_LISTINGS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_OUTFIT_BOARDS,
} from '../data/mockData';

interface AppContextType {
  items: ListingItem[];
  savedItemIds: string[];
  bagItems: BagItem[];
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  activeCampus: Campus;
  activeView: ActiveView;
  selectedCategoryFilter: Category | 'All';
  selectedCollectionFilter: CuratedCollectionKey;
  searchQuery: string;
  selectedListingModal: ListingItem | null;
  isBagOpen: boolean;
  isSellModalOpen: boolean;
  itemToEdit: ListingItem | null;
  itemToDelete: ListingItem | null;
  activeConversationId: string | null;
  lastOrderReceipt: OrderReceipt | null;
  toasts: ToastNotification[];
  recentlyViewedIds: string[];
  stylePreferences: StylePreference[];
  outfitBoards: OutfitBoard[];
  listingDrafts: ListingDraft[];
  activeBudget: number;
  // Actions
  toggleSave: (itemId: string) => void;
  addToBag: (item: ListingItem, meetupSpot?: string) => void;
  removeFromBag: (itemId: string) => void;
  clearBag: () => void;
  checkoutBag: (meetupSpot: string) => OrderReceipt;
  dismissReceipt: () => void;
  createListing: (
    newItem: Omit<
      ListingItem,
      'id' | 'createdAt' | 'status' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerUniversity' | 'sellerRating' | 'sellerSalesCount'
    >
  ) => ListingItem;
  editListing: (itemId: string, updatedData: Partial<ListingItem>) => void;
  deleteListing: (itemId: string) => void;
  openProductModal: (item: ListingItem) => void;
  closeProductModal: () => void;
  openSellModal: () => void;
  closeSellModal: () => void;
  openEditModal: (item: ListingItem) => void;
  closeEditModal: () => void;
  promptDeleteListing: (item: ListingItem) => void;
  cancelDeleteListing: () => void;
  confirmDeleteListing: () => void;
  openBagDrawer: () => void;
  closeBagDrawer: () => void;
  openConversation: (conversationId: string) => void;
  startConversationForItem: (item: ListingItem) => void;
  sendMessage: (
    conversationId: string,
    text: string,
    meetupLocation?: string,
    meetupTime?: string
  ) => void;
  navigateTo: (
    view: ActiveView,
    category?: Category,
    collection?: CuratedCollectionKey
  ) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategoryFilter: (cat: Category | 'All') => void;
  setSelectedCollectionFilter: (col: CuratedCollectionKey) => void;
  changeCampus: (campusId: string) => void;
  markItemAsSold: (itemId: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  toggleStylePreference: (pref: StylePreference) => void;
  clearRecentlyViewed: () => void;
  // Outfits
  saveOutfitBoard: (board: Omit<OutfitBoard, 'id' | 'createdAt'>) => OutfitBoard;
  deleteOutfitBoard: (boardId: string) => void;
  // Drafts
  saveDraft: (draft: Omit<ListingDraft, 'id' | 'updatedAt'>, draftId?: string) => ListingDraft;
  deleteDraft: (draftId: string) => void;
  setActiveBudget: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Toast notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'info' | 'error' = 'success') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Items state
  const [items, setItems] = useState<ListingItem[]>(() => {
    try {
      const stored = localStorage.getItem('loop_label_items_v4');
      if (stored) {
        const parsed: ListingItem[] = JSON.parse(stored);
        const merged = [...parsed];
        for (const init of INITIAL_LISTINGS) {
          if (!merged.some((m) => m.id === init.id)) {
            merged.push(init);
          }
        }
        return merged;
      }
      return INITIAL_LISTINGS;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  // 2. Saved Item IDs
  const [savedItemIds, setSavedItemIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('loop_label_saved_v4');
      return stored ? JSON.parse(stored) : ['item-1', 'item-4', 'item-13'];
    } catch {
      return ['item-1', 'item-4', 'item-13'];
    }
  });

  // 3. Recently Viewed Item IDs
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('loop_label_recent_v4');
      return stored ? JSON.parse(stored) : ['item-2', 'item-14', 'item-16'];
    } catch {
      return ['item-2', 'item-14', 'item-16'];
    }
  });

  // 4. Style Preferences
  const [stylePreferences, setStylePreferences] = useState<StylePreference[]>(() => {
    try {
      const stored = localStorage.getItem('loop_label_styles_v4');
      return stored ? JSON.parse(stored) : ['Minimalist', 'Night Out', 'Collegiate'];
    } catch {
      return ['Minimalist', 'Night Out', 'Collegiate'];
    }
  });

  // 5. Outfit Boards ("The Loop Closet")
  const [outfitBoards, setOutfitBoards] = useState<OutfitBoard[]>(() => {
    try {
      const stored = localStorage.getItem('loop_label_outfits_v4');
      return stored ? JSON.parse(stored) : INITIAL_OUTFIT_BOARDS;
    } catch {
      return INITIAL_OUTFIT_BOARDS;
    }
  });

  // 6. Listing Drafts
  const [listingDrafts, setListingDrafts] = useState<ListingDraft[]>(() => {
    try {
      const stored = localStorage.getItem('loop_label_drafts_v4');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 7. Active Budget Filter ($25, $50, $75, $100, custom)
  const [activeBudget, setActiveBudget] = useState<number>(50);

  // 8. Bag
  const [bagItems, setBagItems] = useState<BagItem[]>(() => {
    try {
      const stored = localStorage.getItem('loop_label_bag_v4');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 9. Conversations & Messages
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const stored = localStorage.getItem('loop_label_convs_v4');
      return stored ? JSON.parse(stored) : INITIAL_CONVERSATIONS;
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const stored = localStorage.getItem('loop_label_msgs_v4');
      return stored ? JSON.parse(stored) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  // 10. Active Campus
  const [activeCampus, setActiveCampus] = useState<Campus>(() => {
    try {
      const stored = localStorage.getItem('loop_label_campus_v4');
      if (stored) {
        const found = CAMPUSES.find((c) => c.id === stored);
        if (found) return found;
      }
      return DEFAULT_CAMPUS;
    } catch {
      return DEFAULT_CAMPUS;
    }
  });

  // UI Navigation & Modals
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<Category | 'All'>('All');
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState<CuratedCollectionKey>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedListingModal, setSelectedListingModal] = useState<ListingItem | null>(null);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<ListingItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<ListingItem | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-1');
  const [lastOrderReceipt, setLastOrderReceipt] = useState<OrderReceipt | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('loop_label_items_v4', JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_label_saved_v4', JSON.stringify(savedItemIds));
    } catch {}
  }, [savedItemIds]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_label_recent_v4', JSON.stringify(recentlyViewedIds));
    } catch {}
  }, [recentlyViewedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_label_styles_v4', JSON.stringify(stylePreferences));
    } catch {}
  }, [stylePreferences]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_label_outfits_v4', JSON.stringify(outfitBoards));
    } catch {}
  }, [outfitBoards]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_label_drafts_v4', JSON.stringify(listingDrafts));
    } catch {}
  }, [listingDrafts]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_label_bag_v4', JSON.stringify(bagItems));
    } catch {}
  }, [bagItems]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_label_convs_v4', JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_label_msgs_v4', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('loop_label_campus_v4', activeCampus.id);
    } catch {}
  }, [activeCampus]);

  // Actions
  const toggleSave = (itemId: string) => {
    const isCurrentlySaved = savedItemIds.includes(itemId);
    setSavedItemIds((prev) =>
      isCurrentlySaved ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );

    const targetItem = items.find((i) => i.id === itemId);
    if (isCurrentlySaved) {
      showToast(
        targetItem
          ? `Removed "${targetItem.title}" from saved pieces`
          : 'Removed from saved wishlist',
        'info'
      );
    } else {
      showToast(
        targetItem
          ? `Saved "${targetItem.title}" to your wishlist`
          : 'Saved to your wishlist',
        'success'
      );
    }
  };

  const toggleStylePreference = (pref: StylePreference) => {
    setStylePreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
    showToast(`Updated style aesthetic: ${pref}`, 'info');
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewedIds([]);
    showToast('Cleared recently viewed history', 'info');
  };

  const addToBag = (item: ListingItem, meetupSpot?: string) => {
    const spot = meetupSpot || item.safeMeetupSpot || activeCampus.safeMeetupSpots[0];
    setBagItems((prev) => {
      const exists = prev.some((b) => b.item.id === item.id);
      if (exists) {
        showToast(`"${item.title}" is already in your bag`, 'info');
        return prev;
      }
      showToast(`Added "${item.title}" to your shopping bag`, 'success');
      return [...prev, { item, addedAt: new Date().toISOString(), selectedMeetupSpot: spot }];
    });
    setIsBagOpen(true);
  };

  const removeFromBag = (itemId: string) => {
    const target = bagItems.find((b) => b.item.id === itemId);
    setBagItems((prev) => prev.filter((b) => b.item.id !== itemId));
    showToast(
      target ? `Removed "${target.item.title}" from bag` : 'Removed from shopping bag',
      'info'
    );
  };

  const clearBag = () => {
    setBagItems([]);
  };

  const checkoutBag = (meetupSpot: string): OrderReceipt => {
    const subtotal = bagItems.reduce((acc, curr) => acc + curr.item.price, 0);
    const serviceFee = 0;
    const total = subtotal + serviceFee;
    const receipt: OrderReceipt = {
      orderId: `LL-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...bagItems],
      subtotal,
      serviceFee,
      total,
      meetupLocation: meetupSpot,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      buyerName: 'Maya Lin',
      buyerEmail: 'maya.lin@indiana.edu',
    };

    const itemIds = bagItems.map((b) => b.item.id);
    setItems((prev) =>
      prev.map((it) => (itemIds.includes(it.id) ? { ...it, status: 'reserved' } : it))
    );

    setLastOrderReceipt(receipt);
    setBagItems([]);
    showToast('Order confirmed! Campus meetup scheduled with seller.', 'success');
    return receipt;
  };

  const dismissReceipt = () => {
    setLastOrderReceipt(null);
  };

  const createListing = (
    newItemData: Omit<
      ListingItem,
      'id' | 'createdAt' | 'status' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerUniversity' | 'sellerRating' | 'sellerSalesCount'
    >
  ): ListingItem => {
    const newItem: ListingItem = {
      ...newItemData,
      id: `item-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'available',
      sellerId: 'user-maya',
      sellerName: 'Maya Lin (You)',
      sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=eadddc',
      sellerUniversity: activeCampus.name,
      sellerGraduationYear: 'Class of 2025',
      sellerRating: 5.0,
      sellerSalesCount: 15,
      isFeatured: true,
      isNewThisWeek: true,
      styles: ['Minimalist'],
    };

    setItems((prev) => [newItem, ...prev]);
    showToast(`"${newItem.title}" published to ${activeCampus.shortName} closet!`, 'success');
    return newItem;
  };

  const editListing = (itemId: string, updatedData: Partial<ListingItem>) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, ...updatedData } : it))
    );

    if (selectedListingModal && selectedListingModal.id === itemId) {
      setSelectedListingModal((prev) => (prev ? { ...prev, ...updatedData } : null));
    }

    setBagItems((prev) =>
      prev.map((b) =>
        b.item.id === itemId ? { ...b, item: { ...b.item, ...updatedData } } : b
      )
    );

    showToast('Listing updated successfully.', 'success');
    setItemToEdit(null);
  };

  const promptDeleteListing = (item: ListingItem) => {
    setItemToDelete(item);
  };

  const cancelDeleteListing = () => {
    setItemToDelete(null);
  };

  const confirmDeleteListing = () => {
    if (!itemToDelete) return;
    const deletedId = itemToDelete.id;
    const title = itemToDelete.title;

    setItems((prev) => prev.filter((it) => it.id !== deletedId));
    setBagItems((prev) => prev.filter((b) => b.item.id !== deletedId));
    setSavedItemIds((prev) => prev.filter((id) => id !== deletedId));
    setRecentlyViewedIds((prev) => prev.filter((id) => id !== deletedId));

    if (selectedListingModal && selectedListingModal.id === deletedId) {
      setSelectedListingModal(null);
    }

    setItemToDelete(null);
    showToast(`Listing "${title}" deleted from campus closet.`, 'info');
  };

  const deleteListing = (itemId: string) => {
    const target = items.find((i) => i.id === itemId);
    if (target) {
      promptDeleteListing(target);
    }
  };

  const markItemAsSold = (itemId: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, status: 'sold' } : it))
    );
    showToast('Listing marked as sold on campus.', 'info');
  };

  const openProductModal = (item: ListingItem) => {
    setSelectedListingModal(item);
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== item.id);
      return [item.id, ...filtered].slice(0, 10);
    });
  };

  const closeProductModal = () => {
    setSelectedListingModal(null);
  };

  const openSellModal = () => {
    setIsSellModalOpen(true);
  };

  const closeSellModal = () => {
    setIsSellModalOpen(false);
  };

  const openEditModal = (item: ListingItem) => {
    setItemToEdit(item);
  };

  const closeEditModal = () => {
    setItemToEdit(null);
  };

  const openBagDrawer = () => {
    setIsBagOpen(true);
  };

  const closeBagDrawer = () => {
    setIsBagOpen(false);
  };

  const openConversation = (convId: string) => {
    setActiveConversationId(convId);
    setActiveView('messages');
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unread: false } : c))
    );
  };

  const startConversationForItem = (item: ListingItem) => {
    const existing = conversations.find(
      (c) => c.participantId === item.sellerId && c.itemId === item.id
    );

    if (existing) {
      openConversation(existing.id);
      closeProductModal();
      return;
    }

    const convId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: convId,
      participantId: item.sellerId,
      participantName: item.sellerName,
      participantAvatar: item.sellerAvatar,
      participantUniversity: `${item.sellerUniversity} · ${item.sellerGraduationYear || 'Verified'}`,
      itemId: item.id,
      itemTitle: item.title,
      itemPrice: item.price,
      itemImage: item.images[0],
      lastMessage: `Hi ${item.sellerName.split(' ')[0]}! Is this ${item.title} still available for meetup on campus?`,
      lastTimestamp: 'Just now',
      unread: false,
    };

    const firstMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      senderId: 'user-maya',
      senderName: 'Maya Lin',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=eadddc',
      recipientId: item.sellerId,
      text: `Hi ${item.sellerName.split(' ')[0]}! Is this ${item.title} still available for meetup on campus? I can meet near ${item.safeMeetupSpot}.`,
      timestamp: 'Just now',
      proposedMeetupLocation: item.safeMeetupSpot,
    };

    setConversations((prev) => [newConv, ...prev]);
    setMessages((prev) => ({
      ...prev,
      [convId]: [firstMsg],
    }));

    setActiveConversationId(convId);
    setActiveView('messages');
    closeProductModal();
    showToast('Conversation started with seller.', 'info');
  };

  const sendMessage = (
    convId: string,
    text: string,
    meetupLocation?: string,
    meetupTime?: string
  ) => {
    const conv = conversations.find((c) => c.id === convId);
    if (!conv) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      senderId: 'user-maya',
      senderName: 'Maya Lin',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=eadddc',
      recipientId: conv.participantId,
      text,
      timestamp: 'Just now',
      proposedMeetupLocation: meetupLocation,
      proposedMeetupTime: meetupTime,
    };

    setMessages((prev) => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              lastMessage: text,
              lastTimestamp: 'Just now',
            }
          : c
      )
    );

    showToast('Message sent', 'info');

    if (!meetupLocation && (messages[convId]?.length || 0) <= 2) {
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          conversationId: convId,
          senderId: conv.participantId,
          senderName: conv.participantName,
          senderAvatar: conv.participantAvatar,
          recipientId: 'user-maya',
          text: `Thanks for reaching out! Yes, let’s do it. What time works best for you to meet on campus?`,
          timestamp: 'Just now',
        };
        setMessages((prev) => ({
          ...prev,
          [convId]: [...(prev[convId] || []), replyMsg],
        }));
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  lastMessage: replyMsg.text,
                  lastTimestamp: 'Just now',
                  unread: true,
                }
              : c
          )
        );
        showToast(`New reply from ${conv.participantName.split(' ')[0]}`, 'info');
      }, 1400);
    }
  };

  const navigateTo = (
    view: ActiveView,
    category?: Category,
    collection?: CuratedCollectionKey
  ) => {
    if (view === 'sell') {
      openSellModal();
      return;
    }
    setActiveView(view);
    if (category) {
      setSelectedCategoryFilter(category);
    }
    if (collection) {
      setSelectedCollectionFilter(collection);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeCampus = (campusId: string) => {
    const campus = CAMPUSES.find((c) => c.id === campusId);
    if (campus) {
      setActiveCampus(campus);
      showToast(`Switched campus view to ${campus.shortName}`, 'info');
    }
  };

  // Outfit Boards Management ("The Loop Closet")
  const saveOutfitBoard = (board: Omit<OutfitBoard, 'id' | 'createdAt'>): OutfitBoard => {
    const newBoard: OutfitBoard = {
      ...board,
      id: `outfit-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };
    setOutfitBoards((prev) => [newBoard, ...prev]);
    showToast(`Saved "${newBoard.name}" to your Loop Closet boards!`, 'success');
    return newBoard;
  };

  const deleteOutfitBoard = (boardId: string) => {
    setOutfitBoards((prev) => prev.filter((b) => b.id !== boardId));
    showToast('Outfit board removed from your closet.', 'info');
  };

  // Listing Drafts Management
  const saveDraft = (draftData: Omit<ListingDraft, 'id' | 'updatedAt'>, draftId?: string): ListingDraft => {
    const id = draftId || `draft-${Date.now()}`;
    const draft: ListingDraft = {
      ...draftData,
      id,
      updatedAt: new Date().toISOString(),
    };

    setListingDrafts((prev) => {
      const filtered = prev.filter((d) => d.id !== id);
      return [draft, ...filtered];
    });

    showToast('Listing draft saved to your browser session.', 'info');
    return draft;
  };

  const deleteDraft = (draftId: string) => {
    setListingDrafts((prev) => prev.filter((d) => d.id !== draftId));
    showToast('Draft deleted.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        items,
        savedItemIds,
        bagItems,
        conversations,
        messages,
        activeCampus,
        activeView,
        selectedCategoryFilter,
        selectedCollectionFilter,
        searchQuery,
        selectedListingModal,
        isBagOpen,
        isSellModalOpen,
        itemToEdit,
        itemToDelete,
        activeConversationId,
        lastOrderReceipt,
        toasts,
        recentlyViewedIds,
        stylePreferences,
        outfitBoards,
        listingDrafts,
        activeBudget,
        toggleSave,
        addToBag,
        removeFromBag,
        clearBag,
        checkoutBag,
        dismissReceipt,
        createListing,
        editListing,
        deleteListing,
        openProductModal,
        closeProductModal,
        openSellModal,
        closeSellModal,
        openEditModal,
        closeEditModal,
        promptDeleteListing,
        cancelDeleteListing,
        confirmDeleteListing,
        openBagDrawer,
        closeBagDrawer,
        openConversation,
        startConversationForItem,
        sendMessage,
        navigateTo,
        setSearchQuery,
        setSelectedCategoryFilter,
        setSelectedCollectionFilter,
        changeCampus,
        markItemAsSold,
        showToast,
        dismissToast,
        toggleStylePreference,
        clearRecentlyViewed,
        saveOutfitBoard,
        deleteOutfitBoard,
        saveDraft,
        deleteDraft,
        setActiveBudget,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
