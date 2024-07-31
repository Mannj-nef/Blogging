import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import ReactQueryClientProvider from '~/components/reactQueryClientProvider'

import '~/styles/reset.scss'
import '~/styles/variable.scss'
import '~/styles/globals.scss'
import { RootStyleRegistry } from '~/lib/rootStyleRegistry'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Napa Blogging App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <ReactQueryClientProvider>
        <body className={inter.className}>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </body>
      </ReactQueryClientProvider>
    </html>
  )
}
