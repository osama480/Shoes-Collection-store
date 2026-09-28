'use client';

import React from 'react';
import { FilterState } from '@/types';
import { SlidersHorizontal, RefreshCw } from 'lucide-react';

interface ProductFilterProps {
  filters: FilterState;
  onChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
}

const BRANDS = ['All Brands', 'Nike', 'Jordan', 'Adidas', 'New Balance', 'Puma'];
const CATEGORIES = ['All Categories', 'Basketball', 'Running', 'Casual', 'Skateboarding', 'Luxury'];
const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  return (
    <aside
      style={{
        background: 'rgba(18, 20, 29, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontWeight: 700 }}>
          <SlidersHorizontal size={18} style={{ color: '#ff5e36' }} />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
          }}
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* Brand Selection */}
      <div>
        <h4 style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>
          Brand
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {BRANDS.map((b) => {
            const val = b === 'All Brands' ? '' : b;
            const isSelected = filters.brand === val;
            return (
              <button
                key={b}
                onClick={() => onChange({ brand: val })}
                style={{
                  textAlign: 'left',
                  background: isSelected ? 'rgba(255, 94, 54, 0.15)' : 'transparent',
                  border: isSelected ? '1px solid #ff5e36' : '1px solid transparent',
                  color: isSelected ? '#ff5e36' : '#94a3b8',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                }}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <h4 style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>
          Category
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {CATEGORIES.map((c) => {
            const val = c === 'All Categories' ? '' : c;
            const isSelected = filters.category === val;
            return (
              <button
                key={c}
                onClick={() => onChange({ category: val })}
                style={{
                  textAlign: 'left',
                  background: isSelected ? 'rgba(255, 94, 54, 0.15)' : 'transparent',
                  border: isSelected ? '1px solid #ff5e36' : '1px solid transparent',
                  color: isSelected ? '#ff5e36' : '#94a3b8',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.875rem',
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Shoe Sizes Grid */}
      <div>
        <h4 style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>
          US Shoe Size
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {SIZES.map((sz) => {
            const isSelected = filters.size === sz;
            return (
              <button
                key={sz}
                onClick={() => onChange({ size: isSelected ? null : sz })}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #ff5e36 0%, #ff2e63 100%)' : '#12141d',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '8px 0',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
