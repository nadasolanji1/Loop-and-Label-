/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { TrendingCampus } from './components/TrendingCampus';
import { HowItWorks } from './components/HowItWorks';
import { ShopCatalog } from './components/ShopCatalog';
import { LoopClosetView } from './components/LoopClosetView';
import { BudgetStyleView } from './components/BudgetStyleView';
import { CampusLoopView } from './components/CampusLoopView';
import { MessagesView } from './components/MessagesView';
import { SavedView } from './components/SavedView';
import { ProfileView } from './components/ProfileView';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SellModal } from './components/SellModal';
import { EditListingModal } from './components/EditListingModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { MobileNav } from './components/MobileNav';
import { ToastContainer } from './components/ToastContainer';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3ED] text-[#252525] pb-16 md:pb-0">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <FeaturedCategories />
            <TrendingCampus />
            <HowItWorks />
          </>
        )}

        {activeView === 'shop' && <ShopCatalog />}

        {activeView === 'loop-closet' && <LoopClosetView />}

        {activeView === 'budget-style' && <BudgetStyleView />}

        {activeView === 'campus-loop' && <CampusLoopView />}

        {activeView === 'saved' && <SavedView />}

        {activeView === 'messages' && <MessagesView />}

        {activeView === 'profile' && <ProfileView />}

        {activeView === 'sell' && <ShopCatalog />}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Global Interactive Overlays & Modals */}
      <ProductDetailModal />
      <SellModal />
      <EditListingModal />
      <DeleteConfirmModal />
      <ShoppingBagDrawer />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Mobile Bottom Dock Navigation */}
      <MobileNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
