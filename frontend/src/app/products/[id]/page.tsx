'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { api } from '@/lib/api/client';
import { SizeSelector } from '@/components/products/SizeSelector';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/lib/context/CartContext';
import { Star, ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    api.getProductById(params.id)
      .then((data) => {
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0].size);
        }
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8' }}>
        Loading shoe details...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0', color: '#f8fafc' }}>
        <h2>Shoe not found</h2>
        <Link href="/products" style={{ color: '#ff5e36' }}>Back to catalog</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto 0 auto', padding: '0 24px', minHeight: '85vh' }}>
      <Link
        href="/products"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#94a3b8',
          textDecoration: 'none',
          marginBottom: '32px',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}
      >
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Image Gallery */}
        <div>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'radial-gradient(circle, rgba(32,36,52,0.8) 0%, rgba(18,20,29,0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '16px',
            }}
          >
            <Image
              src={selectedImage || product.images[0]}
              alt={product.name}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Thumbnail row */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: selectedImage === img ? '2px solid #ff5e36' : '1px solid rgba(255,255,255,0.1)',
                    background: '#12141d',
                    cursor: 'pointer',
                  }}
                >
                  <Image src={img} alt="Thumbnail" fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specifications & Checkout Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <Badge variant="orange">{product.brand}</Badge>
              <Badge variant="cyan">{product.category}</Badge>
            </div>

            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '12px' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb703' }}>
                <Star size={18} fill="#ffb703" />
                <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{product.rating}</span>
              </div>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>({product.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Price Box */}
          <div
            style={{
              padding: '20px',
              borderRadius: '14px',
              background: 'rgba(18, 20, 29, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
            }}
          >
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>${product.price}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '1.1rem', color: '#64748b', textDecoration: 'line-through' }}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>
                Colorway: <span style={{ color: '#ff5e36' }}>{selectedColor}</span>
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: selectedColor === color ? '1px solid #ff5e36' : '1px solid rgba(255,255,255,0.1)',
                      background: selectedColor === color ? 'rgba(255,94,54,0.15)' : '#12141d',
                      color: selectedColor === color ? '#ff5e36' : '#94a3b8',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={(sz) => setSelectedSize(sz)}
          />

          {/* Add To Cart */}
          <Button
            size="lg"
            fullWidth
            onClick={() => {
              if (selectedSize) {
                addToCart(product, selectedSize, selectedColor || 'Standard', 1);
              }
            }}
          >
            <ShoppingBag size={20} /> Add to Mela Cart
          </Button>

          {/* Guarantee Note */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <ShieldCheck size={20} />
            <span>Guaranteed 100% Authentic with original box & proof of origin.</span>
          </div>

          {/* Description */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>
              Product Details
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
