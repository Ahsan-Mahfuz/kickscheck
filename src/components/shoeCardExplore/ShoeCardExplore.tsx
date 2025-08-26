import React from 'react'
import { Card } from 'antd'
import { StarFilled } from '@ant-design/icons'
import Image from 'next/image'
import { imageUrl } from '@/redux/main/server'
import Link from 'next/link'

interface Photo {
  _id: string
  photoUrl: string
}

interface ShoeCardProps {
  id: string
  sneakerName: string
  brandName: string
  photos: Photo
  pass: boolean
  averageRating: number
  totalReviews: number
  createdAt: string
}

const ShoeCardExplore: React.FC<ShoeCardProps> = ({
  id,
  sneakerName,
  brandName,
  photos,
  pass,
  averageRating,
  totalReviews,
  createdAt,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Link href={`/explore/${id}`}>
      <Card
        hoverable
        className="w-full"
        cover={
          <div className="relative">
            <Image
              alt={sneakerName}
              src={`${imageUrl}/${photos?.photoUrl}`}
              className="h-48 w-full object-cover"
              width={5000}
              height={5000}
            />
            <div
              className={`absolute top-2 right-2 px-5 py-3 rounded text-xs font-bold ${
                pass ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {pass ? 'Pass' : 'Failed'}
            </div>
          </div>
        }
      >
        <div className="space-y-2">
          <h3 className="font-bold text-lg truncate">{sneakerName}</h3>
          <p className="text-gray-600 truncate">{brandName}</p>

          {averageRating > 0 && (
            <div className="flex items-center space-x-2">
              <StarFilled className="text-yellow-500" />
              <span className="font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-gray-500">({totalReviews} reviews)</span>
            </div>
          )}

          <p className="text-sm text-gray-500">
            Posted: {formatDate(createdAt)}
          </p>
        </div>
      </Card>
    </Link>
  )
}

export default ShoeCardExplore
