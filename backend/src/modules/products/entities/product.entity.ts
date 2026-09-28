export interface ShoeSizeStock {
  size: number; // e.g. 7, 8, 8.5, 9, 10, 11
  stock: number;
}

export class ProductEntity {
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
  createdAt: Date;
  updatedAt: Date;
}
