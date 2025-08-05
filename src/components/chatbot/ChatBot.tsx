import React, { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import Image from 'next/image'
import { RiChat3Line } from 'react-icons/ri'

// Define the message interface
interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  timestamp: string
}

const ChatBot: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'I would be glad to help',
      sender: 'bot',
      timestamp: 'Wed 6:55 AM',
    },
    {
      id: 2,
      text: 'Actually there is.',
      sender: 'user',
      timestamp: 'Wed 6:55 AM',
    },
    {
      id: 3,
      text: 'I need to know the privacy policy of your business in a very short summary.',
      sender: 'user',
      timestamp: 'Wed 6:55 AM',
    },
    {
      id: 4,
      text: 'And one more thing.',
      sender: 'user',
      timestamp: 'Sent 16h ago',
    },
  ])
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

  const handleSendMessage = (): void => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
      setMessages([...messages, newMessage])
      setInputMessage('')

      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: 'Thank you for your message. How can I assist you further?',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }
        setMessages((prev: Message[]) => [...prev, botResponse])
      }, 1000)
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
      <div onClick={showModal} className="cursor-pointer">
        <div className="rounded-full flex items-center justify-center   shadow-lg hover:scale-105 transition-transform">
          <div className="rounded-full flex items-center justify-center">
            <div className="w-28 h-28 rounded-full flex items-center justify-center">
              <Image
                src="/chat/chat.gif"
                alt="chatbot"
                width={5000}
                height={5000}
                className="w-[120px]  border-[#5F9E19] rounded-full"
              />
              <RiChat3Line className='absolute text-9xl text-black' />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed bottom-0 right-0 top-30 bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-gray-900 rounded-lg w-96 h-[500px] flex flex-col shadow-2xl">
            <div className="bg-green-700 p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">
                    <Image
                      src="/chat/chat.gif"
                      alt="chatbot"
                      width={5000}
                      height={5000}
                      className="w-[100px] border-2 border-[#5F9E19] rounded-full"
                    />
                  </span>
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

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
              {messages.map((message: Message) => (
                <div key={message.id} className="space-y-1">
                  <div className="text-center">
                    <span className="text-gray-400 text-xs">
                      {message.timestamp}
                    </span>
                  </div>

                  <div
                    className={`flex ${
                      message.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
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
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

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
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors"
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
