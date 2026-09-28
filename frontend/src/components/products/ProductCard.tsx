'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from '../ui/Badge';
import { useCart } from '@/lib/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const defaultSize = product.sizes[0]?.size || 9;
  const defaultColor = product.colors[0] || 'Original';

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Badge Tags */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
        }}
      >
        {product.isFeatured && <Badge variant="orange">Hot Drop</Badge>}
        <Badge variant="dark">{product.brand}</Badge>
      </div>

      {/* Image Container with Glow Effect */}
      <Link
        href={`/products/${product.id}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          background: 'radial-gradient(circle, rgba(32,36,52,0.8) 0%, rgba(18,20,29,0.9) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
      </Link>

      {/* Details Container */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Category & Rating */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '0.8rem',
              color: '#64748b',
            }}
          >
            <span>{product.category}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb703' }}>
              <Star size={14} fill="#ffb703" />
              <span style={{ color: '#f8fafc', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: '#64748b' }}>({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            href={`/products/${product.id}`}
            style={{ textDecoration: 'none', color: '#ffffff' }}
          >
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                lineHeight: 1.4,
                marginBottom: '12px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
              ${product.price}
            </div>
            {product.originalPrice && (
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                  textDecoration: 'line-through',
                }}
              >
                ${product.originalPrice}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, defaultSize, defaultColor, 1)}
            style={{
              background: 'linear-gradient(135deg, #ff5e36 0%, #ff2e63 100%)',
              border: 'none',
              borderRadius: '12px',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255, 94, 54, 0.35)',
              transition: 'transform 0.2s ease',
            }}
            title="Quick Add to Cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
