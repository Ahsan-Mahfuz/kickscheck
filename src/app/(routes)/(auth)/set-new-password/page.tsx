'use client'

import { Form, Input, Button } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { useSetNewPasswordMutation } from '@/redux/authApis'
const SetNewPassword = () => {
  const router = useRouter()

  type FormData = {
    userId: string
    password: string
  }
  const [postResetPassword, { isLoading }] = useSetNewPasswordMutation()
  const [form] = Form.useForm()

  interface MyJwtPayload {
    id: string
  }

  const onFinish = async (values: FormData) => {
    try {
      const token = localStorage.getItem('forget_token') || ''
      const decoded = jwtDecode<MyJwtPayload>(token)

      const response = await postResetPassword({
        userId: decoded.id,
        password: values.password,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.removeItem('forget_token')
          localStorage.removeItem('email')
          router.push('/sign-in')
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
              Set a new password
            </h1>
            <p
              className=" mb-8  text-center text-sm text-gray-500 max-w-[400px] w-full mx-auto"
              style={{ fontSize: 'clamp(10px, 5vw, 16px)' }}
            >
              Create a new password. Ensure it differs from previous ones for
              security
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
              name="password"
              label={
                <span className="text-gray-500 font-semibold  text-xl">
                  New Password
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

            <Form.Item
              name="confirm_password"
              dependencies={['password']}
              label={
                <span className="text-gray-500 font-semibold  text-xl">
                  Confirm Password
                </span>
              }
              rules={[
                {
                  required: true,
                  message: 'Please enter your confirm password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    )
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Enter confirm password"
                className="custom-password-input h-[48px] px-4 border-gray-300 rounded-md"
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
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
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default SetNewPassword
