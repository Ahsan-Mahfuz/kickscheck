import { baseApis } from './main/baseApis'

interface ProfileResponse {
  data: {
    name: string
    email: string
    id: string
  }
}

const profileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: '/auth/myprofile',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetProfileQuery } = profileApis
export default profileApis
