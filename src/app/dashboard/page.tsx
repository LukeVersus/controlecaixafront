'use client'

import { useEffect, useState } from 'react'
import { AccountSelector } from '@/components/dashboard/AccountSelector'
import { MonthSelector } from '@/components/dashboard/MonthSelector'
import { MonthSummary } from '@/components/dashboard/MonthSummary'
import { GeneralBalance } from '@/components/dashboard/GeneralBalance'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { CreateCaixaModal } from '@/components/modals/CreateCaixaModal'
import { CreateMovimentacaoModal } from '@/components/modals/CreateMovimentacaoModal'

interface Caixa {
  id: number
  descricao: string
  saldoInicial: number
}

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export default function DashboardPage() {
  const currentYear = new Date().getFullYear()
  const currentMonth = (new Date().getMonth() + 1).toString()
  
  const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString())
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth)
  const [selectedAccount, setSelectedAccount] = useState('')
  const [selectedCaixa, setSelectedCaixa] = useState<Caixa | null>(null)
  const [isCreateCaixaModalOpen, setIsCreateCaixaModalOpen] = useState(false)
  const [isCreateMovimentacaoModalOpen, setIsCreateMovimentacaoModalOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login'
    }
  }, [])

  const handleCreateCaixaSuccess = () => {
    setIsCreateCaixaModalOpen(false)
    setSelectedCaixa(null)
  }

  const handleCreateMovimentacaoSuccess = () => {
    setIsCreateMovimentacaoModalOpen(false)
  }

  const handleAccountChange = (account: string, caixa: Caixa | null) => {
    setSelectedAccount(account)
    setSelectedCaixa(caixa)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 border rounded-md p-2 bg-white">
          <MonthSelector
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            onYearChange={setSelectedYear}
            onMonthChange={setSelectedMonth}
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {months[parseInt(selectedMonth) - 1]}/{selectedYear}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Caixa</span>
              <AccountSelector 
                selectedAccount={selectedAccount}
                onAccountChange={handleAccountChange}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCreateCaixaModalOpen(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              + Caixa
            </button>
            <button
              onClick={() => setIsCreateMovimentacaoModalOpen(true)}
              className={`px-3 py-1 rounded text-sm text-white ${
                selectedCaixa ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!selectedCaixa}
              title={!selectedCaixa ? 'Selecione um caixa primeiro' : ''}
            >
              + Movimento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <MonthSummary 
            selectedCaixaId={selectedCaixa?.id ?? null} 
            selectedYear={parseInt(selectedYear)}
            selectedMonth={parseInt(selectedMonth)}
          />
          <GeneralBalance
            selectedCaixaId={selectedCaixa?.id ?? null}
            selectedYear={parseInt(selectedYear)}
          />
        </div>

        <TransactionList 
          selectedCaixaId={selectedCaixa?.id ?? null}
          selectedYear={parseInt(selectedYear)}
          selectedMonth={parseInt(selectedMonth)}
        />
      </div>

      <CreateCaixaModal
        isOpen={isCreateCaixaModalOpen}
        onClose={() => setIsCreateCaixaModalOpen(false)}
        onSuccess={handleCreateCaixaSuccess}
      />

      <CreateMovimentacaoModal
        isOpen={isCreateMovimentacaoModalOpen}
        onClose={() => setIsCreateMovimentacaoModalOpen(false)}
        onSuccess={handleCreateMovimentacaoSuccess}
        selectedCaixaId={selectedCaixa?.id ?? null}
      />
    </div>
  )
} 