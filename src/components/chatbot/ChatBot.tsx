'use client'
import React, { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import Image from 'next/image'
import { RiChat3Line } from 'react-icons/ri'
import { useCreateChatbotApisMutation } from '@/redux/chatbotApis'
import { Spin } from 'antd'

interface Message {
  id: number
  sender: 'user' | 'bot'
  text: string
}

const ChatBot: React.FC = () => {
  const [createChat, { isLoading }] = useCreateChatbotApisMutation()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleClose = (): void => {
    setIsModalOpen(false)
  }

  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')

    try {
      const res: any = await createChat({ textprompt: inputMessage }).unwrap()

      if (res?.success && res?.data) {
        const botMessage: Message = {
          id: Date.now() + 1,
          sender: 'bot',
          text: res.data,
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 2,
        sender: 'bot',
        text: 'Something went wrong. Please try again.',
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputMessage(e.target.value)
  }

  return (
    <div className="fixed bottom-5 right-5 z-[99]">
      {/* Chat Icon */}
      <div onClick={showModal} className="cursor-pointer">
        <div className="rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
          <div className="w-28 h-28 rounded-full flex items-center justify-center relative">
            <Image
              src="/chat/chat.gif"
              alt="chatbot"
              width={120}
              height={120}
              className="w-[120px] h-[120px] border-[#5F9E19] rounded-full"
            />
            <RiChat3Line className="absolute text-9xl text-black" />
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isModalOpen && (
        <div className="fixed bottom-0 right-0 top-30 bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-gray-900 rounded-lg w-96 h-[500px] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="bg-green-700 p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Image
                    src="/chat/chat.gif"
                    alt="chatbot"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Chatbot</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-200 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-300 transition-colors"
                type="button"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                    <Spin size="small" />
                    <span>Bot is typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-900 rounded-b-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Aa"
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-full border border-gray-600 focus:outline-none focus:border-green-500 placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors disabled:opacity-50"
                  type="button"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBot
