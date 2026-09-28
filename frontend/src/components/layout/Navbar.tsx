'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Flame } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';

export const Navbar: React.FC = () => {
  const { totalCount, setIsCartOpen } = useCart();
  const { user } = useAuth();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(9, 10, 15, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff5e36 0%, #ff2e63 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(255, 94, 54, 0.4)',
            }}
          >
            <Flame style={{ color: '#fff', width: '24px', height: '24px' }} />
          </div>
          <span
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            BATA / <span style={{ color: '#ff5e36' }}>SERVICE SALE MELA</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <Link
            href="/products"
            style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}
          >
            Shop Kicks
          </Link>
          <Link
            href="/products?category=Basketball"
            style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}
          >
            Basketball
          </Link>
          <Link
            href="/products?category=Running"
            style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}
          >
            Running
          </Link>
          <Link
            href="/products?category=Casual"
            style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}
          >
            Casual
          </Link>
          <Link
            href="/admin"
            style={{ color: '#ff5e36', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}
          >
            Owner Portal
          </Link>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link
            href="/products"
            style={{
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: '50%',
              transition: 'color 0.2s',
            }}
          >
            <Search size={20} />
          </Link>

          {/* User Profile */}
          <Link
            href={user ? '/account/orders' : '/account/login'}
            style={{
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            <User size={20} />
            <span>{user ? user.name.split(' ')[0] : 'Sign In'}</span>
          </Link>

          {/* Cart Icon Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: 'rgba(255, 94, 54, 0.12)',
              border: '1px solid rgba(255, 94, 54, 0.3)',
              borderRadius: '14px',
              padding: '10px 16px',
              color: '#ff5e36',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            <ShoppingBag size={20} />
            <span>{totalCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
