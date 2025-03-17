interface Transaction {
  id: number
  description: string
  value: string
}

export function TransactionList() {
  const transactions: Transaction[] = [
    { id: 1, description: 'Content 2', value: 'Content 2' },
    { id: 2, description: 'Content 4', value: 'Content 2' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-900">Movimentos do Mês</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th scope="col" className="text-left py-5 px-6 text-base font-semibold text-gray-900">
                Descrição
              </th>
              <th scope="col" className="text-left py-5 px-6 text-base font-semibold text-gray-900">
                Valor
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr 
                key={transaction.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="whitespace-nowrap py-4 px-6 text-base font-medium text-gray-900">
                  {transaction.description}
                </td>
                <td className="whitespace-nowrap py-4 px-6 text-base font-medium text-gray-900">
                  {transaction.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 