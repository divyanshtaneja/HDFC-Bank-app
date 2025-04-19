// savings-account-screen.tsx
'use client'

import React, { useState, useEffect } from 'react'
import {
  ChevronLeft, HelpCircle, Power,
  ChevronDown, Share2,
  ArrowUpLeft, ArrowDownRight, Search
} from 'lucide-react'
import Link from 'next/link'
import AccountDetailsScreen from './account-details-screen'
import { formatIndianCurrency, formatDate } from '../utils/formatters'
import { transactionsData } from '../mock/transactions'

interface SavingsAccountScreenProps {
  onBack: () => void
  selectedAccount: string
  onAccountChange: (accountNumber: string) => void
  onLogout: () => void
}

interface Account {
  number: string
  balance: string
  accountHolder: string
  branch: string
  ifsc: string
}

const accounts: Account[] = [
  {
    number: '03271000009991',
    balance: '16,79,604.62',
    accountHolder: 'SANJAY TANEJA',
    branch: 'MULTAN NAGAR',
    ifsc: 'HDFC0004362',
  },
  {
    number: '03271000041278',
    balance: '11,99,660.57',
    accountHolder: 'JAYA TANEJA',
    branch: 'MULTAN NAGAR, DELHI',
    ifsc: 'HDFC0004362',
  }
]

export default function SavingsAccountScreen({
  onBack,
  selectedAccount,
  onAccountChange,
  onLogout
}: SavingsAccountScreenProps) {
  const [isStatementExpanded, setIsStatementExpanded] = useState(false)
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const [visibleTransactions, setVisibleTransactions] = useState(10)
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null)
  const [showAccountDetails, setShowAccountDetails] = useState(false)

  useEffect(() => {
    const account = accounts.find(acc => acc.number === selectedAccount)
    setCurrentAccount(account || null)
    setVisibleTransactions(10)
  }, [selectedAccount])

  const handleAccountSelect = (account: Account) => {
    onAccountChange(account.number)
    setShowAccountDropdown(false)
  }

  const handleSeeMore = () => {
    setVisibleTransactions(prev => prev === 10 ? 20 : 10)
  }

  const handleShowDetails = () => {
    setShowAccountDetails(true)
  }

  const handleBackFromDetails = () => {
    setShowAccountDetails(false)
  }

  const handleLogout = () => {
    onLogout()
  }

  if (!currentAccount) return <div>Loading...</div>

  if (showAccountDetails) {
    return (
      <AccountDetailsScreen
        onBack={handleBackFromDetails}
        onLogout={handleLogout}
        accountNumber={selectedAccount}
      />
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <button onClick={onBack}><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-bold">Savings Account</h1>
        <div className="flex space-x-4">
          <Link href="https://www.hdfcbank.com"><HelpCircle size={24} /></Link>
          <button onClick={handleLogout}><Power size={24} /></button>
        </div>
      </header>

      <div className="flex-grow overflow-auto">
        <div className="bg-white p-4 border-b relative">
          <button
            className="w-full text-left flex justify-between items-center"
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
          >
            <div>
              <h2 className="font-semibold text-black">Savings Account</h2>
              <p className="text-black">{currentAccount.number}</p>
            </div>
            <ChevronDown size={20} className="text-blue-500" />
          </button>
          {showAccountDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-md z-10">
              {accounts.map(account => (
                <button
                  key={account.number}
                  className="w-full text-left p-2 hover:bg-gray-100 text-black"
                  onClick={() => handleAccountSelect(account)}
                >
                  {account.number}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-4 border-b">
          <p className="text-gray-600">Available Balance</p>
          <p className="text-4xl font-bold text-blue-500">
            {formatIndianCurrency(currentAccount.balance)}
          </p>
          <p className="text-sm text-gray-500">
            (Account Balance + Overdraft - Hold)
          </p>
        </div>

        <div className="bg-white p-4 border-b">
          <button
            className="text-blue-500 flex items-center w-full justify-between"
            onClick={handleShowDetails}
          >
            <span>Show Account Details</span>
            <ChevronDown size={20} className="ml-2" />
          </button>
        </div>

        <div className="bg-white p-4 border-b">
          <button className="text-blue-500 flex items-center">
            <Share2 size={20} className="mr-2" />
            <span>Share Account Details</span>
          </button>
        </div>

        <div className="bg-white p-4 border-b">
          <button
            className="text-blue-600 text-lg font-semibold flex items-center w-full justify-between border-b border-black pb-2"
            onClick={() => setIsStatementExpanded(!isStatementExpanded)}
          >
            <span>Statement</span>
            <ChevronDown size={20} className={`transform ${isStatementExpanded ? 'rotate-180' : ''} ml-2`} />
          </button>

          {isStatementExpanded && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-black">
                  Recent Transactions
                </h3>
                <Search size={20} className="text-blue-500" />
              </div>

              {transactionsData[currentAccount.number]?.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No transactions found.</p>
              ) : (
                transactionsData[currentAccount.number]
                  .slice(0, visibleTransactions)
                  .map((transaction, index) => (
                    <div key={index} className="py-3 border-b">
                      <div className="flex justify-between">
                        <div className="flex-1 pr-2 min-w-0">
                          <p className="font-semibold text-sm text-gray-800">
                            {formatDate(new Date(transaction.date))}
                          </p>
                          <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
                            {transaction.narration}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Ref Num: {transaction.refNo}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center">
                            <p className="text-blue-600 font-bold text-base">
                              {formatIndianCurrency(
                                transaction.withdrawalAmt !== null ? transaction.withdrawalAmt : transaction.depositAmt!
                              )}
                            </p>
                            {transaction.withdrawalAmt !== null ? (
                              <ArrowUpLeft size={16} className="text-red-500 ml-1" />
                            ) : (
                              <ArrowDownRight size={16} className="text-green-500 ml-1" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            Balance: {formatIndianCurrency(transaction.closingBalance)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
              )}

              {transactionsData[currentAccount.number]?.length > 10 && (
                <button
                  className="w-full text-blue-500 mt-4 py-2 border border-blue-500 rounded"
                  onClick={handleSeeMore}
                >
                  {visibleTransactions === 10 ? 'See More' : 'See Less'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}