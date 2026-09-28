import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import { CartProvider } from '@/lib/context/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'BATA / Service Sale Mela | Premium Footwear & Shoes Discount',
  description:
    'Discover best shoe deals, authentic Bata & Service footwear, running shoes, and casual shoes at BATA / Service Sale Mela.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
