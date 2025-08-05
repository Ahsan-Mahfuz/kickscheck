import Image from 'next/image'

const BrandsSupported = () => {
  return (
    <div className="responsive-width mx-auto !mt-20">
      <div className="text-4xl font-bold">300+ Brands Supported</div>
      <div className='mt-10'>
        <Image
          src="/landing_page/support.png"
          alt="support"
          width={5000}
          height={5000}
        />
      </div>
    </div>
  )
}

export default BrandsSupported
