import BrandsSupported from '@/components/landingPage/BrandsSupported'
import FAQ from '@/components/landingPage/FAQ'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Process = () => {
  return (
    <div className='pb-10'>
      <div
        className=" bg-transparent flex items-center justify-center "
        style={{
          backgroundImage: "url('/shoe/shoe_process.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '60vh',
          backgroundPosition: '0px -350px ',

          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="absolute inset-0 bg-green-950 opacity-60 " />
        <div className="flex flex-col justify-center items-center">
          <div className="absolute top-1/2 left-1/2 transform  font-bold  -translate-x-1/2 -translate-y-1/2 text-white text-8xl">
            QUICK AUTHENTICATE
          </div>
        </div>
      </div>

      <div className="responsive-width mx-auto">
        <section className="flex justify-between items-start  mx-auto py-20">
          <div className="flex flex-col gap-5 items-end">
            <div>
              <span className="text-2xl">step</span>
              <span className="font-bold text-7xl">01</span>
            </div>
            <div className="font-bold text-2xl">Photo Submission</div>
            <div className="text-right">
              Our product and smartphone are all that&apos;s needed for this
              service.Follow our for a guide on the required photos.No special
              skills are required.Start with only a few photos. If photos do not
              match the guidelines, supplementary photos may be required.
            </div>
          </div>
          <div>
            <Image
              width={5000}
              height={5000}
              src="/landing_page/hero_page.png"
              alt="shoe"
              className="max-w-[1200px] w-full"
            />
          </div>
        </section>
        <section className="flex justify-between items-start  mx-auto ">
          <div>
            <Image
              width={5000}
              height={5000}
              src="/process/process.png"
              alt="shoe"
              className="max-w-[500px] w-full"
            />
          </div>
          <div className="flex flex-col gap-5 items-end">
            <div>
              <span className="text-2xl">step</span>
              <span className="font-bold text-7xl">02</span>
            </div>
            <div className="font-bold text-2xl">
              Results within 48 Hrs by our AI x Authentication Team
            </div>
            <div className="text-right">
              Based on the photos submitted the AI x Verification Team will
              produce a verification result within 48 Hrs
            </div>
          </div>
        </section>

        <section>
          <div className="font-bold text-4xl mt-20">
            AI x Authentication Team&apos;s Photo Authentication Safe x Quick
          </div>
          <div className="mt-5 text-justify text-gray-300 text-xl mb-10">
            The reseller market is flooded with replica products; therefore,
            Quick Authentication is created for buyers in need of a quick
            reference check. A guide on the photo requirements necessary for
            verification will be provided. Upon photo submission, a report will
            be provided within 48 hours. Many may be skeptical about the
            accuracy of the Quick Verification; however, FILIBUSTER&apos;S
            advanced AI technology and its team have the capabilities of
            accurately verifying the authenticity of products via photos.
          </div>
          <div className="mx-auto flex flex-col items-center justify-center">
            <Link
              href={'/authentication'}
              className="mt-10 px-32 py-3 normal-button-bg-color rounded-lg "
            >
              Try to check
            </Link>
            <div className="mt-2 text-gray-400">
              Quick Verification does not provide a full authenticity report,
              due to the liabilities of not physically having the product.
            </div>
          </div>
          <div>
            <BrandsSupported />
          </div>
          <div>
            <FAQ />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Process
