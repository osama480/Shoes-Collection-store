import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#07080b',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '64px 24px 32px 24px',
        marginTop: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            BATA / <span style={{ color: '#ff5e36' }}>SERVICE SALE MELA</span>
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
            The ultimate destination for premium sneakerheads, rare drops, and authentic performance footwear.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
            Shop Collections
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><Link href="/products?category=Basketball" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Basketball Kicks</Link></li>
            <li><Link href="/products?category=Running" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Running & Performance</Link></li>
            <li><Link href="/products?category=Casual" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Lifestyle Sneakers</Link></li>
            <li><Link href="/products?brand=Jordan" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Air Jordan Drops</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
            Customer Support
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Authenticity Guarantee</a></li>
            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Shipping & Returns</a></li>
            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Shoe Sizing Guide</a></li>
            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem' }}>Track My Order</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
            Stay Ahead of the Drop
          </h4>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '12px' }}>
            Subscribe to get exclusive early access to restocks and raffle announcements.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                background: '#12141d',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '10px 14px',
                borderRadius: '8px',
                color: '#fff',
                flex: 1,
                fontSize: '0.85rem',
              }}
            />
            <button
              style={{
                background: '#ff5e36',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '40px auto 0 auto',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#475569',
          fontSize: '0.8rem',
        }}
      >
        <span>&copy; {new Date().getFullYear()} BATA / Service Sale Mela. All rights reserved.</span>
        <span>Built with NestJS & Next.js</span>
      </div>
    </footer>
  );
};
