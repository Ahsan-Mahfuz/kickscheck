'use client'
import React, { useState } from 'react'
import { Card } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

const courses = [
  {
    title: 'How accurate is the AI?',
    description:
      'You can update your personal details anytime in your profile settings. This includes your name, email, and profile picture. We use this information to personalize your experience and connect you with the community. Rest assured, your data is kept secure and private.',
  },
  {
    title: 'What types of sneakers are supported?',
    description: 'Discover organic methods for indoor herb gardening.',
  },
  {
    title: 'Become a premium user',
    description: 'Practical guide to setting up your kitchen garden.',
  },
  {
    title: 'Become a power user',
    description: 'Practical guide to setting up your kitchen garden.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="responsive-width mx-auto mt-20">
      <div className="text-4xl font-bold mb-10">FAQ</div>
      <div className="space-y-3">
        {courses.map((course, index) => {
          const isOpen = openIndex === index
          return (
            <Card
              key={index}
              className=" rounded-lg border bg-transparent text-white cursor-pointer transition-all duration-300"
              bodyStyle={{ padding: '16px' }}
              onClick={() => handleToggle(index)}
            >
              <div className="flex items-start justify-between gap-3">
                <div bg-transparent>
                  <h3 className="text-base font-medium">{course.title}</h3>
                  {isOpen && (
                    <p className="text-sm text-gray-200 ">
                      {course.description}
                    </p>
                  )}
                </div>

                {!isOpen ? (
                  <DownOutlined className=" mt-1" />
                ) : (
                  <UpOutlined className=" mt-1" />
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default FAQ
