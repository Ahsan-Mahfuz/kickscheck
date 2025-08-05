'use client'
import React, { useState } from 'react'
import { Rate, Button, Input, Avatar, message } from 'antd'
import { FaUser, FaStar, FaRegStar } from 'react-icons/fa'
import { BiSend } from 'react-icons/bi'

const { TextArea } = Input

interface Comment {
  id: string
  name: string
  rating: number
  comment: string
  timestamp: Date
  avatar?: string
}

interface CommentSectionProps {
  productId?: string
  initialComments?: Comment[]
}

const Comments: React.FC<CommentSectionProps> = ({
  productId = 'default',
  initialComments = [],
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState({
    name: '',
    rating: 0,
    comment: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!newComment.name.trim()) {
      message.error('Please enter your name')
      return
    }

    if (newComment.rating === 0) {
      message.error('Please select a rating')
      return
    }

    if (!newComment.comment.trim()) {
      message.error('Please write a comment')
      return
    }

    setIsSubmitting(true)

    try {
      const comment: Comment = {
        id: Date.now().toString(),
        name: newComment.name.trim(),
        rating: newComment.rating,
        comment: newComment.comment.trim(),
        timestamp: new Date(),
      }

      setComments((prev) => [comment, ...prev])
      setNewComment({ name: '', rating: 0, comment: '' })
      message.success('Comment submitted successfully!')
    } catch (error) {
      message.error('Failed to submit comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-400">
        {index < rating ? <FaStar /> : <FaRegStar />}
      </span>
    ))
  }

  const averageRating =
    comments.length > 0
      ? (
          comments.reduce((sum, comment) => sum + comment.rating, 0) /
          comments.length
        ).toFixed(1)
      : '0.0'

  return (
    <div className="w-full  mx-auto  text-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        {comments.length > 0 && (
          <div className="flex items-center gap-2 text-sm ">
            <div className="flex items-center gap-1">
              {renderStars(Math.round(parseFloat(averageRating)))}
            </div>
            <span className="font-medium">{averageRating}</span>
            <span>
              ({comments.length} review{comments.length !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </div>

      {/* Comment Form */}
      <div className="border-2 border-gray-500 p-2 rounded-lg mb-8">
        <h3 className="text-lg font-semibold  mb-4">Write a Review</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium  mb-2">Your Name</label>
            <Input
              placeholder="Enter your name"
              value={newComment.name}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full h-[52px] bg-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Rating
            </label>
            <Rate
              value={newComment.rating}
              onChange={(value) =>
                setNewComment((prev) => ({ ...prev, rating: value }))
              }
              className="custom-rate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-2">
              Your Review
            </label>
            <TextArea
              rows={8}
              placeholder="Share your experience with this product..."
              value={newComment.comment}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, comment: e.target.value }))
              }
              className="w-full bg-gray-300"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="primary"
              icon={<BiSend />}
              onClick={handleSubmit}
              loading={isSubmitting}
              className="normal-button-bg-color h-[42px]"
            >
              Submit Review
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6 h-[70vh] overflow-y-scroll">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FaUser className="mx-auto text-4xl mb-4 opacity-50" />
            <p className="text-lg">No reviews yet</p>
            <p className="text-sm">Be the first to share your experience!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="
               border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <Avatar
                  size={48}
                  icon={<FaUser />}
                  className=" text-blue-600 flex-shrink-0"
                >
                  {comment.avatar
                    ? undefined
                    : comment.name.charAt(0).toUpperCase()}
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white text-lg">
                        {comment.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {renderStars(comment.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Comments
