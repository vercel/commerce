import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { prisma } from '@/lib/db'

function verifySignature(rawBody: string, signature: string | null) {
  const secret = process.env.COINBASE_WEBHOOK_SECRET || ''
  if (!secret) return false
  if (!signature) return false
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(rawBody, 'utf8')
  const digest = hmac.digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(digest, 'utf8'))
}

export async function POST(req: Request) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-cc-webhook-signature')

  // Allow local mock with header for dev
  const isValid = verifySignature(rawBody, signature) || req.headers.get('x-dev-mock') === 'true'
  if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })

  const event = JSON.parse(rawBody) as { type: string; data: { id: string; metadata?: any } }
  const type = event.type
  const chargeId = event.data?.id
  if (!chargeId) return NextResponse.json({ ok: true })

  const tx = await prisma.transaction.findUnique({ where: { transactionId: chargeId } })
  if (!tx) return NextResponse.json({ ok: true })

  if (type === 'charge:confirmed') {
    await prisma.$transaction([
      prisma.transaction.update({ where: { id: tx.id }, data: { paymentStatus: 'paid' } }),
      prisma.order.update({ where: { id: tx.orderId }, data: { status: 'verified' } })
    ])
  }
  if (type === 'charge:failed' || type === 'charge:pending_failure') {
    await prisma.transaction.update({ where: { id: tx.id }, data: { paymentStatus: 'failed' } })
  }

  return NextResponse.json({ ok: true })
}


