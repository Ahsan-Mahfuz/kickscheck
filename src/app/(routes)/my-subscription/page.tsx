'use client'
import { useGetAllMySubscriptionQuery } from '@/redux/subscriptionsApis'
import { useRouter } from 'next/navigation'
import React from 'react'

const MySubscription = () => {
  const {
    data: getAllMySubPlan,
    isLoading,
    isError,
  } = useGetAllMySubscriptionQuery(undefined)

  const navigate = useRouter()

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400 border-b-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    )

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">💥</div>
          <p className="text-white text-xl font-semibold">
            Oops! Something went wrong!
          </p>
          <p className="text-gray-300 mt-2">Please try again later</p>
        </div>
      </div>
    )

  const handleClickSubscription = (id: string, realId: string) => {
    localStorage.setItem('subscriptionId', id)
    localStorage.setItem('realTimeMarketValue', realId)
    navigate.push(`/profile`)
  }

  return (
    <div className="">
      <div className="responsive-width mx-auto p-6 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-4 text-white ">
            My Subscription Plans
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getAllMySubPlan?.data?.my_subscription?.map(
            (sub: any, index: number) => (
              <div
                key={sub.id}
                className="group relative"
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:bg-white/15 min-h-[500px] flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  <div className="absolute inset-[1px] rounded-3xl bg-slate-900/80 backdrop-blur-lg"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          sub.isAvailable
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            sub.isAvailable ? 'bg-green-400' : 'bg-red-400'
                          } animate-pulse`}
                        ></div>
                        {sub.isAvailable ? 'Active' : 'Inactive'}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {sub.subscriptionId.subscription_name}
                    </h2>

                    <div className="flex justify-between mb-4 text-sm">
                      <div className="bg-purple-500/20 px-3 py-2 rounded-lg border border-purple-500/30">
                        <p className="text-purple-300 font-semibold">Start</p>
                        <p className="text-white">
                          {new Date(
                            sub.subscriptionId.starting_date
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-blue-500/20 px-3 py-2 rounded-lg border border-blue-500/30">
                        <p className="text-blue-300 font-semibold">End</p>
                        <p className="text-white">
                          {new Date(
                            sub.subscriptionId.ending_date
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-200 mb-3 font-medium">
                      {sub.subscriptionId.title}
                    </p>
                    <p className="text-gray-400 italic mb-4 text-sm leading-relaxed">
                      {sub.subscriptionId.casual_info}
                    </p>

                    <div className="mb-6">
                      <span className="text-4xl font-black text-white">
                        ${sub.subscriptionId.price}
                      </span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                        Features
                      </h4>
                      <ul className="space-y-2">
                        {sub.subscriptionId.subscription_features.map(
                          (feature: string, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-center text-gray-300 text-sm"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></div>
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div
                      className={`w-full py-4 text-center cursor-pointer rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                        sub.isAvailable
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25 hover:scale-105 opacity-60'
                          : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-red-500/25 hover:scale-105 cursor-not-allowed'
                      }`}
                      onClick={() => {
                        handleClickSubscription(
                          sub.subscriptionId._id,
                          sub?._id
                        )
                      }}
                    >
                      Go With {sub.subscriptionId.subscription_name}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {(!getAllMySubPlan?.data?.my_subscription ||
          getAllMySubPlan.data.my_subscription.length === 0) && (
          <div className="text-center py-20">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No Subscriptions Found
              </h3>
              <p className="text-gray-300 mb-6">
                You don&apos;t have any active subscription plans yet.
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105">
                Browse Plans
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MySubscription
