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
import { Fingerprint } from 'lucide-react'

export default function HomeScreen() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<'pin' | 'password' | 'biometric'>('pin')
  const [pin, setPin] = useState<string[]>(['', '', '', ''])
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [biometricSupported, setBiometricSupported] = useState(false)

  const pinInputRefs = useMemo(
    (): RefObject<HTMLInputElement>[] =>
      Array.from({ length: 4 }, () => createRef<HTMLInputElement>()),
    []
  )

  useEffect(() => {
    if (window.PublicKeyCredential) {
      setBiometricSupported(true)
    }
  }, [])

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

  const handleBiometricLogin = async () => {
    try {
      const result = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          timeout: 60000,
          userVerification: 'preferred',
        },
      })
      if (result) {
        router.push('/dashboard-screen')
      }
    } catch (err) {
      console.error('Biometric login failed:', err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#00204a] to-[#003366] text-black overflow-hidden">
      <div className="w-full max-w-md mx-auto">
        <Image
          src="/logo.jpg"
          alt="Custom Logo"
          width={256}
          height={80}
          className="w-full h-auto object-contain"
        />
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-0">
        <div className="bg-white w-full max-w-md aspect-square flex flex-col justify-center rounded-none px-4 py-6 shadow-xl">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/profile-picture-l1QQKCqiCGGufjnRBkjs29e3EjKXKX.webp"
                alt="Profile"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <h2 className="text-lg font-bold">Welcome, SANJAY TANEJA</h2>
            <p className="text-sm text-gray-500">Log in with</p>
          </div>

          <div className="flex border border-blue-200 rounded-lg mt-4 overflow-hidden text-sm">
            {['pin', 'password', biometricSupported ? 'biometric' : ''].filter(Boolean).map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 font-medium text-center transition-all duration-200 ${
                  activeTab === tab ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'
                }`}
                onClick={() => setActiveTab(tab as 'pin' | 'password' | 'biometric')}
              >
                {tab === 'pin' ? '4-digit PIN' : tab === 'password' ? 'Password' : 'Face ID'}
              </button>
            ))}
          </div>

          {activeTab === 'pin' && (
            <div className="space-y-2 mt-6">
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
            <div className="space-y-2 mt-6">
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

          {activeTab === 'biometric' && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleBiometricLogin}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-3 rounded-lg shadow"
              >
                <Fingerprint size={20} /> Log in with Face ID
              </button>
            </div>
          )}

          <hr className="my-6 border-t" />

          <p className="text-xs text-center text-gray-600">
            Not SANJAY TANEJA?{' '}
            <span className="text-blue-600 cursor-pointer">Add Another User</span>
          </p>

          <div className="flex justify-center gap-2 text-[10px] text-blue-600 mt-2">
            <span className="cursor-pointer">Secure Banking</span>
            <span>|</span>
            <span className="cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </main>

      <div className="w-full max-w-md mx-auto">
        <Image
          src="/footer-image.jpg"
          alt="Footer Image"
          width={256}
          height={80}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  )
}