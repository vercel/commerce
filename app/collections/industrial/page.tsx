import Layout from '@/app/layout'
import { notFound } from 'next/navigation'
import PageHeroGrid from '@/components/pages/PageHeroGrid'

// Assets
import HERO_1 from '@/images/industrial/__landing/1.jpg'
import HERO_2 from '@/images/industrial/__landing/2.jpg'
import HERO_3 from '@/images/industrial/__landing/3.jpg'
import HERO_4 from '@/images/industrial/__landing/4.jpg'

export default function Industrial() {
  return (
    <>
      <PageHeroGrid
        title="Industrial"
        description={
          <>
            Trust Linconson for top-notch industrial solutions. Our reliable
            equipment is designed to optimize warehouse operations, boost
            efficiency, and ensure a productive environment. With
            direct-to-consumer manufacturing, we offer the lowest prices in the
            industry.
            <br />
            <br />
            Linconson Industries - powering your warehouse for success.
          </>
        }
        imageSrcs={[HERO_2, HERO_1, HERO_4, HERO_3]}
        type="4-image"
      />
    </>
  )
}
