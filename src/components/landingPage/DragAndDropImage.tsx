'use client'
import React, { useState, useEffect } from 'react'
import {
  Upload,
  Modal,
  Button,
  Input,
  Form,
  Progress,
  Card,
  Typography,
  Space,
  Divider,
  Select,
  InputNumber,
  message,
  Radio,
} from 'antd'
import { CiImageOn } from 'react-icons/ci'
import {
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlineRobot,
  AiOutlineUser,
} from 'react-icons/ai'
import Image from 'next/image'
import type { UploadFile, UploadChangeParam } from 'antd/es/upload/interface'
import {
  useGetAllMySubscriptionListQuery,
  usePostSneakersProfileMutation,
} from '@/redux/subscriptionsApis'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import toast from 'react-hot-toast'

const { Dragger } = Upload
const { TextArea } = Input
const { Text, Title } = Typography

interface UploadedImage {
  uid: string
  name: string
  status: string
  url: string
  originFileObj?: File
}

interface FormValues {
  package_type: string
  sneaker_name: string
  brand_name: string
  sneaker_code: string
  description: string
  verification_method: 'ai' | 'human'
  marketvalue?: number
  geolocation?: {
    coordinates: [number, number]
  }
}

interface AIResult {
  authenticity: number
  aiReview: 'Pass' | 'Fail'
}

interface SubmissionData {
  images: UploadedImage[]
  sneakerDetails: FormValues
  verificationMethod: 'ai' | 'human'
  aiResult: AIResult | null
}

type SubscriptionItem = {
  _id: string
  subscriptionId: {
    _id: string
    subscription_name: string
    subscription_period: string
    id: string
  }
  isAvailable: boolean
  id: string
}

type StepType = 'upload' | 'form' | 'processing' | 'result'

