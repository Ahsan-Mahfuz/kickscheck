import { baseApis } from './main/baseApis'

export interface ChatRequest {
  textprompt: string
}

export interface ChatResponse {
  success: boolean
  message: string
  data: string
}

const chatbotApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createChatbotApis: builder.mutation<ChatResponse, ChatRequest>({
      query: (data) => ({
        url: '/user_sneakers_profile/chatbot',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreateChatbotApisMutation } = chatbotApis
export default chatbotApis
