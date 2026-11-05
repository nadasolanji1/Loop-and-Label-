# Loop & Label — Campus Fashion Resale Marketplace

Loop & Label is an editorial, peer-to-peer fashion resale marketplace tailored specifically for college campuses, starting with Indiana University Bloomington. It combines the visual curation of a high-end fashion magazine with student-friendly pricing, safe campus meetup exchanges, instant bag checkout, and direct seller messaging.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product design choices were clarified with you in Phase 1 and form the operational foundation of Loop & Label:

- **Confirmed Decision 1 (Campus Handoffs & Exchanges)**: Campus handoffs prioritize safe, designated campus meetup locations (e.g., Indiana Memorial Union, Herman B Wells Library Commons, Student Rec Center) supported by built-in buyer-seller chat.
- **Confirmed Decision 2 (Multi-Campus Architecture)**: Indiana University Bloomington is the active launch campus by default, paired with a quick campus switcher to preview peer universities (Purdue, Ohio State, Michigan, Wisconsin).
- **Confirmed Decision 3 (Dual Transaction Flow)**: Users can both purchase immediately via a slide-over Shopping Bag with simulated instant checkout *and* initiate direct seller chat negotiations to coordinate campus exchanges before buying.

---

## 1. Overview & Core Concept

### What It Does
Loop & Label bridges the gap between students looking for trendy, affordable outfits (for date functions, game days, chapter events, and campus life) and students with underutilized clothing in their dorms or apartments. The app offers:
- A high-aesthetic editorial homepage featuring curated collections and trending pieces.
- A comprehensive **Shop / Discover** catalog with granular campus, category, size, brand, and condition filters.
- An interactive **Product Detail Modal / Page** showcasing condition ratings, garment measurements, seller credibility, and designated safe meetup hubs.
- A seamless **Sell Item** studio allowing students to list pre-loved garments with pricing and meetup preferences in under two minutes.
- Real-time **Buyer & Seller Messaging** with item reference cards and meeting point scheduling.
- A **Slide-over Shopping Bag & Campus Checkout** flow with order confirmation receipts.
- A personalized **Student Storefront & Profile** featuring active listings, saved pieces, and student verification.

### Target Audience & Persona
- **College Students (18–24)**: Value sustainable consumption, personal aesthetics, and affordability. They prefer picking up items between classes over waiting for shipping.
- **Launch Campus**: Indiana University Bloomington (Cream & Crimson game day spirit, active Greek life, vibrant campus community).

### Key Value
- **Zero Shipping Delays & Zero Packaging Waste**: Campus-based exchanges mean handoffs can occur within hours at familiar campus hubs.
- **Accessible Luxury & Curated Vintage**: High fashion and popular campus brands (Aritzia, Reformation, Zara, Levi's, Nike, vintage collegiate) at secondhand student rates.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Aesthetic Direction**: High-end fashion editorial meets curated vintage boutique. Generous whitespace, clean hairline borders, quiet typography, zero garish badges, and warm organic textures.
- **Color Palette**:
  - **Warm Ivory (`#F7F3ED`)**: Primary canvas background for a tactile, editorial paper mood.
  - **Deep Charcoal (`#252525`)**: Primary typography and high-contrast navigational elements.
  - **Muted Burgundy (`#743C4A`)**: Primary brand accent, key CTAs, and distinctive editorial highlights.
  - **Soft Blush (`#EADDDC`)**: Secondary surface tones, category tile backdrops, and active pill backgrounds.
  - **Warm Taupe (`#B3A49A`)**: Hairline borders, dividers, and subtle decorative accents.
  - **Off-White (`#FFFCF8`)**: Crisp product card surfaces.
- **Typography & Scale**:
  - **Display Face**: Editorial Serif (*Playfair Display* / *Cormorant Garamond*) for headlines, section titles, and narrative accents.
  - **Body & Navigation**: Modern Geometric Sans (*DM Sans* / *Plus Jakarta Sans*) for clean readability, filters, and interaction controls.
  - **Pricing & Quantities**: Tabular numerals (`tabular-nums font-mono`) for exact price baselines.
- **Wordmark**: Refined lowercase `"loop & label"` with an editorial ampersand accent in muted burgundy.

### Key User Flows

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            PRIMARY USER FLOWS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [1. Discover & Shop]                                                       │
│    Hero CTA / Category Tiles ──► Catalog View ──► Filter by Campus & Size   │
│                                       │                                     │
│                                       ▼                                     │
│  [2. Product Detail]          Product Card Click                            │
│    Inspect Condition & Story ─────────┴─────────► Quick Save to Wishlist   │
│         │                                                                   │
│         ├──► [Chat Flow] ────────► Message Seller with Campus Spot Proposal │
│         └──► [Bag Flow]  ────────► Add to Bag ──► Slide-over Instant Order  │
│                                                                             │
│  [3. Sell & List]                                                           │
│    "Start Selling" CTA ──► Photo Upload + Garment Specs ──► Publish Item    │
│                                                                  │          │
│                                                                  ▼          │
│  [4. Profile & Closet]                                      Appears in Shop │
│    View Active Listings ──► Manage Orders ──► Edit Campus Verification      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **Homepage Discovery**: Visitors land on an editorial hero image with balanced typography, browse curated category tiles (*Going Out*, *Game Day*, *Everyday Essentials*, *Vintage Finds*, *Activewear*, *Accessories*), review campus trending items, and understand the 3-step circular lifecycle (*Discover, Connect, Rewear*).
2. **Item Exploration & PDP**: Clicking any item opens an inspection view with multiple photo angles, condition notes, seller verified student badge, and suggested campus pickup point.
3. **Conversational Negotiation & Safe Meetup**: Clicking "Message Seller" launches the Messages view pre-populated with an inquiry card for that item, allowing immediate coordination (e.g., "Can we meet at the Herman B Wells Library tomorrow between 2-4 PM?").
4. **Instant Bag Checkout**: Clicking "Add to Bag" updates the bag drawer counter and opens a checkout drawer featuring safe pickup selection, price breakdown, and confirmation toast.
5. **Listing Creation**: Clicking "Sell" opens a frictionless listing studio where students upload photos, set prices, pick categories and sizes, and publish directly to the live feed.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Hybrid Transaction Model (Chat Negotiation + Direct Bag Checkout)
- **Chosen Approach**: Support both direct "Add to Bag" with pickup location selection AND "Message Seller" conversational scheduling.
- **Why**: Resale on college campuses often involves quick questions about fit or sizing before commitment, but impulse purchases for game-day outfits also demand one-click reservation.
- **Alternatives Considered**: Chat-only creates friction for ready-to-buy shoppers; checkout-only prevents personal garment sizing queries common in vintage clothing.

### Decision 2: Curated Client State with LocalStorage Persistence
- **Chosen Approach**: Rich seed dataset of high-fashion and campus-curated pieces with real-time browser storage persistence for new listings, user bag, favorited pieces, and chat threads.
- **Why**: Delivers an immediate, zero-latency investor-grade demonstration without needing external cloud sign-in gates, while ensuring user changes (adding an item, sending a message, saving a piece) persist across page reloads.
- **Alternatives Considered**: Mocking backend with static JSON only would erase user-created listings immediately upon navigation.

### Decision 3: Safety & Campus Verification UX
- **Chosen Approach**: Prominent Safe Meetup Spot tags (e.g., "Indiana Memorial Union Commons", "Wells Library Plaza") and verified student trust indicators on every listing.
- **Why**: Addresses the #1 barrier to peer-to-peer campus exchanges (trust and physical safety).

---

## 4. Technical Architecture & Data Strategy

### System Architecture & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            LOOP & LABEL ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
       ┌──────────────────┐                         ┌──────────────────┐
       │   AppDataContext │ (State & Persistence)   │  Campus Provider │
       │  - Items Catalog │                         │  - Active Campus │
       │  - Saved Items   │                         │  - Meetup Points │
       │  - Bag & Orders  │                         │  - Switcher Hook │
       │  - Chat Messages │                         └──────────────────┘
       └────────┬─────────┘                                   │
                │                                             │
                ▼                                             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 APP SHELL                                   │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Navigation Header                                                     │  │
│  │ [wordmark "loop & label"]  [Campus Switcher]  [Nav Links]  [Bag + Fav]│  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Active View Router                                                    │  │
│  │ ├─ Homepage (Hero, Categories, Trending Grid, Brand Mission)          │  │
│  │ ├─ Shop / Discover (Filter Drawer, Sort, Search, Responsive Grid)     │  │
│  │ ├─ Sell Studio (Multi-step Garment Listing Form with Live Preview)    │  │
│  │ ├─ Saved / Wishlist (Curated Saved Pieces & Quick Bag Actions)        │  │
│  │ ├─ Messages Inbox (Item Inquiries, Conversation Threads, Meetup Pick) │  │
│  │ └─ Student Profile (Closet Storefront, Verified Badge, Sales History) │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Global Drawers & Modals                                               │  │
│  │ ├─ Product Detail Modal (PDP Gallery, Fit Notes, Seller & Safe Hub)   │  │
│  │ ├─ Slide-over Shopping Bag Drawer (Itemized Cart & Checkout)          │  │
│  │ └─ Mobile Bottom Navigation Dock                                      │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Core Entities

```typescript
// 1. Fashion Item
interface ListingItem {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  size: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'One Size';
  category: 'Going Out' | 'Game Day' | 'Everyday Essentials' | 'Vintage Finds' | 'Activewear' | 'Accessories';
  condition: 'Brand New with Tags' | 'Like New' | 'Gently Used' | 'Vintage Character';
  images: string[];
  description: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerUniversity: string;
  sellerRating: number;
  sellerSalesCount: number;
  safeMeetupSpot: string;
  createdAt: string;
  isFeatured?: boolean;
}

// 2. Chat Conversation & Message
interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  itemId?: string;
  text: string;
  timestamp: string;
  proposedMeetupLocation?: string;
  proposedMeetupTime?: string;
}

// 3. Bag / Order Item
interface BagItem {
  item: ListingItem;
  addedAt: string;
  selectedMeetupSpot: string;
}
```

### Development Priorities & Verification Plan
1. **Visual System & Imagery**: Initialize the warm ivory/deep charcoal/burgundy theme with Google Font editorial serifs and generate authentic editorial fashion assets.
2. **Interactive Top Bar & Mobile Navigation**: Implement the 3-zone header with single-line wordmark, campus switcher dropdown, search bar, and bag counter.
3. **Editorial Homepage**: Build the Hero, Category selector tiles, Trending on Campus grid, and 3-step circular fashion guide.
4. **Discover / Shop Catalog with Live Filtering**: Implement instant search, category chips, size/price filters, and university selection.
5. **Item Detail Modal & Quick Actions**: Build the high-fidelity PDP with multi-photo gallery, seller trust card, and instant "Add to Bag" / "Message Seller" actions.
6. **Sell Studio**: Build a functional listing creator that immediately injects new items into the marketplace feed and profile.
7. **Messages & Meetup Scheduler**: Create a functioning peer-to-peer chat interface with pre-linked product cards and safe campus meeting spots.
8. **Shopping Bag & Checkout Drawer**: Complete the purchase confirmation sequence with order receipts and receipt dismissal.
