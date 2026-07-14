import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Luxury.ae — Premium Beauty, Fashion & Lifestyle in UAE',
  description:
    'Discover curated luxury beauty, fashion, skincare, and lifestyle products from the world\'s most coveted brands. Your premier destination for premium shopping in the UAE.',
  keywords: [
    'luxury shopping UAE',
    'premium beauty',
    'luxury fashion Dubai',
    'skincare UAE',
    'designer brands',
    'luxury fragrance',
    'Luxury.ae',
  ],
  authors: [{ name: 'Luxury.ae' }],
  creator: 'Luxury.ae',
  openGraph: {
    title: 'Luxury.ae — Premium Beauty, Fashion & Lifestyle in UAE',
    description:
      'Discover curated luxury beauty, fashion, skincare, and lifestyle products from the world\'s most coveted brands.',
    url: 'https://luxury.ae',
    siteName: 'Luxury.ae',
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury.ae — Premium Beauty, Fashion & Lifestyle in UAE',
    description:
      'Discover curated luxury beauty, fashion, skincare, and lifestyle products.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://luxury.ae'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#C9A84C" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-inter antialiased">
        {/* Inline script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('luxury-dark-mode') === 'true') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
