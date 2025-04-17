'use client'

import React, {
  useState,
  useMemo,
  createRef,
  useEffect,
  RefObject,
  KeyboardEvent,
} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HomeScreen() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<'pin' | 'password'>('pin')
  const [pin, setPin] = useState<string[]>(['', '', '', ''])
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const pinInputRefs = useMemo(
    (): RefObject<HTMLInputElement>[] =>
      Array.from({ length: 4 }, () => createRef<HTMLInputElement>()),
    []
  )

  useEffect(() => {
    const validPins = ['0019', '2611', '1972']
    const enteredPin = pin.join('')

    if (enteredPin.length === 4 && !isLoading) {
      if (validPins.includes(enteredPin)) {
        setError('')
        setIsLoading(true)
        setTimeout(() => {
          router.push('/dashboard-screen')
        }, 2000)
      } else {
        setError('Incorrect PIN. Please try again.')
        setPin(['', '', '', ''])
        setTimeout(() => {
          pinInputRefs[0]?.current?.focus()
        }, 100)
      }
    }
  }, [pin, isLoading, pinInputRefs, router])

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1 && !isLoading) {
      const updatedPin = [...pin]
      updatedPin[index] = value
      setPin(updatedPin)

      if (value && index < 3) {
        pinInputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinInputRefs[index - 1].current?.focus()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#00004d] justify-between">
      <div className="pt-6 px-4">
        <div className="flex justify-center">
          <div className="w-48 sm:w-64">
            <Image
              src="/logo.jpg"
              alt="Custom Logo"
              layout="responsive"
              width={256}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6">
          <div className="flex flex-col items-center mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-picture-l1QQKCqiCGGufjnRBkjs29e3EjKXKX.webp"
              alt="Profile"
              width={70}
              height={70}
              className="rounded-full mb-2"
            />
            <h2 className="text-lg sm:text-xl font-bold text-black text-center">
              Welcome, SANJAY TANEJA
            </h2>
            <p className="text-gray-500 text-sm text-center">Log in with</p>
          </div>

          <div className="flex mb-4 text-sm sm:text-base">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'pin'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('pin')}
            >
              4-digit PIN
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === 'password'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('password')}
            >
              Password
            </button>
          </div>

          {activeTab === 'pin' && (
            <div className="mb-4">
              <div className="flex justify-between gap-2 mb-2">
                {pin.map((value, index) => (
                  <input
                    key={index}
                    ref={pinInputRefs[index]}
                    type="password"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600 text-black"
                    disabled={isLoading}
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
              {isLoading && (
                <p className="text-blue-600 text-sm mt-2 text-center animate-pulse">
                  Securely logging in...
                </p>
              )}
              <p className="text-blue-600 text-sm mt-2 text-center cursor-pointer">
                Forgot PIN?
              </p>
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
              <p className="text-blue-600 text-sm text-center cursor-pointer">
                Forgot Password?
              </p>
            </div>
          )}

          <p className="text-sm text-center text-gray-600 mb-4">
            Not SANJAY TANEJA?{' '}
            <span className="text-blue-600 cursor-pointer">Add Another User</span>
          </p>

          <div className="flex justify-between text-xs sm:text-sm text-blue-600">
            <span className="cursor-pointer">Secure Banking</span>
            <span className="cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>

      <div className="w-full p-4">
        <Image
          src="/footer-image.jpg"
          alt="Footer Image"
          width={400}
          height={100}
          className="mx-auto object-contain"
        />
      </div>
    </div>
  )
}
