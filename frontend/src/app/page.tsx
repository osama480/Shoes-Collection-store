import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api/client';

export const revalidate = 60;

export default async function HomePage() {
  let featuredProducts = [];
  try {
    featuredProducts = await api.getFeaturedProducts();
  } catch (e) {
    // Fallback if API server is not running during SSG build
    featuredProducts = [
      {
        id: 'sh_1',
        name: 'Air Jordan 1 Retro High OG "Chicago"',
        slug: 'air-jordan-1-retro-high-og-chicago',
        brand: 'Jordan',
        category: 'Basketball' as const,
        description: 'The iconic Air Jordan 1 High OG Chicago returns with classic varsity red leather.',
        price: 180,
        originalPrice: 220,
        images: ['https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80'],
        sizes: [{ size: 9, stock: 5 }, { size: 10, stock: 8 }],
        colors: ['Red', 'White', 'Black'],
        isFeatured: true,
        inStock: true,
        rating: 4.9,
        reviewCount: 142,
      },
      {
        id: 'sh_2',
        name: 'Nike Dunk Low Retro "Panda"',
        slug: 'nike-dunk-low-retro-panda',
        brand: 'Nike',
        category: 'Casual' as const,
        description: 'Created for the hardwood but taken to the streets.',
        price: 115,
        originalPrice: 135,
        images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'],
        sizes: [{ size: 8.5, stock: 10 }, { size: 9.5, stock: 15 }],
        colors: ['Black', 'White'],
        isFeatured: true,
        inStock: true,
        rating: 4.8,
        reviewCount: 310,
      },
      {
        id: 'sh_3',
        name: 'Adidas Ultraboost Light',
        slug: 'adidas-ultraboost-light',
        brand: 'Adidas',
        category: 'Running' as const,
        description: 'Experience epic energy in every stride with the lightest Ultraboost ever made.',
        price: 190,
        images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'],
        sizes: [{ size: 9, stock: 14 }, { size: 10, stock: 9 }],
        colors: ['Core Black', 'Solar Red'],
        isFeatured: true,
        inStock: true,
        rating: 4.7,
        reviewCount: 98,
      },
    ];
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* HERO BANNER */}
      <section
        style={{
          position: 'relative',
          padding: '100px 24px 80px 24px',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 50% -20%, rgba(255, 94, 54, 0.25) 0%, rgba(9, 10, 15, 1) 70%)',
        }}
      >
        <div className="glow-backdrop" style={{ top: '10%', right: '15%' }} />

        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: 'rgba(255, 94, 54, 0.12)',
                border: '1px solid rgba(255, 94, 54, 0.3)',
                color: '#ff5e36',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginBottom: '24px',
              }}
            >
              <Sparkles size={16} /> NEW SEASON DROPS 2026
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '24px',
              }}
            >
              STEP INTO THE BIGGEST <br />
              <span className="gradient-text">BATA & SERVICE</span> SALE MELA.
            </h1>

            <p
              style={{
                color: '#94a3b8',
                fontSize: '1.15rem',
                lineHeight: 1.6,
                maxWidth: '520px',
                marginBottom: '36px',
              }}
            >
              Explore hyper-exclusive releases, verified authentic heat, and pinnacle performance sneakers built for culture champions.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/products" style={{ textDecoration: 'none' }}>
                <Button size="lg">
                  Shop Collection <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/products?category=Basketball" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="lg">
                  Explore Basketball
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Hero Shoe Showcase */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              className="animate-float"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                height: '380px',
                filter: 'drop-shadow(0 25px 40px rgba(255, 94, 54, 0.3))',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80"
                alt="Air Jordan 1 Hero"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BENEFITS */}
      <section
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(18, 20, 29, 0.6)',
          padding: '32px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255, 94, 54, 0.15)',
                color: '#ff5e36',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>100% Verified Authentic</h4>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Every shoe inspected by specialists</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(0, 242, 254, 0.15)',
                color: '#00f2fe',
              }}
            >
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>Express Global Shipping</h4>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Insured dispatch within 24 hours</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: 'rgba(255, 46, 99, 0.15)',
                color: '#ff2e63',
              }}
            >
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>Hassle-Free Returns</h4>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>30-day money back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS GRID */}
      <section style={{ maxWidth: '1280px', margin: '80px auto 0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '40px',
          }}
        >
          <div>
            <span style={{ color: '#ff5e36', fontWeight: 800, letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              CURATED SELECTION
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              Trending Kicks & Hot Drops
            </h2>
          </div>

          <Link href="/products" style={{ color: '#ff5e36', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
            View All Kicks &rarr;
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
