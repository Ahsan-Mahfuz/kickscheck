'use client'

import { useGetResaleValueQuery } from '@/redux/snekersProfileApis'
import { useSearchParams } from 'next/navigation'

const Resale = () => {
  const searchParams = useSearchParams()
  const brandName = searchParams.get('brand')
  const {
    data: resaleData,
    isLoading,
    isError,
  } = useGetResaleValueQuery({ brandName })
  const finalResaleData = resaleData?.data

  if (isLoading) return <div className="text-center py-6">Loading...</div>
  if (isError)
    return (
      <div className="text-center text-red-500 py-6">Something went wrong!</div>
    )

  return (
    <div className="max-w-2xl mx-auto p-6 !text-black">
      <h1 className="text-2xl font-bold text-center mb-6">
        Resale Analysis for <span className="text-blue-600">{brandName}</span>
      </h1>

      {/* Overall Data */}
      <div className="bg-white shadow rounded-2xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Overall Market</h2>
        <p>
          Average Market Value:{' '}
          <span className="font-bold">
            ${finalResaleData?.overall?.[0]?.averageMarketValue}
          </span>
        </p>
        <p>
          Total Count:{' '}
          <span className="font-bold">
            {finalResaleData?.overall?.[0]?.totalCount}
          </span>
        </p>
        <p>
          Non-Zero Count:{' '}
          <span className="font-bold">
            {finalResaleData?.overall?.[0]?.nonZeroCount}
          </span>
        </p>
      </div>

      {/* AI Checked True */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            AI Checked (True)
          </h2>
          <p>
            Average Market Value:{' '}
            <span className="font-bold">
              ${finalResaleData?.isCheckedAI_true?.averageMarketValue}
            </span>
          </p>
          <p>
            Count:{' '}
            <span className="font-bold">
              {finalResaleData?.isCheckedAI_true?.count}
            </span>
          </p>
          <p>
            Non-Zero Count:{' '}
            <span className="font-bold">
              {finalResaleData?.isCheckedAI_true?.nonZeroCount}
            </span>
          </p>
        </div>

        {/* AI Checked False */}
        <div className="bg-red-50 border border-red-200 shadow rounded-2xl p-4">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            AI Checked (False)
          </h2>
          <p>
            Average Market Value:{' '}
            <span className="font-bold">
              ${finalResaleData?.isCheckedAI_false?.averageMarketValue}
            </span>
          </p>
          <p>
            Count:{' '}
            <span className="font-bold">
              {finalResaleData?.isCheckedAI_false?.count}
            </span>
          </p>
          <p>
            Non-Zero Count:{' '}
            <span className="font-bold">
              {finalResaleData?.isCheckedAI_false?.nonZeroCount}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Resale
