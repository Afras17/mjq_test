'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

// Map brands/categories to luxury descriptions to keep database clean but details rich
const getProductDescription = (product: Product) => {
  const brandLower = product.brand.toLowerCase();
  const nameLower = product.name.toLowerCase();

  if (brandLower.includes('fino')) {
    if (nameLower.includes('hair oil')) {
      return 'Formulated with high-penetration beauty essence ingredients, this premium hair oil deeply repairs and coats damaged hair cuticles. Provides a lightweight, non-sticky finish with a subtle floral scent for ultimate shine and hydration.';
    }
    if (nameLower.includes('mask')) {
      return 'The legendary Japanese deep conditioning hair mask. Enriched with Royal Jelly EX, PCA, and Lipidure EX to revive dry, damaged, and color-treated hair. Restores natural elasticity, shine, and moisture from root to tip.';
    }
    return 'A salon-quality treatment designed for intensive damage repair. Formulated with high-penetration ingredients that nourish and strengthen hair cuticles, leaving your hair exceptionally soft, manageable, and radiantly healthy.';
  }

  if (brandLower.includes('marvis')) {
    if (nameLower.includes('mouthwash')) {
      return 'An alcohol-free, concentrated mouthwash designed to energize and cleanse the entire mouth. Infused with refreshing peppermint and spicy cinnamon notes. Dilutes with water to provide a long-lasting, sparkling fresh sensation.';
    }
    return 'An iconic, luxury Italian toothpaste featuring a rich, creamy paste that effectively protects teeth while offering a long-lasting, unique flavor experience. Housed in a beautifully styled, vintage-inspired tube.';
  }

  if (brandLower.includes('proraso')) {
    if (nameLower.includes('wash')) {
      return 'A gentle yet effective cleanser designed to remove dirt, debris, and odors from facial hair while conditioning the beard. Formulated with nourishing ingredients and infused with notes of warm wood and spice.';
    }
    if (nameLower.includes('balm')) {
      return 'Specifically formulated to ease itchiness and soothe discomfort during the first few weeks of beard growth. Moisturizes and softens facial hair, leaving a matte finish and a premium masculine scent.';
    }
    return 'A professional-grade grooming formula crafted in Italy. Designed to protect, soothe, and nourish the skin and facial hair using natural botanical extracts and classic scents.';
  }

  return 'A curated luxury essential from the world\'s finest collection. Expertly formulated with premium ingredients to deliver exceptional results and a sensory experience.';
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Reset exiting state when product changes
  useEffect(() => {
    if (product) {
      setIsExiting(false);
    }
  }, [product]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // 300ms matches animation duration
  }, [onClose]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (product) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, handleClose]);

  if (!product) return null;

  const description = getProductDescription(product);
  const formattedPrice = `Dhs. ${(product.price * quantity).toLocaleString()}`;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      handleClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${
          isExiting ? 'animate-fade-out' : 'animate-fade-in'
        }`}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-4xl bg-white dark:bg-dark-card rounded-luxury shadow-luxury overflow-hidden ${
        isExiting ? 'animate-scale-out' : 'animate-scale-in'
      }`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-text/60 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors duration-300"
          aria-label="Close details"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-[550px] bg-cream dark:bg-dark-border">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right Column: Details */}
          <div className="p-8 md:p-12 flex flex-col justify-between h-full bg-white dark:bg-dark-card">
            <div>
              {/* Brand */}
              <p className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
                {product.brand}
              </p>

              {/* Title */}
              <h2 className="mt-3 font-playfair text-2xl md:text-3xl text-text dark:text-white font-bold leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <p className="mt-4 text-xl font-medium text-text/80 dark:text-gray-200">
                {formattedPrice}
              </p>

              {/* Divider */}
              <div className="w-16 h-[2px] bg-gold/50 my-6" />

              {/* Category tag */}
              <span className="inline-block px-3 py-1 bg-cream dark:bg-dark-border text-text/60 dark:text-gray-400 text-xs tracking-wider uppercase rounded">
                {product.category}
              </span>

              {/* Description */}
              <p className="mt-6 text-sm md:text-base text-text/70 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-border dark:border-dark-border space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center border border-border dark:border-dark-border rounded">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 text-text/60 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-text dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-2 text-text/60 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Main CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-luxury-filled py-3 text-sm"
                >
                  {added ? 'Added to Bag' : 'Add to Bag'}
                </button>
              </div>

              {/* Delivery Info */}
              <p className="text-center text-xs text-text/40 dark:text-gray-500 tracking-wide">
                Free shipping in Dubai & UAE. Same-day delivery available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
