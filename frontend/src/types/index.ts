export interface ShoeSizeStock {
  size: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: 'Running' | 'Basketball' | 'Casual' | 'Skateboarding' | 'Luxury';
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: ShoeSizeStock[];
  colors: string[];
  isFeatured: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  image: string;
  price: number;
  size: number;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
}

export interface FilterState {
  brand: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  size: number | null;
  search: string;
  sortBy: 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
}
