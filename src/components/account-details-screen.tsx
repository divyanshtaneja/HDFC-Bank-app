'use client'

import React from 'react'
import { ChevronLeft, HelpCircle, Power, ChevronDown, Info } from 'lucide-react'

interface AccountDetailsScreenProps {
  onBack: () => void
  onLogout: () => void
  accountNumber: string
}

interface AccountDetails {
  accountNumber: string
  balance: string
  accountHolder: string
  branch: string
  ifsc: string
}

const accounts: { [key: string]: AccountDetails } = {
  '03271000009991': {
    accountNumber: '03271000009991',
    balance: '29,41,959.62',
    accountHolder: 'SANJAY TANEJA',
    branch: 'MULTAN NAGAR',
    ifsc: 'HDFC0004362',
  },
  '03271000041278': {
    accountNumber: '03271000041278',
    balance: '19,39,064.57',
    accountHolder: 'JAYA TANEJA',
    branch: 'MULTAN NAGAR, DELHI',
    ifsc: 'HDFC0004362',
  }
}

export default function AccountDetailsScreen({ onBack, onLogout, accountNumber }: AccountDetailsScreenProps) {
  const account = accounts[accountNumber]

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <button onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Savings Account</h1>
        <div className="flex space-x-4">
          <HelpCircle size={24} />
          <button onClick={onLogout}>
            <Power size={24} />
          </button>
        </div>
      </header>

      <div className="bg-white p-4">
        <h2 className="text-3xl font-bold text-blue-500">₹ {account.balance}</h2>
        <p className="text-gray-600 text-sm">(Account Balance + Overdraft - Hold)</p>
      </div>

      <div className="flex-grow overflow-auto">
        <div className="bg-white p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-600">Account Holders</div>
            <div className="text-black">{account.accountHolder}</div>
            <div className="text-gray-600">Branch</div>
            <div className="text-black">{account.branch}</div>
            <div className="text-gray-600">IFSC</div>
            <div className="text-black">{account.ifsc}</div>
            <div className="text-gray-600">MMID</div>
            <div className="text-blue-600 flex items-center">
              Generate <Info size={16} className="ml-1 text-blue-600" />
            </div>
            <div className="text-gray-600">Virtual Payment Address</div>
            <div className="text-blue-600">Register</div>
            <div className="text-gray-600">Account Balance</div>
            <div className="text-black">₹ {account.balance}</div>
            <div className="text-gray-600">Uncleared Funds</div>
            <div className="text-black">₹ 0.00</div>
            <div className="text-gray-600">Amount on Hold</div>
            <div className="text-black">₹ 0.00</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 border-t">
        <button 
          className="w-full text-blue-600 font-semibold flex justify-center items-center"
          onClick={onBack}
        >
          Hide Account Details <ChevronDown className="ml-2 transform rotate-180" />
        </button>
      </div>
    </div>
  )
}
