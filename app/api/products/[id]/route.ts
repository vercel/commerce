import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { productInputSchema } from '@/lib/validators'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (!product.isApproved) {
    const session = await auth()
    const isOwner = session?.user && String(session.user.id) === product.sellerId
    // @ts-expect-error role
    const isAdmin = session?.user?.role === 'admin'
    if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(product)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const isOwner = String(session.user.id) === product.sellerId
  // @ts-expect-error role
  const isAdmin = session.user.role === 'admin'
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const json = await req.json()
  const parsed = productInputSchema.partial().safeParse(json)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const updated = await prisma.product.update({ where: { id: params.id }, data: parsed.data })
  return NextResponse.json(updated)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // @ts-expect-error role
  const isAdmin = session.user.role === 'admin'
  if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const body = await req.json()
  if (typeof body.isApproved !== 'boolean') return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  const updated = await prisma.product.update({ where: { id: params.id }, data: { isApproved: body.isApproved } })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const isOwner = String(session.user.id) === product.sellerId
  // @ts-expect-error role
  const isAdmin = session.user.role === 'admin'
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}


