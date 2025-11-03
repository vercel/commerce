import { requireSeller } from '@/lib/rbac'

export default async function SellerDashboardPage() {
  const session = await requireSeller()
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-semibold text-brand-midnight">Seller Dashboard</h2>
      <p className="mt-2 text-brand-midnight/80">Welcome, {session.user?.name}</p>
      <div className="mt-6 rounded-lg border bg-white p-6">Listings, orders and payouts will appear here.</div>
    </div>
  )
}


