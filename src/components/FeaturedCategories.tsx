'use client';

import Image from 'next/image';

interface Category {
  name: string;
  image: string;
}

const categories: Category[] = [
  { name: 'Beauty', image: '/images/category-beauty.png' },
  { name: 'Fashion', image: '/images/category-fashion.png' },
  { name: 'Lifestyle', image: '/images/category-lifestyle.png' },
  { name: 'Skincare', image: '/images/category-skincare.png' },
  { name: 'Fragrance', image: '/images/category-fragrance.png' },
  { name: 'Accessories', image: '/images/category-beauty.png' },
];

const staggerDelays = [
  'delay-[0ms]',
  'delay-[100ms]',
  'delay-[200ms]',
  'delay-[300ms]',
  'delay-[400ms]',
  'delay-[500ms]',
];

export default function FeaturedCategories() {
  return (
    <section className="section-padding bg-ivory dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="section-title">Explore Our World</h2>
        <p className="text-center text-text/60 dark:text-gray-400 mt-3 text-sm md:text-base tracking-wide max-w-md mx-auto">
          Curated categories for the discerning connoisseur
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mt-12">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`
                relative overflow-hidden rounded-luxury cursor-pointer group
                aspect-[4/5]
                animate-slide-up opacity-0 [animation-fill-mode:forwards]
                ${staggerDelays[index]}
              `}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Category Label */}
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white font-playfair text-xl md:text-2xl font-semibold tracking-wide">
                  {category.name}
                </h3>
                {/* Gold accent line — expands on hover */}
                <div className="h-[2px] bg-gold mt-2 w-0 group-hover:w-12 transition-all duration-500 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
