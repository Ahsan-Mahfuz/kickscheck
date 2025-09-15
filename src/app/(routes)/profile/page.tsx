'use client'
import MyCardItems from '@/components/profile/MyCardItems'
import { imageUrl } from '@/redux/main/server'
import { useGetProfileQuery } from '@/redux/profileApis'
import { useGetMySubscriptionBadgeQuery } from '@/redux/subscriptionsApis'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect } from 'react'
import { BiPurchaseTag } from 'react-icons/bi'
import { CiEdit } from 'react-icons/ci'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdOutlineLocationOn } from 'react-icons/md'

interface ProfileData {
  name: string
  photo?: string
  address?: string
  phoneNumber?: string
}

const Profile: React.FC = () => {
  const { data: getProfile } = useGetProfileQuery()
  const profile: ProfileData | undefined = getProfile?.data
  const [id, setId] = React.useState('')
  useEffect(() => {
    const id = localStorage.getItem('subscriptionId')
    if (id) {
      setId(id)
    }
  }, [])
  const { data: getMyBadge } = useGetMySubscriptionBadgeQuery({
    id: id,
  })

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
          className="absolute inset-0 bg-green-950 opacity-30 z-10"
          style={{ pointerEvents: 'none' }}
        ></div>
      </div>

      <Link href="/edit-profile" className="!z-50 absolute top-0 right-0">
        <CiEdit className="text-white text-5xl hover:text-yellow-400 cursor-pointer" />
      </Link>

      <div className="!z-50 absolute mx-auto top-[600px] w-full flex flex-col items-center justify-center !pb-50">
        <div>
          <Image
            src={
              profile?.photo
                ? `${imageUrl}/${profile.photo}`
                : '/shoe/default.jpg'
            }
            alt="profile"
            width={5000}
            height={5000}
            className="w-[200px] h-[200px] flex items-center justify-center rounded-full object-cover "
          />
        </div>

        <div className="flex items-center justify-center flex-col ">
          <div className="font-bold text-2xl">{profile?.name}</div>

          {profile?.address && (
            <div className="flex items-center gap-2">
              <MdOutlineLocationOn />
              {profile.address}
            </div>
          )}

          {profile?.phoneNumber && (
            <div className="flex items-center gap-2">
              <FaPhoneAlt />
              {profile.phoneNumber}
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-md hover:scale-105 transition-transform duration-200">
              <BiPurchaseTag className="text-white" />
              {getMyBadge?.data?.subscriptionId?.subscription_period} Badge
            </span>
          </div>

          <div className="bg-white !mt-5  !text-black font-bold px-3 py-2 rounded-lg">
            <Link href="/my-subscription" className="px-32 py-2 rounded-lg">
              View All Packages
            </Link>
          </div>
        </div>
      </div>

      <div className=" mx-auto !mt-56 responsive-width">
        <div className="mt-64 !mb-20 mx-auto flex items-center justify-center text-center">
          <Link
            href="/authentication"
            className="normal-button-bg-color px-32 py-2 rounded-lg"
          >
            Try to Check
          </Link>
        </div>
        <div>
          <MyCardItems />
        </div>
      </div>
    </div>
  )
}

export default Profile
