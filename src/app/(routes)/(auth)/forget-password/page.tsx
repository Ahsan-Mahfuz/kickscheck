'use client'

import { useForgetPasswordMutation } from '@/redux/authApis'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/navigation'

import toast from 'react-hot-toast'

const SignIn = () => {
  const router = useRouter()

  const [postResendOtp, { isLoading }] = useForgetPasswordMutation()

  const [form] = Form.useForm()
  type FormData = {
    email: string
  }
  const onFinish = async (values: FormData) => {
    try {
      const response = await postResendOtp({
        email: values.email,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.removeItem('email')
          localStorage.setItem('email', values.email)
          router.push('/check-email-for-the-otp')
        })
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <section className="h-screen">
      <div className="flex  items-center flex-row   h-screen">
        <div className=" mx-auto bg-white  flex flex-col justify-center items-center rounded-lg px-2 pb-2 pt-10 max-w-[600px] w-full">
          <div className="flex items-center flex-col  ">
            <h1
              className="font-bold  text-center text-black"
              style={{ fontSize: 'clamp(20px, 8vw, 35px)' }}
            >
              Forgot Password
            </h1>
            <p
              className=" mb-8  text-center text-sm text-gray-500"
              style={{ fontSize: 'clamp(10px, 5vw, 16px)' }}
            >
              Please enter your email to continue
            </p>
          </div>

          <Form
            requiredMark={false}
            layout="vertical"
            onFinish={onFinish}
            className="w-full max-w-md overflow-y-scroll  scrollbar-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <Form.Item
              name="email"
              label={
                <span className="text-gray-500 font-semibold  text-xl">
                  Email
                </span>
              }
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please enter your email!',
                },
              ]}
            >
              <Input
                placeholder="Enter Email"
                className="h-[48px] px-4  border-gray-300 rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  padding: '1.25rem',
                }}
                className="w-full normal-button-bg-color   h-11 mt-5"
              >
                {isLoading ? 'Loading...' : ' Send'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default SignIn
