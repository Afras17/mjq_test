import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.png"
        alt="Luxury lifestyle background"
        fill
        className="object-cover"
        priority
        quality={90}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] items-center justify-center px-6">
        <div className="max-w-3xl text-center opacity-0 animate-fade-in">
          {/* Eyebrow */}
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
            The Art of Luxury
          </p>

          {/* Headline */}
          <h1 className="mt-6 font-playfair text-hero font-bold leading-tight text-white">
            Discover Timeless Elegance
          </h1>

          {/* Gold Divider */}
          <div className="gold-divider mx-auto mt-6" />

          {/* Subheading */}
          <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-white/80 md:text-xl">
            Your premier destination for luxury beauty, fashion, and lifestyle
            in the UAE. Curated collections from the world&apos;s most coveted
            brands.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <a href="/shop" className="btn-luxury">
              Explore Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
