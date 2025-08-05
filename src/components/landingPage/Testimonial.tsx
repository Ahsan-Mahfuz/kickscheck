import { Carousel } from 'antd'
import Image from 'next/image'

const TestimonialData = [
  {
    id: 1,
    name: '— Anika, Sneaker Enthusiast',
    description:
      'The AI authentication was accurate and easy to use. I simply uploaded a photo of my sneakers, and within seconds, I got a clear result. It&apos;s super convenient and helped me feel confident about my pair before reselling it online.',
    img: '/landing_page/women.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: '— Anika, Sneaker Enthusiast',
    description:
      'The AI authentication was accurate and easy to use. I simply uploaded a photo of my sneakers, and within seconds, I got a clear result. It&apos;s super convenient and helped me feel confident about my pair before reselling it online.',
    img: '/landing_page/women.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: '— Anika, Sneaker Enthusiast',
    description:
      'The AI authentication was accurate and easy to use. I simply uploaded a photo of my sneakers, and within seconds, I got a clear result. It&apos;s super convenient and helped me feel confident about my pair before reselling it online.',
    img: '/landing_page/women.jpg',
    rating: 5,
  },
]

const contentStyle: React.CSSProperties = {
  maxWidth: '320px',
  color: 'red',
  lineHeight: '320px',
  textAlign: 'center',
  background: 'red !important',
}

const Testimonial = () => (
  <div className="responsive-width mx-auto">
    <div className="testimonial-carousel mt-40 mb-20">
      <h2 className=" text-4xl font-bold mb-8">Real User Testimonials</h2>

      <Carousel
        key={Math.random()}
        slidesToShow={3}
        autoplaySpeed={1200}
        autoplay
        responsive={[
          {
            breakpoint: 1524,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
        className=" flex items-center justify-center gap-10  w-full mx-auto  text-black"
      >
        {TestimonialData.map((data) => (
          <div key={data.id} style={contentStyle}>
            <div className="ml-5 testimonial-item bg-green-50 p-3 ">
              <Image
                src={data.img}
                alt={data.name}
                className="rounded-full w-24 h-24 mx-auto mb-4 object-cover"
                width={1000}
                height={1000}
              />
              <h3 className="text-xl font-bold text-center">{data.name}</h3>
              <p className="text-sm text-gray-600 text-inherit text-center">
                {data.description}
              </p>
              <div className="flex justify-center text-yellow-500 mt-2 mb-10">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className="text-2xl">
                    {index < data.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  </div>
)

export default Testimonial
