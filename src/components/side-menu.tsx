'use client'

import { useState } from 'react'
import { ChevronRight, Home, CreditCard, PiggyBank, TrendingUp, Briefcase, User, LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface SideMenuProps {
  onClose: () => void
  onLogout: () => void
  onNavigate?: (screen: string) => void
}

export default function SideMenu({ onClose, onLogout, onNavigate }: SideMenuProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleNavigation = (screen: string) => {
    if (screen === 'Logout') {
      onLogout()
      router.push('/')
    } else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        onNavigate?.('dashboard')
      }, 2000)
    }
  }

  const menuItems = [
    { name: 'STANDARD', icon: null, description: null },
    { name: 'HOME', icon: Home, description: null },
    { name: 'PAY', icon: CreditCard, description: 'UPI Payment, Money Transfer, Cards, Recharge, Bill Payments' },
    { name: 'SAVE', icon: PiggyBank, description: 'Accounts, Deposits, Safe Deposit Lockers' },
    { name: 'INVEST', icon: TrendingUp, description: 'Demat, Mutual Fund' },
    { name: 'BORROW', icon: Briefcase, description: 'Personal Loan, Gold Loan, Car Loan, Two Wheeler Loan' },
    { name: 'Your Profile', icon: User, description: 'Personal Profile, Manage Alerts, Tax, Security Center, Feedback' },
    { name: 'Logout', icon: LogOut, description: null },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="bg-blue-700 h-full w-64 p-4 flex flex-col text-white">
        <div className="flex justify-between items-center mb-6">
          <Image
            src="/placeholder.svg?height=60&width=60"
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full"
          />
          <button onClick={onClose}>
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold">SANJAY TANEJA</h2>
        </div>
        <nav className="flex-grow">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <button 
                  onClick={() => handleNavigation(item.name)}
                  className="flex items-center w-full text-left"
                >
                  <div className="flex items-center w-full">
                    {item.icon && <item.icon size={20} className="mr-3 flex-shrink-0" />}
                    <div className="flex-grow">
                      <div className={`${item.name === 'STANDARD' ? 'text-xl font-bold' : ''}`}>{item.name}</div>
                      {item.description && <div className="text-xs mt-1">{item.description}</div>}
                    </div>
                    {item.name !== 'STANDARD' && item.name !== 'Logout' && (
                      <ChevronRight size={20} className="flex-shrink-0" />
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto text-sm">App Version 11.2.3</div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}
