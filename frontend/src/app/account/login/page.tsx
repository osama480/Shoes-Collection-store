'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Flame } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/products');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '80px auto', padding: '0 24px', minHeight: '70vh' }}>
      <div className="glass-panel" style={{ padding: '36px 28px', borderRadius: '20px', textAlign: 'center' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ff5e36 0%, #ff2e63 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
          }}
        >
          <Flame size={28} style={{ color: '#fff' }} />
        </div>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
          Welcome Back
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
          Sign in to access your BATA / Service Sale Mela account & order history.
        </p>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              fontSize: '0.85rem',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@gmail.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: '#12141d',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
              }}
              required
            />
          </div>

          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                background: '#12141d',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
              }}
              required
            />
          </div>

          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '24px' }}>
          Don't have an account?{' '}
          <Link href="/account/register" style={{ color: '#ff5e36', fontWeight: 600 }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
