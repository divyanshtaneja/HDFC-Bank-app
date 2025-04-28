'use client'

import React, { useState } from 'react'
import { Menu, HelpCircle, Power, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SideMenu from '@/components/side-menu'
import SavingsAccountScreen from '@/components/savings-account-screen'
import OverviewScreen from '@/components/overview-screen'
import SavingSchemeAccountScreen from '@/components/saving-scheme-account-screen'
import { formatIndianCurrency } from '@/utils/formatters'

const accounts = [
  { number: '03271000009991', balance: '29,14,570.62' },
  { number: '03271000041278', balance: '19,39,064.57' },
]

export default function DashboardScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('OVERVIEW')
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [showSavingsAccount, setShowSavingsAccount] = useState(false)
  const [showSavingSchemeAccount, setShowSavingSchemeAccount] = useState(false)
  const [showOverview, setShowOverview] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].number)

  const quickActions = [
    { name: 'Bill Payments', icon: '📄' },
    { name: 'Money Transfer', icon: '💸' },
    { name: 'Add Payee', icon: '➕' },
    { name: 'Scan & Pay', icon: '📷' },
    { name: 'Recharge', icon: '🔋' },
    { name: 'UPI Payment', icon: '🏦' },
  ]

  const handleLogout = () => {
    router.push('/')
  }

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + parseFloat(acc.balance.replace(/,/g, '')),
    0
  )

  if (showSavingsAccount) {
    return (
      <SavingsAccountScreen
        onBack={() => setShowSavingsAccount(false)}
        onLogout={handleLogout}
        selectedAccount={selectedAccount}
        onAccountChange={setSelectedAccount}
      />
    )
  }

  if (showSavingSchemeAccount) {
    return (
      <SavingSchemeAccountScreen
        onBack={() => setShowSavingSchemeAccount(false)}
        onLogout={handleLogout}
      />
    )
  }

  if (showOverview) {
    return (
      <OverviewScreen
        onBack={() => setShowOverview(false)}
        onLogout={handleLogout}
        onViewSavingsAccount={() => setShowSavingsAccount(true)}
        onViewSavingSchemeAccount={() => setShowSavingSchemeAccount(true)}
      />
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <button onClick={() => setIsSideMenuOpen(true)} className="flex items-center">
          <Menu size={24} />
          <span className="ml-2">Menu</span>
        </button>
        <div className="flex space-x-4">
          <Link href="https://www.hdfcbank.com">
            <HelpCircle size={24} />
          </Link>
          <button onClick={handleLogout}>
            <Power size={24} />
          </button>
        </div>
      </header>

      <div className="bg-blue-700 text-white p-4 flex space-x-8">
        <button
          className={`pb-2 ${activeTab === 'OVERVIEW' ? 'border-b-2' : ''}`}
          onClick={() => setActiveTab('OVERVIEW')}
        >
          OVERVIEW
        </button>
        <button
          className={`pb-2 ${activeTab === 'FAVOURITE' ? 'border-b-2' : ''}`}
          onClick={() => setActiveTab('FAVOURITE')}
        >
          FAVOURITE
        </button>
      </div>

      <main className="flex-grow overflow-auto p-4">
        <section className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-4 text-black">ACCOUNTS</h2>
          <div className="mb-4">
            <button className="w-full text-left" onClick={() => setShowSavingsAccount(true)}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-blue-600 font-semibold">Savings Account</h3>
                <ChevronRight className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{formatIndianCurrency(totalBalance)}</p>
            </button>
          </div>
          <div className="mb-4">
            <button className="w-full text-left" onClick={() => setShowSavingSchemeAccount(true)}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-blue-600 font-semibold">Saving Scheme Account</h3>
                <ChevronRight className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{formatIndianCurrency('17,04,502.00')}</p>
            </button>
          </div>
          <button onClick={() => setShowOverview(true)} className="text-blue-600 font-semibold">
            View All
          </button>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-3 mb-2 border-2 border-blue-600">
                  <div className="bg-blue-600 rounded-full p-2 text-white">
                    <span className="text-lg">{action.icon}</span>
                  </div>
                </div>
                <span className="text-xs text-center text-black">{action.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4 text-black">Due Bills</h2>
          <p className="text-sm text-gray-600 mb-4">Register your billers and pay all your bills with 2 clicks</p>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            ADD BILLER
          </button>
        </section>
      </main>

      {isSideMenuOpen && (
        <SideMenu
          onClose={() => setIsSideMenuOpen(false)}
          onLogout={handleLogout}
          onNavigate={() => {}}
        />
      )}
    </div>
  )
}
