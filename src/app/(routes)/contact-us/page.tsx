'use client'
import { useCreateContactApisMutation } from '@/redux/contactApis'
import { Button, Form, Input, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const ContactUs = () => {
  const [form] = Form.useForm()
  const [createContact, { isLoading }] = useCreateContactApisMutation()

  const onFinish = async (values: any) => {
    try {
      const res = await createContact(values).unwrap()
      message.success(
        res?.message || 'Your message has been sent successfully!'
      )
      form.resetFields()
    } catch (error: any) {
      message.error(error?.data?.message || 'Failed to send contact form.')
      console.error('Failed to send contact form:', error)
    }
  }

  return (
    <div className="h-screen mx-auto">
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
        <div className="absolute inset-0 bg-green-950 opacity-50 z-10" />
        <section className="flex justify-between items-center text-white responsive-width mx-auto gap-20 relative z-20">
          <div className="w-1/3 mt-10">
            <h1 className="text-5xl font-bold leading-normal">
              GET IN TOUCH WITH OUR TEAM
            </h1>
            <p className="mt-5">
              KickCheck could be the perfect fit for your business—regardless of
              its size. Let’s work together to bring trust back into the resale
              market.
            </p>
          </div>
          <div className="w-1/2"></div>
        </section>
      </div>

   
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="mt-10 responsive-width mx-auto"
      >
        <div className="flex justify-between gap-4">
          <Form.Item
            name="first_name"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
            className="w-full"
          >
            <Input
              placeholder="Your first name"
              className="!h-[48px] bg-[#F4F4F4]"
            />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
            className="w-full"
          >
            <Input
              placeholder="Your last name"
              className="!h-[48px] bg-[#F4F4F4]"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
            className="w-full"
          >
            <Input
              placeholder="Phone number"
              className="!h-[48px] bg-[#F4F4F4]"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="business_email"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          <Input
            placeholder="Business Email"
            className="!h-[48px] bg-[#F4F4F4]"
          />
        </Form.Item>

        <Form.Item
          name="company"
          rules={[
            { required: true, message: 'Please input your company name!' },
          ]}
        >
          <Input
            placeholder="Company Name"
            className="!h-[48px] bg-[#F4F4F4]"
          />
        </Form.Item>

        <Form.Item
          name="message"
          rules={[{ required: true, message: 'Please enter your message!' }]}
        >
          <TextArea
            rows={10}
            placeholder="Your Message"
            className="bg-[#F4F4F4]"
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            type="primary"
            className="!px-10 !py-5 normal-button-bg-color"
            htmlType="submit"
            loading={isLoading}
          >
            Send message
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactUs
