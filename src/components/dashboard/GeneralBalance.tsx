import { useEffect, useState } from 'react'
import { api } from '@/services/api'

interface GeneralBalanceProps {
  selectedCaixaId: number | null
  selectedYear: number
}

interface BalanceData {
  saldoInicial: number
  entradas: number
  saidas: number
  saldoFinal: number
}

export function GeneralBalance({ selectedCaixaId, selectedYear }: GeneralBalanceProps) {
  const [data, setData] = useState<BalanceData>({
    saldoInicial: 0,
    entradas: 0,
    saidas: 0,
    saldoFinal: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCaixaId) return

      setIsLoading(true)
      setError('')

      try {
        const movimentacoes = await api.getMovimentacoesByAno(selectedCaixaId, selectedYear)
        const caixaResponse = await fetch(`/api/caixa/${selectedCaixaId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (!caixaResponse.ok) {
          throw new Error('Erro ao carregar dados do caixa')
        }
        
        const caixa = await caixaResponse.json()
        
        const summary = movimentacoes.reduce((acc: { entradas: number, saidas: number }, mov: any) => {
          if (mov.tipo === 'ENTRADA') {
            acc.entradas += mov.valor
          } else {
            acc.saidas += mov.valor
          }
          return acc
        }, { entradas: 0, saidas: 0 })

        setData({
          saldoInicial: caixa.saldoInicial,
          entradas: summary.entradas,
          saidas: summary.saidas,
          saldoFinal: caixa.saldoInicial + summary.entradas - summary.saidas
        })
      } catch (err) {
        setError('Erro ao carregar balanço geral')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedCaixaId, selectedYear])

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
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
        <div className="text-gray-500">Selecione um caixa para ver o balanço geral</div>
      </div>
    )
  }

  return (
    <div className="border rounded-md p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Balanço Geral</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium">Entradas:</span>
          <span className="text-green-600 font-semibold text-lg">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.entradas)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium">Saídas:</span>
          <span className="text-red-600 font-semibold text-lg">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.saidas)}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-semibold">Saldo:</span>
            <span className="text-blue-600 font-bold text-xl">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.saldoFinal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 