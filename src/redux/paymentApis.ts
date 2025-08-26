import { baseApis } from './main/baseApis'

const paymentApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: () => ({
        url: `/payment_gateway/create-onboarding-link`,
        method: 'GET',
      }),
    }),
    postPaymentCheckout: builder.mutation({
      query: (data) => ({
        url: `/payment_gateway/create-checkout-session`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetPaymentQuery, usePostPaymentCheckoutMutation } =
  paymentApis
export default paymentApis
