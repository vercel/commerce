import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export type AppRole = 'admin' | 'seller' | 'buyer'

export async function requireAuth() {
  const session = await auth()
  if (!session?.user) redirect('/(auth)/login')
  return session
}

export async function requireRole(roles: AppRole | AppRole[]) {
  const session = await requireAuth()
  const allow = Array.isArray(roles) ? roles : [roles]
  // @ts-expect-error custom field
  if (!allow.includes(session.user.role)) redirect('/')
  return session
}

export async function requireSeller() {
  return requireRole('seller')
}

export async function requireAdmin() {
  return requireRole('admin')
}


