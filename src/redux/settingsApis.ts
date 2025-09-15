import { baseApis } from './main/baseApis'

interface AboutResponse {
  success: boolean
  message: string
  data: {
    name: string
    __v: number
    aboutUs: string
    createdAt?: string
  }
}

interface PrivacyPolicyResponse {
  success: boolean
  message: string
  data: {
    name: string
    __v: number
    PrivacyPolicy: string
    createdAt?: string
  }
}

interface TermsAndConditionsResponse {
  success: boolean
  message: string
  data: {
    name: string
    __v: number
    TermsConditions: string
    createdAt?: string
  }
}

const settingsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query<AboutResponse, void>({
      query: () => ({
        url: '/setting/find_by_about_us',
        method: 'GET',
      }),
    }),
    getPrivacyPolicy: builder.query<PrivacyPolicyResponse, void>({
      query: () => ({
        url: '/setting/find_by_privacy_policys',
        method: 'GET',
      }),
    }),
    getTermsAndConditions: builder.query<TermsAndConditionsResponse, void>({
      query: () => ({
        url: '/setting/find_by_terms_conditions',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAboutUsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
} = settingsApis
export default settingsApis
