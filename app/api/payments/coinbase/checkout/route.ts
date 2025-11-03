import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { createCharge } from '@/lib/coinbase'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { orderId } = await req.json()
  if (!orderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 })
  const order = await prisma.order.findUnique({ where: { id: orderId } })
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  const isBuyer = String(session.user.id) === order.buyerId
  // @ts-expect-error role
  const isAdmin = session.user.role === 'admin'
  if (!isBuyer && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const product = await prisma.product.findUnique({ where: { id: order.productId } })
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

  const charge = await createCharge({
    name: product.title,
    description: product.description.slice(0, 120),
    amountUsd: order.totalAmountCents / 100,
    metadata: {
      orderId: order.id,
      productId: order.productId,
      buyerId: order.buyerId,
      sellerId: order.sellerId
    }
  })

  // Create Transaction as pending
  const amount = order.totalAmountCents
  const commission = Math.round(amount * 0.05)
  const adminShare = commission
  const sellerShare = amount - commission
  await prisma.transaction.create({
    data: {
      transactionId: charge.id,
      orderId: order.id,
      productId: order.productId,
      buyerId: order.buyerId,
      sellerId: order.sellerId,
      amountCents: amount,
      commissionCents: commission,
      adminShareCents: adminShare,
      sellerShareCents: sellerShare,
      paymentStatus: 'pending'
    }
  })

  return NextResponse.json({ hosted_url: charge.hosted_url, chargeId: charge.id })
}


