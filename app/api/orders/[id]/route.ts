import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const order = await prisma.order.findUnique({ where: { id: params.id } })
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const isParty = [order.buyerId, order.sellerId].includes(String(session.user.id))
  // @ts-expect-error role
  const isAdmin = session.user.role === 'admin'
  if (!isParty && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  return NextResponse.json(order)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // Only admin can move status for now
  // @ts-expect-error role
  if (session.user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const { status } = await req.json()
  if (!['pending','verified','shipped','completed'].includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  const order = await prisma.order.update({ where: { id: params.id }, data: { status } })
  return NextResponse.json(order)
}


