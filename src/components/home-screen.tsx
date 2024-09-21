'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { UserCircle2, Gift, Home, Coins, MessageCircle, CreditCard, HelpCircle, MoreHorizontal } from 'lucide-react'

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'pin' | 'password'>('pin')
  const [pin, setPin] = useState(['', '', '', ''])
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const pinInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  useEffect(() => {
    if (pin.join('') === '0019') {
      setError('')
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        window.location.href = '/dashboard'
      }, 2000)
    } else if (pin.join('').length === 4) {
      setError('Incorrect PIN. Please try again.')
      setPin(['', '', '', ''])
      pinInputRefs[0].current?.focus()
    }
  }, [pin])

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newPin = [...pin]
      newPin[index] = value
      setPin(newPin)

      if (value && index < 3) {
        pinInputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinInputRefs[index - 1].current?.focus()
    }
  }

  const bottomOptions = [
    { name: 'Open Account', icon: UserCircle2 },
    { name: 'Offers', icon: Gift },
    { name: 'Home Loan', icon: Home },
    { name: 'Digital Rupee', icon: Coins },
    { name: 'Chat Banking', icon: MessageCircle },
    { name: 'PayZapp', icon: CreditCard },
    { name: 'Ask Eva', icon: HelpCircle },
    { name: 'More', icon: MoreHorizontal },
  ]

  return (
    <div className="flex flex-col h-screen bg-[#00004d]">
      <div className="p-4">
        <Image 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hdfc-logo-MOELmtTbpdAw2aChcSsmyjmNh5mL4V.jpg" 
          alt="HDFC Bank Logo" 
          width={200} 
          height={40} 
        />
      </div>

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex flex-col items-center mb-4">
            <Image 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-picture-l1QQKCqiCGGufjnRBkjs29e3EjKXKX.webp" 
              alt="Profile" 
              width={80} 
              height={80} 
              className="rounded-full mb-2" 
            />
            <h2 className="text-xl font-bold text-center text-black">Welcome, SANJAY TANEJA</h2>
            <p className="text-center text-gray-500">Log in with</p>
          </div>
          
          <div className="flex mb-4">
            <button
              className={`flex-1 py-2 text-center ${activeTab === 'pin' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('pin')}
            >
              4-digit PIN
            </button>
            <button
              className={`flex-1 py-2 text-center ${activeTab === 'password' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('password')}
            >
              Password
            </button>
          </div>

          {activeTab === 'pin' && (
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    ref={pinInputRefs[index]}
                    type="password"
                    maxLength={1}
                    value={pin[index]}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <p className="text-blue-600 text-sm cursor-pointer">Forgot PIN?</p>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600 mb-2 text-black"
              />
              <p className="text-blue-600 text-sm cursor-pointer">Forgot Password?</p>
            </div>
          )}

          <p className="text-sm text-center mb-4 text-gray-600">
            Not SANJAY TANEJA? <span className="text-blue-600 cursor-pointer">Add Another User</span>
          </p>

          <div className="flex justify-between text-sm text-blue-600">
            <span className="cursor-pointer">Secure Banking</span>
            <span className="cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>

      <div className="bg-[#00004d] py-6">
        <div className="grid grid-cols-4 gap-4 px-4">
          {bottomOptions.map((option, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-full mb-2">
                <option.icon className="w-6 h-6 text-[#00004d]" />
              </div>
              <span className="text-xs text-center text-white">{option.name}</span>
            </div>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-xl font-bold text-[#00004d]">SECURELY LOGGING IN</p>
          </div>
        </div>
      )}
    </div>
  )
}
