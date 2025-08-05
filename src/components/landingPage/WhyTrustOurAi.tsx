import { IoCheckmarkSharp } from 'react-icons/io5'
import { LuCircleDotDashed, LuLeaf } from 'react-icons/lu'

const items = [
  {
    title: '95%',
    desc: 'Accuracy',
    icon: <IoCheckmarkSharp />,
  },
  {
    title: '500K+ ',
    desc: 'Sneakers Analyzed',
    icon: <LuCircleDotDashed />,
  },
  {
    title: 'Real-Time',
    desc: 'Learning Enabled',
    icon: <LuLeaf />,
  },
]
const WhyTrustOurAi = () => {
  return (
    <div className="responsive-width mx-auto mt-32 text-white ">
      <h1 className="text-4xl font-bold mb-5">Why Trust Our AI ?</h1>
      <div className="text-xl text-gray-300">
        Trained with Thousands of Sneaker Images for 95%+ Accuracy
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-60">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center justify-between ">
            <div className="mt-10 border-2 border-[#5F9E19] flex items-center  justify-between rounded-lg w-full px-10 py-3">
              <div className="text-3xl font-bold text-[#5F9E19]">
                {item.icon}
              </div>
              <div className=" text-gray-300 flex flex-col gap-1  mt-5 ">
                <div className='font-bold text-2xl'>{item.title}</div>
                <div>{item.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyTrustOurAi
