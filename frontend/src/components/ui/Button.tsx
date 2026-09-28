import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    fontFamily: 'inherit',
    fontWeight: 700,
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    width: fullWidth ? '100%' : 'auto',
  };

  const sizePadding = {
    sm: '8px 16px',
    md: '12px 24px',
    lg: '16px 32px',
  };

  const fontSizes = {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
  };

  let variantStyle: React.CSSProperties = {};
  if (variant === 'primary') {
    variantStyle = {
      background: 'linear-gradient(135deg, #ff5e36 0%, #ff2e63 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 20px rgba(255, 94, 54, 0.35)',
    };
  } else if (variant === 'secondary') {
    variantStyle = {
      background: 'rgba(255, 255, 255, 0.08)',
      color: '#f8fafc',
      border: '1px solid rgba(255, 255, 255, 0.12)',
    };
  } else if (variant === 'outline') {
    variantStyle = {
      background: 'transparent',
      color: '#ff5e36',
      border: '1px solid #ff5e36',
    };
  } else if (variant === 'ghost') {
    variantStyle = {
      background: 'transparent',
      color: '#94a3b8',
    };
  }

  return (
    <button
      style={{
        ...baseStyles,
        padding: sizePadding[size],
        fontSize: fontSizes[size],
        ...variantStyle,
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};
