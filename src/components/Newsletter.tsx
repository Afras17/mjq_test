'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('Welcome to the world of luxury. You\'re now on our list.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to connect. Please try again later.');
    }
  };

  return (
    <section className="section-padding bg-deep dark:bg-black relative overflow-hidden">
      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="luxury-container text-center">
        {/* Section label */}
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
          Stay Connected
        </p>

        {/* Heading */}
        <h2 className="font-playfair text-section text-white">
          Stay in the World of Luxury
        </h2>

        {/* Subtitle */}
        <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mt-4">
          Be the first to discover new arrivals, exclusive offers, and curated editorial content.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 max-w-lg mx-auto flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="Enter your email address"
              className="w-full px-5 py-3.5 bg-white/10 border border-white/20 
                         text-white placeholder:text-white/40 
                         text-sm tracking-wide
                         rounded-luxury
                         transition-all duration-300
                         focus:outline-none focus:border-gold focus:bg-white/15
                         hover:border-white/30"
              disabled={status === 'loading'}
              aria-label="Email address for newsletter"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3.5 bg-gold text-deep text-sm font-medium
                       tracking-[0.15em] uppercase rounded-luxury
                       transition-all duration-300
                       hover:bg-gold-dark
                       disabled:opacity-50 disabled:cursor-not-allowed
                       active:scale-[0.98]
                       whitespace-nowrap"
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Subscribing
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>

        {/* Status messages */}
        {status === 'success' && (
          <div className="mt-4 animate-fade-in">
            <p className="text-gold text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {message}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 animate-fade-in">
            <p className="text-red-400 text-sm">{message}</p>
          </div>
        )}

        {/* Trust indicators */}
        <div className="mt-12 flex items-center justify-center gap-8 text-white/30 text-xs tracking-wider uppercase">
          <span>Free Shipping</span>
          <span className="w-1 h-1 rounded-full bg-gold/50" />
          <span>Authentic Brands</span>
          <span className="w-1 h-1 rounded-full bg-gold/50" />
          <span>UAE Delivery</span>
        </div>
      </div>
    </section>
  );
}
