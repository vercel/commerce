import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main className="gradient-hero">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-brand-midnight">
            Afghan Art Market
          </h1>
          <p className="mt-6 text-lg md:text-xl text-brand-midnight/80 max-w-2xl mx-auto">
            A bright, modern marketplace empowering Afghan female artisans to sell worldwide
            with secure crypto payments.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/shop">
              <Button size="lg">Shop Artworks</Button>
            </Link>
            <Link href="/(dashboards)/seller">
              <Button size="lg" variant="outline">Become a Seller</Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}


