import { requireAdmin } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

async function setStatus(id: string, status: 'pending'|'verified'|'shipped'|'completed') {
  'use server'
  await requireAdmin()
  await prisma.order.update({ where: { id }, data: { status } })
  revalidatePath('/(dashboards)/admin/orders')
}

export default async function AdminOrdersPage() {
  await requireAdmin()
  const orders = await prisma.order.findMany({ include: { product: true }, orderBy: { createdAt: 'desc' }, take: 50 })
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-semibold text-brand-midnight">Admin • Orders</h2>
      <div className="mt-6 overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-2">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{o.id}</td>
                <td className="px-4 py-2">{o.product?.title}</td>
                <td className="px-4 py-2">${(o.totalAmountCents/100).toFixed(2)}</td>
                <td className="px-4 py-2">{o.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <form action={async () => setStatus(o.id, 'verified')}><button className="rounded-md border px-2 py-1">Verify</button></form>
                  <form action={async () => setStatus(o.id, 'shipped')}><button className="rounded-md border px-2 py-1">Ship</button></form>
                  <form action={async () => setStatus(o.id, 'completed')}><button className="rounded-md border px-2 py-1">Complete</button></form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


