'use client'

import { useRouter } from 'next/navigation'
import DashboardScreen from '@/components/dashboard-screen'

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  const handleViewAll = () => {
    console.log('View all accounts')
  }

  const handleViewSavingsAccount = () => {
    console.log('View savings account')
  }

  const handleViewSavingSchemeAccount = () => {
    console.log('View saving scheme account')
  }

  const handleNavigate = (screen: string) => {
    console.log(`Navigating to ${screen}`)
  }

  return (
    <DashboardScreen
      onLogout={handleLogout}
      onViewAll={handleViewAll}
      onViewSavingsAccount={handleViewSavingsAccount}
      onViewSavingSchemeAccount={handleViewSavingSchemeAccount}
      onNavigate={handleNavigate}
    />
  )
}
