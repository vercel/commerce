import { prisma } from '@/lib/db'
import { AddToCartButton } from '@/components/cart/AddToCartButton'

type Props = { params: { id: string } }

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product || !product.isApproved) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-brand-midnight">Product not found</h2>
      </div>
    )
  }
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="text-2xl font-semibold text-brand-midnight">{product.title}</h2>
      <p className="mt-2 text-brand-midnight/80">${(product.priceCentsUSD/100).toFixed(2)}</p>
      <div className="mt-6 flex gap-3">
        <AddToCartButton productId={product.id} />
        <a href="/(shop)/checkout" className="rounded-md border border-brand-turquoise px-4 py-2 text-brand-turquoise">Buy Now</a>
      </div>
    </div>
  )
}


