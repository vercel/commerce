import { requireSeller } from '@/lib/rbac'
import { prisma } from '@/lib/db'

export default async function SellerPayoutsPage() {
  const session = await requireSeller()
  const transactions = await prisma.transaction.findMany({ where: { sellerId: String(session.user?.id), paymentStatus: 'paid' }, orderBy: { createdAt: 'desc' } })
  const total = transactions.reduce((s, t) => s + t.sellerShareCents, 0)
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-semibold text-brand-midnight">Payouts</h2>
      <p className="mt-2 text-brand-midnight/80">Total to date: ${(total/100).toFixed(2)}</p>
      <div className="mt-6 overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Seller Share</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-t">
                <td className="px-4 py-2">{new Date(tx.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{tx.orderId}</td>
                <td className="px-4 py-2">${(tx.sellerShareCents/100).toFixed(2)}</td>
                <td className="px-4 py-2">{tx.paymentStatus}</td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr><td className="px-4 py-4" colSpan={4}>No payouts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


