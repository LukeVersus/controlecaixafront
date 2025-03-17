export function MonthSummary() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Entradas e Saídas do Mês</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-base">Entradas:</span>
          <span className="text-green-600 font-semibold text-lg">R$ 6.000,00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-base">Saídas:</span>
          <span className="text-red-600 font-semibold text-lg">R$ 1.500,00</span>
        </div>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-semibold text-base">Saldo:</span>
            <span className="text-blue-600 font-bold text-xl">R$ 4.500,00</span>
          </div>
        </div>
      </div>
    </div>
  )
} 