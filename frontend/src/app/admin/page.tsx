'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { api } from '@/lib/api/client';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  ShoppingBag,
  Tag,
  Eye,
} from 'lucide-react';

interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  items: {
    productId: string;
    productName: string;
    image: string;
    price: number;
    size: number;
    color: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'orders' | 'analytics'>('articles');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Article Form state
  const [newArticle, setNewArticle] = useState({
    name: '',
    brand: 'Bata',
    category: 'Casual' as const,
    description: '',
    price: 3000,
    originalPrice: 3800,
    images: [] as string[],
    sizes: [
      { size: 7, stock: 10 },
      { size: 8, stock: 15 },
      { size: 9, stock: 12 },
      { size: 10, stock: 8 },
    ],
    colors: ['Black', 'White', 'Brown'],
    isFeatured: true,
  });

  // Image Upload handler (Device Local File -> Base64)
  const handleDeviceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setNewArticle((prev) => ({
            ...prev,
            images: [...prev.images, reader.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Load products & orders
  const loadData = () => {
    setLoading(true);
    Promise.all([api.getProducts(), api.getAllOrders()])
      .then(([prods, ords]) => {
        setProducts(prods || []);
        setOrders((ords as Order[]) || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Submit New Article
  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createProduct({
        ...newArticle,
        images: newArticle.images.length > 0 ? newArticle.images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'],
      });
      setShowAddModal(false);
      loadData();
    } catch (err) {
      console.error(err);
      alert('Failed to add article');
    }
  };

  // Update Price & Discount
  const handleUpdatePrice = async (id: string, price: number, originalPrice?: number) => {
    try {
      await api.updateProduct(id, { price, originalPrice });
      setEditingProduct(null);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to remove this article from Sale Mela?')) return;
    try {
      await api.deleteProduct(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.updateOrderStatus(orderId, status);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  return (
    <div style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 24px', minHeight: '85vh' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '32px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '24px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
            BATA / Service Owner Portal
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Manage footwear articles, edit prices/discounts, and inspect customer orders with delivery details.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} size="md">
          <Plus size={18} /> Upload New Article
        </Button>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff5e36', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Total Revenue</span>
            <DollarSign size={20} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>Rs. {totalRevenue.toFixed(0)}</div>
          <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>Live Store Revenue</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#00f2fe', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Active Articles</span>
            <Package size={20} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>{products.length} Models</div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Bata, Service, Ndure</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff2e63', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Customer Orders</span>
            <ShoppingBag size={20} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>{orders.length} Orders</div>
          <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>Ready for Dispatch</span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('articles')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: activeTab === 'articles' ? '1px solid #ff5e36' : '1px solid rgba(255,255,255,0.1)',
            background: activeTab === 'articles' ? 'rgba(255, 94, 54, 0.15)' : '#12141d',
            color: activeTab === 'articles' ? '#ff5e36' : '#94a3b8',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Articles & Price Manager ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            border: activeTab === 'orders' ? '1px solid #ff5e36' : '1px solid rgba(255,255,255,0.1)',
            background: activeTab === 'orders' ? 'rgba(255, 94, 54, 0.15)' : '#12141d',
            color: activeTab === 'orders' ? '#ff5e36' : '#94a3b8',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Customer Orders ({orders.length})
        </button>
      </div>

      {/* TAB 1: ARTICLES & PRICES MANAGEMENT */}
      {activeTab === 'articles' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {products.map((product) => (
            <div
              key={product.id}
              className="glass-card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <Badge variant="orange">{product.brand}</Badge>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{product.category}</span>
                </div>

                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '160px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#12141d',
                    marginBottom: '12px',
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  {product.name}
                </h3>

                {/* Price & Discount Display */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ff5e36' }}>
                    Rs. {product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'line-through' }}>
                      Rs. {product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                      ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={() => setEditingProduct(product)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: '#12141d',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                  }}
                >
                  <Edit2 size={14} /> Edit Price/Discount
                </button>

                <button
                  onClick={() => handleDeleteArticle(product.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CUSTOMER ORDERS INSPECTION */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px', color: '#64748b' }}>
              No customer orders received yet.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="glass-panel"
                style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {/* Header info */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#ff5e36', fontWeight: 800 }}>
                      ORDER #{order.id}
                    </span>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginTop: '2px' }}>
                      Customer: {order.customerName || 'Walk-in Customer'}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>

                    {/* Status Select */}
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      style={{
                        background: '#12141d',
                        color: order.status === 'DELIVERED' ? '#10b981' : order.status === 'SHIPPED' ? '#00f2fe' : '#ff5e36',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                {/* Customer Contact & Delivery Info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', background: 'rgba(18,20,29,0.5)', padding: '16px', borderRadius: '12px' }}>
                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>
                      Customer Phone & Email
                    </span>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={16} style={{ color: '#10b981' }} /> {order.phoneNumber || '+92 300 1234567'}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '2px' }}>
                      {order.customerEmail}
                    </div>
                  </div>

                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>
                      Shipping Address
                    </span>
                    <div style={{ color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={16} style={{ color: '#ff5e36' }} />
                      {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} ({order.shippingAddress?.zipCode})
                    </div>
                  </div>

                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>
                      Payment Method
                    </span>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                      {order.paymentMethod || 'Cash on Delivery'}
                    </div>
                    <div style={{ color: '#ff5e36', fontWeight: 800, fontSize: '1.1rem', marginTop: '2px' }}>
                      Total: Rs. {order.totalAmount}
                    </div>
                  </div>
                </div>

                {/* Ordered Items Table */}
                <div>
                  <h4 style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                    Ordered Footwear Articles:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {order.items?.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#12141d',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                        }}
                      >
                        <span style={{ color: '#fff', fontWeight: 600 }}>
                          {item.productName} (Size: {item.size}, Color: {item.color}) x {item.quantity}
                        </span>
                        <span style={{ color: '#ff5e36', fontWeight: 700 }}>
                          Rs. {item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL 1: UPLOAD NEW ARTICLE FROM DEVICE */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '560px', padding: '32px', borderRadius: '20px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>
              Upload New Article (Bata / Service)
            </h2>

            <form onSubmit={handleCreateArticle} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Article Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bata Power Sport Runner Mela"
                  value={newArticle.name}
                  onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#12141d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Brand</label>
                  <select
                    value={newArticle.brand}
                    onChange={(e) => setNewArticle({ ...newArticle, brand: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#12141d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  >
                    <option value="Bata">Bata</option>
                    <option value="Service">Service</option>
                    <option value="Ndure">Ndure</option>
                    <option value="Servis">Servis</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Category</label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value as any })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#12141d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  >
                    <option value="Casual">Casual</option>
                    <option value="Running">Running</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Sale Mela Price (Rs.)</label>
                  <input
                    type="number"
                    value={newArticle.price}
                    onChange={(e) => setNewArticle({ ...newArticle, price: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#12141d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Original Price / Discount (Rs.)</label>
                  <input
                    type="number"
                    value={newArticle.originalPrice}
                    onChange={(e) => setNewArticle({ ...newArticle, originalPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#12141d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>
              </div>

              {/* DEVICE FILE UPLOAD */}
              <div>
                <label style={{ color: '#ff5e36', fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Upload Image from Device:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleDeviceImageUpload}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#12141d',
                    border: '1px dashed #ff5e36',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                />

                {newArticle.images.length > 0 && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    {newArticle.images.map((img, i) => (
                      <img key={i} src={img} alt="Preview" style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Description</label>
                <textarea
                  value={newArticle.description}
                  onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                  placeholder="Article details, material, and sole comfort notes..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#12141d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', minHeight: '80px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Button type="submit" size="md" fullWidth>Upload Article</Button>
                <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)} size="md">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PRICE & DISCOUNT */}
      {editingProduct && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '28px', borderRadius: '20px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>
              Edit Price & Discount
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
              {editingProduct.name}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Sale Price (Rs.)</label>
                <input
                  type="number"
                  defaultValue={editingProduct.price}
                  id="edit-price"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#12141d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Original Price / Discount Crossout (Rs.)</label>
                <input
                  type="number"
                  defaultValue={editingProduct.originalPrice || editingProduct.price + 500}
                  id="edit-original-price"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#12141d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Button
                  onClick={() => {
                    const priceVal = Number((document.getElementById('edit-price') as HTMLInputElement).value);
                    const origVal = Number((document.getElementById('edit-original-price') as HTMLInputElement).value);
                    handleUpdatePrice(editingProduct.id, priceVal, origVal);
                  }}
                  size="md"
                  fullWidth
                >
                  Save Price
                </Button>
                <Button variant="secondary" onClick={() => setEditingProduct(null)} size="md">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
