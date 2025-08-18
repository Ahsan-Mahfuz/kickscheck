import { baseApis } from './main/baseApis'

export interface ContactRequest {
  first_name: string
  last_name: string
  business_email: string
  company: string
  phoneNumber: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

const contactApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createContactApis: builder.mutation<ContactResponse, ContactRequest>({
      query: (data) => ({
        url: '/contract',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreateContactApisMutation } = contactApis
export default contactApis
