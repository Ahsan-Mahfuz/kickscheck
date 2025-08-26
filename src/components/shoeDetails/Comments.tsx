'use client'
import React, { useState } from 'react'
import { Rate, Button, Input, Avatar, message } from 'antd'
import { FaUser, FaStar, FaRegStar } from 'react-icons/fa'
import { BiSend } from 'react-icons/bi'
import { usePostReviewsMutation } from '@/redux/ratingReviewApis'
import { usePathname } from 'next/navigation'
import { useGetReviewSneakerQuery } from '@/redux/snekersProfileApis'
import toast from 'react-hot-toast'

const { TextArea } = Input

const Comments = () => {
  const router = usePathname()
  const id = router.split('/').pop()

  const [postReview] = usePostReviewsMutation()
  const { data, refetch, isLoading } = useGetReviewSneakerQuery({ id })

  const [newComment, setNewComment] = useState({
    rating: 0,
    comment: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const comments = data?.data?.all_specifc_review || []

  const handleSubmit = async () => {
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
      const payload = {
        sneakersId: id,
        rating: newComment.rating,
        review: newComment.comment,
      }

      console.log(payload)

      const res = await postReview(payload).unwrap()

      setNewComment({ rating: 0, comment: '' })
      await refetch()

      toast.success(res?.data?.message)
    } catch (error: any) {
      console.error(error)
      message.error(
        error?.data?.message || 'Failed to submit comment. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-400">
        {index + 1 <= rating ? <FaStar /> : <FaRegStar />}
      </span>
    ))
  }

  const averageRating =
    comments.length > 0
      ? (
          comments.reduce((sum: number, c: any) => sum + c.rating, 0) /
          comments.length
        ).toFixed(1)
      : '0.0'

  return (
    <div className="w-full mx-auto text-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        {comments.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
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
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Rating
            </label>
            <Rate
              className=" "
              value={newComment.rating}
              onChange={(value) =>
                setNewComment((prev) => ({ ...prev, rating: value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <TextArea
              rows={6}
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
        {isLoading ? (
          <p className="text-center text-gray-400">Loading reviews...</p>
        ) : comments?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FaUser className="mx-auto text-4xl mb-4 opacity-50" />
            <p className="text-lg">No reviews yet</p>
            <p className="text-sm">Be the first to share your experience!</p>
          </div>
        ) : (
          comments.map((comment: any) => (
            <div
              key={comment._id}
              className="border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <Avatar
                  size={48}
                  src={comment.userId?.photo || undefined}
                  icon={!comment.userId?.photo && <FaUser />}
                  className="text-blue-600 flex-shrink-0"
                >
                  {comment.userId?.name
                    ? comment.userId.name.charAt(0).toUpperCase()
                    : 'A'}
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white text-lg">
                        {comment.userId?.name || 'Anonymous'}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {renderStars(comment.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.updatedAt || new Date())}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    {comment.review}
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
