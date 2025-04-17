'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, HelpCircle, Power, ChevronDown, ChevronRight, Share2, ArrowUpLeft, ArrowDownRight, Search } from 'lucide-react'
import Link from 'next/link'
import AccountDetailsScreen from './account-details-screen'
import { formatIndianCurrency, formatDate } from '../utils/formatters'

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
  },
]

interface Transaction {
  date: string
  narration: string
  refNo: string
  withdrawalAmt: number | null
  depositAmt: number | null
  closingBalance: number
}

const transactionsData: { [key: string]: Transaction[] } = {
  '03271000009991': [
    { date: '2025-04-16', narration: 'IMPS-508115137565-PPF-55000000191609-HDFC-SANJAY TANEJA', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 150000.00, closingBalance: 1679604.62 },
    { date: '2025-04-11', narration: 'IMPS-510102577485-DIVYANSH TANEJA-ICIC-xxxxxxxx6445-IMPS Transaction', refNo: '510102327385', withdrawalAmt: null, depositAmt: 75000.00, closingBalance: 1529604.62 },
    { date: '2025-04-19', narration: 'IMPS-510012128567-Arun Mann-SBIN-xxxxxxx2216-P', refNo: '510012128567', withdrawalAmt: 500000.00, depositAmt: null, closingBalance: 1454604.62 },
    { date: '2025-04-07', narration: 'IMPS-509713502979-Mrs SPRIHA NUPUR-SBIN-xxxxxxxxxxxxx8641-ReqPay', refNo: '509713502979', withdrawalAmt: null, depositAmt: 499500.00, closingBalance: 1954604.62 },
    { date: '2025-04-07', narration: 'EMI 454727061 Chq S4547270610311 0425454727061', refNo: '000000000000000', withdrawalAmt: 35294.00, depositAmt: null, closingBalance: 1455104.62 },
    { date: '2025-04-07', narration: 'IMPS-509713502979-Mrs SPRIHA NUPUR-SBIN-xxxxxxxxxxxxx8641-ReqPay', refNo: '509713502979', withdrawalAmt: null, depositAmt: 500.00, closingBalance: 1490398.62 },
    { date: '2025-04-07', narration: 'EMI 461561532 Chq S4615615320151 0425461561532', refNo: '0000423625612847', withdrawalAmt: 40332.00, depositAmt: null, closingBalance: 1489898.62 },
    { date: '2025-04-05', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000127392971', withdrawalAmt: null, depositAmt: 250000.00, closingBalance: 1530230.62 },
    { date: '2025-04-05', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000320870212', withdrawalAmt: null, depositAmt: 300000.00, closingBalance: 1280230.62 },
    { date: '2025-04-04', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000389929580', withdrawalAmt: 1000000.00, depositAmt: null, closingBalance: 980230.62 },
    { date: '2025-04-04', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000389929580', withdrawalAmt: 1000000.00, depositAmt: null, closingBalance: 1080230.62 },
    { date: '2025-04-04', narration: '50200034218363-TPT-p-JV INDUSTRIES', refNo: '000389929580', withdrawalAmt: 1000000.00, depositAmt: null, closingBalance: 1180230.62 },
    { date: '2025-04-01', narration: 'Interest paid till 31-MAR-2025', refNo: 'AXOBR21479128454', withdrawalAmt: null, depositAmt: 5044.00, closingBalance: 1280230.62 },
    { date: '2025-03-30', narration: 'UPI-Simran -simrankalra242@oksbi-SBIN0021275-102326865831-UPI', refNo: '102326865831', withdrawalAmt: 500.00, depositAmt: null, closingBalance: 1275186.62 },
    { date: '2025-03-28', narration: 'IMPS-508716157771-PPF-55000000191609-Saving Scheme', refNo: '000000000000000', withdrawalAmt: 150000.00, depositAmt: null, closingBalance: 1275686.62 },
    { date: '2025-03-26', narration: 'NEFT Cr-KKBK0000958-ASS CREATIONS PVT LTD-SANJAY TANEJA-KKBKN62025032605008480', refNo: 'KKBKN62025032605008480', withdrawalAmt: null, depositAmt: 68209.00, closingBalance: 1425686.62 },
    { date: '2025-03-22', narration: 'IMPS-508115137565-PPF-55000000191609-HDFC-SANJAY TANEJA', refNo: '000000000000000', withdrawalAmt: 150000.00, depositAmt: null, closingBalance: 1357477.62 },
    { date: '2025-03-21', narration: 'IB FUNDS TRANSFER DR-03271000041278-JAYA TANEJA', refNo: '000000000000000', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 1507477.62 },

  ],
  '03271000041278': [
    { date: '2025-04-16', narration: 'RTGS Cr-IOBA0002259-I J MANOCHA,RAVINDER MANOCHA-JAYA TANEJA-IOBAR52025041600313124', refNo: '0000426018195789', withdrawalAmt: null, depositAmt: 460000.00, closingBalance: 1199064.57 },
    { date: '2025-04-06', narration: '50200034218363-TPT-P-JV INDUSTRIES', refNo: '000189699159', withdrawalAmt: null, depositAmt: 50000.00, closingBalance: 7399064.57 },
    { date: '2025-04-04', narration: '50200034218363-TPT-P-JV INDUSTRIES', refNo: '000189699159', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 689064.57 },
    { date: '2025-04-04', narration: '50200034218363-TPT-P-JV INDUSTRIES', refNo: '000189699159', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 789064.57 },
    { date: '2025-04-04', narration: '50200034218363-TPT-P-JV INDUSTRIES', refNo: '000189699159', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 889064.57 },
    { date: '2025-04-02', narration: 'LOCKER RENT- BRN 4362-SMALL-B11-307 50500006535549', refNo: '0000000000000', withdrawalAmt: 5000.00, depositAmt: null, closingBalance: 989064.57 },
    { date: '2025-04-02', narration: 'SGST-Small Lockers SC-NCB2609278716166', refNo: 'NCB2609278716166', withdrawalAmt: 450.00, depositAmt: null, closingBalance: 994064.57 },
    { date: '2025-04-02', narration: 'CGST-Small Lockers SC-NCB2609278716166', refNo: 'NCB2609278716166', withdrawalAmt: 450.00, depositAmt: null, closingBalance: 994514.57 },
    { date: '2025-04-02', narration: 'RTGS Cr-IOBA0002259-I J MANOCHA,RAVINDER MANOCHA-JAYA TANEJA-IOBAR52025040200354065', refNo: 'IOBAR52025040200354065', withdrawalAmt: null, depositAmt: 500000, closingBalance: 994964.57 },
    { date: '2025-04-01', narration: 'Interest paid till 31-MAR-2025', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 1558, closingBalance: 494964.57 },
    { date: '2025-03-22', narration: 'IMPS-508115137408-PPF-55000000191651-HDFC-JAYA TANEJA', refNo: '0000000000000', withdrawalAmt: 150000.00, depositAmt: null, closingBalance: 493406.81 },
    { date: '2025-03-21', narration: 'IB FUNDS TRANSFER CR-03271000009991-SANJAY TANEJA', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 100000.00, closingBalance: 643406.81 },
    { date: '2025-03-19', narration: '50100436924130-TPT-P-DIVYANSH TANEJA', refNo: '0000000594634754', withdrawalAmt: null, depositAmt: 50000.00, closingBalance: 543406.81 },
    { date: '2025-03-19', narration: '50100436924130-TPT-JAYA TANEJA-DIVYANSH TANEJA', refNo: '000356340803', withdrawalAmt: 150000.00, depositAmt: null, closingBalance: 493406.81 },
    { date: '2025-03-18', narration: 'RTGS Cr-IOBA0002259-I J MANOCHA,RAVINDER MANOCHA-JAYA TANEJA-IOBAR52025031800202279', refNo: 'IOBAR52025031800202279', withdrawalAmt: null, depositAmt: 500000.00, closingBalance: 643406.81 },
    { date: '2025-01-25', narration: 'IB BILLPAY DR-HDFCZF-552365XXXXXX6971', refNo: 'IB25155851958076', withdrawalAmt: null, depositAmt: 30732.00, closingBalance: 143406.81 },
    { date: '2025-01-06', narration: 'IB FUNDS TRANSFER DR-03271000009991 -SANJAY TANEJA', refNo: 'IB06000044554552', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 174138.81 },
    { date: '2025-01-03', narration: 'IB BILLPAY DR-HDFCZF-552365XXXXXX6971', refNo: 'IB03123041452420', withdrawalAmt: 228213.00, depositAmt: null, closingBalance: 274138.81 },
    { date: '2025-01-03', narration: 'FT - Cr - 03921000016208 - NARENDER KUMAR', refNo: '03921000016208', withdrawalAmt: null, depositAmt: 450000.00, closingBalance: 502351.57 },
    { date: '2025-01-02', narration: '03921000016208-TPT-Ok-NARENDER KUMAR', refNo: '03921000016208', withdrawalAmt: null, depositAmt: 50000.00, closingBalance: 52351.57 },
  ],
}

export default function SavingsAccountScreen({ onBack, selectedAccount, onAccountChange, onLogout }: SavingsAccountScreenProps) {
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

  const handleAccountSelect = (account: Account)  => {
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

  if (!currentAccount) {
    return <div>Loading...</div>
  }

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
        <button onClick={onBack} aria-label="Go back">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Savings Account</h1>
        <div className="flex space-x-4">
          <Link href="https://www.hdfcbank.com" aria-label="Help">
            <HelpCircle size={24} />
          </Link>
          <button onClick={handleLogout} aria-label="Logout">
            <Power size={24} />
          </button>
        </div>
      </header>

      <div className="flex-grow overflow-auto">
        <div className="bg-white p-4 border-b relative">
          <button 
            className="w-full text-left flex justify-between items-center"
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            aria-haspopup="listbox"
            aria-expanded={showAccountDropdown}
          >
            <div>
              <h2 className="font-semibold text-black">Savings Account</h2>
              <p className="text-black">{currentAccount.number}</p>
            </div>
            <ChevronDown size={20} className="text-blue-500" />
          </button>
          {showAccountDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-md z-10" role="listbox">
              {accounts.map((account) => (
                <button
                  key={account.number}
                  className="w-full text-left p-2 hover:bg-gray-100 text-black"
                  onClick={() => handleAccountSelect(account)}
                  role="option"
                  aria-selected={account.number === currentAccount.number}
                >
                  {account.number}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-4 border-b">
          <p className="text-gray-600">Available Balance</p>
          <p className="text-4xl font-bold text-blue-500">{formatIndianCurrency(currentAccount.balance)}</p>
          <p className="text-sm text-gray-500">(Account Balance + Overdraft - Hold)</p>
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
            className="text-blue-500 flex items-center"
            onClick={() => setIsStatementExpanded(!isStatementExpanded)}
          >
            <span className="text-lg font-semibold border-b border-black pb-2">Statement</span>
            <ChevronDown size={20} className={`transform ${isStatementExpanded ? 'rotate-180' : ''} ml-2`} />
          </button>
          {isStatementExpanded && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black border-b border-blue-400 w-full pb-2">Recent Transactions</h3>
                <Search size={20} className="text-blue-500" />
              </div>
              {transactionsData[currentAccount.number].slice(0, visibleTransactions).map((transaction, index) => (
                <div key={index} className="border-b py-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-600">{formatDate(new Date(transaction.date))}</p>
                      <p className="text-sm text-gray-600">{transaction.narration}</p>
                      <p className="text-xs text-gray-500">Ref Num: {transaction.refNo}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        <span className="font-semibold text-blue-500">
                          {formatIndianCurrency(transaction.withdrawalAmt !== null 
                              ? transaction.withdrawalAmt
                              : transaction.depositAmt!)}
                        </span>
                        {transaction.withdrawalAmt !== null ? (
                          <ArrowUpLeft size={16} className="text-red-500 ml-1" />
                        ) : (
                          <ArrowDownRight size={16} className="text-green-500 ml-1" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Balance: {formatIndianCurrency(transaction.closingBalance)}</p>
                    </div>
                  </div>
                </div>
              ))}
              {transactionsData[currentAccount.number].length > 10 && (
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

        <div className="bg-white p-4 border-b">
          <h3 className="text-lg font-semibold mb-2 text-black">Protect Against Insufficient Funds</h3>
          <p className="text-gray-600 mb-2">
            Connect your other Current/ Savings accounts/Deposits to this account so that you will always be protected against insufficient funds or bounced cheques.
          </p>
          <button className="text-blue-500 flex items-center justify-between w-full">
            <span>Set up now</span>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold mb-2 text-black">Actions</h3>
          <div className="space-y-4">
            {['Open Fixed Deposit', 'Open Recurring Deposit', 'Open Tax Saver Deposit', 'Manage Alerts', 'Request Cheque Book'].map((action, index) => (
              <button key={index} className="text-blue-500 flex items-center justify-between w-full">
                <span>{action}</span>
                <ChevronRight size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
