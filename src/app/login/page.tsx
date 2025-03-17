import Link from 'next/link'
import { Form as LoginForm } from './form'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm space-y-8">
        <h1 className="text-2xl font-semibold" style={{color: '#000000'}}>Login</h1>
        <LoginForm />        
      </div>
    </div>
  )
} 