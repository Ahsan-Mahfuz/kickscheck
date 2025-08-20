import { baseApis } from './main/baseApis'

const subscriptionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => ({
        url: '/subscription/find_by_all_subscription_model',
        method: 'GET',
      }),
    }),
    getFreeSubscription: builder.query({
      query: ({ id }) => ({
        url: `/current_subscribed_users/free_plan_subscribed_user/${id}`,
        method: 'GET',
      }),
    }),
    getAllMySubscription: builder.query({
      query: () => ({
        url: `/current_subscribed_users/my_supscription_model`,
        method: 'GET',
      }),
    }),
    getAllMySubscriptionList: builder.query({
      query: () => ({
        url: `/current_subscribed_users/my_subscription_list`,
        method: 'GET',
      }),
    }),
    postSneakersProfile: builder.mutation({
      query: ({ data, id }) => ({
        url: `/user_sneakers_profile/create_sneakers_profile/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetSubscriptionQuery,
  useGetFreeSubscriptionQuery,
  useGetAllMySubscriptionQuery,
  useGetAllMySubscriptionListQuery,
} = subscriptionsApis
export default subscriptionsApis
