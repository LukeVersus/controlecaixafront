interface MonthSelectorProps {
  selectedYear: string
  selectedMonth: string
  onYearChange: (year: string) => void
  onMonthChange: (month: string) => void
}

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export function MonthSelector({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange
}: MonthSelectorProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: 5 },
    (_, i) => String(currentYear - 2 + i)
  )

  return (
    <div className="flex items-center gap-4">
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-900 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <div className="flex gap-2 bg-white px-2 py-1 rounded-md shadow-sm">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onMonthChange(month)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedMonth === month
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {month.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  )
} 