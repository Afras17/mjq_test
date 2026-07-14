'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import ProductModal from './ProductModal';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { name: 'All Collection', value: 'all' },
    { name: 'Hair Care', value: 'hair-care' },
    { name: 'Beard & Grooming', value: 'grooming' },
    { name: 'Toothpaste', value: 'toothpaste' },
    { name: 'Mouthwash', value: 'mouthwash' },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'all') return true;
    const nameLower = product.name.toLowerCase();
    const brandLower = product.brand.toLowerCase();

    if (activeFilter === 'hair-care') {
      return (
        brandLower === 'fino' ||
        nameLower.includes('conditioner') ||
        nameLower.includes('shampoo') ||
        nameLower.includes('hair oil') ||
        nameLower.includes('hair mask')
      );
    }
    if (activeFilter === 'grooming') {
      return (
        brandLower === 'proraso' ||
        nameLower.includes('beard') ||
        nameLower.includes('shave')
      );
    }
    if (activeFilter === 'toothpaste') {
      return nameLower.includes('toothpaste');
    }
    if (activeFilter === 'mouthwash') {
      return nameLower.includes('mouthwash');
    }
    return true;
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/products');

      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="section-padding bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center">
          <h2 className="section-title">Curated For You</h2>
          <p className="mt-4 text-text/60 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Handpicked luxury essentials from the world&apos;s finest brands
          </p>

          {/* Luxury Filter Tabs */}
          {!loading && !error && products.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-10 border-b border-border/50 dark:border-dark-border/50 pb-4 max-w-2xl mx-auto">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`text-xs md:text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 pb-2 relative ${
                    activeFilter === filter.value
                      ? 'text-gold'
                      : 'text-text/60 dark:text-gray-400 hover:text-text dark:hover:text-white'
                  }`}
                >
                  {filter.name}
                  {activeFilter === filter.value && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="mt-12 text-center py-16">
            <svg
              className="w-12 h-12 mx-auto text-border dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-text/60 dark:text-gray-400 text-sm mb-6">
              {error}
            </p>
            <button onClick={fetchProducts} className="btn-luxury-filled text-sm">
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="mt-12 text-center py-16">
            <svg
              className="w-12 h-12 mx-auto text-border dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <p className="text-text/60 dark:text-gray-400 text-sm">
              No products available at the moment
            </p>
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onViewDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Empty filtered results state */}
        {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
          <div className="mt-12 text-center py-16">
            <p className="text-text/60 dark:text-gray-400 text-sm">
              No products found in this category
            </p>
          </div>
        )}
      </div>

      {/* Product Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
