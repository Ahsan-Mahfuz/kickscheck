'use client'
import { useState, useEffect } from 'react'
import Password from '../../../components/editProfile/Password'
import {
  Button,
  Form,
  Input,
  message,
  Upload,
  Card,
  Avatar,
  Divider,
} from 'antd'
import {
  LoadingOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  SaveOutlined,
  CameraOutlined,
} from '@ant-design/icons'
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/profileApis'
import { imageUrl } from '@/redux/main/server'

interface ProfileData {
  name: string
  email: string
  phone?: string
  address?: string
  photo?: string
}

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const { data: getProfile, isLoading } = useGetProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const profile: ProfileData | undefined = getProfile?.data

  // Populate form when profile data loads
  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        fullName: profile.name,
        email: profile.email,
        phone: profile.phone || '',
        address: profile.address || '',
      })
      if (profile.photo) setImageFile(profile.photo as any) // Keep photo URL if exists
    }
  }, [profile, form])

  const handleImageUpload = (info: any) => {
    const file = info.file.originFileObj
    if (!(file instanceof File)) {
      message.error('Invalid file type. Please upload a valid image.')
      return
    }
    setImageLoading(true)
    setTimeout(() => {
      setImageFile(file)
      setImageLoading(false)
      message.success('Profile image selected!')
    }, 500)
    return false
  }

  const handleUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true)
      return
    }

    try {
      const values = await form.validateFields()

      const formData = new FormData()
      formData.append(
        'data',
        JSON.stringify({
          name: values.fullName,
          phoneNumber: values.phone,
          address: values.address,
        })
      )
      if (imageFile instanceof File) {
        formData.append('file', imageFile)
      }

      await updateProfile(formData).unwrap()
      message.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (err) {
      console.error(err)
      message.error('Failed to update profile. Please try again.')
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 shadow-lg border-0 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#2d4e09] to-[#0d1802] -mx-6 -mt-6 mb-6 px-6 pt-8 pb-12 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex flex-col items-center text-white">
              <div className="relative group">
                <Avatar
                  size={120}
                  src={
                    imageFile instanceof File
                      ? URL.createObjectURL(imageFile)
                      : profile?.photo
                      ? `${imageUrl}/${profile.photo}`
                      : undefined
                  }
                  icon={<UserOutlined />}
                  className="border-4 border-white shadow-2xl transition-all duration-300 group-hover:scale-105"
                />
                {isEditing && (
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleImageUpload}
                    className="absolute -bottom-2 -right-2"
                  >
                    <Button
                      shape="circle"
                      size="large"
                      icon={
                        imageLoading ? (
                          <LoadingOutlined spin />
                        ) : (
                          <CameraOutlined />
                        )
                      }
                      className="bg-white text-green-600 border-0 shadow-lg hover:bg-blue-50 transition-all duration-300"
                      loading={imageLoading}
                    />
                  </Upload>
                )}
              </div>
              <h1 className="text-3xl font-bold mt-4 mb-2">{profile?.name}</h1>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'profile'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <UserOutlined className="mr-2" />
                Edit Profile
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'password'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                }`}
                onClick={() => setActiveTab('password')}
              >
                <EditOutlined className="mr-2" />
                Change Password
              </button>
            </div>
          </div>
        </Card>

        {activeTab === 'profile' && (
          <Card className="shadow-lg border-0 rounded-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Profile Information
                </h2>
                <Button
                  type={isEditing ? 'primary' : 'default'}
                  icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
                  onClick={handleUpdate}
                  size="large"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>

              <Form form={form} layout="vertical" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label={
                      <span className="text-gray-700 font-semibold text-base flex items-center">
                        <UserOutlined className="mr-2 text-blue-600" />
                        Full Name
                      </span>
                    }
                    name="fullName"
                    rules={[
                      {
                        required: false,
                        message: 'Please enter your full name',
                      },
                    ]}
                  >
                    <Input disabled={!isEditing} size="large" />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-gray-700 font-semibold text-base flex items-center">
                        <MailOutlined className="mr-2 text-blue-600" />
                        Email Address
                      </span>
                    }
                    name="email"
                    rules={[
                      { required: false, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input disabled={true} size="large" />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-gray-700 font-semibold text-base flex items-center">
                        <PhoneOutlined className="mr-2 text-blue-600" />
                        Phone Number
                      </span>
                    }
                    name="phone"
                    rules={[
                      {
                        required: false,
                        message: 'Please enter your phone number',
                      },
                    ]}
                  >
                    <Input disabled={!isEditing} size="large" />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-gray-700 font-semibold text-base flex items-center">
                        <HomeOutlined className="mr-2 text-blue-600" />
                        Address
                      </span>
                    }
                    name="address"
                    rules={[
                      { required: true, message: 'Please enter your address' },
                    ]}
                  >
                    <Input disabled={!isEditing} size="large" />
                  </Form.Item>
                </div>

                {isEditing && (
                  <>
                    <Divider className="my-8" />
                    <div className="flex justify-center space-x-4">
                      <Button
                        size="large"
                        onClick={() => {
                          setIsEditing(false)
                          form.resetFields()
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        size="large"
                        onClick={handleUpdate}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </Card>
        )}

        {activeTab === 'password' && (
          <Card className="shadow-lg border-0 rounded-2xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Change Password
              </h2>
              <Password />
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default EditProfile
