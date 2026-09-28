import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductsDto } from './dto/filter-products.dto';

@Injectable()
export class ProductsService {
  private products: ProductEntity[] = [
    {
      id: 'sh_1',
      name: 'Bata Power Sport Runner Mela',
      slug: 'bata-power-sport-runner-mela',
      brand: 'Bata',
      category: 'Running',
      description: 'High performance lightweight sports running shoes from Bata Power collection. Durable rubber sole with mesh breathability.',
      price: 3500,
      originalPrice: 4500,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      ],
      sizes: [
        { size: 7, stock: 10 },
        { size: 8, stock: 15 },
        { size: 9, stock: 12 },
        { size: 10, stock: 8 },
      ],
      colors: ['Black / Red', 'Navy Blue'],
      isFeatured: true,
      inStock: true,
      rating: 4.8,
      reviewCount: 95,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'sh_2',
      name: 'Service Cheetah Classic Leather',
      slug: 'service-cheetah-classic-leather',
      brand: 'Service',
      category: 'Casual',
      description: 'The legendary Service Cheetah shoes crafted with genuine leather, reinforced stitching, and timeless casual style.',
      price: 2800,
      originalPrice: 3500,
      images: [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      ],
      sizes: [
        { size: 8, stock: 20 },
        { size: 9, stock: 18 },
        { size: 10, stock: 14 },
      ],
      colors: ['White / Green', 'Pure White'],
      isFeatured: true,
      inStock: true,
      rating: 4.9,
      reviewCount: 210,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'sh_3',
      name: 'Ndure Urban Street Sneaker',
      slug: 'ndure-urban-street-sneaker',
      brand: 'Ndure',
      category: 'Casual',
      description: 'Trendy urban lifestyle sneakers with padded collar and cushioned footbed for all-day comfort.',
      price: 2400,
      originalPrice: 3000,
      images: [
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
      ],
      sizes: [
        { size: 7, stock: 5 },
        { size: 8, stock: 12 },
        { size: 9, stock: 10 },
      ],
      colors: ['Grey', 'Black'],
      isFeatured: false,
      inStock: true,
      rating: 4.6,
      reviewCount: 42,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findAll(filter: FilterProductsDto): Promise<ProductEntity[]> {
    let result = [...this.products];

    if (filter.brand) {
      result = result.filter(
        (p) => p.brand.toLowerCase() === filter.brand.toLowerCase(),
      );
    }

    if (filter.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === filter.category.toLowerCase(),
      );
    }

    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    if (filter.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filter.minPrice);
    }

    if (filter.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filter.maxPrice);
    }

    if (filter.size !== undefined) {
      result = result.filter((p) =>
        p.sizes.some((s) => s.size === Number(filter.size) && s.stock > 0),
      );
    }

    if (filter.sortBy) {
      if (filter.sortBy === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (filter.sortBy === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (filter.sortBy === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      } else if (filter.sortBy === 'newest') {
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      }
    }

    return result;
  }

  async findFeatured(): Promise<ProductEntity[]> {
    return this.products.filter((p) => p.isFeatured);
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = this.products.find((p) => p.id === id || p.slug === id);
    if (!product) throw new NotFoundException(`Shoe product with ID/slug ${id} not found`);
    return product;
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct: ProductEntity = {
      id: `sh_${Date.now()}`,
      slug: dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: dto.name,
      brand: dto.brand,
      category: dto.category,
      description: dto.description,
      price: dto.price,
      originalPrice: dto.originalPrice,
      images: dto.images && dto.images.length > 0 ? dto.images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'],
      sizes: dto.sizes && dto.sizes.length > 0 ? dto.sizes : [{ size: 8, stock: 10 }, { size: 9, stock: 10 }],
      colors: dto.colors && dto.colors.length > 0 ? dto.colors : ['Standard'],
      isFeatured: dto.isFeatured ?? true,
      inStock: true,
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  async update(id: string, updateData: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = await this.findById(id);
    Object.assign(product, updateData, { updatedAt: new Date() });
    return product;
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Product with ID ${id} not found`);
    this.products.splice(index, 1);
    return { success: true };
  }
}
