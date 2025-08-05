import MyCardItems from '@/components/profile/MyCardItems'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiPurchaseTag } from 'react-icons/bi'
import { CiEdit } from 'react-icons/ci'
import { IoMdShareAlt } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'

const OtherProfile = () => {
  return (
    <div className="relative">
      <div
        style={{
          backgroundImage: "url('/shoe/profile.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '80vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0  bg-green-950 opacity-30 z-10"
          style={{ pointerEvents: 'none' }}
        ></div>
      </div>

      <Link href={'/edit-profile'} className="!z-50 absolute top-0 right-0 ">
        <IoMdShareAlt className="text-white text-5xl hover:text-yellow-400 cursor-pointer" />
      </Link>
      <div className="!z-50 absolute mx-auto top-[600px] w-full flex flex-col items-center justify-center !pb-50">
        <div>
          <Image
            src="/shoe/shoe-2.jpg"
            alt="shoe"
            width={5000}
            height={5000}
            className="w-[200px]  h-[200px] flex items-center justify-center rounded-full"
          />
        </div>

        <div className="space-y-2 flex items-center justify-center flex-col">
          <div className="font-bold text-2xl ">Carlton Member</div>
          <div className="flex items-center gap-2">
            <MdOutlineLocationOn />
            Washington, USA
          </div>
          <div className="flex items-center gap-2">
            <BiPurchaseTag />
            Pro Plan
          </div>
        </div>
      </div>

      <div className="responsive-width mx-auto">
        <div className="mt-48 mx-auto  flex items-center justify-center text-center "></div>
        <div>
          <MyCardItems />
        </div>
      </div>
    </div>
  )
}

export default OtherProfile
