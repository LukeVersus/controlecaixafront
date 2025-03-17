import { useState } from 'react'

interface CreateCaixaModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateCaixaModal({ isOpen, onClose, onSuccess }: CreateCaixaModalProps) {
  const [descricao, setDescricao] = useState('')
  const [saldoInicial, setSaldoInicial] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/caixa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          descricao,
          saldoInicial
        })
      })

      if (response.ok) {
        onSuccess()
        onClose()
      } else {
        const data = await response.json()
        setError(data.message || 'Erro ao criar caixa')
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
          <h2 className="text-2xl font-semibold text-gray-900">Nova Caixa</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="descricao" className="block text-base font-medium text-gray-900 mb-2">
              Descrição
            </label>
            <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Banco do Brasil"
              className="w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="saldoInicial" className="block text-base font-medium text-gray-900 mb-2">
              Saldo Inicial
            </label>
            <input
              type="number"
              id="saldoInicial"
              value={saldoInicial}
              onChange={(e) => setSaldoInicial(Number(e.target.value))}
              placeholder="5000"
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
              disabled={isLoading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-base disabled:opacity-50"
            >
              {isLoading ? 'Criando...' : 'Criar Caixa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 