import React from 'react';
import { ShoeSizeStock } from '@/types';

interface SizeSelectorProps {
  sizes: ShoeSizeStock[];
  selectedSize: number | null;
  onSelect: (size: number) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelect,
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem' }}>Select Size (US)</span>
        <span style={{ color: '#ff5e36', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>Size Guide</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {sizes.map((s) => {
          const isSelected = selectedSize === s.size;
          const isOutOfStock = s.stock === 0;

          return (
            <button
              key={s.size}
              disabled={isOutOfStock}
              onClick={() => onSelect(s.size)}
              style={{
                padding: '12px 0',
                borderRadius: '10px',
                border: isSelected
                  ? '2px solid #ff5e36'
                  : '1px solid rgba(255, 255, 255, 0.12)',
                background: isSelected
                  ? 'rgba(255, 94, 54, 0.15)'
                  : isOutOfStock
                  ? 'rgba(255, 255, 255, 0.03)'
                  : '#12141d',
                color: isSelected
                  ? '#ff5e36'
                  : isOutOfStock
                  ? '#475569'
                  : '#f8fafc',
                fontWeight: 700,
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                opacity: isOutOfStock ? 0.5 : 1,
              }}
            >
              {s.size}
            </button>
          );
        })}
      </div>
    </div>
  );
};
