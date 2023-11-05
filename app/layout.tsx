import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/store/AppContext'
import ProModal from '@/components/proModal'
import AuthProvider from '@/store/AuthProvider'
import { CrispProvider } from '@/components/CrispProvider'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OriginAI',
  description: 'Best Ai tool for your daily requirements',
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
            <Toaster position='top-center'/>
          </AppProvider>
        </body>
        <script async src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </html>
    </AuthProvider>
  )
}
