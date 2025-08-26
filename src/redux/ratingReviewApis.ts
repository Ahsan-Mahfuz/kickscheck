import { baseApis } from './main/baseApis'

const ratingReviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    postReviews: builder.mutation({
      query: (data) => ({
        url: `/rating_review/user_rating_review`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { usePostReviewsMutation } = ratingReviewApis
export default ratingReviewApis
