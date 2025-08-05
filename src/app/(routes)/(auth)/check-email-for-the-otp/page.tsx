'use client'
import { useState } from 'react'
import { Form, Input, Button } from 'antd'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  useForgetPasswordMutation,
  useVerifyForgetUserMutation,
} from '@/redux/authApis'

const OtpSent = () => {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  type FormData = {
    otp: string
  }

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement
      if (nextInput) {
        nextInput.focus()
      }
    }
  }
  const validateOtp = () => {
    const joinedOtp = otp.join('')
    if (joinedOtp.length !== 6) {
      return Promise.reject(new Error('Please enter a 6-digit code!'))
    }
    return Promise.resolve()
  }

  const [postVerifyAccount, { isLoading }] = useVerifyForgetUserMutation()
  const onFinishOtp = async (values: FormData) => {
    try {
      await postVerifyAccount({
        verificationCode: Number(otp.join('')),
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          localStorage.setItem('forget_token', res?.data)
          router.push('/set-new-password')
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
              Check Your Email
            </h1>
          </div>

          <Form
            requiredMark={false}
            layout="vertical"
            onFinish={onFinishOtp}
            className="w-full max-w-md "
            style={{
              marginInline: 'auto',
            }}
          >
            <Form.Item
              style={{ textAlign: 'center' }}
              name="otp"
              rules={[{ validator: validateOtp }]}
            >
              <div className="flex gap-2  justify-center">
                {otp.map((_, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    maxLength={1}
                    className="w-12 h-[42px] text-center border-gray-300 rounded-md"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                  />
                ))}
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full normal-button-bg-color   h-11 mt-5"
              >
                {isLoading ? 'Verifying...' : ' Verify'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default OtpSent
