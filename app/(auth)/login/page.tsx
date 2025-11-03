'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { redirect: false, email, password })
    setLoading(false)
    if (res?.ok) router.push('/')
    else setError('Invalid credentials')
  }

  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <h2 className="text-2xl font-semibold text-brand-midnight">Login</h2>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input className="w-full rounded-md border px-3 py-2" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full rounded-md border px-3 py-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button disabled={loading} className="w-full">{loading ? 'Signing in...' : 'Sign In'}</Button>
      </form>
      <div className="mt-6">
        <a href="/(auth)/register" className="text-sm text-brand-turquoise underline">Create an account</a>
      </div>
      <div className="mt-6">
        <a href="/(auth)/wallet" className="text-sm text-brand-turquoise underline">Sign in with Wallet</a>
      </div>
    </div>
  )
}


