import React from 'react'

const items = [
  {
    title: 'UPLOAD AN IMAGE',
    description:
      'Upload a clear image of your sneaker from different angles to begin the AI authentication process. You can drag and drop the image or click to browse your files.',
  },
  {
    title: 'AI ANALYSIS',
    description:
      'Upload a clear image of your sneaker from different angles to begin the AI authentication process. You can drag and drop the image or click to browse your files.',
  },
  {
    title: 'GET RESULTS',
    description:
      'Upload a clear image of your sneaker from different angles to begin the AI authentication process. You can drag and drop the image or click to browse your files.',
  },
]
const HowItWorks = () => {
  return (
    <div className="responsive-width mx-auto !mt-20">
      <div className="text-5xl font-bold">How It Works</div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="mt-10 border-2 border-[#5F9E19] py-16 px-5 rounded-lg w-full"
          >
            <div className="text-2xl font-bold">{item.title}</div>
            <div className=" text-gray-300 flex gap-1 items-center mt-5">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks
