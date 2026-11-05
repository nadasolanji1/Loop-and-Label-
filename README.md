# Loop & Label — Campus Fashion Resale Marketplace

> *"Good style deserves another loop."*

Loop & Label is an editorial, college-focused fashion resale web application designed to make circular fashion affordable, accessible, and social on university campuses. Founded for students at **Indiana University Bloomington** and expanding to peer universities (Purdue, UT Austin, Michigan, and Ohio State).

---

## Key Features

### 1. The Loop Closet (Interactive Outfit Mood Boards)
- Create Pinterest-style fashion collage boards using authentic marketplace listings.
- Select and swap items across **Tops, Bottoms, Dresses, Shoes, Bags, and Accessories**.
- Curate outfits by occasion themes: *Class Day, Going Out, Game Day, Coffee Date, Weekend Brunch, Vacation, Pilates & Activewear*.
- Auto-calculates combined total outfit cost with instant links to inspect each garment listing.
- Save and name custom boards locally with persistent browser storage.

### 2. Style Within Your Budget
- Enter a target spend ($25, $50, $75, $100, or any custom amount).
- Automatically curates marketplace listings strictly within that price limit.
- Features an automated **"Build an Outfit"** generator that pairs real tops, bottoms, and accessories without exceeding your chosen budget, displaying remaining balance and one-click add-to-bag.

### 3. The Campus Loop (Hyperlocal University Network)
- Dedicated multi-campus feed for **Indiana University Bloomington**, **Purdue University**, **University of Texas at Austin**, **University of Michigan**, and **The Ohio State University**.
- Campus-tailored collections (e.g. crimson & cream game day vintage, maize & blue puffers, burnt orange corduroys).
- **Public Campus Meetup Safety Constitution**: lists designated, well-lit university landmarks (student unions, central libraries, rec centers) with explicit disclaimers forbidding private dorm exchanges.

### 4. 5-Step Selling Experience & Seller Dashboard
- Multi-step listing flow:
  1. Photo upload with interactive **Cover Photo Selector**.
  2. Item details with **smart prewritten description templates** (Game Day, Night Out, Everyday Staple, Minimalist).
  3. Original retail vs. resale pricing with automatic buyer savings percentage calculator.
  4. Live exact **Buyer Card Preview**.
  5. Publish with instant campus storefront broadcast.
- **Seller Dashboard**: manage active pieces, track completed sales and total earnings, and resume saved draft listings.

### 5. Curated Fashion Discovery & Editorial Layout
- Collections: *New This Week, Trending on Your Campus, Under $25 Steals, Game Day Finds, Going Out Favorites, Vintage & One-of-a-Kind*.
- **Editorial Lookbook vs. Standard Grid** layout toggle with dynamic masonry aspect ratios.
- Quick View hover overlay and save-to-wishlist micro-interactions.
- Personalized recommendations ("Curated for Your Taste") based on saved pieces and interactive aesthetic preferences (*Minimalist, Vintage 90s, Collegiate, Night Out, Athleisure*).
- Recently inspected pieces history shelf with one-click clear.

---

## Technical Stack

- **Framework**: React 19 (SPA with TypeScript)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` with `@import "tailwindcss";` and `@theme`)
- **Typography**: Cormorant Garamond (Editorial Serif) & Plus Jakarta Sans
- **Icons**: Lucide React
- **Build Tool**: Vite 8
- **State & Storage**: React Context + HTML5 LocalStorage persistence

---

## Demo vs. Production Functionality

| Feature | In Demo Prototype | In Full Production (with Cloud Backend) |
|---|---|---|
| **Browsing & Filtering** | Fully functional across all campuses and categories | Unchanged |
| **The Loop Closet Boards** | Creates, calculates, and saves boards in browser `localStorage` | Syncs boards to user cloud profile and social feed |
| **Style Within Your Budget** | Calculates real combinations from active listings | Real-time multi-seller cart checkout |
| **Creating & Editing Listings**| Saved immediately to client session `localStorage` | Stored in PostgreSQL (Cloud SQL) or Firestore, visible to other users |
| **Buyer-Seller Messaging** | Interactive local mock chat with instant simulated replies | Real-time WebSockets / Firebase Cloud Messaging |
| **Campus Exchanges** | Generates order confirmation receipts and coordinates safe spots | In-app escrow payments (Stripe) and QR code meetup verification |

---

## Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/loop-and-label.git
   cd loop-and-label
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Type check & Build**:
   ```bash
   npm run lint    # runs tsc --noEmit
   npm run build   # runs vite build into dist/
   ```

---

## Deployment to GitHub & Vercel

### Step 1: Push to GitHub

1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Loop & Label campus fashion resale marketplace"
   ```

2. Create a new repository on [GitHub](https://github.com/new) named `loop-and-label`.

3. Link and push your repository:
   ```bash
   git remote add origin https://github.com/your-username/loop-and-label.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

1. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Select your GitHub repository `loop-and-label`.
3. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (or `vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. The included `vercel.json` ensures that direct routing and browser refreshes work flawlessly without 404 errors.
5. Click **"Deploy"**. Within seconds, your live production URL (e.g. `https://loop-and-label.vercel.app`) will be active.

---

## License

Apache-2.0
