import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroPage = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/landing_page/landing_page.gif')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '80vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundAttachment: 'fixed',
      }}
      className="font-poppins font-bold"
    >
      <div
        className="absolute inset-0 bg-green-950 opacity-50 z-10"
        style={{ pointerEvents: 'none' }}
      ></div>

      <section className="flex justify-between text-white responsive-width mx-auto gap-20 relative z-20">
        <section className="h-[80vh] flex flex-col justify-center gap-5 flex-1">
          <div className="text-[80px] leading-[90px]">
            AI + HUMAN SNEAKER AUTHENTICATION YOU CAN TRUST
          </div>
          <div className="max-w-[400px] w-full font-medium">
            KickCheck Our dual-layered authentication combines smart AI and
            expert human review to ensure 100% legitimacy
          </div>
          <div className="mt-5">
            <Link
              href={'/pricing'}
              className="normal-button-bg-color px-20 rounded-lg py-3"
            >
              See Pricing
            </Link>
          </div>
        </section>

        <section className="flex items-end justify-end h-[80vh] flex-1">
          <Image
            src={'/landing_page/hero_page.png'}
            alt="hero image"
            height={5000}
            width={5000}
            className="w-full"
          />
        </section>
      </section>
    </div>
  )
}

export default HeroPage
