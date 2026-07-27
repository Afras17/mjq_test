'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import type { Product } from './types';

/* ═══════════════════════════════════════════
   Types & constants
   ═══════════════════════════════════════════ */

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image_url: string;
  quantity: number;
}

const STORAGE_KEY = 'luxury-cart-v1';

/** Guard rails. localStorage is user-writable, so every bound is enforced on read. */
const MAX_QUANTITY = 99;
const MAX_LINES = 50;
const MAX_TEXT_LENGTH = 200;
const MAX_URL_LENGTH = 2048;

/** Mirrors `images.remotePatterns` in next.config.js. */
const ALLOWED_IMAGE_HOSTS = new Set(['cdn.shopify.com', 'images.unsplash.com']);

/* ═══════════════════════════════════════════
   Sanitisers
   ═══════════════════════════════════════════ */

/**
 * Only same-origin paths and https URLs on hosts Next.js is configured to
 * optimise. Blocks `javascript:`, `data:` and off-allowlist hosts, so a tampered
 * localStorage entry can never reach an <Image src>.
 */
export function isSafeImageUrl(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > MAX_URL_LENGTH) return false;

  // Same-origin absolute path, e.g. "/images/hero-bg.png" (but not "//evil.com").
  if (value.startsWith('/') && !value.startsWith('//')) return true;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ALLOWED_IMAGE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

/** Postgres DECIMAL arrives as a string over the wire — normalise to a number. */
function toPrice(value: unknown): number | null {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100) / 100;
}

function toText(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_TEXT_LENGTH);
}

function toQuantity(value: unknown): number | null {
  const n = Math.trunc(Number(value));
  if (!Number.isFinite(n) || n < 1) return null;
  return Math.min(n, MAX_QUANTITY);
}

function toCartItem(raw: unknown): CartItem | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const candidate = raw as Record<string, unknown>;

  const id = Number(candidate.id);
  const name = toText(candidate.name);
  const brand = toText(candidate.brand);
  const price = toPrice(candidate.price);
  const quantity = toQuantity(candidate.quantity);

  if (!Number.isInteger(id) || id < 0) return null;
  if (name === null || brand === null || price === null || quantity === null) return null;
  if (!isSafeImageUrl(candidate.image_url)) return null;

  return { id, name, brand, price, image_url: candidate.image_url, quantity };
}

/** Treats persisted state as untrusted input: anything malformed is dropped, not thrown. */
function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const items: CartItem[] = [];
  const seen = new Set<number>();

  for (const entry of parsed) {
    if (items.length >= MAX_LINES) break;
    const item = toCartItem(entry);
    if (!item || seen.has(item.id)) continue;
    seen.add(item.id);
    items.push(item);
  }

  return items;
}

/* ═══════════════════════════════════════════
   Reducer
   ═══════════════════════════════════════════ */

type CartAction =
  | { type: 'hydrate'; items: CartItem[] }
  | { type: 'add'; item: CartItem }
  | { type: 'setQuantity'; id: number; quantity: number }
  | { type: 'remove'; id: number }
  | { type: 'clear' };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'hydrate':
      return action.items;

    case 'add': {
      const existing = state.find((line) => line.id === action.item.id);

      if (existing) {
        const quantity = Math.min(existing.quantity + action.item.quantity, MAX_QUANTITY);
        if (quantity === existing.quantity) return state;
        return state.map((line) =>
          line.id === action.item.id ? { ...line, quantity } : line
        );
      }

      if (state.length >= MAX_LINES) return state;
      return [...state, action.item];
    }

    case 'setQuantity': {
      const quantity = toQuantity(action.quantity);
      if (quantity === null) return state.filter((line) => line.id !== action.id);
      return state.map((line) =>
        line.id === action.id ? { ...line, quantity } : line
      );
    }

    case 'remove':
      return state.filter((line) => line.id !== action.id);

    case 'clear':
      return [];

    default:
      return state;
  }
}

/* ═══════════════════════════════════════════
   Context
   ═══════════════════════════════════════════ */

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  /** False until localStorage has been read — guards against hydration mismatch. */
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => boolean;
  setQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Read persisted cart after mount so server and first client render match.
  useEffect(() => {
    try {
      dispatch({ type: 'hydrate', items: parseStoredCart(localStorage.getItem(STORAGE_KEY)) });
    } catch {
      // Private mode / storage disabled — the cart simply stays in memory.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Quota exceeded or storage disabled — non-fatal.
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  /** Returns false when the product can't be represented safely as a cart line. */
  const addItem = useCallback((product: Product, quantity = 1): boolean => {
    const item = toCartItem({ ...product, quantity });
    if (!item) return false;
    dispatch({ type: 'add', item });
    return true;
  }, []);

  const setQuantity = useCallback((id: number, quantity: number) => {
    dispatch({ type: 'setQuantity', id, quantity });
  }, []);

  const removeItem = useCallback((id: number) => dispatch({ type: 'remove', id }), []);
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), []);

  const { itemCount, subtotal } = useMemo(
    () =>
      items.reduce(
        (acc, line) => ({
          itemCount: acc.itemCount + line.quantity,
          subtotal: acc.subtotal + line.price * line.quantity,
        }),
        { itemCount: 0, subtotal: 0 }
      ),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      hydrated,
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      hydrated,
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a <CartProvider>');
  }
  return context;
}

/* ═══════════════════════════════════════════
   Formatting
   ═══════════════════════════════════════════ */

export function formatAED(amount: number): string {
  return `Dhs. ${amount.toLocaleString('en-AE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export { MAX_QUANTITY };