const SneakerAuthSystem: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepType>('upload')
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [form] = Form.useForm<FormValues>()
  const [aiResult, setAiResult] = useState<AIResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const { data: getMySubscriptionList } =
    useGetAllMySubscriptionListQuery(undefined)

  const [postSneakersProfile, { isLoading: isSubmitting }] =
    usePostSneakersProfileMutation()

  // Get available subscriptions
  const availableSubscriptions: SubscriptionItem[] =
    getMySubscriptionList?.data?.filter(
      (item: SubscriptionItem) => item.isAvailable
    ) || []

  // Watch form values to conditionally show fields
  const packageType = Form.useWatch('package_type', form)
  const verificationMethod = Form.useWatch('verification_method', form)

  // Check if geolocation should be shown based on package
  const shouldShowGeolocation = (): boolean => {
    return (
      packageType === 'pro_monthly' ||
      packageType === 'collector_monthly' ||
      packageType === 'pro_yearly' ||
      packageType === 'collector_yearly'
    )
  }

  // Check if market value should be shown (only for human verification)
  const shouldShowMarketValue = (): boolean => {
    return verificationMethod === 'human'
  }

  // Custom upload validation
  const beforeUpload = (file: File, fileList: File[]): boolean => {
    const totalFiles = uploadedImages.length + fileList.length

    if (totalFiles > 5) {
      message.error('You can upload maximum 5 images')
      return false
    }

    // Check file type
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('You can only upload image files!')
      return false
    }

    // Check file size (max 5MB)
    const isLessThan5M = file.size / 1024 / 1024 < 5
    if (!isLessThan5M) {
      message.error('Image must be smaller than 5MB!')
      return false
    }

    return true
  }

  const handleUpload = (info: UploadChangeParam<UploadFile>): void => {
    const { fileList } = info

    const newFiles: UploadedImage[] = fileList
      .filter((file) => file.originFileObj)
      .slice(0, 5) // Ensure max 5 files
      .map((file, index) => ({
        uid: file.uid || `file-${Date.now()}-${index}`,
        name: file.name || `image-${index}`,
        status: file.status || 'done',
        url: file.originFileObj ? URL.createObjectURL(file.originFileObj) : '',
        originFileObj: file.originFileObj,
      }))

    setUploadedImages((prev) => {
      const existingUids = prev.map((img) => img.uid)
      const uniqueNewFiles = newFiles.filter(
        (file) => !existingUids.includes(file.uid)
      )
      const combinedFiles = [...prev, ...uniqueNewFiles]

      // Ensure we don't exceed 5 images
      return combinedFiles.slice(0, 5)
    })
  }

  const removeImage = (uid: string): void => {
    setUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
  }

  const continueToForm = (): void => {
    if (uploadedImages.length === 0) {
      message.error('Please upload at least 1 image')
      return
    }
    if (uploadedImages.length > 5) {
      message.error('Maximum 5 images allowed')
      return
    }
    setCurrentStep('form')
  }

  const handleFormSubmit = async (values: FormValues): Promise<void> => {
    // Validate images before submission
    if (uploadedImages.length === 0) {
      message.error('Please upload at least 1 image')
      return
    }
    if (uploadedImages.length > 5) {
      message.error('Maximum 5 images allowed')
      return
    }

    try {
      setLoading(true)
      console.log('Form submission started')

      const selectedSubscription = availableSubscriptions.find(
        (item: SubscriptionItem) =>
          item.subscriptionId.subscription_period === values.package_type
      )

      if (!selectedSubscription) {
        message.error('Invalid package selection')
        setLoading(false)
        return
      }

      // Create FormData for proper file upload
      const formData = new FormData()

      // Add basic fields
      formData.append('sneaker_name', values.sneaker_name)
      formData.append('brand_name', values.brand_name)
      formData.append('sneaker_code', values.sneaker_code)
      formData.append('description', values.description)

      // Convert boolean to string properly for FormData
      const isAICheck = values.verification_method === 'ai'
      formData.append('isCheckedAI', isAICheck ? 'true' : 'false')

      // Add optional fields with proper type conversion
      if (shouldShowMarketValue() && values.marketvalue) {
        // Send as number, not string
        formData.append('marketvalue', values.marketvalue.toString())
      }

      if (shouldShowGeolocation() && values.geolocation) {
        formData.append('geolocation', JSON.stringify(values.geolocation))
      }

      // Add photos as files
      uploadedImages.forEach((image, index) => {
        if (image.originFileObj) {
          formData.append('photo', image.originFileObj)
        }
      })

      // Alternative: Send as JSON in data field instead of individual FormData fields
      // This might work better with your backend validation
      const jsonData = {
        sneaker_name: values.sneaker_name,
        brand_name: values.brand_name,
        sneaker_code: values.sneaker_code,
        description: values.description,
        isCheckedAI: values.verification_method === 'ai',
        ...(shouldShowMarketValue() &&
          values.marketvalue && {
            marketvalue: Number(values.marketvalue),
          }),

        geolocation: {
          coordinates: [23.8103, 90.4125],
        },
      }

      console.log(jsonData)

      // Clear FormData and use the JSON approach
      const finalFormData = new FormData()

      // Add the JSON data as a string field
      finalFormData.append('data', JSON.stringify(jsonData))

      // Add photos as files
      uploadedImages.forEach((image, index) => {
        if (image.originFileObj) {
          finalFormData.append('photo', image.originFileObj)
        }
      })

      // Log form data for debugging
      console.log('FormData contents:')
      console.log('JSON Data:', jsonData)

      console.log(
        'selectedSubscription=========================>',
        selectedSubscription
      )

      const response = await postSneakersProfile({
        data: finalFormData,
        id: selectedSubscription.subscriptionId._id,
      }).unwrap()

      toast.success('Sneaker profile submitted successfully!')
      console.log('Submission response:', response)

      // Reset form after successful submission
      resetForm()
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Failed to submit sneaker profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = (): void => {
    setCurrentStep('upload')
    setUploadedImages([])
    setAiResult(null)
    form.resetFields()
    setLoading(false)
  }

  const UploadStep: React.FC = () => (
    <div
      style={{
        backgroundImage: "url('/landing_page/s1.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        minHeight: '100vh',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="mt-20"
    >
      <div className="absolute inset-0 bg-green-950 opacity-60 z-10" />

      <div className="responsive-width mx-auto flex justify-center items-center z-20 h-[100vh] relative font-bold p-8">
        <div className="rounded-xl p-8 responsive-width w-full">
          {uploadedImages.length === 0 ? (
            <div className="flex flex-col gap-5 items-center py-16">
              <CiImageOn className="text-8xl text-white" />
              <div className="text-3xl text-white text-center">
                Drag and drop image here or click to upload
              </div>
              <div className="text-lg text-white text-center opacity-80">
                Upload 1-5 images (Max 5MB each)
              </div>
              <Dragger
                multiple
                listType="picture"
                onChange={handleUpload}
                showUploadList={false}
                beforeUpload={beforeUpload}
                className="w-full max-w-md"
              >
                <div className="cursor-pointer px-20 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Upload Sneakers
                </div>
              </Dragger>
            </div>
          ) : (
            <div>
              <Title level={1} className="text-center !text-white mb-6">
                Uploaded Images ({uploadedImages.length}/5)
              </Title>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {uploadedImages.map((image) => (
                  <div key={image.uid} className="relative group">
                    <Image
                      width={5000}
                      height={5000}
                      src={image.url}
                      alt={image.name}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      onClick={() => removeImage(image.uid)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <AiOutlineDelete size={12} />
                    </button>
                  </div>
                ))}
                {uploadedImages.length < 5 && (
                  <Dragger
                    multiple
                    listType="picture"
                    onChange={handleUpload}
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    className="h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg"
                  >
                    <div className="text-center">
                      <AiOutlineCloudUpload className="text-2xl text-white mx-auto mb-2" />
                      <Text className="text-white">Add More</Text>
                    </div>
                  </Dragger>
                )}
              </div>
              <div className="text-center">
                <Button
                  type="primary"
                  size="large"
                  onClick={continueToForm}
                  className="bg-green-600 hover:bg-green-700 border-green-600 px-8"
                  disabled={
                    uploadedImages.length === 0 || uploadedImages.length > 5
                  }
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  type Geolocation = {
    coordinates: [number, number]
  }

  // const LocationPicker: React.FC<{
  //   onSelect: (coords: Geolocation) => void
  // }> = ({ onSelect }) => {
  //   const [position, setPosition] = useState<[number, number] | null>(null)

  //   useMapEvents({
  //     click(e) {
  //       const coords: [number, number] = [e.latlng.lat, e.latlng.lng]
  //       setPosition(coords)
  //       onSelect({ coordinates: coords })
  //     },
  //   })

  //   return position ? <Marker position={position} /> : null
  // }

  const FormStep: React.FC = () => (
    <div
      className="bg-transparent flex items-center justify-center mt-20"
      style={{
        backgroundImage: "url('/landing_page/s1.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        minHeight: '100vh',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="absolute inset-0 bg-green-950 opacity-60" />
      <div className="max-w-2xl w-full mx-auto p-8 relative z-10">
        <Card className="shadow-lg">
          <Title level={2} className="text-center mb-8">
            Complete the Information
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            className="space-y-4"
            requiredMark={false}
          >
            {/* Package Type - Always shown first */}
            <Form.Item
              label="Package Type"
              name="package_type"
              rules={[
                { required: true, message: 'Please select package type' },
              ]}
            >
              <Select placeholder="Select package type" className="h-[48px]">
                {availableSubscriptions.map((item: SubscriptionItem) => (
                  <Select.Option
                    key={item._id}
                    value={item.subscriptionId.subscription_period}
                  >
                    {item.subscriptionId.subscription_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Verification Method - Always shown */}
            <Form.Item
              label="Verification Method"
              name="verification_method"
              rules={[
                {
                  required: true,
                  message: 'Please select verification method',
                },
              ]}
            >
              <Radio.Group className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Radio.Button value="ai" className="h-auto p-4 text-center">
                    <div className="flex flex-col items-center">
                      <AiOutlineRobot className="text-3xl text-blue-500 mb-2" />
                      <div className="font-semibold">AI Check</div>
                      <div className="text-sm text-gray-500">
                        Automated verification
                      </div>
                    </div>
                  </Radio.Button>
                  <Radio.Button
                    value="human"
                    className="h-auto p-4 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <AiOutlineUser className="text-3xl text-green-500 mb-2" />
                      <div className="font-semibold">Human Check</div>
                      <div className="text-sm text-gray-500">
                        Expert verification
                      </div>
                    </div>
                  </Radio.Button>
                </div>
              </Radio.Group>
            </Form.Item>

            {/* Basic sneaker information - Always shown */}
            <Form.Item
              label="Sneaker Name"
              name="sneaker_name"
              rules={[{ required: true, message: 'Please enter sneaker name' }]}
            >
              <Input placeholder="Enter sneaker name" className="h-[48px]" />
            </Form.Item>

            <Form.Item
              label="Brand Name"
              name="brand_name"
              rules={[{ required: true, message: 'Please enter brand name' }]}
            >
              <Input placeholder="Enter brand name" className="h-[48px]" />
            </Form.Item>

            <Form.Item
              label="Sneaker Code"
              name="sneaker_code"
              rules={[{ required: true, message: 'Please enter sneaker code' }]}
            >
              <Input placeholder="Enter sneaker code" className="h-[48px]" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <TextArea placeholder="Enter description" rows={5} />
            </Form.Item>

            {/* Market Value - Only shown for human verification */}
            {shouldShowMarketValue() && (
              <Form.Item
                label="Market Value ($)"
                name="marketvalue"
                rules={[
                  { required: true, message: 'Please enter market value' },
                ]}
              >
                <InputNumber
                  placeholder="Enter market value"
                  className="h-[48px] w-full"
                  min={0}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  // parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            )}

            {/* Geolocation - Only shown for pro/collector packages */}
            {/* {shouldShowGeolocation() && (
              <Form.Item
                label="Geolocation (Optional for Pro/Collector plans)"
                name="geolocation"
                rules={[
                  { required: false, message: 'Please select geolocation' },
                ]}
              >
                <div className="h-[300px] w-full rounded-lg overflow-hidden">
                  <MapContainer
                    center={[23.8103, 90.4125]} // Default to Dhaka
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationPicker
                      onSelect={(geo) => {
                        form.setFieldsValue({ geolocation: geo })
                      }}
                    />
                  </MapContainer>
                </div>
                <Text type="secondary" className="text-sm mt-2 block">
                  Click on the map to set location
                </Text>
              </Form.Item>
            )} */}

            <div className="text-center pt-4">
              <Space>
                <Button
                  size="large"
                  onClick={() => setCurrentStep('upload')}
                  className="px-8"
                  disabled={loading}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-green-600 h-[48px] hover:bg-green-700 border-green-600 px-8"
                  loading={loading}
                >
                  {loading ? 'Submitting...' : 'Post'}
                </Button>
              </Space>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )

  const ProcessingStep: React.FC = () => (
    <div
      className="bg-transparent flex items-center justify-center mt-20"
      style={{
        backgroundImage: "url('/landing_page/s1.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        minHeight: '100vh',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="absolute inset-0 bg-green-950 opacity-60" />
      <Card className="text-center p-8 relative z-10">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
        </div>
        <Title level={3}>AI Authentication in Progress...</Title>
        <Text className="text-gray-600">
          Please wait while we analyze your sneaker
        </Text>
      </Card>
    </div>
  )

  // Main render logic - Removed result step and processing step
  switch (currentStep) {
    case 'upload':
      return <UploadStep />
    case 'form':
      return <FormStep />
    default:
      return <UploadStep />
  }
}

export default SneakerAuthSystem
