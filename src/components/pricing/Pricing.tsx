'use client'
import React, { useState, useMemo } from 'react'
import {
  useGetFreeSubscriptionQuery,
  useGetSubscriptionQuery,
} from '@/redux/subscriptionsApis'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

interface Subscription {
  _id: string
  subscription_name: string
  title: string
  casual_info: string
  price: number
  subscription_features: string[]
  subscription_period: string
}

interface Plan {
  id: string
  name: string
  description: string
  allUse: string
  price: string
  features: string[]
  buttonText: string
  buttonClass: string
  cardClass: string
  highlight: boolean
  subscriptionPeriod: string
  period: '/month' | '/year'
  originalData: Subscription
}

const Pricing: React.FC = () => {
  const { data: getAllSubscription, isLoading: isLoadingSubscriptions } =
    useGetSubscriptionQuery(undefined)

  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)

  const { data: freeSubscriptionData, isLoading: isLoadingFreeSubscription } =
    useGetFreeSubscriptionQuery(selectedPlanId && { id: selectedPlanId })

  const transformedPlans = useMemo(() => {
    if (!getAllSubscription?.data?.all_subscription)
      return { monthly: [] as Plan[], yearly: [] as Plan[] }

    const subscriptions: Subscription[] =
      getAllSubscription.data.all_subscription
    const monthly: Plan[] = []
    const yearly: Plan[] = []

    subscriptions.forEach((sub) => {
      const planData: Omit<Plan, 'period'> = {
        id: sub._id,
        name: sub.subscription_name,
        description: sub.title.replace("'", ''),
        allUse: sub.casual_info,
        price: sub.price === 0 ? '$00' : `$${sub.price}`,
        features: sub.subscription_features,
        buttonText: sub.price === 0 ? 'Try for Free' : 'Buy Now',
        buttonClass: 'bg-green-800 hover:bg-green-700',
        cardClass:
          sub.price === 0
            ? 'bg-gray-700 border-green-500'
            : 'bg-white border-gray-200',
        highlight: sub.price === 0,
        subscriptionPeriod: sub.subscription_period,
        originalData: sub,
      }

      if (
        sub.subscription_period.includes('monthly') ||
        sub.subscription_period === 'pro_monthly' ||
        sub.subscription_period === 'basic_monthly'
      ) {
        monthly.push({ ...planData, period: '/month' })
      } else if (
        sub.subscription_period.includes('yearly') ||
        sub.subscription_period === 'yearly'
      ) {
        yearly.push({ ...planData, period: '/year' })
      } else {
        monthly.push({ ...planData, period: '/month' })
        yearly.push({ ...planData, period: '/year' })
      }
    })

    return { monthly, yearly }
  }, [getAllSubscription])

  const currentPlans =
    activeTab === 'monthly' ? transformedPlans.monthly : transformedPlans.yearly

  const handlePlanSelection = async (plan: Plan) => {
    try {
      setSelectedPlanId(plan.id)

      if (plan.highlight || plan.originalData.price === 0) {
        console.log('Free plan selected, API call triggered automatically')
        console.log('Free subscription data:', freeSubscriptionData)
      } else {
        console.log('Paid plan selected:', plan)
        // Integrate payment gateway or API call here
      }
    } catch (error) {
      console.error('Error selecting plan:', error)
    }
  }

  if (isLoadingSubscriptions) {
    return (
      <div className="responsive-width mx-auto mt-32 text-white !font-poppins">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading pricing plans...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="responsive-width mx-auto mt-32 text-white !font-poppins">
      <div className="mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8">
            Pricing for KickCheck Sneaker AI Authentication
          </h1>

          <div className="flex gap-60">
            <div className="text-xl text-gray-300 flex">
              Best Plans For Premium Users
            </div>

            <div className="inline-flex footer-bg-color rounded-2xl p-2">
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'monthly'
                    ? 'normal-button-bg-color shadow-lg text-white transform scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'yearly'
                    ? 'normal-button-bg-color shadow-lg text-white transform scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 !font-poppins">
          {currentPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 border-2 ${plan.cardClass} ${
                plan.highlight ? 'transform' : 'bg-green-50'
              } transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex flex-col justify-between h-full !font-poppins">
                <div>
                  <div className="mb-6 !font-poppins">
                    <div
                      className={`text-center text-xl !mx-auto px-3 py-2 rounded-full font-medium mb-4 ${
                        plan.highlight
                          ? 'bg-green-800 text-white'
                          : 'bg-green-100 text-green-800 border border-black'
                      }`}
                    >
                      {plan.name}
                    </div>

                    <p
                      className={`text-sm mb-4 text-center ${
                        plan.highlight ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {plan.description}
                    </p>

                    <p
                      className={`mb-6 text-center ${
                        plan.highlight ? 'text-[#2DC937]' : 'text-[#37aa3f]'
                      }`}
                    >
                      {plan.allUse}
                    </p>

                    <div className="flex items-baseline mb-6">
                      <span
                        className={`text-4xl font-bold ${
                          plan.highlight ? 'text-green-400' : 'text-gray-900'
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-sm ml-1 ${
                          plan.highlight ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 !font-poppins">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3 !font-poppins"
                      >
                        <IoMdCheckmarkCircleOutline className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#2DC937]" />
                        <span
                          className={`text-sm ${
                            plan.highlight ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handlePlanSelection(plan)}
                  disabled={
                    isLoadingFreeSubscription && selectedPlanId === plan.id
                  }
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 normal-button-bg-color text-white ${
                    isLoadingFreeSubscription && selectedPlanId === plan.id
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:opacity-90'
                  }`}
                >
                  {isLoadingFreeSubscription && selectedPlanId === plan.id
                    ? 'Processing...'
                    : plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing
