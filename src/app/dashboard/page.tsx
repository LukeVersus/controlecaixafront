'use client'

import { useEffect, useState } from 'react'
import { MonthSelector } from '@/components/dashboard/MonthSelector'
import { AccountSelector } from '@/components/dashboard/AccountSelector'
import { MonthSummary } from '@/components/dashboard/MonthSummary'
import { GeneralBalance } from '@/components/dashboard/GeneralBalance'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedMonth, setSelectedMonth] = useState('Janeiro')
  const [selectedAccount, setSelectedAccount] = useState('Conta Corrente - Itaú')

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <MonthSelector 
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onYearChange={setSelectedYear}
              onMonthChange={setSelectedMonth}
            />
            <AccountSelector
              selectedAccount={selectedAccount}
              onAccountChange={setSelectedAccount}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm">
              + Caixa
            </button>
            <button className="px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm">
              + Movimento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <MonthSummary />
          <GeneralBalance />
        </div>

        <TransactionList />
      </div>
    </div>
  )
} 