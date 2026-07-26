import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Payment Practice',
  description: 'Payment systems learning lab',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
