'use client'

import { useState } from 'react'
import { ChevronLeft, HelpCircle, Power, ChevronRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface OverviewScreenProps {
  onBack: () => void
  onLogout: () => void
  onViewSavingsAccount: () => void
  onViewSavingSchemeAccount: () => void
}

export default function OverviewScreen({ onBack, onLogout, onViewSavingsAccount, onViewSavingSchemeAccount }: OverviewScreenProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const router = useRouter()

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleLogout = () => {
    onLogout()
    router.push('/')
  }

  const accountTypes = [
    { name: 'Savings Account', balance: '49,50,824.19', onClick: onViewSavingsAccount },
    { name: 'Saving Scheme Account', balance: '17,04,502.00', onClick: onViewSavingSchemeAccount },
    { name: 'Recurring Deposits', balance: null },
    { name: 'My Passion Fund', balance: null },
    { name: 'Mutual Funds', balance: null },
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <button onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Overview</h1>
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
        <div className="bg-blue-100 p-4">
          <h2 className="text-lg font-bold text-black">HAVE</h2>
        </div>

        {accountTypes.map((account) => (
          <div key={account.name} className="bg-white p-4 border-b">
            <button 
              className="w-full flex justify-between items-center"
              onClick={account.onClick || (() => toggleSection(account.name))}
            >
              <div>
                <h3 className="font-semibold text-gray-700">{account.name}</h3>
                {account.balance && (
                  <p className="text-2xl font-bold text-blue-800">₹ {account.balance}</p>
                )}
              </div>
              {account.balance ? (
                <ChevronRight className="text-blue-500" />
              ) : (
                <ChevronDown className={`text-blue-500 transform ${expandedSection === account.name ? 'rotate-180' : ''}`} />
              )}
            </button>
            {!account.balance && expandedSection === account.name && (
              <p className="mt-2 text-blue-800 font-bold">No {account.name} Account</p>
            )}
          </div>
        ))}

        <div className="bg-blue-100 p-4 mt-4">
          <h2 className="text-lg font-bold text-black">OWE</h2>
        </div>
      </div>
    </div>
  )
}
