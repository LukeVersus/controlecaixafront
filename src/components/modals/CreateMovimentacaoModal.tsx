import { useState } from 'react'

interface CreateMovimentacaoModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  selectedCaixaId: number | null
}

interface Caixa {
  id: number
  descricao: string
  saldoInicial: number
}

export function CreateMovimentacaoModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  selectedCaixaId 
}: CreateMovimentacaoModalProps) {
  const [data, setData] = useState('')
  const [tipo, setTipo] = useState('ENTRADA')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCaixaId) {
      setError('Selecione uma caixa primeiro')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/movimentacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          data,
          tipo,
          caixa: {
            id: selectedCaixaId
          },
          descricao,
          valor
        })
      })

      if (response.ok) {
        onSuccess()
        onClose()
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Erro ao criar movimentação')
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Nova Movimentação</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="data" className="block text-base font-medium text-gray-900 mb-2">
              Data
            </label>
            <input
              type="date"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="tipo" className="block text-base font-medium text-gray-900 mb-2">
              Tipo
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saída</option>
            </select>
          </div>

          <div>
            <label htmlFor="descricao" className="block text-base font-medium text-gray-900 mb-2">
              Descrição
            </label>
            <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
              className="w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="valor" className="block text-base font-medium text-gray-900 mb-2">
              Valor
            </label>
            <input
              type="number"
              id="valor"
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              step="0.01"
              min="0"
              placeholder="0,00"
              className="w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 font-medium text-base"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !selectedCaixaId}
              className="px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-base disabled:opacity-50"
            >
              {isLoading ? 'Criando...' : 'Criar Movimentação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 