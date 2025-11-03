import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { productId, paymentMethod } = await req.json()
  if (!productId) return NextResponse.json({ error: 'productId required' }, { status: 400 })
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product || !product.isApproved) return NextResponse.json({ error: 'Product not available' }, { status: 400 })
  const order = await prisma.order.create({
    data: {
      buyerId: String(session.user.id),
      sellerId: product.sellerId,
      productId: product.id,
      status: 'pending',
      totalAmountCents: product.priceCentsUSD,
      paymentMethod: paymentMethod === 'coinbase' ? 'coinbase' : 'coinbase'
    }
  })
  return NextResponse.json(order, { status: 201 })
}


