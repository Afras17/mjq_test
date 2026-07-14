'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all products once for local filtering
  useEffect(() => {
    if (isOpen && allProducts.length === 0) {
      setLoading(true);
      fetch('/api/products')
        .then((res) => res.json())
        .then((data) => {
          if (data.products) {
            setAllProducts(data.products);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isOpen, allProducts.length]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Filter products based on query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lower = query.toLowerCase();
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
    setResults(filtered);
  }, [query, allProducts]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Search panel */}
      <div className="relative w-full max-w-2xl mx-4 mt-20 md:mt-32 animate-slide-down">
        <div className="bg-white dark:bg-dark-card rounded-luxury shadow-luxury overflow-hidden">
          {/* Search input */}
          <div className="flex items-center border-b border-border dark:border-dark-border">
            <svg
              className="w-5 h-5 ml-5 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search luxury products, brands..."
              className="w-full px-4 py-5 bg-transparent text-text dark:text-white 
                         placeholder:text-text/40 dark:placeholder:text-gray-500
                         text-base focus:outline-none"
            />
            <button
              onClick={onClose}
              className="px-5 py-5 text-text/40 dark:text-gray-500 hover:text-text dark:hover:text-white 
                         transition-colors"
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {loading && (
              <div className="p-8 text-center text-text/40 dark:text-gray-500 text-sm">
                Loading products...
              </div>
            )}

            {!loading && query && results.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-text/40 dark:text-gray-500 text-sm">
                  No results found for &ldquo;{query}&rdquo;
                </p>
              </div>
            )}

            {results.map((product) => (
              <button
                key={product.id}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-cream dark:hover:bg-dark-border 
                           transition-colors text-left border-b border-border/50 dark:border-dark-border/50 last:border-0"
                onClick={onClose}
              >
                <div className="w-12 h-12 rounded-luxury bg-cream dark:bg-dark-border flex-shrink-0 overflow-hidden relative">
                  {product.image_url && (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gold uppercase tracking-[0.1em]">
                    {product.brand}
                  </p>
                  <p className="text-sm text-text dark:text-gray-200 truncate mt-0.5">
                    {product.name}
                  </p>
                </div>
                <p className="text-sm text-text/70 dark:text-gray-400 flex-shrink-0">
                  Dhs. {product.price.toLocaleString()}
                </p>
              </button>
            ))}
          </div>

          {/* Quick links when no query */}
          {!query && !loading && (
            <div className="p-5 border-t border-border/50 dark:border-dark-border/50">
              <p className="text-xs text-text/40 dark:text-gray-600 uppercase tracking-[0.1em] mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Tom Ford', 'La Mer', 'Chanel', 'Hermès', 'Skincare', 'Fragrance'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 text-xs text-text/60 dark:text-gray-400 
                               border border-border dark:border-dark-border rounded-full
                               hover:border-gold hover:text-gold transition-all duration-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hint */}
        <p className="text-center text-white/40 text-xs mt-3">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">ESC</kbd> to close
        </p>
      </div>
    </div>
  );
}
