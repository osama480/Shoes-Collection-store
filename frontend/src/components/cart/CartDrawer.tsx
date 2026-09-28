'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Trash2, ArrowRight, ShoppingBag, LogIn } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '../ui/Button';

export const CartDrawer: React.FC = () => {
  const { items, subtotal, isCartOpen, setIsCartOpen, removeFromCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    if (!user) {
      router.push('/account/login?redirect=/checkout');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Slide-out Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          background: '#0e1017',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 101,
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 800 }}>
            <ShoppingBag size={20} style={{ color: '#ff5e36' }} />
            <span>Your Mela Cart ({items.length})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Item List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', color: '#64748b' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 16px auto', opacity: 0.4 }} />
              <p style={{ fontSize: '1rem', color: '#f8fafc', fontWeight: 600 }}>Your cart is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Browse Bata & Service shoes to add items.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  background: 'rgba(23, 26, 38, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '12px',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#12141d',
                    flexShrink: 0,
                  }}
                >
                  <Image src={item.image} alt={item.productName} fill style={{ objectFit: 'cover' }} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4
                      style={{
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        marginBottom: '4px',
                      }}
                    >
                      {item.productName}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      Size: {item.size} | Color: {item.color}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.95rem' }}>
                      Rs. {item.price} x {item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '4px',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: '#090a0f',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Subtotal</span>
              <span style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800 }}>
                Rs. {subtotal.toFixed(0)}
              </span>
            </div>

            {!user && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'rgba(255, 94, 54, 0.12)',
                  border: '1px solid rgba(255, 94, 54, 0.3)',
                  color: '#ff5e36',
                  fontSize: '0.8rem',
                  marginBottom: '12px',
                  fontWeight: 600,
                }}
              >
                <LogIn size={16} /> You will be prompted to login to enter details
              </div>
            )}

            <Button fullWidth size="lg" onClick={handleProceedToCheckout}>
              Proceed to Checkout <ArrowRight size={18} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
