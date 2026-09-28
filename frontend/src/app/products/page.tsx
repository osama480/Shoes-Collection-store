'use client';

import React, { useState, useEffect } from 'react';
import { Product, FilterState } from '@/types';
import { api } from '@/lib/api/client';
import { ProductFilter } from '@/components/products/ProductFilter';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    brand: '',
    category: '',
    minPrice: 0,
    maxPrice: 500,
    size: null,
    search: '',
    sortBy: 'featured',
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleReset = () => {
    setFilters({
      brand: '',
      category: '',
      minPrice: 0,
      maxPrice: 500,
      size: null,
      search: '',
      sortBy: 'featured',
    });
  };

  useEffect(() => {
    setLoading(true);
    const query: Record<string, any> = {};
    if (filters.brand) query.brand = filters.brand;
    if (filters.category) query.category = filters.category;
    if (filters.search) query.search = filters.search;
    if (filters.size) query.size = filters.size;
    if (filters.sortBy !== 'featured') query.sortBy = filters.sortBy;

    api.getProducts(query)
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto 0 auto', padding: '0 24px', minHeight: '80vh' }}>
      {/* Header & Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
            Shoe Catalog & Kicks
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Showing {products.length} authenticated sneaker models
          </p>
        </div>

        {/* Search Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(18, 20, 29, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            padding: '10px 16px',
            width: '100%',
            maxWidth: '360px',
            gap: '10px',
          }}
        >
          <Search size={18} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search Jordan, Dunk, Yeezy..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              outline: 'none',
              width: '100%',
              fontSize: '0.9rem',
            }}
          />
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        <ProductFilter
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleReset}
        />

        <div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#94a3b8' }}>
              Loading kicks...
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
