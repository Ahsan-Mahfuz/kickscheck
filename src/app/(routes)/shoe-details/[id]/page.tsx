import Comments from '@/components/shoeDetails/Comments'
import { Divider } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { MdOutlineStar } from 'react-icons/md'

const shoeList = [
  '/shoe/other_profile.jpg',
  '/shoe/other_profile.jpg',
  '/shoe/other_profile.jpg',
  '/shoe/other_profile.jpg',
]
const ShoeDetails = () => {
  return (
    <div className="!mb-20">
      <div
        style={{
          backgroundImage: "url('/shoe/other_profile.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '50vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0 bg-green-950 opacity-50 z-10"
          style={{ pointerEvents: 'none' }}
        ></div>

        <div className="responsive-width mx-auto flex items-center z-20 h-full relative  font-bold ">
          <section className="max-w-[500px] w-full ">
            <Link href={'/profile/1'} className="text-2xl flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              Owner: Ahsan Mahfuz <FaExternalLinkAlt className="text-xl " />
            </Link>
            <div className="text-2xl mt-4">Code : #259 5456</div>
            <div className="text-7xl mt-4">NIKE BASKETBALL SNEAKER</div>
            <div className="mt-5 font-medium">
              KickCheck could be the perfect fit for your business—regardless of
              its size. Let’s work together to bring trust back into the resale
              market.
            </div>
          </section>
          <section></section>
        </div>
      </div>

      <section className="responsive-width mx-auto flex gap-5 mt-10 ">
        <section className="w-1/2 flex gap-5  border-2 border-[#5F9E19] rounded-lg p-5">
          <div>
            <Image
              src={'/shoe/other_profile.jpg'}
              alt="shoe"
              className="max-w-[400px] w-full"
              width={5000}
              height={5000}
            />
          </div>
          <div className="space-y-4">
            <div>Name : Nike Basketball Sneaker</div>
            <div>Brand : Nike</div>
            <div>Code : #259 5456</div>
            <div>Status : Pass</div>
            <div>Authentic : 90%</div>
            <div className="flex items-center gap-2">
              Rating :
              <div className="flex items-center gap-1">
                <MdOutlineStar className="text-yellow-500" />
                <MdOutlineStar className="text-yellow-500" />
                <MdOutlineStar className="text-yellow-500" />
                <MdOutlineStar className="text-yellow-500" />
                <MdOutlineStar className="text-yellow-500" />
                <div>(20)</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 items-start justify-center flex-1">
          {shoeList.map((item, index) => (
            <div key={index}>
              <Image
                src={item}
                alt="shoe"
                className=" w-full"
                width={5000}
                height={5000}
              />
            </div>
          ))}
        </section>
      </section>

      <section className="responsive-width mx-auto  mt-10 ">
        <div className="text-3xl font-bold border-b-2 border-gray-500 pb-4">
          Review
        </div>

        <div className="mt-5 ">
          <Comments />
        </div>
      </section>
    </div>
  )
}

export default ShoeDetails
