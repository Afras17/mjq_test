import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroBanner />

      {/* Categories Section */}
      <section id="categories">
        <FeaturedCategories />
      </section>

      {/* Products Section */}
      <section id="products">
        <FeaturedProducts />
      </section>

      {/* Brand Marquee / Trust Section */}
      <section className="py-12 md:py-16 bg-cream dark:bg-dark-card border-y border-border dark:border-dark-border overflow-hidden">
        <div className="luxury-container px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-text/40 dark:text-gray-500 mb-8">
            Trusted by the finest brands
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {['FINO', 'MARVIS', 'PRORASO', 'SHISEIDO', 'ANUA', 'LUXURY UAE'].map(
              (brand) => (
                <span
                  key={brand}
                  className="font-playfair text-lg md:text-xl text-text/20 dark:text-gray-600 
                             hover:text-gold transition-colors duration-500 cursor-default
                             tracking-wider"
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="contact">
        <Newsletter />
      </section>

      <Footer />
    </main>
  );
}
