import { requireAdmin } from '@/lib/rbac'
import { prisma } from '@/lib/db'

export default async function AdminFinancePage() {
  await requireAdmin()
  const txs = await prisma.transaction.findMany({ orderBy: { createdAt: 'desc' }, take: 100 })
  const totals = txs.reduce((acc, t) => {
    if (t.paymentStatus !== 'paid') return acc
    acc.amount += t.amountCents
    acc.commission += t.commissionCents
    acc.admin += t.adminShareCents
    acc.seller += t.sellerShareCents
    return acc
  }, { amount: 0, commission: 0, admin: 0, seller: 0 })

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-semibold text-brand-midnight">Admin • Finance</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Stat label="Gross" value={`$${(totals.amount/100).toFixed(2)}`} />
        <Stat label="Commission" value={`$${(totals.commission/100).toFixed(2)}`} />
        <Stat label="Admin Share" value={`$${(totals.admin/100).toFixed(2)}`} />
        <Stat label="Seller Share" value={`$${(totals.seller/100).toFixed(2)}`} />
      </div>
      <div className="mt-8 overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Admin</th>
              <th className="px-4 py-2">Seller</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {txs.map(t => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2">{new Date(t.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{t.orderId}</td>
                <td className="px-4 py-2">${(t.amountCents/100).toFixed(2)}</td>
                <td className="px-4 py-2">${(t.adminShareCents/100).toFixed(2)}</td>
                <td className="px-4 py-2">${(t.sellerShareCents/100).toFixed(2)}</td>
                <td className="px-4 py-2">{t.paymentStatus}</td>
              </tr>
            ))}
            {txs.length === 0 && (
              <tr><td className="px-4 py-4" colSpan={6}>No transactions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-brand-midnight">{value}</p>
    </div>
  )
}


