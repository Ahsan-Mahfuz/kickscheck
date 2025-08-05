'use client'
import React from 'react'
import Image from 'next/image'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface ShoeCardProps {
  pass: boolean
}
const ShoeCard = ({ pass }: ShoeCardProps) => {
  const router = useRouter()
  return (
    <div
      className="responsive-width mx-auto flex cursor-pointer "
      onClick={() => router.push('/shoe-details/1')}

    >
      <div className="border-2 relative border-[#5F9E19] rounded-lg overflow-hidden">
        <Image
          alt="shoe"
          src="/shoe/shoe-1.jpg"
          width={5000}
          height={5000}
          className="object-cover  object-center w-[400px]  h-[300px] rounded-lg"
        />
        <div
          className={`absolute inset-0 left-5 top-5 rounded-lg px-12 py-4 font-semibold  ${
            pass ? 'bg-[#5F9E19]' : 'bg-red-500'
          } w-[50px] h-[30px] flex items-center justify-center`}
          style={{ pointerEvents: 'none' }}
        >
          {pass ? 'Pass' : 'Fail'}
        </div>
        <div className="bg-white overflow-hidden !text-black font-bold px-3 py-2">
          <div className="flex justify-between items-center">
            <div className="!text-black font-bold text-xl ">Nike Dunk Low</div>
            <div className="flex gap-1 items-center ">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaRegStar />
              <div className="text-gray-600">(20)</div>
            </div>
          </div>
          <div className="mt-2 text-gray-600">09 May 2025</div>
        </div>
      </div>
    </div>
  )
}

export default ShoeCard
