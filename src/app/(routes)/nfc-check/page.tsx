'use client'
import { useGetNfcVerifyQuery } from '@/redux/nfcApis'
import React, { useEffect, useState } from 'react'

const NFCCheck = () => {
  const [nfcName, setNfcName] = useState('')
  useEffect(() => {})
  const { data: nfcVerify, isLoading } = useGetNfcVerifyQuery({
    nfcName: 'NFC-DM338',
  })
  return <div>NFCCheck</div>
}

export default NFCCheck
