'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import SearchModal from './SearchModal';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '#categories' },
  { name: 'Brands', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('luxury-dark-mode');
    if (stored === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('luxury-dark-mode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('luxury-dark-mode', 'false');
      }
      return next;
    });
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="luxury-container">
          <nav className="flex items-center justify-between h-18 md:h-22 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-playfair text-xl md:text-2xl font-bold tracking-widest text-gold">
                LUXURY.AE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`nav-link text-sm tracking-[0.1em] uppercase py-1 ${
                      !isScrolled ? 'text-white hover:text-gold' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors duration-300 hover:text-gold ${
                  !isScrolled ? 'text-white' : 'text-text dark:text-gray-200'
                }`}
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors duration-300 hover:text-gold ${
                  !isScrolled ? 'text-white' : 'text-text dark:text-gray-200'
                }`}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-full transition-colors duration-300 hover:text-gold ${
                  !isScrolled ? 'text-white' : 'text-text dark:text-gray-200'
                }`}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-dark-bg shadow-luxury animate-slide-down">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-6 border-b border-border dark:border-dark-border">
              <span className="font-playfair text-lg font-bold tracking-widest text-gold">
                LUXURY.AE
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-text dark:text-gray-200 hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer nav links */}
            <nav className="p-6">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-text dark:text-gray-200 text-sm tracking-[0.1em] uppercase
                                 hover:text-gold transition-colors border-b border-border/30 dark:border-dark-border/30"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Drawer footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border dark:border-dark-border">
              <p className="text-text/40 dark:text-gray-600 text-xs tracking-wider text-center">
                Luxury shopping in the UAE
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
