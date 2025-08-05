import DragAndDropImage from '@/components/landingPage/DragAndDropImage'
import HeroPage from '@/components/landingPage/HeroPage'
import HowItWorks from '@/components/landingPage/HowItWorks'
import RecentAuthentication from '@/components/landingPage/RecentAuthentication'
import WhyAuthenticate from '@/components/landingPage/WhyAuthenticate'
import WhyTrustOurAi from '@/components/landingPage/WhyTrustOurAi'
import Pricing from '@/components/pricing/Pricing'
import Testimonial from '../components/landingPage/Testimonial'
import BrandsSupported from '@/components/landingPage/BrandsSupported'
import FAQ from '@/components/landingPage/FAQ'

export default function Home() {
  return (
    <div className="mb-20">
      <HeroPage />
      <WhyAuthenticate />
      <HowItWorks />
      <DragAndDropImage />
      <RecentAuthentication />
      <Pricing />
      <WhyTrustOurAi />
      <Testimonial />
      <BrandsSupported />
      <FAQ />
    </div>
  )
}
