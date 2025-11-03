import { requireSeller } from '@/lib/rbac'
import { prisma } from '@/lib/db'

export default async function SellerOrdersPage() {
  const session = await requireSeller()
  const orders = await prisma.order.findMany({ where: { sellerId: String(session.user?.id) }, include: { product: true }, orderBy: { createdAt: 'desc' } })
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-semibold text-brand-midnight">Orders</h2>
      <div className="mt-6 overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-2">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{o.product?.title}</td>
                <td className="px-4 py-2">${(o.totalAmountCents/100).toFixed(2)}</td>
                <td className="px-4 py-2">{o.status}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td className="px-4 py-4" colSpan={4}>No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


