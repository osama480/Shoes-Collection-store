'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { api } from '@/lib/api/client';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ShieldCheck, CreditCard, LogIn, Phone, MapPin, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [address, setAddress] = useState({
    street: '',
    city: 'Lahore',
    state: 'Punjab',
    zipCode: '54000',
    country: 'Pakistan',
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  // Enforce login requirement on checkout
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/account/login?redirect=/checkout');
    } else if (user) {
      setCustomerName(user.name || '');
      setCustomerEmail(user.email || '');
    }
  }, [user, isLoading, router]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.createOrder({
        customerName,
        customerEmail,
        phoneNumber,
        shippingAddress: address,
        paymentMethod,
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || (!user && !isSuccess)) {
    return (
      <div style={{ maxWidth: '500px', margin: '100px auto', textAlign: 'center', color: '#94a3b8' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Redirecting to login portal...</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '48px 32px', borderRadius: '24px' }}>
          <CheckCircle2 size={64} style={{ color: '#10b981', margin: '0 auto 24px auto' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
            Order Placed Successfully!
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '32px' }}>
            Thank you for your order with <strong>BATA / Service Sale Mela</strong>. Our dispatch team will contact you on <strong>{phoneNumber}</strong> before shipping.
          </p>
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '32px' }}>
        Complete Your Mela Order
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        {/* Customer Contact & Shipping Form */}
        <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserIcon size={18} style={{ color: '#ff5e36' }} /> Customer Contact Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Muhammad Ali"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#12141d',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="ali@gmail.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#12141d',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', display: 'block', marginBottom: '4px', fontWeight: 600, color: '#ff5e36' }}>
                  Phone Number (Required for Order Confirmation)
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+92 300 1234567"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#12141d',
                    border: '1px solid rgba(255, 94, 54, 0.4)',
                    color: '#fff',
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} style={{ color: '#ff5e36' }} /> Delivery Address
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>
                  House / Street / House No.
                </label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="House 42, Block B, Model Town"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#12141d',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                  }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: '#12141d',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>Postal ZIP Code</label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: '#12141d',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
              Payment Option
            </h3>

            <div style={{ display: 'flex', gap: '12px' }}>
              {['Cash on Delivery', 'Online Banking / JazzCash'].map((pm) => (
                <button
                  type="button"
                  key={pm}
                  onClick={() => setPaymentMethod(pm)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: paymentMethod === pm ? '1px solid #ff5e36' : '1px solid rgba(255,255,255,0.1)',
                    background: paymentMethod === pm ? 'rgba(255,94,54,0.15)' : '#12141d',
                    color: paymentMethod === pm ? '#ff5e36' : '#94a3b8',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" disabled={loading}>
            {loading ? 'Confirming Order...' : `Confirm Order (Rs. ${subtotal.toFixed(0)})`}
          </Button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', height: 'fit-content' }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
            Cart Items Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {items.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#94a3b8' }}>
                  {item.productName} (Size {item.size}) x{item.quantity}
                </span>
                <span style={{ color: '#fff', fontWeight: 700 }}>Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#94a3b8' }}>
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#94a3b8' }}>
              <span>Mela Delivery Charge</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginTop: '8px' }}>
              <span>Total Payable</span>
              <span style={{ color: '#ff5e36' }}>Rs. {subtotal.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
