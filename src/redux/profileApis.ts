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
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/auth/update_my_profile',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApis
export default profileApis
