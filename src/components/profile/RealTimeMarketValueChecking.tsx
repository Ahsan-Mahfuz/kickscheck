'use client'
import { useGetRealTimeMarketValueQuery } from '@/redux/snekersProfileApis'
import React, { useEffect, useState } from 'react'
import ShoeCardExplore from '../shoeCardExplore/ShoeCardExplore'
import { Spin } from 'antd'
interface Photo {
  _id: string
  photoUrl: string
}

interface Sneaker {
  _id: string
  photo: Photo[]
  sneaker_name: string
  brand_name: string
  isCheckedAI: boolean
  averageRating: number
  totalReviews: number
  createdAt: string
}

const RealTimeMarketValueChecking = () => {
  const [id, setId] = useState('')
  useEffect(() => {
    const id = localStorage.getItem('realTimeMarketValue')
    if (id) {
      setId(id)
    }
  }, [])

  const { data: getValue, isLoading } = useGetRealTimeMarketValueQuery(
    { id },
    { skip: !id }
  )

  if (typeof getValue?.data === 'string') {
    return (
      <div className="flex justify-center items-center h-64 flex-col">
        <div className="text-center text-gray-500 mb-3 text-[18px]">
          You are not allowed to use this feature with your current plan. Please
          upgrade to a higher plan or contact us for more information.
        </div>
      </div>
    )
  }

  const sneakersData: Sneaker[] = getValue?.data ?? []

  if (sneakersData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        <h3 className="text-xl mb-4">No passed sneakers</h3>
        <p>None of your sneakers have passed AI verification yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 mb-20">
      {sneakersData.map((sneaker) => (
        <ShoeCardExplore
          key={sneaker._id}
          id={sneaker._id}
          sneakerName={sneaker.sneaker_name}
          brandName={sneaker.brand_name}
          photos={sneaker.photo[0]}
          pass={sneaker.isCheckedAI}
          averageRating={sneaker.averageRating}
          totalReviews={sneaker.totalReviews}
          createdAt={sneaker.createdAt}
        />
      ))}
    </div>
  )
}

export default RealTimeMarketValueChecking
