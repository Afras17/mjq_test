'use client';

export default function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-luxury shadow-card overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-[3/4] skeleton" />

      {/* Text skeletons */}
      <div className="p-4">
        <div className="h-3 w-20 skeleton rounded" />
        <div className="h-4 w-3/4 skeleton rounded mt-2" />
        <div className="h-4 w-16 skeleton rounded mt-2" />
      </div>
    </div>
  );
}
