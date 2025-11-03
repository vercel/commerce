import { requireAdmin } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

async function approveProduct(id: string) {
  'use server'
  await requireAdmin()
  await prisma.product.update({ where: { id }, data: { isApproved: true } })
  revalidatePath('/(dashboards)/admin/products')
}

export default async function AdminProductsPage() {
  await requireAdmin()
  const pending = await prisma.product.findMany({ where: { isApproved: false }, orderBy: { createdAt: 'asc' }, include: { seller: true } })
  const approved = await prisma.product.findMany({ where: { isApproved: true }, orderBy: { createdAt: 'desc' }, take: 10 })
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-semibold text-brand-midnight">Admin • Products</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium">Pending Approval</h3>
          <ul className="mt-4 divide-y">
            {pending.map((p) => (
              <li key={p.id} className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-gray-600">Seller: {p.seller?.name}</p>
                  </div>
                  <form action={async () => approveProduct(p.id)}>
                    <button className="rounded-md bg-brand-turquoise px-3 py-2 text-white">Approve</button>
                  </form>
                </div>
              </li>
            ))}
            {pending.length === 0 && <li className="py-3 text-sm text-gray-600">No pending products.</li>}
          </ul>
        </div>
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium">Recently Approved</h3>
          <ul className="mt-4 divide-y">
            {approved.map((p) => (
              <li key={p.id} className="py-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{p.title}</p>
                  <span className="text-sm text-gray-600">${(p.priceCentsUSD/100).toFixed(2)}</span>
                </div>
              </li>
            ))}
            {approved.length === 0 && <li className="py-3 text-sm text-gray-600">No approved products yet.</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}


