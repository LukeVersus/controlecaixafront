import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
} 