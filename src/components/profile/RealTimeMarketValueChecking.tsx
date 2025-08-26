'use client'
import { useGetRealTimeMarketValueQuery } from '@/redux/snekersProfileApis'
import React, { useEffect } from 'react'
import ShoeCardExplore from '../shoeCardExplore/ShoeCardExplore'
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
  const [id, setId] = React.useState('')
  useEffect(() => {
    const id = localStorage.getItem('realTimeMarketValue')
    if (id) {
      setId(id)
    }
  }, [])

  const { data: getValue } = useGetRealTimeMarketValueQuery({
    id,
  })

  const sneakersData: Sneaker[] = getValue?.data ?? []

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
