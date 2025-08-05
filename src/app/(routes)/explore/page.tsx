import ShoeCard from '@/components/shoeCard/ShoeCard'
import React from 'react'

const Explore = () => {
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
        <ShoeCard pass={false} />
        <ShoeCard pass={true} />
        <ShoeCard pass={false} />
        <ShoeCard pass={true} />
        <ShoeCard pass={true} />
        <ShoeCard pass={false} />
        <ShoeCard pass={true} />
        <ShoeCard pass={false} />
        <ShoeCard pass={true} />
        <ShoeCard pass={false} />
        <ShoeCard pass={true} />
        <ShoeCard pass={true} />
        <ShoeCard pass={false} />
        <ShoeCard pass={true} />
      </section>
    </>
  )
}

export default Explore
