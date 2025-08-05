'use client'
import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

const monthly = [
  {
    name: 'Freemium (Free Plan)',
    description: 'Entry-level access for new users.',
    allUse: 'Includes AI + Human Legit-Check',
    price: '$00',
    period: '/month',
    features: [
      'Upload and authenticate up to 2 sneakers per month (AI-only).',
      'Add up to 5 sneakers in their personal vault/favorite.',
      'Access limited market insights and fit guides.',
      'View real-time market value for 1 sneaker in their vault.',
      'Limited visibility to public profiles and community features.',
    ],
    buttonText: 'Try to Free',
    buttonClass: 'bg-green-800  hover:bg-green-700',
    cardClass: 'bg-gray-700 border-green-500',
    highlight: true,
  },
  {
    name: 'Basic Plan',
    price: '$4.99',
    period: '/month',
    description: 'For casual users and moderate collectors.',
    allUse: 'Includes AI + Human Legit-Check',
    features: [
      '10 legit checks per month (AI + optional human review).',
      'Add up to 20 sneakers to their vault.',
      'Market value tracking for up to 10 sneakers.',
      'Early access to special drops and updates.',
    ],
    buttonText: 'Buy Now',
    buttonClass: 'bg-green-800  hover:bg-green-700',
    cardClass: 'bg-white border-gray-200',
  },
  {
    name: 'Pro Plan',
    price: '$9.99',
    period: '/month',
    description: 'For resellers, high-activity collectors, and advanced users.',
    allUse: 'Includes AI + Human Legit-Check',
    features: [
      '50 legit checks per month (AI + human review).',
      'Unlimited vault and sneaker entries.',
      'Advanced market analytics (price trend charts, heat maps).',
      'Access to Paycheck NFC tag linking (sneaker-on-tap).',
      '"Pro" badge visible on profile and sneaker listings.',
      'Priority support and direct chat option.',
      'Ability to watch and track high-interest sneaker models.',
    ],
    buttonText: 'Buy Now',
    buttonClass: 'bg-green-800  hover:bg-green-700',
    cardClass: 'bg-white border-gray-200',
  },
  {
    name: 'Collector Plan',
    price: '$19.99',
    period: '/month',
    description: 'Designed for elite collectors and retail consignment stores.',
    allUse: 'Includes AI + Human Legit-Check',
    features: [
      'Unlimited legit checks.',
      'Full access to all platform features and tools.',
      'Exclusive "Collector" badge on public profile.',
      'Annual allocation of free NFC tag packs.',
      'Auto-generated insurance documents (PDF) for high-value sneakers.',
      'Historical resale tracking and transfer logs.',
      'Invite-only beta feature access.',
      'Highest-tier customer support and onboarding.',
    ],
    buttonText: 'Buy Now',
    buttonClass: 'bg-green-800  hover:bg-green-700',
    cardClass: 'bg-white border-gray-200',
  },
]

const yearly = [
  {
    name: 'Freemium (Free Plan)',
    description: 'Entry-level access for new users.',
    allUse: 'Includes AI + Human Legit-Check',
    price: '$00',
    period: '/year',
    features: [
      'Upload and authenticate up to 2 sneakers per month (AI-only).',
      'Add up to 5 sneakers in their personal vault/favorite.',
      'Access limited market insights and fit guides.',
      'View real-time market value for 1 sneaker in their vault.',
      'Limited visibility to public profiles and community features.',
    ],
    buttonText: 'Try to Free',
    buttonClass: 'bg-green-800  hover:bg-green-700',
    cardClass: 'bg-gray-700 border-green-500',
    highlight: true,
  },
  {
    name: 'Basic Plan',
    price: '$9.99',
    period: '/year',
    description: 'For casual users and moderate collectors.',
    allUse: 'Includes AI + Human Legit-Check',
    features: [
      '10 legit checks per month (AI + optional human review).',
      'Add up to 20 sneakers to their vault.',
      'Market value tracking for up to 10 sneakers.',
      'Early access to special drops and updates.',
    ],
    buttonText: 'Buy Now',
    buttonClass: 'bg-green-800  hover:bg-green-700',
    cardClass: 'bg-white border-gray-200',
  },
  {
    name: 'Pro Plan',
    price: '$19.99',
    period: '/year',
    description: 'For resellers, high-activity collectors, and advanced users.',
    allUse: 'Includes AI + Human Legit-Check',
    features: [
      '50 legit checks per month (AI + human review).',
      'Unlimited vault and sneaker entries.',
      'Advanced market analytics (price trend charts, heat maps).',
      'Access to Paycheck NFC tag linking (sneaker-on-tap).',
      '"Pro" badge visible on profile and sneaker listings.',
      'Priority support and direct chat option.',
      'Ability to watch and track high-interest sneaker models.',
    ],
    buttonText: 'Buy Now',
    buttonClass: 'bg-green-800  hover:bg-green-700',
    cardClass: 'bg-white border-gray-200',
  },
  {
    name: 'Collector Plan',
    price: '$29.99',
    period: '/year',
    description: 'Designed for elite collectors and retail consignment stores.',
    allUse: 'Includes AI + Human Legit-Check',
    features: [
      'Unlimited legit checks.',
      'Full access to all platform features and tools.',
      'Exclusive "Collector" badge on public profile.',
      'Annual allocation of free NFC tag packs.',
      'Auto-generated insurance documents (PDF) for high-value sneakers.',
      'Historical resale tracking and transfer logs.',
      'Invite-only beta feature access.',
      'Highest-tier customer support and onboarding.',
    ],
    buttonText: 'Buy Now',
    buttonClass: 'bg-green-800  hover:bg-green-700',
    cardClass: 'bg-white border-gray-200',
  },
]

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('monthly')
  const currentPlans = activeTab === 'monthly' ? monthly : yearly

  return (
    <div className="responsive-width mx-auto mt-32 text-white !font-poppins">
      <div className=" mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8">
            Pricing for KickCheck Sneaker AI Authentication
          </h1>

          <div className="flex   gap-60">
            <div className="text-xl text-gray-300 flex">
              Best Plans For Premium Users
            </div>

            <div className="inline-flex footer-bg-color rounded-2xl p-2 ">
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
                    ? 'normal-button-bg-color  shadow-lg text-white transform scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 !font-poppins">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6  border-2 ${plan.cardClass} ${
                plan.highlight ? 'transform  ' : 'bg-green-50'
              } transition-all duration-300 hover:shadow-lg `}
            >
              <div className="flex flex-col justify-between  h-full !font-poppins">
                <div>
                  <div className="mb-6 !font-poppins">
                    <div
                      className={` text-center   text-xl !mx-auto px-3 py-2 rounded-full  font-medium mb-4 ${
                        plan.highlight
                          ? 'bg-green-800  text-white '
                          : 'bg-green-100 text-green-800 border border-black '
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
                        <IoMdCheckmarkCircleOutline
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            plan.highlight ? 'text-[#2DC937]' : 'text-[#2DC937]'
                          }`}
                        />
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
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 normal-button-bg-color text-white`}
                >
                  {plan.buttonText}
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
