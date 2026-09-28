import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '64px 24px',
          background: 'rgba(18, 20, 29, 0.5)',
          borderRadius: '16px',
          border: '1px dashed rgba(255, 255, 255, 0.1)',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '8px' }}>
          No kicks found matching your criteria
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Try selecting different size, brand, or category filters.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
