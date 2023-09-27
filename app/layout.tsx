import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { AppProvider } from '@/store/AppContext'
import ProModal from '@/components/proModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genius',
  description: 'AI Genius',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AppProvider>
            <ProModal />
            {children}
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
