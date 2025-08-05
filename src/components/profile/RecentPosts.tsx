import React from 'react'
import ShoeCard from '../shoeCard/ShoeCard'

const RecentPosts = () => {
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 mb-20">
      <ShoeCard pass={true} />
      <ShoeCard pass={false} />
      <ShoeCard pass={true} />
      <ShoeCard pass={true} />
      <ShoeCard pass={false} />
      <ShoeCard pass={true} />
      <ShoeCard pass={true} />
      <ShoeCard pass={false} />
      <ShoeCard pass={true} />
      <ShoeCard pass={true} />
      <ShoeCard pass={false} />
      <ShoeCard pass={true} />
    </div>
  )
}

export default RecentPosts
