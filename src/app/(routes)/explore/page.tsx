'use client'
import ShoeCard from '@/components/shoeCard/ShoeCard'
import ShoeCardExplore from '@/components/shoeCardExplore/ShoeCardExplore'
import { useGetAllSneakerQuery } from '@/redux/snekersProfileApis'
import React from 'react'
interface Photo {
  _id: string
  photoUrl: string
}

interface Sneaker {
  _id: string
  photo: Photo
  sneaker_name: string
  brand_name: string
  isCheckedAI: boolean
  averageRating: number
  totalReviews: number
  createdAt: string
}
const Explore = () => {
  const { data: getAllSneakersData } = useGetAllSneakerQuery(undefined)
  const sneakersData: Sneaker[] = getAllSneakersData?.data ?? []

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/explore/explore.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '60vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0 bg-green-950 opacity-50 z-10"
          style={{ pointerEvents: 'none' }}
        ></div>

        <section className="mt-10 flex justify-between items-center text-white responsive-width mx-auto gap-20 relative z-20">
          <div className="w-2/3 mt-10">
            <div className="text-6xl font-bold leading-normal">
              EXPLORE WHAT WE CHECKED
            </div>
            <div className="mt-5 max-w-[400px] ">
              KickCheck could be the perfect fit for your business—regardless of
              its size. Let’s work together to bring trust back into the resale
              market.
            </div>
          </div>
          <div className="w-1/2"></div>
        </section>
      </div>

      <section className="mt-10 my-20 grid grid-cols-3 gap-5 responsive-width mx-auto">
        {sneakersData.map((sneaker) => (
          <ShoeCardExplore
            key={sneaker._id}
            id={sneaker._id}
            sneakerName={sneaker.sneaker_name}
            brandName={sneaker.brand_name}
            photos={sneaker?.photo}
            pass={sneaker.isCheckedAI}
            averageRating={sneaker.averageRating}
            totalReviews={sneaker.totalReviews}
            createdAt={sneaker.createdAt}
          />
        ))}
      </section>
    </>
  )
}

export default Explore
