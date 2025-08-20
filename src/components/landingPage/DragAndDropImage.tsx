'use client'
import React, { useState } from 'react'
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
import { useGetAllMySubscriptionListQuery } from '@/redux/subscriptionsApis'

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
  name: string
  brand: string
  code: string
  description: string
}

interface AIResult {
  authenticity: number
  aiReview: 'Pass' | 'Fail'
}

interface SubmissionData {
  images: UploadedImage[]
  sneakerDetails: FormValues
  verificationMethod: 'ai' | 'human' | null
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

type StepType = 'upload' | 'form' | 'verification' | 'result'
type VerificationMethodType = 'ai' | 'human' | null

const SneakerAuthSystem: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepType>('upload')
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [form] = Form.useForm<FormValues>()
  const [verificationMethod, setVerificationMethod] =
    useState<VerificationMethodType>(null)
  const [aiResult, setAiResult] = useState<AIResult | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { data: getMySubscriptionList } =
    useGetAllMySubscriptionListQuery(undefined)

  const handleUpload = (info: UploadChangeParam<UploadFile>) => {
    const { fileList } = info

    const newFiles: UploadedImage[] = fileList
      .filter((file) => file.originFileObj)
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
      return [...prev, ...uniqueNewFiles]
    })
  }

  const removeImage = (uid: string): void => {
    setUploadedImages((prev) => prev.filter((img) => img.uid !== uid))
  }

  const continueToForm = (): void => {
    if (uploadedImages.length > 0) {
      setCurrentStep('form')
    }
  }

  const handleFormSubmit = (values: FormValues): void => {
    console.log('Form values:', values)
    setCurrentStep('verification')
  }

  const handleAICheck = (): void => {
    setVerificationMethod('ai')
    setLoading(true)

    setTimeout(() => {
      const mockAiResult: AIResult = {
        authenticity: Math.floor(Math.random() * 30) + 70,
        aiReview: Math.random() > 0.3 ? 'Pass' : 'Fail',
      }
      setAiResult(mockAiResult)
      setLoading(false)
      setCurrentStep('result')
    }, 3000)
  }

  const handleHumanCheck = (): void => {
    setVerificationMethod('human')
    setCurrentStep('result')
  }

  const handleFinalSubmit = (): void => {
    setShowModal(true)
  }

  const submitToSuperAdmin = (): void => {
    const formData = form.getFieldsValue()
    const submissionData: SubmissionData = {
      images: uploadedImages,
      sneakerDetails: formData,
      verificationMethod,
      aiResult: verificationMethod === 'ai' ? aiResult : null,
    }

    console.log('Submitting to Super Admin:', submissionData)

    setShowModal(false)
    resetForm()
  }

  const resetForm = (): void => {
    setCurrentStep('upload')
    setUploadedImages([])
    setVerificationMethod(null)
    setAiResult(null)
    form.resetFields()
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
              <Dragger
                multiple
                listType="picture"
                onChange={handleUpload}
                showUploadList={false}
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
                Uploaded Images
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
                <Dragger
                  multiple
                  listType="picture"
                  onChange={handleUpload}
                  showUploadList={false}
                  className="h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg"
                >
                  <div className="text-center">
                    <AiOutlineCloudUpload className="text-2xl text-white mx-auto mb-2" />
                    <Text className="text-white">Add More</Text>
                  </div>
                </Dragger>
              </div>
              <div className="text-center">
                <Button
                  type="primary"
                  size="large"
                  onClick={continueToForm}
                  className="bg-green-600 hover:bg-green-700 border-green-600 px-8"
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

  const FormStep: React.FC = () => (
    <div
      className=" bg-transparent flex items-center justify-center mt-20"
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
      <div className="absolute inset-0 bg-green-950 opacity-60 " />
      <div className="max-w-2xl w-full mx-auto p-8">
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
            <Form.Item
              label="Package Type"
              name="package_type"
              rules={[
                { required: true, message: 'Please select package type' },
              ]}
            >
              <Select placeholder="Select package type" className="h-[48px]">
                {getMySubscriptionList?.data?.map((item: SubscriptionItem) => (
                  <Select.Option
                    key={item._id}
                    value={item.subscriptionId.subscription_period}
                  >
                    {item.subscriptionId.subscription_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Sneaker Name"
              name="name"
              rules={[{ required: true, message: 'Please enter sneaker name' }]}
            >
              <Input placeholder="Enter sneaker name" className="h-[48px]" />
            </Form.Item>

            <Form.Item
              label="Brand Name"
              name="brand"
              rules={[{ required: true, message: 'Please enter brand name' }]}
            >
              <Input placeholder="Enter brand name" className="h-[48px]" />
            </Form.Item>

            <Form.Item
              label="Sneaker Code"
              name="code"
              rules={[{ required: true, message: 'Please enter sneaker code' }]}
            >
              <Input placeholder="Enter sneaker code" className="h-[48px]" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <TextArea
                placeholder="Enter description"
                rows={5}
                className="h-[48px]"
              />
            </Form.Item>
            
            <Form.Item
              label="Geolocation"
              name="geolocation"
              rules={[{ required: true, message: 'Please enter geolocation' }]}
            >
              <TextArea
                placeholder="Enter geolocation"
                rows={5}
                className="h-[48px]"
              />
            </Form.Item>

            <div className="text-center pt-4">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-600 h-[42px] hover:bg-green-700 border-green-600 px-8"
              >
                Continue
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )

  // Verification Step Component
  const VerificationStep: React.FC = () => (
    <div
      className=" bg-transparent flex items-center justify-center mt-20"
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
      <div className="absolute inset-0 bg-green-950 opacity-60 " />
      <div className="max-w-2xl mx-auto p-8">
        <Card className="shadow-lg text-center">
          <Title level={2} className="mb-8">
            Choose Verification Method
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              hoverable
              onClick={handleAICheck}
              className="border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
            >
              <div className="text-center py-8">
                <AiOutlineRobot className="text-6xl text-blue-500 mx-auto mb-4" />
                <Title level={3} className="text-blue-600">
                  AI Check
                </Title>
                <Text className="text-gray-600">
                  Automated authentication using AI technology
                </Text>
              </div>
            </Card>

            <Card
              hoverable
              onClick={handleHumanCheck}
              className="border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer"
            >
              <div className="text-center py-8">
                <AiOutlineUser className="text-6xl text-green-500 mx-auto mb-4" />
                <Title level={3} className="text-green-600">
                  Human Check
                </Title>
                <Text className="text-gray-600">
                  Manual verification by authentication experts
                </Text>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  )

  // Result Step Component
  const ResultStep: React.FC = () => (
    <div
      className=" bg-transparent flex items-center justify-center mt-20"
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
      <div className="absolute inset-0 bg-green-950 opacity-60 " />
      <div className="max-w-4xl w-full mx-auto p-8">
        <Card className="shadow-lg">
          <Title level={2} className="text-center mb-8">
            Authentication Report
          </Title>

          {/* Show all uploaded images */}
          <div className="mb-6">
            <Title level={4} className="mb-4">
              All Uploaded Images:
            </Title>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={image.uid} className="relative">
                  <Image
                    width={5000}
                    height={5000}
                    src={image.url}
                    alt={`Sneaker ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            <div className="flex justify-between">
              <Text strong>Name:</Text>
              <Text>{form.getFieldValue('name')}</Text>
            </div>

            <div className="flex justify-between">
              <Text strong>Brand:</Text>
              <Text>{form.getFieldValue('brand')}</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Code:</Text>
              <Text>{form.getFieldValue('code')}</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Description:</Text>
              <Text>{form.getFieldValue('description')}</Text>
            </div>

            {verificationMethod === 'ai' && aiResult && (
              <>
                <Divider />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Text strong>Authenticity:</Text>
                    <Text>{aiResult.authenticity}%</Text>
                  </div>
                  <Progress
                    percent={aiResult.authenticity}
                    strokeColor={
                      aiResult.authenticity >= 80 ? '#52c41a' : '#faad14'
                    }
                  />
                  <div className="flex justify-between">
                    <Text strong>AI Review:</Text>
                    <Text
                      className={
                        aiResult.aiReview === 'Pass'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {aiResult.aiReview}{' '}
                      {aiResult.aiReview === 'Pass' ? '✓' : '✗'}
                    </Text>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-8 space-x-4">
            <Button size="large" onClick={resetForm}>
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleFinalSubmit}
              className="bg-green-600 hover:bg-green-700 border-green-600"
            >
              Post
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div
        className=" bg-transparent flex items-center justify-center mt-20"
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
        <div className="absolute inset-0 bg-green-950 opacity-60 " />
        <Card className="text-center p-8">
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
  }

  return (
    <>
      {currentStep === 'upload' && <UploadStep />}
      {currentStep === 'form' && <FormStep />}
      {currentStep === 'verification' && <VerificationStep />}
      {currentStep === 'result' && <ResultStep />}

      <Modal
        title="Confirm Submission"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowModal(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={submitToSuperAdmin}
            className="bg-green-600 hover:bg-green-700 border-green-600"
          >
            Submit to Super Admin
          </Button>,
        ]}
        centered
      >
        <p>
          Are you sure you want to submit this sneaker authentication request to
          the Super Admin?
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Once submitted, the request will be reviewed and processed by the
          administrative team.
        </p>
      </Modal>
    </>
  )
}

export default SneakerAuthSystem
