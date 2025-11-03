import { CartProvider } from '@/components/cart/CartContext'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Afghan Art Market',
  description: 'A global marketplace for Afghan female artisans.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Afghan Art Market',
    description: 'Support Afghan female artisans with crypto-enabled commerce.',
    type: 'website'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-brand-sand antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}