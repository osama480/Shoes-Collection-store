'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { api } from '../api/client';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: number, color: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      api.getCart()
        .then((res) => {
          setItems(res.items || []);
          setSubtotal(res.subtotal || 0);
        })
        .catch((err) => console.error('Failed to load cart', err));
    }
  }, [user]);

  const addToCart = async (product: Product, size: number, color: string, quantity = 1) => {
    if (user) {
      try {
        const res = await api.addToCart({ productId: product.id, size, color, quantity });
        setItems(res.items);
        setSubtotal(res.subtotal);
      } catch (err) {
        console.error(err);
      }
    } else {
      // Local cart fallback for guests
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.id && i.size === size && i.color === color);
        let updated: CartItem[];
        if (existing) {
          updated = prev.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i,
          );
        } else {
          const newItem: CartItem = {
            id: `guest_${Date.now()}`,
            productId: product.id,
            productName: product.name,
            image: product.images[0],
            price: product.price,
            size,
            color,
            quantity,
          };
          updated = [...prev, newItem];
        }
        setSubtotal(updated.reduce((acc, item) => acc + item.price * item.quantity, 0));
        return updated;
      });
    }
    setIsCartOpen(true);
  };

  const removeFromCart = async (itemId: string) => {
    if (user) {
      try {
        const res = await api.removeFromCart(itemId);
        setItems(res.items);
        setSubtotal(res.subtotal);
      } catch (err) {
        console.error(err);
      }
    } else {
      setItems((prev) => {
        const updated = prev.filter((i) => i.id !== itemId);
        setSubtotal(updated.reduce((acc, item) => acc + item.price * item.quantity, 0));
        return updated;
      });
    }
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
