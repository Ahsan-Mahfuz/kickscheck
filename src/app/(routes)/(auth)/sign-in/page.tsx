'use client'

import { Form, Input, Button } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useSignInMutation } from '@/redux/authApis'
import Cookies from 'js-cookie'

const SignIn = () => {
  const router = useRouter()
  const [form] = Form.useForm()

  type FormData = {
    email: string
    password: string
  }
  const [postSignIn, { isLoading }] = useSignInMutation()

  const onFinish = async (values: FormData) => {
    try {
      await postSignIn({
        email: values.email,
        password: values.password,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.setItem('token', res?.data?.accessToken)
          Cookies.set('token', res?.data?.accessToken)
        })
      router.push('/')
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
              Login to Account
            </h1>
            <p
              className=" mb-8  text-center text-sm text-gray-500"
              style={{ fontSize: 'clamp(10px, 5vw, 16px)' }}
            >
              Please enter your email and password to continue
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
                className="custom-password-input h-[48px] px-4 border-gray-300 rounded-md"
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <div className="text-end -mt-4">
              <Link
                href={`/forget-password`}
                className=" text-md !underline text-blue-600 hover:!text-blue-500"
              >
                Forget password
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  padding: '1.25rem',
                }}
                className="w-full normal-button-bg-color   h-11 mt-5"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="  text-white text-xs">
            Don&apos;t have an account?{' '}
            <Link
              href={`/sign-up`}
              className=" hover:underline text-white font-bold"
            >
              {isLoading ? 'Loading...' : 'Sign Up'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn
