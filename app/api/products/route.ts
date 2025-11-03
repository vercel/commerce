import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { productInputSchema } from '@/lib/validators'

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // @ts-expect-error custom_role
  if (session.user.role !== 'seller') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  const json = await req.json()
  const parsed = productInputSchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const data = parsed.data
  const product = await prisma.product.create({
    data: {
      sellerId: String(session.user.id),
      title: data.title,
      description: data.description,
      priceCentsUSD: data.priceCentsUSD,
      category: data.category,
      images: data.images,
      isApproved: false
    }
  })
  return NextResponse.json(product, { status: 201 })
}


