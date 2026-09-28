import { Product, User, CartItem } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('sole_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || json.message || 'API Request failed');
  }

  return json.data ?? json;
}

export const api = {
  // Products
  getProducts: (params?: Record<string, any>) => {
    const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return fetcher<Product[]>(`/products${query}`);
  },

  getFeaturedProducts: () => fetcher<Product[]>('/products/featured'),

  getProductById: (id: string) => fetcher<Product>(`/products/${id}`),

  createProduct: (productData: Partial<Product>) =>
    fetcher<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  updateProduct: (id: string, updateData: Partial<Product>) =>
    fetcher<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    }),

  deleteProduct: (id: string) =>
    fetcher<{ success: boolean }>(`/products/${id}`, {
      method: 'DELETE',
    }),

  // Auth
  login: (credentials: { email: string; password: string }) =>
    fetcher<{ accessToken: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData: { name: string; email: string; password: string }) =>
    fetcher<{ accessToken: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getProfile: () => fetcher<User>('/users/me'),

  // Cart
  getCart: () => fetcher<{ items: CartItem[]; subtotal: number }>('/cart'),

  addToCart: (item: { productId: string; size: number; color: string; quantity: number }) =>
    fetcher<{ items: CartItem[]; subtotal: number }>('/cart', {
      method: 'POST',
      body: JSON.stringify(item),
    }),

  removeFromCart: (itemId: string) =>
    fetcher<{ items: CartItem[]; subtotal: number }>(`/cart/${itemId}`, {
      method: 'DELETE',
    }),

  // Orders
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    phoneNumber: string;
    shippingAddress: any;
    paymentMethod: string;
  }) =>
    fetcher('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getMyOrders: () => fetcher('/orders/my-orders'),

  getAllOrders: () => fetcher('/orders'),

  updateOrderStatus: (orderId: string, status: string) =>
    fetcher(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};
