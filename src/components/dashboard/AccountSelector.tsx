import { useEffect, useState } from 'react'

interface Caixa {
  id: number
  descricao: string
  saldoInicial: number
}

interface AccountSelectorProps {
  selectedAccount: string
  onAccountChange: (account: string, caixa?: Caixa) => void
}

export function AccountSelector({
  selectedAccount,
  onAccountChange
}: AccountSelectorProps) {
  const [caixas, setCaixas] = useState<Caixa[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCaixas = async () => {
      try {
        const response = await fetch('/api/caixa', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setCaixas(data)
          // Se não houver conta selecionada, seleciona a primeira
          if (!selectedAccount && data.length > 0) {
            onAccountChange(data[0].descricao, data[0])
          }
        } else {
          setError('Erro ao carregar caixas')
        }
      } catch (err) {
        setError('Erro ao conectar ao servidor')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCaixas()
  }, [selectedAccount, onAccountChange])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const descricao = e.target.value
    const caixa = caixas.find(c => c.descricao === descricao)
    onAccountChange(descricao, caixa)
  }

  if (isLoading) {
    return (
      <div className="flex items-center">
        <select
          disabled
          className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50 text-gray-500 text-base font-medium shadow-sm"
        >
          <option>Carregando...</option>
        </select>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center">
        <select
          disabled
          className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50 text-red-500 text-base font-medium shadow-sm"
        >
          <option>{error}</option>
        </select>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <select
        value={selectedAccount}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-900 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {caixas.length === 0 ? (
          <option value="">Nenhuma caixa encontrada</option>
        ) : (
          caixas.map((caixa) => (
            <option key={caixa.id} value={caixa.descricao}>
              {caixa.descricao}
            </option>
          ))
        )}
      </select>
    </div>
  )
} 