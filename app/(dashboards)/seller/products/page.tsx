import { requireSeller } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

async function createProduct(formData: FormData) {
  'use server'
  const session = await requireSeller()
  const title = String(formData.get('title') || '')
  const description = String(formData.get('description') || '')
  const price = Number(formData.get('price') || 0)
  const category = String(formData.get('category') || '')
  const image = String(formData.get('image') || '')
  if (!title || !description || !price || !category || !image) return
  await prisma.product.create({
    data: {
      sellerId: String(session.user?.id),
      title,
      description,
      priceCentsUSD: Math.round(price * 100),
      category,
      images: [image],
      isApproved: false
    }
  })
  revalidatePath('/(dashboards)/seller/products')
}

export default async function SellerProductsPage() {
  const session = await requireSeller()
  const products = await prisma.product.findMany({ where: { sellerId: String(session.user?.id) }, orderBy: { createdAt: 'desc' } })
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-3xl font-semibold text-brand-midnight">My Products</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium">Add New Product</h3>
          <form action={createProduct} className="mt-4 space-y-3">
            <input name="title" className="w-full rounded-md border px-3 py-2" placeholder="Title" />
            <textarea name="description" className="w-full rounded-md border px-3 py-2" placeholder="Description" rows={4} />
            <input name="price" className="w-full rounded-md border px-3 py-2" placeholder="Price (USD)" type="number" step="0.01" />
            <input name="category" className="w-full rounded-md border px-3 py-2" placeholder="Category" />
            <input name="image" className="w-full rounded-md border px-3 py-2" placeholder="Image URL" />
            <button className="w-full rounded-md bg-brand-turquoise px-4 py-2 text-white">Create</button>
          </form>
        </div>
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium">Your Listings</h3>
          <ul className="mt-4 divide-y">
            {products.map((p) => (
              <li key={p.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-gray-600">${(p.priceCentsUSD/100).toFixed(2)} • {p.isApproved ? 'Approved' : 'Pending approval'}</p>
                  </div>
                  <a className="text-brand-turquoise underline" href={`/ (shop)/product/${p.id}`.replace(' ', '')}>View</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


