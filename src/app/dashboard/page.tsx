'use client'

import { useEffect, useState } from 'react'
import { MonthSelector } from '@/components/dashboard/MonthSelector'
import { AccountSelector } from '@/components/dashboard/AccountSelector'
import { MonthSummary } from '@/components/dashboard/MonthSummary'
import { GeneralBalance } from '@/components/dashboard/GeneralBalance'
import { TransactionList } from '@/components/dashboard/TransactionList'
import { CreateCaixaModal } from '@/components/modals/CreateCaixaModal'
import { CreateMovimentacaoModal } from '@/components/modals/CreateMovimentacaoModal'
import { useRouter } from 'next/navigation'

interface Caixa {
  id: number
  descricao: string
  saldoInicial: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedMonth, setSelectedMonth] = useState('Janeiro')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [selectedCaixa, setSelectedCaixa] = useState<Caixa | null>(null)
  const [isCreateCaixaModalOpen, setIsCreateCaixaModalOpen] = useState(false)
  const [isCreateMovimentacaoModalOpen, setIsCreateMovimentacaoModalOpen] = useState(false)

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  const handleCreateCaixaSuccess = () => {
    // Força o AccountSelector a recarregar as caixas
    setSelectedAccount('')
  }

  const handleCreateMovimentacaoSuccess = () => {
    // Aqui você pode atualizar a lista de movimentações
  }

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
              onAccountChange={(account: string, caixa?: Caixa) => {
                setSelectedAccount(account)
                setSelectedCaixa(caixa || null)
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCreateCaixaModalOpen(true)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm"
            >
              + Caixa
            </button>
            <button
              onClick={() => setIsCreateMovimentacaoModalOpen(true)}
              disabled={!selectedCaixa}
              className="px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title={!selectedCaixa ? 'Selecione uma caixa primeiro' : ''}
            >
              + Movimento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <MonthSummary />
          <GeneralBalance />
        </div>

        <TransactionList />

        <CreateCaixaModal
          isOpen={isCreateCaixaModalOpen}
          onClose={() => setIsCreateCaixaModalOpen(false)}
          onSuccess={handleCreateCaixaSuccess}
        />

        <CreateMovimentacaoModal
          isOpen={isCreateMovimentacaoModalOpen}
          onClose={() => setIsCreateMovimentacaoModalOpen(false)}
          onSuccess={handleCreateMovimentacaoSuccess}
          selectedCaixaId={selectedCaixa?.id || null}
        />
      </div>
    </div>
  )
} 