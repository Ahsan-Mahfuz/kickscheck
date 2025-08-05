'use client'

import { useSignUpMutation } from '@/redux/authApis'
import { Form, Input, Button } from 'antd'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const SignUp = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  type FormData = {
    username: string
    email: string
    password: string
    phoneNumber: string
  }

  const [postSignUp, { isLoading }] = useSignUpMutation()

  const onFinish = async (values: FormData) => {
    try {
      const response = await postSignUp({
        name: values.username,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.data?.message)
          localStorage.setItem('email', values.email)
          form.resetFields()
          router.push('/verify-account')
        })
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <section className="h-screen ">
      <div className="flex  items-center flex-row   h-screen">
        <div className=" mx-auto bg-white  flex flex-col justify-center items-center rounded-lg px-2 pb-2 pt-10 max-w-[600px] w-full">
          <div className="flex items-center flex-col  ">
            <h1
              className="font-bold  text-center text-black"
              style={{ fontSize: 'clamp(20px, 8vw, 35px)' }}
            >
              Create a new Account
            </h1>
            <p
              className=" mb-8  text-center text-sm text-gray-500"
              style={{ fontSize: 'clamp(10px, 5vw, 16px)' }}
            >
              Please enter your information to create account
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
              name="username"
              label={
                <span className="text-gray-500 font-semibold  text-xl">
                  Username
                </span>
              }
              rules={[
                {
                  required: true,
                  message: 'Please enter your username!',
                },
              ]}
            >
              <Input
                placeholder="Enter username"
                className="h-[48px] px-4 bg-gray-100 border-gray-300 rounded-md"
              />
            </Form.Item>

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
                className="h-[48px] px-4 bg-gray-100  border-gray-300 rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label={
                <span className="text-gray-500 font-semibold  text-xl">
                  Phone
                </span>
              }
              rules={[
                {
                  required: true,
                  message: 'Please enter your phone number!',
                },
              ]}
            >
              <Input
                placeholder="Enter Phone Number"
                className="h-[48px] px-4 bg-gray-100  border-gray-300 rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-gray-500 font-semibold  text-xl">
                  Password
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your password!' },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                className="custom-password-input h-[48px] bg-gray-100 px-4 border-gray-300 rounded-md"
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
                {isLoading ? 'Loading...' : 'Sign Up'}
              </Button>
            </Form.Item>
          </Form>
          <div className="  text-md">
            Already have an account?{' '}
            <Link href={`/sign-in`} className="underline font-bold">
              Signin
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
