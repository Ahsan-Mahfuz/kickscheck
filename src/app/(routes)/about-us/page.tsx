'use client'
import { useGetAboutUsQuery } from '@/redux/settingsApis'
import { Loader } from 'lucide-react'

const AboutUs = () => {
  const { data, isLoading, isError } = useGetAboutUsQuery()
  const content = data?.data?.aboutUs

  if (isLoading) return <Loader />
  if (isError) return <p>Error loading terms and conditions</p>

  const formattedDate = data?.data?.createdAt
    ? new Date(data.data.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'N/A'

  return (
    <div className="h-screen text-center responsive-width mx-auto">
      <div className="text-3xl font-bold mt-5">About Us</div>
      <div className="font-bold my-4 mb-5">Last updated: {formattedDate}</div>

      <div
        dangerouslySetInnerHTML={{
          __html: content || 'No terms and conditions available.',
        }}
        className="text-justify mt-5 border-t-2 pt-5 "
      ></div>
    </div>
  )
}

export default AboutUs
