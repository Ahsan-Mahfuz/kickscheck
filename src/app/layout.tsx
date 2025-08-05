import LayoutWrapper from '@/components/layoutWrapper/LayoutWrapper'
import './globals.css'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'


const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {

  title: 'Stock Market',
  description:
    'Stock Market is a platform for people to buy and sell stocks, view market trends and make informed investment decisions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              backgroundColor: `rgba(25, 48, 80, 1)`,
              color: 'white',
              borderRadius: '0px',
              border: '1px solid black',
            },
          }}
        />
      </body>
    </html>
  )
}
