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
    balance: '5,13,885.62',
    accountHolder: 'SANJAY TANEJA',
    branch: 'MULTAN NAGAR',
    ifsc: 'HDFC0004362',
  },
  {
    number: '03271000041278',
    balance: '12,98,041.57',
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
    { date: '2024-11-29', narration: 'NEFT Cr-ICIC0SF0002-SURABHRUHELA-Sanjay Tan-HS92433465704684', refNo: 'HS92433465704684', withdrawalAmt: null, depositAmt: 100000.00, closingBalance: 513885.62 },
    { date: '2024-11-23', narration: 'UPI-Jio Prepaid Recharge-paytm-jiomobility@ptybl-YESB0PTMUPI-432800142322-UPI', refNo: '432800142322', withdrawalAmt: 1499.00, depositAmt: null, closingBalance: 413885.62 },
    { date: '2024-11-22', narration: 'NEFT Cr-ICIC0SF0002-SURABHRUHELA-Sanjay Tan-HS92432765126238', refNo: 'HS92432765126238', withdrawalAmt: null, depositAmt: 100000.00, closingBalance: 415384.62 },
    { date: '2024-11-22', narration: '50200000003402 19805123 HLIC INST', refNo: '00012837', withdrawalAmt: 97848.00, depositAmt: null, closingBalance: 315384.62 },  
    { date: '2024-11-21', narration: 'NEFT Cr-ICIC0SF0002-SURABHRUHELA-Sanjay Tan-HS92432665031873', refNo: 'HS92432665031873', withdrawalAmt: null, depositAmt: 95000.00, closingBalance: 413232.62 },  
    { date: '2024-11-20', narration: 'NEFT Cr-ICIC0SF0002-SURABHRUHELA-Sanjay Tan-HS92432564948642', refNo: 'HS92432564948642', withdrawalAmt: null, depositAmt: 95000.00, closingBalance: 318232.62 },    
    { date: '2024-11-17', narration: 'NEFT Cr-ICIC0SF0002-SURABHRUHELA-Sanjay Tan-HS92432264753726', refNo: 'HS92432264753726', withdrawalAmt: null, depositAmt: 100.00, closingBalance: 223232.62 },    
    { date: '2024-11-07', narration: 'EMI 454727061 CHQ S4547270610241 0924454727061', refNo: '000000000000000', withdrawalAmt: 35294.00, depositAmt: null, closingBalance: 223332.62 },
    { date: '2024-11-07', narration: 'EMI 461561532 CHQ S4615615320081 0924461561532', refNo: '000000000000000', withdrawalAmt: 40332.00, depositAmt: null, closingBalance: 258616.62 },
    { date: '2024-10-30', narration: 'NEFT CR-UTIB0001911-ASS CREATIONS PRIVATE LIMITED922020024883518-SANJAY TANEJA-AXOBR24055297974', refNo: 'AXOBR24055297974', withdrawalAmt: null, depositAmt: 74969.00, closingBalance: 298948.62 },
    { date: '2024-10-27', narration: 'UPI-NAJRE AALAM-8368807378@ybl-KKBK0000206-430153586763-UPI', refNo: '430153586763', withdrawalAmt: 40.00, depositAmt: null, closingBalance: 223979.62 }, 
    { date: '2024-10-18', narration: 'UPI-MEDICINE HUB-paytmqr18u7wqe7rj@paytm-YESB0PTMUPI-429242326348-UPI', refNo: '429242326348', withdrawalAmt: 29.00, depositAmt: null, closingBalance: 224019.62 },
    { date: '2024-10-11', narration: 'UPI-NARENDER SAINI-q453344188@ybl-YESB0YBLUPI-428518094561-UPI', refNo: '428518094561', withdrawalAmt: 170.00, depositAmt: null, closingBalance: 224214.62 },
    { date: '2024-10-07', narration: 'EMI 454727061 Chq S4547270610251 1024454727061', refNo: '000000000000000', withdrawalAmt: 35294.00, depositAmt: null, closingBalance: 224384.62 },
    { date: '2024-10-07', narration: 'EMI 461561532 Chq S4615615320091 1024461561532', refNo: '000000000000000', withdrawalAmt: 40332.00, depositAmt: null, closingBalance: 259678.62 },
    { date: '2024-10-01', narration: 'Interest paid till 30-SEP-2024', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 1628.00, closingBalance: 300010.62 },
    { date: '2024-09-30', narration: 'NEFT Cr-UTIB0001911-ASS CREATIONS PRIVATE LIMITED922020024883518-Sanjay Taneja-AXOBR27490376313', refNo: 'AXOBR27490376313', withdrawalAmt: null, depositAmt: 74969.00, closingBalance: 298382.62 },
    { date: '2024-09-25', narration: 'UPI-ALAUDDIN-paytmqr11ea18g7ev@paytm-YESB0PTMUPI-426971243960-UPI', refNo: '426971243960', withdrawalAmt: 1145.00, depositAmt: null, closingBalance: 223413.62 },   
    { date: '2024-09-23', narration: 'UPI-MOHAMMAD VASIR-vasirkhan12345@okaxis-UTIB0000478-426769591420-UPI', refNo: '426769591420', withdrawalAmt: null, depositAmt: 11000.00, closingBalance: 224558.62 },
    { date: '2024-09-10', narration: 'UPI-DEEPAK CHOPRA-Q19860644@YBL-YESB0YBLUPI-425441521254-UPI', refNo: '0000425441521254', withdrawalAmt: 300.00, depositAmt: null, closingBalance: 213558.62 },
    { date: '2024-09-10', narration: 'UPI-JOGINDER PAL-Q487763362@YBL-YESB0YBLUPI-425420415914-UPI', refNo: '0000425420415914', withdrawalAmt: 120.00, depositAmt: null, closingBalance: 213858.62 },
    { date: '2024-09-09', narration: 'UPI-DIVYANSH TANEJA-9560755784@PTYES-ICIC0000288-425374287983-UPI', refNo: '0000425374287983', withdrawalAmt: 14940.00, depositAmt: null, closingBalance: 213978.62 },
    { date: '2024-09-09', narration: 'UPI-GOOGLE INDIA SERVICE-GPAYRECHARGE@ICICI-ICIC0DC0099-425369167471-UPI', refNo: '0000425369167471', withdrawalAmt: 890.90, depositAmt: null, closingBalance: 228918.62 },
    { date: '2024-09-07', narration: 'EMI 454727061 CHQ S4547270610241 0924454727061', refNo: '000000000000000', withdrawalAmt: 35294.00, depositAmt: null, closingBalance: 229809.52 },
    { date: '2024-09-07', narration: 'EMI 461561532 CHQ S4615615320081 0924461561532', refNo: '000000000000000', withdrawalAmt: 40332.00, depositAmt: null, closingBalance: 265103.52 },
    { date: '2024-08-27', narration: 'NEFT CR-UTIB0001911-ASS CREATIONS PRIVATE LIMITED922020024883518-SANJAY TANEJA-AXOBR24055297974', refNo: 'AXOBR24055297974', withdrawalAmt: null, depositAmt: 74969.00, closingBalance: 305435.52 },
    
  ],
  
  '03271000041278': [
    { date: '2024-10-23', narration: 'Chq Paid-MICR CTS-RK-LIC OF INDIA', refNo: '000000000102', withdrawalAmt: 36629.00, depositAmt: null, closingBalance: 1298031.57 },
    { date: '2024-09-15', narration: 'IB BILLPAY DR-HDFC4Q-361147XXXX6532', refNo: 'IB15135249450237', withdrawalAmt: 35143.00, depositAmt: null, closingBalance: 1336460.57 },
    { date: '2024-10-01', narration: 'INTEREST PAID TILL 30-SEP-2024', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 10280.00, closingBalance: 1344940.57 },
    { date: '2024-09-16', narration: 'IMPS-426018195789-BHATNAGAR INTERNATIONAL SCHOOL-UBIN-XXXXXXXXXXX8774-VRINDA', refNo: '0000426018195789', withdrawalAmt: 1800.00, depositAmt: null, closingBalance: 1334660.57 },
    { date: '2024-09-15', narration: 'IB BILLPAY DR-HDFC4Q-361147XXXX6532', refNo: 'IB15135249450237', withdrawalAmt: 35143.00, depositAmt: null, closingBalance: 1336460.57 },
    { date: '2024-09-11', narration: '50100436924130-TPT-P-DIVYANSH TANEJA', refNo: '0000000486444029', withdrawalAmt: 100000.00, depositAmt: null, closingBalance: 1371603.57 },
    { date: '2024-09-07', narration: 'IB BILLPAY DR-HDFCZF-552365XXXXXX6971', refNo: 'IB07145529883131', withdrawalAmt: 223086.00, depositAmt: null, closingBalance: 1471603.57 },
    { date: '2024-09-05', narration: '11000239028800/ATOMBHATNAGARINTERNA', refNo: '0000242491245733', withdrawalAmt: 43746.24, depositAmt: null, closingBalance: 1694689.57 },
    { date: '2024-08-25', narration: 'CC 000552365XXXXXX6971 AUTOPAY SI-TAD', refNo: '0000000607137371', withdrawalAmt: 15540.00, depositAmt: null, closingBalance: 1738435.81 },
    { date: '2024-08-23', narration: 'YHDF2420986633/TATAPOWERDELHIDISTRI', refNo: '0000242365685805', withdrawalAmt: 3500.00, depositAmt: null, closingBalance: 1753975.81 },
    { date: '2024-08-08', narration: 'NEFT CR-SBIN0000TBU-ITDTAX REFUND 2024-25 ACOPT3259N-JAYA TANEJA-SBIN224221950576', refNo: 'SBIN224221950576', withdrawalAmt: null, depositAmt: 39890.00, closingBalance: 1757475.81 },
    { date: '2024-07-25', narration: 'CC 000552365XXXXXX6971 AUTOPAY SI-TAD', refNo: '0000000600873878', withdrawalAmt: 15307.00, depositAmt: null, closingBalance: 1717585.81 },
    { date: '2024-07-18', narration: '50100436924130-TPT-PAY-DIVYANSH TANEJA', refNo: '0000000212966961', withdrawalAmt: 510000.00, depositAmt: null, closingBalance: 1732892.81 },
    { date: '2024-07-16', narration: 'RTGS CR-UBIN0811319-RAJNI-JAYA TANEJA-UBINR22024071601545122', refNo: 'UBINR22024071601', withdrawalAmt: null, depositAmt: 1500000.00, closingBalance: 2242892.81 },
    { date: '2024-07-01', narration: 'INTEREST PAID TILL 30-JUN-2024', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 14497.00, closingBalance: 742892.81 },
    { date: '2024-06-25', narration: 'CC 000552365XXXXXX6971 AUTOPAY SI-TAD', refNo: '0000000594634754', withdrawalAmt: 16882.00, depositAmt: null, closingBalance: 728395.81 },
    { date: '2024-06-14', narration: 'NEFT DR-UTIB0001911-RAJNI-NETBANK, MUM-N166243095909089-CREDIT', refNo: 'N166243095909089', withdrawalAmt: 1500000.00, depositAmt: null, closingBalance: 745277.81 },
    { date: '2024-06-08', narration: 'INT. AUTO_REDEMPTION  50300522743030', refNo: '3304220240608767', withdrawalAmt: null, depositAmt: 53.00, closingBalance: 2245277.81 },
    { date: '2024-06-01', narration: 'INTEREST PAID TILL 31-MAY-2024', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 13982.00, closingBalance: 2245224.81 },
    { date: '2024-05-25', narration: 'CC 000552365XXXXXX6971 AUTOPAY SI-TAD', refNo: '0000000588420131', withdrawalAmt: 17654.00, depositAmt: null, closingBalance: 2231242.81 },
    { date: '2024-05-18', narration: '50100436924130-TPT-PAY-DIVYANSH TANEJA', refNo: '0000000209482375', withdrawalAmt: 500000.00, depositAmt: null, closingBalance: 2248896.81 },
    { date: '2024-05-08', narration: 'NEFT CR-SBIN0000TBU-ITDTAX REFUND 2023-24 ACOPT3259N-JAYA TANEJA-SBIN214221950576', refNo: 'SBIN214221950576', withdrawalAmt: null, depositAmt: 45670.00, closingBalance: 2748896.81 },
    { date: '2024-05-01', narration: 'INTEREST PAID TILL 30-APR-2024', refNo: '000000000000000', withdrawalAmt: null, depositAmt: 15321.00, closingBalance: 2703226.81 },
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