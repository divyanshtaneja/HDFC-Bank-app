'use client'

import React, { useState } from 'react'
import { ChevronLeft, HelpCircle, Power, ChevronDown, Share2 } from 'lucide-react'
import Link from 'next/link'

interface SavingSchemeAccountScreenProps {
  onBack: () => void
  onLogout: () => void
}

export default function SavingSchemeAccountScreen({ onBack, onLogout }: SavingSchemeAccountScreenProps) {
  const [isShowMore, setIsShowMore] = useState(false)
  const [isStatementExpanded, setIsStatementExpanded] = useState(false)
  const [showBufferMessage, setShowBufferMessage] = useState(false)

  const handleLogout = () => {
    onLogout()
  }

  const handleRequestStatement = () => {
    setShowBufferMessage(true)
    setTimeout(() => {
      setShowBufferMessage(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <button onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">PPF Summary</h1>
        <div className="flex space-x-4">
          <Link href="https://www.hdfcbank.com">
            <HelpCircle size={24} />
          </Link>
          <button onClick={handleLogout}>
            <Power size={24} />
          </button>
        </div>
      </header>

      <div className="flex-grow overflow-auto">
        <div className="bg-white p-4 border-b">
          <h2 className="font-semibold text-gray-600">PPF</h2>
          <p className="text-black">PPF - 55000000191609</p>
        </div>

        <div className="bg-white p-4 border-b">
          <p className="text-gray-600">Account Balance</p>
          <p className="text-4xl font-bold text-blue-500">₹ 17,04,502<span className="text-2xl">.00</span></p>
          <p className="text-sm text-gray-600 mt-2">Additional Permissible Subscription in F.Y</p>
          <p className="text-sm text-gray-600">₹ 1,50,000.00</p>
        </div>

        <div className="bg-white p-4 border-b">
          <button 
            className="text-blue-500 flex items-center w-full justify-between"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            <span>Show More</span>
            <ChevronDown size={20} className={`transform ${isShowMore ? 'rotate-180' : ''}`} />
          </button>
          {isShowMore && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Account Holder</span>
                <span className="text-black">SANJAY TANEJA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Branch</span>
                <span className="text-black">OLD RAJINDER NAGAR MARKET</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IFSC</span>
                <span className="text-black">HDFC0000026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overdue Subscriptions</span>
                <span className="text-black">₹ 0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overdue Penalty</span>
                <span className="text-black">₹ 0.00</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-4 border-b">
          <button className="text-blue-500 flex items-center">
            <Share2 size={20} className="mr-2" />
            <span>Share Account Details</span>
          </button>
        </div>

        <div className="bg-white p-4 border-b">
          <button 
            className="flex items-center justify-between w-full text-blue-500"
            onClick={() => setIsStatementExpanded(!isStatementExpanded)}
          >
            <span className="text-lg font-semibold">Statement</span>
            <ChevronDown size={20} className={`transform ${isStatementExpanded ? 'rotate-180' : ''}`} />
          </button>
          {isStatementExpanded && (
            <div className="mt-4">
              <button 
                className="w-full bg-blue-500 text-white py-2 rounded-md"
                onClick={handleRequestStatement}
              >
                REQUEST STATEMENT
              </button>
            </div>
          )}
        </div>
      </div>

      {showBufferMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-black">The statement will be sent to your registered email address</p>
          </div>
        </div>
      )}
    </div>
  )
}
