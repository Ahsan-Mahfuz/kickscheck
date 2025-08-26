import { baseApis } from './main/baseApis'

const snekersProfileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getMySneakersProfile: builder.query({
      query: ({ id, human_review }) => ({
        url: `/user_sneakers_profile/find_user_base_specific_supscription/${id}?human_review=${human_review}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
    }),
    getMyRecentSneakersProfile: builder.query({
      query: ({ id }) => ({
        url: `/user_sneakers_profile/find_user_base_specific_supscription/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
    }),
    getOneSneakerProfile: builder.query({
      query: ({ id }) => ({
        url: `/user_sneakers_profile/find_specific_user_sneakers/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
    }),
    getReviewSneaker: builder.query({
      query: ({ id }) => ({
        url: `/rating_review/find_by_specific_sneakers_review/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
    }),
    getAllSneaker: builder.query({
      query: () => ({
        url: `/current_subscribed_users/explore_filtering_subscription`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
    }),
    getRealTimeMarketValue: builder.query({
      query: ({ id }) => ({
        url: `/user_sneakers_profile/viewrealtime_marketvalue/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetMySneakersProfileQuery,
  useGetMyRecentSneakersProfileQuery,
  useGetOneSneakerProfileQuery,
  useGetReviewSneakerQuery,
  useGetAllSneakerQuery,
  useGetRealTimeMarketValueQuery,
} = snekersProfileApis
export default snekersProfileApis
