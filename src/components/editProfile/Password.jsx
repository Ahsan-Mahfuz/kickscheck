import { Form, Input, Button, message, Divider, Alert } from 'antd'
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  SaveOutlined,
  CloseOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useChangePasswordMutation } from '@/redux/authApis'
import toast from 'react-hot-toast'

const Password = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const [changePass] = useChangePasswordMutation()

  const handleCancelClick = () => {
    form.resetFields()
    setPasswordStrength(0)
  }

  const handleSaveClick = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await changePass({
        newpassword: values.newPassword,
        oldpassword: values.currentPassword,
      }).unwrap()
      toast.success(res?.data?.message)
      form.resetFields()
      setPasswordStrength(0)
    } catch (error) {
      toast.error(error?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500'
    if (passwordStrength <= 3) return 'bg-yellow-500'
    if (passwordStrength <= 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak'
    if (passwordStrength <= 3) return 'Fair'
    if (passwordStrength <= 4) return 'Good'
    return 'Strong'
  }

  return (
    <div className=" mx-auto">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        className="space-y-6"
      >
        {/* Current Password */}
        <Form.Item
          label={
            <span className="text-gray-700 font-semibold text-base flex items-center">
              <LockOutlined className="mr-2 text-blue-600" />
              Current Password
            </span>
          }
          name="currentPassword"
          rules={[
            { required: true, message: 'Please enter your current password' },
            { min: 6, message: 'Password must be at least 6 characters' },
          ]}
        >
          <Input.Password
            placeholder="Enter your current password"
            size="large"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            className="rounded-lg border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-all duration-300"
          />
        </Form.Item>

        <Divider className="my-6 border-gray-200" />

        {/* New Password */}
        <Form.Item
          label={
            <span className="text-gray-700 font-semibold text-base flex items-center">
              <LockOutlined className="mr-2 text-green-600" />
              New Password
            </span>
          }
          name="newPassword"
          rules={[
            { required: true, message: 'Please enter your new password' },
            { min: 8, message: 'Password must be at least 8 characters' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message:
                'Password must contain uppercase, lowercase, and numbers',
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your new password"
            size="large"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            className="rounded-lg border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-all duration-300"
            onChange={(e) => checkPasswordStrength(e.target.value)}
          />
        </Form.Item>

        {/* Password Strength Indicator */}
        {passwordStrength > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Password Strength:</span>
              <span
                className={`text-sm font-semibold ${
                  passwordStrength <= 2
                    ? 'text-red-600'
                    : passwordStrength <= 3
                    ? 'text-yellow-600'
                    : passwordStrength <= 4
                    ? 'text-blue-600'
                    : 'text-green-600'
                }`}
              >
                {getStrengthText()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getStrengthColor()}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <Form.Item
          label={
            <span className="text-gray-700 font-semibold text-base flex items-center">
              <CheckCircleOutlined className="mr-2 text-green-600" />
              Confirm New Password
            </span>
          }
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Passwords do not match!'))
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your new password"
            size="large"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            className="rounded-lg border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-all duration-300"
          />
        </Form.Item>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            size="large"
            onClick={handleCancelClick}
            icon={<CloseOutlined />}
            className="px-8 py-2 h-auto font-semibold rounded-lg border-2 border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleSaveClick}
            loading={loading}
            icon={<SaveOutlined />}
            className="px-8 py-2 h-auto font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Password
