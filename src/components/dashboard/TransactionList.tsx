import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TransactionListProps {
  selectedCaixaId: number | null
  selectedYear: number
  selectedMonth: number
}

interface Transaction {
  id: number
  data: string
  tipo: 'ENTRADA' | 'SAIDA'
  descricao: string
  valor: number
}

export function TransactionList({ selectedCaixaId, selectedYear, selectedMonth }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCaixaId) return

      setIsLoading(true)
      setError('')

      try {
        const data = await api.getMovimentacoesByMes(selectedCaixaId, selectedYear, selectedMonth)
        setTransactions(data)
      } catch (err) {
        setError('Erro ao carregar movimentações')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedCaixaId, selectedYear, selectedMonth])

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  if (!selectedCaixaId) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-gray-500">Selecione um caixa para ver as movimentações</div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-gray-500">Nenhuma movimentação encontrada para o período selecionado</div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Movimentações do Mês</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">
                {format(new Date(transaction.data), "dd 'de' MMMM", { locale: ptBR })}
              </span>
              <span className="text-gray-900">{transaction.descricao}</span>
            </div>
            <span className={`font-semibold ${transaction.tipo === 'ENTRADA' ? 'text-green-600' : 'text-red-600'}`}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.valor)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 