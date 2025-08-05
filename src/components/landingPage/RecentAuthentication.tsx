"use client"
import { FaArrowRightLong } from 'react-icons/fa6'
import ShoeCard from '../shoeCard/ShoeCard'
import { useRouter } from 'next/navigation'

const RecentAuthentication = () => {
  const router = useRouter()
  return (
    <div className="responsive-width mx-auto !mt-20">
      <div className="flex justify-between items-end mb-10 font-bold">
        <div className="text-4xl ">Recent Authentic Posts</div>
        <div
          className="flex items-center cursor-pointer gap-2 text-xl"
          onClick={() => router.push('/explore')  }
        >
          See All <FaArrowRightLong />
        </div>
      </div>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
        <ShoeCard pass={true} />
        <ShoeCard pass={false} />
        <ShoeCard pass={true} />
      </div>
    </div>
  )
}

export default RecentAuthentication
