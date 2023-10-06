import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/store/AppContext'
import ProModal from '@/components/proModal'
import AuthProvider from '@/store/AuthProvider'
import { CrispProvider } from '@/components/CrispProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OriginAI',
  description: 'AI OriginAI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <AppProvider>
            <ProModal />
            {children}
          </AppProvider>
        </body>
        <script async src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </html>
    </AuthProvider>
  )
}
