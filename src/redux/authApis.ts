import { baseApis } from './main/baseApis'

const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<
      any,
      {
        name: string
        email: string
        phoneNumber: string
        password: string
      }
    >({
      query: (data) => ({
        url: '/user/create_user',
        method: 'POST',
        body: data,
      }),
    }),

    verifyUserOtp: builder.mutation<
      any,
      {
        verificationCode: number
      }
    >({
      query: (data) => ({
        url: '/user/user_verification',
        method: 'PATCH',
        body: data,
      }),
    }),
    verifyForgetUser: builder.mutation<
      any,
      {
        verificationCode: number
      }
    >({
      query: (data) => ({
        url: '/user/verification_forgot_user',
        method: 'POST',
        body: data,
      }),
    }),

    signIn: builder.mutation<
      any,
      {
        email: string
        password: string
      }
    >({
      query: (data) => ({
        url: '/auth/login_user',
        method: 'POST',
        body: data,
      }),
    }),

    forgetPassword: builder.mutation<
      any,
      {
        email: string
      }
    >({
      query: (data) => ({
        url: '/user/forgot_password',
        method: 'POST',
        body: data,
      }),
    }),
    setNewPassword: builder.mutation<
      any,
      {
        userId: string
        password: string
      }
    >({
      query: (data) => ({
        url: '/user/reset_password',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation<
      any,
      {
        newpassword: string
        oldpassword: string
      }
    >({
      query: (data) => ({
        url: '/user/change_password',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useSignUpMutation,
  useVerifyUserOtpMutation,
  useVerifyForgetUserMutation,
  useSignInMutation,
  useForgetPasswordMutation,
  useSetNewPasswordMutation,
  useChangePasswordMutation,
} = authApis

export default authApis
