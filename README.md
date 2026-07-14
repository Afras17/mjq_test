# Luxury.ae — Premium E-Commerce Homepage

A premium, modern homepage for Luxury.ae—a luxury shopping and brand-discovery platform built for the UAE market. This implementation evokes the calm, premium, and trustworthy feel of walking into a boutique in Dubai Mall.

---

## 🛠️ Technology Stack

*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (Custom ivory, gold, and deep black palette)
*   **Database:** Neon PostgreSQL
*   **DB Client:** `@neondatabase/serverless`
*   **Type Checker & Runner:** `tsx`
*   **Icons:** Hand-crafted responsive inline SVGs

---

## ✨ Features Completed

1.  **Premium Navigation & Header:**
    *   Sticky header that transitions from transparent to blurred ivory on scroll.
    *   Gold wordmark logo and navigation links with sliding gold underline hover effects.
    *   Fully responsive slide-out mobile drawer menu.
2.  **Breathtaking Hero Banner:**
    *   90vh cover layout with an editorial flat-lay background image.
    *   Dark gradient overlay with gold accents, serif headlines, and transparent-to-gold CTA hover states.
3.  **Editorial Categories Grid:**
    *   Clean grid showcasing core categories: Beauty, Fashion, Skincare, Fragrance, Lifestyle, and Accessories.
    *   Smooth 1.03x zoom hover transitions and slide-up page entry animations.
4.  **Live Curated Product Grid:**
    *   Fetches real products directly from your Neon PostgreSQL database via Next.js API.
    *   **Loading State:** Shimmering skeleton cards.
    *   **Safeguard:** If a product image fails to load or 404s, the product card gracefully hides itself from the UI to protect layout alignment.
5.  **Product Quick View Modal:**
    *   Clicking "View Details" opens a modal overlay displaying larger photos, detailed descriptions, quantity selector, and "Add to Bag" CTAs.
6.  **Interactive Live Search:**
    *   Header search triggers a modal with auto-focus, popular keywords, and instant filtering of the catalog by name, brand, or category.
7.  **Newsletter Subscription:**
    *   Saves email inputs to the Neon PostgreSQL database with validation and duplicate prevention.
8.  **Persistent Dark Mode:**
    *   Flash-free dark mode toggle that saves user preferences to `localStorage`.

---

## 🗃️ Database Configuration

The application uses **Neon PostgreSQL** serverless architecture.

### Tables Created
1.  **`products`**
    *   `id` (Serial, Primary Key)
    *   `name` (VARCHAR)
    *   `brand` (VARCHAR)
    *   `price` (DECIMAL)
    *   `category` (VARCHAR)
    *   `image_url` (TEXT)
    *   `created_at` (TIMESTAMP)
2.  **`newsletter_emails`**
    *   `id` (Serial, Primary Key)
    *   `email` (VARCHAR, Unique)
    *   `created_at` (TIMESTAMP)

---

## 🚀 Setup & Installation Instructions

Follow these steps to run the project locally:

### 1. Extract and Install Dependencies
Open your terminal in the project directory (`luxury-ae/`) and run:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
DATABASE_URL=your_neon_postgresql_connection_string
```

### 3. Seed the Database
Populate your database with the real product catalog (FINO, PRORASO, MARVIS) and clean images:
```bash
npx tsx src/scripts/seed.ts
```

### 4. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔮 Future Enhancements (With More Time)

If given more time, the following features would be added to scale the application:

1.  **Dynamic Category & Filter Pages:** Dedicated search and landing pages for `/categories/[slug]` allowing users to filter by price range, brand name, and sort by relevance.
2.  **Persistent User Wishlist:** Storing wishlists in the Neon database for authenticated users or `localStorage` for guests.
3.  **Full Shopping Bag & Stripe Checkout:** Integrating a slider-cart drawer and connecting it with Stripe to handle payment transactions in AED.
4.  **Admin Catalog Dashboard:** A secure dashboard permitting brand owners to add, edit, or delete items and view email subscribers.
5.  **Multi-language Support:** An Arabic-English locale toggle featuring right-to-left layout alignments.
