import { useState } from 'react'

interface MonthSelectorProps {
  selectedYear: string
  selectedMonth: string
  onYearChange: (year: string) => void
  onMonthChange: (month: string) => void
}

const months = [
  { value: '1', label: 'Janeiro' },
  { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' },
  { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' }
]

export function MonthSelector({ 
  selectedYear, 
  selectedMonth, 
  onYearChange, 
  onMonthChange 
}: MonthSelectorProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - 2 + i).toString())

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value)}
        className="border-none bg-transparent text-blue-600 font-medium focus:outline-none cursor-pointer"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <div className="flex gap-1 text-sm">
        {months.map((month) => (
          <button
            key={month.value}
            onClick={() => onMonthChange(month.value)}
            className={`hover:text-blue-600 ${
              selectedMonth === month.value 
                ? 'text-blue-600 font-medium' 
                : 'text-gray-600'
            }`}
          >
            {month.label.slice(0, 3)} |
          </button>
        ))}
      </div>
    </div>
  )
} 