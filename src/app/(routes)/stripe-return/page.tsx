import React from 'react'
import { CheckCircleIcon } from 'lucide-react'
import Link from 'next/link'

const StripeReturn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r ">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-6 animate-bounce" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Stripe Connected!
        </h1>
        <p className="text-gray-600 !mb-12">
          You have successfully connected your Stripe account. You can now start
          accepting payments seamlessly.
        </p>
        <Link
          href="/"
          className="mt-20 px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition-all"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default StripeReturn
