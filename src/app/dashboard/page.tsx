'use client'

import { useRouter } from 'next/navigation'
import DashboardScreen from '@/components/dashboard-screen'

export default function DashboardPage() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return <DashboardScreen onNavigate={handleNavigate} />
}
