interface Movimentacao {
  id: number
  data: string
  tipo: string
  caixa: {
    id: number
    descricao: string
    saldoInicial: number
  }
  descricao: string
  valor: number
}

export const api = {
  getMovimentacoesByAno: async (idCaixa: number, ano: number) => {
    const response = await fetch(`/api/movimentacao/caixa/${idCaixa}/ano/${ano}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (!response.ok) throw new Error('Erro ao buscar movimentações do ano')
    return response.json()
  },

  getMovimentacoesByMes: async (idCaixa: number, ano: number, mes: number) => {
    const response = await fetch(`/api/movimentacao/caixa/${idCaixa}/ano/${ano}/mes/${mes}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (!response.ok) throw new Error('Erro ao buscar movimentações do mês')
    return response.json()
  }
} 