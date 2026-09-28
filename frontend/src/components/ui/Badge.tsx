import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'cyan' | 'dark' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'orange' }) => {
  const styles: Record<string, React.CSSProperties> = {
    orange: {
      background: 'rgba(255, 94, 54, 0.15)',
      color: '#ff5e36',
      border: '1px solid rgba(255, 94, 54, 0.3)',
    },
    cyan: {
      background: 'rgba(0, 242, 254, 0.15)',
      color: '#00f2fe',
      border: '1px solid rgba(0, 242, 254, 0.3)',
    },
    dark: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#cbd5e1',
      border: '1px solid rgba(255, 255, 255, 0.15)',
    },
    success: {
      background: 'rgba(16, 185, 129, 0.15)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
    },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        ...styles[variant],
      }}
    >
      {children}
    </span>
  );
};
