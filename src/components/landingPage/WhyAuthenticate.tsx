import React from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { TbPointFilled } from 'react-icons/tb'

const items = [
  {
    title: 'Nearly 100% Accurate AI Technology',
    description:
      'Our solution has been trained on over a million images of sneakers and is powered by advanced machine learning models.',
    points: [
      'The system evaluates over two dozen image angles and characteristics to identify counterfeits',
      'Accuracy exceeds human verification',
      'Models are updated frequently as the AI learns with each scan',
    ],
  },
  {
    title: 'Money-Back Guarantee',
    description:
      'Protect your profits and the customer experience with our guarantee: if the AI provides an incorrect result, you get your money back.',
    points: [
      'Trust in your results',
      'Your authentication service is 100% satisfaction backed or your money back',
    ],
  },
  {
    title: 'Maximized Profits',
    description:
      'Get the most value out of authentic sneakers, avoiding losses from unknowingly buying fakes.',
    points: [
      'Trust drives demand & strengthens pricing',
      'The accuracy offered is unmatched, and the AI model continues improving',
      'Authentication boosts resale price & helps convert new or skeptical customers',
    ],
  },
  {
    title: 'Balanced Operational Efficiency',
    description:
      'Entropy’s fast, easy-to-use solution eliminates mistakes and bottlenecks in manual sneaker authentication.',
    points: [
      'Lightning-fast results in under a minute',
      'No deep sneaker expertise required—any staff member can operate',
      'Optimizes time, reduces return rates, and ensures the highest accuracy in decisions',
    ],
  },
]
const WhyAuthenticate = () => {
  return (
    <div className="responsive-width mx-auto !mt-20">
      <div className="text-5xl font-bold">Why Authenticate with KickCheck</div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="mt-10 border-2 border-[#5F9E19] py-16 px-5 rounded-lg w-full"
          >
            <div className="text-3xl font-bold">{item.title}</div>
            <div className=" text-gray-300 flex gap-1 items-center mt-5">
              <TbPointFilled />
              {item.description}
            </div>
            <div className="mt-5 space-y-3">
              {item.points.map((point, index) => (
                <div key={index} className="flex items-start ">
                  <div className="mr-2">
                    <IoMdCheckmarkCircleOutline className="text-[#5F9E19] text-xl mt-0.5" />
                  </div>
                  <div>{point}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyAuthenticate
