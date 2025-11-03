import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@afghanart.market'
  const sellerEmail = 'seller@afghanart.market'
  const buyerEmail = 'buyer@afghanart.market'

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { name: 'Admin', email: adminEmail, passwordHash: await bcrypt.hash('admin123', 10), role: 'admin' }
  })
  const seller = await prisma.user.upsert({
    where: { email: sellerEmail },
    update: {},
    create: { name: 'Sample Seller', email: sellerEmail, passwordHash: await bcrypt.hash('seller123', 10), role: 'seller' }
  })
  await prisma.user.upsert({
    where: { email: buyerEmail },
    update: {},
    create: { name: 'Sample Buyer', email: buyerEmail, passwordHash: await bcrypt.hash('buyer123', 10), role: 'buyer' }
  })

  const p1 = await prisma.product.create({
    data: {
      sellerId: seller.id,
      title: 'Handwoven Afghan Rug',
      description: 'A beautiful handwoven rug with traditional Afghan patterns.',
      priceCentsUSD: 12500,
      category: 'Handicrafts',
      images: ['https://res.cloudinary.com/demo/image/upload/sample.jpg'],
      isApproved: true
    }
  })

  console.log('Seeded:', { admin: admin.email, seller: seller.email, product: p1.title })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})


