'use client'
import Comments from '@/components/shoeDetails/Comments'
import { imageUrl } from '@/redux/main/server'
import {
  useGetOneSneakerProfileQuery,
  useGetReviewSneakerQuery,
} from '@/redux/snekersProfileApis'
import { Divider } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { MdOutlineStar } from 'react-icons/md'

interface Items {
  _id: string
  photoUrl?: string
}
const ShoeDetails = () => {
  const router = usePathname()
  const id = router.split('/').pop()
  const { data: shoeDetails } = useGetOneSneakerProfileQuery({ id })
  const { data: shoeReview } = useGetReviewSneakerQuery({ id })

  console.log(shoeReview)

  const shoeDetailsData = shoeDetails?.data
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
            {/* <Link
              href={'/profile/1'}
              className="text-2xl flex items-center gap-2 hover:text-blue-400 cursor-pointer"
            >
              Owner: Ahsan Mahfuz <FaExternalLinkAlt className="text-xl " />
            </Link> */}
            <div className="text-2xl mt-4">
              Code : {shoeDetailsData?.sneaker_code}
            </div>
            <div className="text-7xl mt-4">{shoeDetailsData?.sneaker_name}</div>
            <div className="mt-5 font-medium">
              {shoeDetailsData?.description}
            </div>
          </section>
          <section></section>
        </div>
      </div>

      <section className="responsive-width mx-auto flex gap-5 mt-10 ">
        <section className="w-1/2 flex gap-5  border-2 border-[#5F9E19] rounded-lg p-5">
          <div>
            <Image
              src={`${imageUrl}/${shoeDetailsData?.photo[0].photoUrl}`}
              alt="shoe"
              className="max-w-[300px] h-full w-full object-cover"
              width={5000}  
              height={5000}
            />
          </div>
          <div className="space-y-4">
            <div>Name : {shoeDetailsData?.sneaker_name}</div>
            <div>Brand : {shoeDetailsData?.brand_name}</div>
            <div>Code : {shoeDetailsData?.sneaker_code}</div>
            <div>
              Status :{' '}
              {shoeDetailsData?.isCheckedAI ? 'Authentic' : 'Not Authentic'}
            </div>
            {shoeDetailsData?.isCheckedAI && <div>Authentic : 90%</div>}
            <div className="flex items-center gap-2">
              Rating :
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: shoeDetailsData?.totalReviews ?? 0 },
                  (_, i) => (
                    <MdOutlineStar key={i} className="text-yellow-500" />
                  )
                )}
                <div>({shoeDetailsData?.totalReviews})</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2   gap-4 items-start justify-center flex-1">
          {shoeDetailsData?.photo.slice(1).map((item: Items, index: number) => (
            <div key={index}>
              <Image
                src={`${imageUrl}/${item?.photoUrl}`}
                alt="shoe"
                className="  w-[300px] h-[300px] object-cover"
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
