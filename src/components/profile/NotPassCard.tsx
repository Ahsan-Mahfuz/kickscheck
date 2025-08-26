import React, { useEffect } from 'react'
import ShoeCard from '../shoeCard/ShoeCard'
import { Spin } from 'antd'
import { useGetMySneakersProfileQuery } from '@/redux/snekersProfileApis'
import { skipToken } from '@reduxjs/toolkit/query'

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

const NotPassCard = () => {
  const subscriptionId =
    typeof window !== 'undefined'
      ? localStorage.getItem('subscriptionId')
      : null

  const { data: sneakersProfile, isLoading } = useGetMySneakersProfileQuery(
    subscriptionId
      ? { id: subscriptionId, human_review: 'Not Pass' }
      : skipToken
  )

  const sneakersData: Sneaker[] = sneakersProfile?.data?.data ?? []

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  if (sneakersData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        <h3 className="text-xl mb-4">No pending sneakers</h3>
        <p>All your sneakers have been processed by AI verification.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 mb-20">
      {sneakersData.map((sneaker) => (
        <ShoeCard
          key={sneaker._id}
          id={sneaker._id}
          sneakerName={sneaker.sneaker_name}
          brandName={sneaker.brand_name}
          photos={sneaker.photo}
          pass={sneaker.isCheckedAI}
          averageRating={sneaker.averageRating}
          totalReviews={sneaker.totalReviews}
          createdAt={sneaker.createdAt}
        />
      ))}
    </div>
  )
}

export default NotPassCard
