'use client'
import { useState } from 'react'
import Password from '../../../components/editProfile/Password'
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Upload,
  Card,
  Avatar,
  Divider,
} from 'antd'
import {
  UploadOutlined,
  LoadingOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  SaveOutlined,
  CameraOutlined,
} from '@ant-design/icons'

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'Ahsan Mahfuz',
    email: 'ahsanmahfuz@gmail.com',
    phone: '+27 55745 2567 125',
    image: null,
    address: '123 Main Street, City, Country',
  })

  const handleUpdate = () => {
    if (isEditing) {
      form
        .validateFields()
        .then((values) => {
          setFormData({ ...formData, ...values })
          message.success('Profile updated successfully!')
          setIsEditing(false)
        })
        .catch(() => {
          message.error('Please complete the form properly.')
        })
    } else {
      setIsEditing(true)
    }
  }

  const handleImageUpload = async (info) => {
    setImageLoading(true)

    const uploadedImage = info.file.originFileObj || info.file

    if (!(uploadedImage instanceof File)) {
      message.error('Invalid file type. Please upload a valid image.')
      setImageLoading(false)
      return
    }

    setTimeout(() => {
      setImageLoading(false)

      try {
        const imageURL = URL.createObjectURL(uploadedImage)

        setFormData({
          ...formData,
          image: imageURL,
        })

        message.success('Profile image updated successfully!')
      } catch (error) {
        console.error('Error creating image URL:', error)
        message.error('Error displaying image.')
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <Card className="mb-8 shadow-lg border-0 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#2d4e09] ,  to-[#0d1802] -mx-6 -mt-6 mb-6 px-6 pt-8 pb-12 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex flex-col items-center text-white">
              <div className="relative group">
                <Avatar
                  size={120}
                  src={formData.image}
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
              <h1 className="text-3xl font-bold mt-4 mb-2">Jerome Smith</h1>
              <p className="text-blue-100 text-lg">Software Developer</p>
            </div>
          </div>

          {/* Tab Navigation */}
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

        {/* Profile Form */}
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
                  disabled={loading}
                  size="large"
                  className={`px-6 py-2 h-auto font-semibold rounded-lg transition-all duration-300 ${
                    isEditing
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-lg hover:shadow-xl'
                      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>

              <Form
                form={form}
                layout="vertical"
                initialValues={formData}
                className="space-y-6"
              >
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
                        required: true,
                        message: 'Please enter your full name',
                      },
                    ]}
                  >
                    <Input
                      disabled={!isEditing}
                      size="large"
                      className={`rounded-lg border-2 transition-all duration-300 ${
                        isEditing
                          ? 'border-blue-300 focus:border-blue-500 shadow-sm'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      placeholder="Enter your full name"
                    />
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
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input
                      disabled={!isEditing}
                      size="large"
                      className={`rounded-lg border-2 transition-all duration-300 ${
                        isEditing
                          ? 'border-blue-300 focus:border-blue-500 shadow-sm'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      placeholder="Enter your email address"
                    />
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
                        required: true,
                        message: 'Please enter your phone number',
                      },
                    ]}
                  >
                    <Input
                      disabled={!isEditing}
                      size="large"
                      className={`rounded-lg border-2 transition-all duration-300 ${
                        isEditing
                          ? 'border-blue-300 focus:border-blue-500 shadow-sm'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      placeholder="Enter your phone number"
                    />
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
                    <Input
                      disabled={!isEditing}
                      size="large"
                      className={`rounded-lg border-2 transition-all duration-300 ${
                        isEditing
                          ? 'border-blue-300 focus:border-blue-500 shadow-sm'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                      placeholder="Enter your address"
                    />
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
                        className="px-8 py-2 h-auto font-semibold rounded-lg border-2 border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-all duration-300"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        size="large"
                        onClick={handleUpdate}
                        disabled={loading}
                        className="px-8 py-2 h-auto font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <SaveOutlined className="mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </Card>
        )}

        {/* Password Change */}
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
