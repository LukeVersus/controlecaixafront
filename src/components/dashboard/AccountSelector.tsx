interface AccountSelectorProps {
  selectedAccount: string
  onAccountChange: (account: string) => void
}

export function AccountSelector({
  selectedAccount,
  onAccountChange
}: AccountSelectorProps) {
  return (
    <div className="flex items-center">
      <select
        value={selectedAccount}
        onChange={(e) => onAccountChange(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-900 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="Conta Corrente - Itaú">Conta Corrente - Itaú</option>
        <option value="Poupança - Itaú">Poupança - Itaú</option>
        <option value="Conta Corrente - Bradesco">Conta Corrente - Bradesco</option>
      </select>
    </div>
  )
} 