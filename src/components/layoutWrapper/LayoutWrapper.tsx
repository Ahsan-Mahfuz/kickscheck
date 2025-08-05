'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import ChatBot from '../chatbot/ChatBot'
import { Provider } from 'react-redux'
import { store } from '@/redux/main/store'

const HIDDEN_PATHS = [
  '/sign-in',
  '/sign-up',
  '/verify-account',
  '/reset-password',
  '/set-new-password',
  '/forget-password',
  '/check-email-for-the-otp',
]

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideLayout = HIDDEN_PATHS.includes(pathname)

  return (
    <>
      <Provider store={store}>
        {!hideLayout && <Navbar />}
        {!hideLayout && <ChatBot />}
        <div className="min-h-screen">{children}</div>
        {!hideLayout && <Footer />}
      </Provider>
    </>
  )
}
