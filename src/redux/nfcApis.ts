import { baseApis } from './main/baseApis'

const nfcApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getNfcVerify: builder.query({
      query: ({ nfcName }) => ({
        url: `/nfc_card/nft_card_verification/${nfcName}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 300,
    }),
  }),
  overrideExisting: false,
})

export const { useGetNfcVerifyQuery } = nfcApis
export default nfcApis
