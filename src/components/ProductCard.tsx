'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const formattedPrice = `Dhs. ${product.price.toLocaleString()}`;

  return (
    <div
      className="product-card group overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream dark:bg-dark-border">
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-cream dark:bg-dark-border">
            <svg
              className="w-12 h-12 text-border dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        ) : (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={() => setImgError(true)}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
          <button className="btn-luxury text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            View Details
          </button>
        </div>

        {/* Wishlist heart */}
        <button
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 w-9 h-9 bg-white/90 dark:bg-dark-card/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-dark-card shadow-sm"
          aria-label="Add to wishlist"
        >
          <svg
            className="w-4 h-4 text-text dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Text area */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-[0.15em] text-gold font-medium">
          {product.brand}
        </p>
        <h3 className="text-sm md:text-base text-text dark:text-gray-200 font-medium mt-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-text/70 dark:text-gray-400">
          {formattedPrice}
        </p>
      </div>
    </div>
  );
}
