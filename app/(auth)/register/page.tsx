import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

async function register(formData: FormData) {
  'use server'
  const name = String(formData.get('name') || '')
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')
  if (!name || !email || !password) return
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return
  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.user.create({ data: { name, email, passwordHash, role: 'buyer' } })
  redirect('/(auth)/login')
}

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-12">
      <h2 className="text-2xl font-semibold text-brand-midnight">Register</h2>
      <form action={register} className="mt-6 space-y-4">
        <input name="name" className="w-full rounded-md border px-3 py-2" placeholder="Name" />
        <input name="email" className="w-full rounded-md border px-3 py-2" placeholder="Email" type="email" />
        <input name="password" className="w-full rounded-md border px-3 py-2" placeholder="Password" type="password" />
        <button className="w-full rounded-md bg-brand-turquoise px-4 py-2 text-white">Create Account</button>
      </form>
    </div>
  )
}


