interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive'
  className?: string
}

export function Alert({ children, variant = 'default', className }: AlertProps) {
  return (
    <div className={`p-4 rounded-md ${
      variant === 'destructive' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
    } ${className || ''}`}>
      {children}
    </div>
  )
} 