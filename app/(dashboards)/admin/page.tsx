import { requireAdmin } from '@/lib/rbac'

export default async function AdminDashboardPage() {
  const session = await requireAdmin()
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-semibold text-brand-midnight">Admin Dashboard</h2>
      <p className="mt-2 text-brand-midnight/80">Welcome, {session.user?.name}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">Verify sellers and products</div>
        <div className="rounded-lg border bg-white p-6">Manage orders and finances</div>
      </div>
    </div>
  )
}


