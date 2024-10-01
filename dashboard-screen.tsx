'use client'

import React, { useState } from 'react'
import { Menu, HelpCircle, Power, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SideMenu from './side-menu'
import SavingsAccountScreen from './savings-account-screen'
import OverviewScreen from './overview-screen'
import SavingSchemeAccountScreen from './saving-scheme-account-screen'
import { formatIndianCurrency } from '../utils/formatters'

interface DashboardScreenProps {
  onNavigate: (screen: string) => void
}

const BillPaymentsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="3" y1="8" x2="21" y2="8" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
)

const MoneyTransferIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v20M17 7l-5-5-5 5M17 17l-5 5-5-5" />
    <path d="M3 12h18" />
  </svg>
)

const AddPayeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21v-2a7 7 0 00-14 0v2" />
    <line x1="12" y1="14" x2="12" y2="21" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </svg>
)

const ScanPayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01" />
    <rect x="8" y="8" width="8" height="8" />
  </svg>
)

const RechargeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="6" x2="12" y2="18" />
    <path d="M9 9h6M9 15h6" />
  </svg>
)

const UPIPaymentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5z" />
    <path d="M12 6v12M8 10l8 4M16 10l-8 4" />
  </svg>
)

const accounts = [
  { number: '03271000009991', balance: '3,00,010.62' },
  { number: '03271000041278', balance: '13,34,660.57' },
]

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('OVERVIEW')
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [showSavingsAccount, setShowSavingsAccount] = useState(false)
  const [showSavingSchemeAccount, setShowSavingSchemeAccount] = useState(false)
  const [showOverview, setShowOverview] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].number)

  const quickActions = [
    { name: 'Bill Payments', icon: BillPaymentsIcon },
    { name: 'Money Transfer', icon: MoneyTransferIcon },
    { name: 'Add Payee', icon: AddPayeeIcon },
    { name: 'Scan & Pay', icon: ScanPayIcon },
    { name: 'Recharge', icon: RechargeIcon },
    { name: 'UPI Payment', icon: UPIPaymentIcon },
  ]

  const handleLogout = () => {
    router.push('/')
  }

  const handleViewSavingsAccount = () => {
    setShowSavingsAccount(true)
  }

  const handleViewSavingSchemeAccount = () => {
    setShowSavingSchemeAccount(true)
  }

  const handleBackFromSavingsAccount = () => {
    setShowSavingsAccount(false)
  }

  const handleBackFromSavingSchemeAccount = () => {
    setShowSavingSchemeAccount(false)
  }

  const handleViewAll = () => {
    setShowOverview(true)
  }

  const handleBackFromOverview = () => {
    setShowOverview(false)
  }

  const totalBalance = accounts.reduce((sum, account) => sum + parseFloat(account.balance.replace(/,/g, '')), 0)

  if (showSavingsAccount) {
    return (
      <SavingsAccountScreen
        onBack={handleBackFromSavingsAccount}
        onLogout={handleLogout}
        selectedAccount={selectedAccount}
        onAccountChange={setSelectedAccount}
      />
    )
  }

  if (showSavingSchemeAccount) {
    return (
      <SavingSchemeAccountScreen
        onBack={handleBackFromSavingSchemeAccount}
        onLogout={handleLogout}
      />
    )
  }

  if (showOverview) {
    return (
      <OverviewScreen
        onBack={handleBackFromOverview}
        onLogout={handleLogout}
        onViewSavingsAccount={handleViewSavingsAccount}
        onViewSavingSchemeAccount={handleViewSavingSchemeAccount}
      />
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={() => setIsSideMenuOpen(true)} className="flex items-center">
            <Menu size={24} />
            <span className="ml-2 text-white">Menu</span>
          </button>
        </div>
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

      <div className="flex-grow overflow-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-bold mb-4 text-black">ACCOUNTS</h2>
          <div className="mb-4">
            <button 
              className="w-full text-left" 
              onClick={handleViewSavingsAccount}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-blue-600 font-semibold">Savings Account</h3>
                <ChevronRight className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{formatIndianCurrency(totalBalance)}</p>
            </button>
          </div>
          <div className="mb-4">
            <button 
              className="w-full text-left" 
              onClick={handleViewSavingSchemeAccount}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-blue-600 font-semibold">Saving Scheme Account</h3>
                <ChevronRight className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{formatIndianCurrency('15,54,502.00')}</p>
            </button>
          </div>
          <button onClick={handleViewAll} className="text-blue-600 font-semibold">
            View All
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-3 mb-2 border-2 border-blue-600">
                  <div className="bg-blue-600 rounded-full p-2">
                    <div className="text-white">
                      <action.icon />
                    </div>
                  </div>
                </div>
                <span className="text-xs text-center text-black">{action.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4 text-black">Due Bills</h2>
          <p className="text-sm text-gray-600 mb-4">Register your billers and pay all your bills with 2 clicks</p>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md">
            ADD BILLER
          </button>
        </div>
      </div>

      {isSideMenuOpen && (
        <SideMenu
          onClose={() => setIsSideMenuOpen(false)}
          onLogout={handleLogout}
          onNavigate={(screen) => {
            setIsSideMenuOpen(false)
            onNavigate(screen)
          }}
        />
      )}
    </div>
  )
}
