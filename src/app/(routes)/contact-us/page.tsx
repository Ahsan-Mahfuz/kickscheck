'use client'
import { Button, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const ContactUs = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }
  return (
    <div className="h-screen  mx-auto">
      <div
        style={{
          backgroundImage: "url('/contact_us/contact.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '40vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0 bg-green-950 opacity-50 z-10"
          style={{ pointerEvents: 'none' }}
        ></div>

        <section className="flex justify-between items-center text-white responsive-width mx-auto gap-20 relative z-20">
          <div className="w-1/3 mt-10">
            <div className="text-5xl font-bold leading-normal">
              GET IN TOUCH WITH OUR TEAM
            </div>
            <div className="mt-5">
              KickCheck could be the perfect fit for your business—regardless of
              its size. Let’s work together to bring trust back into the resale
              market.
            </div>
          </div>
          <div className="w-1/2"></div>
        </section>
      </div>

      <Form onFinish={onFinish} className="mt-10 responsive-width  mx-auto">
        <div className="flex justify-between gap-4">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            className="w-full "
          >
            <Input placeholder="Your name" className="!h-[48px] bg-[#F4F4F4]" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            className="w-full"
          >
            <Input
              placeholder="Phone number"
              className="!h-[48px] bg-[#F4F4F4]"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input placeholder="Email" className="!h-[48px] bg-[#F4F4F4]" />
        </Form.Item>
        <Form.Item>
          <TextArea
            rows={10}
            placeholder="Your Message"
            className=" bg-[#F4F4F4]"
          />
        </Form.Item>

        <Form.Item label={null} className='text-center'>
          <Button
            type="primary"
            className="!px-10 !py-5 normal-button-bg-color "
            htmlType="submit"
          >
            Send message
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactUs
