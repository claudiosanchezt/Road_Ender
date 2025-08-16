import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { cn } from '@/lib/utils'

// Fuente optimizada de Google Fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tourist Guides Chile',
    template: '%s | Tourist Guides Chile'
  },
  description: 'Conecta con guías locales especializados para explorar Chile de manera auténtica y segura.',
  keywords: ['guías turísticos', 'Chile', 'turismo', 'aventura', 'naturaleza'],
  authors: [{ name: 'Tourist Guides Chile' }],
  creator: 'Tourist Guides Chile',
  publisher: 'Tourist Guides Chile',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
