// app/home-screen/page.tsx
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
    <div className="min-h-screen flex flex-col bg-[#001639] text-black overflow-hidden">
      <div className="pt-4 px-4 w-full max-w-md mx-auto">
        <div className="w-full">
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

      <main className="flex-grow flex items-center justify-center px-4 py-2">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-4 space-y-4 sm:p-6 sm:space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-picture-l1QQKCqiCGGufjnRBkjs29e3EjKXKX.webp"
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h2 className="text-lg font-bold">Welcome, SANJAY TANEJA</h2>
            <p className="text-sm text-gray-500">Log in with</p>
          </div>

          <div className="flex border-b border-gray-300 text-sm">
            {['pin', 'password'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 font-medium text-center transition-all duration-200 ${
                  activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab(tab as 'pin' | 'password')}
              >
                {tab === 'pin' ? '4-digit PIN' : 'Password'}
              </button>
            ))}
          </div>

          {activeTab === 'pin' && (
            <div className="space-y-2">
              <div className="flex justify-between gap-2">
                {pin.map((value, index) => (
                  <input
                    key={index}
                    ref={pinInputRefs[index]}
                    type="password"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    disabled={isLoading}
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              {isLoading && (
                <p className="text-blue-600 text-xs text-center animate-pulse">
                  Securely logging in...
                </p>
              )}
              <p className="text-blue-600 text-xs text-center cursor-pointer">Forgot PIN?</p>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <p className="text-blue-600 text-xs text-center cursor-pointer">Forgot Password?</p>
            </div>
          )}

          <p className="text-xs text-center text-gray-600">
            Not SANJAY TANEJA?{' '}
            <span className="text-blue-600 cursor-pointer">Add Another User</span>
          </p>

          <div className="flex justify-between text-[10px] text-blue-600">
            <span className="cursor-pointer">Secure Banking</span>
            <span className="cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </main>

      <footer className="p-3 w-full max-w-md mx-auto">
        <Image
          src="/footer-image.jpg"
          alt="Footer Image"
          width={400}
          height={100}
          className="mx-auto object-contain"
        />
      </footer>
    </div>
  )
}
