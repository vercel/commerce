import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import { Layout } from '@components/core'
import { Container } from '@components/ui'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}

export default function Blog() {
  return (
    <div className="pb-20">
      <div className="text-center pt-40 pb-56 bg-violet">
        <Container>
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
            Welcome to Acme, the simplest way to start publishing with Next.js
          </h2>
          <p className="mt-3 max-w-md mx-auto text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The Yeezy BOOST 350 V2 lineup continues to grow. We recently had the
            ‘Carbon’ iteration, and now release details have been locked in for
            this ‘Natural’ joint. Revealed by Yeezy Mafia earlier this year, the
            shoe was originally called ‘Abez’, which translated to ‘Tin’ in
            Hebrew. It’s now undergone a name change, and will be referred to as
            ‘Natura`
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="flex">
              <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://vercel.com/api/www/avatar/61182a9f6bda512b4d9263c9c8a60aabe0402f4c?s=204"
                  alt="Avatar"
                />
              </div>
              <div className="ml-4">
                <div className="leading-6 font-medium text-white">
                  José Rodriguez
                </div>
                <div className="leading-6 font-medium text-gray-200">
                  CEO, Acme
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="-mt-96 mx-auto">
          <img src="/jacket.png" alt="Jacket" />
        </div>
        {/** Replace by HTML Content */}
        <div className="text-lg leading-7 font-medium py-6 text-justify max-w-6xl mx-auto">
          <p className="py-6">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            Candy canes bonbon dragée jujubes chocolate bar. Cotton candy gummi
            bears toffee cake muffin caramels. Gummi bears danish liquorice ice
            cream pie chocolate cake lemon drops tootsie roll tart. Biscuit
            gingerbread fruitcake cake powder pudding cotton candy chocolate
            bar. Sweet donut marshmallow powder gummies jelly tart powder.
            Cheesecake bonbon caramels cupcake jujubes halvah donut dessert
            chocolate bar. Jelly gummies liquorice lollipop chocolate bar
            chocolate cake sugar plum. Lollipop toffee dragée chocolate bar
            jelly beans biscuit. Halvah danish cheesecake. Tiramisu donut
            lollipop pie donut caramels tiramisu. Jujubes candy canes pudding
            danish fruitcake chupa chups jujubes carrot cake bonbon. Halvah
            donut jelly halvah bonbon.
          </p>
          <p className="py-6">
            Biscuit sugar plum sweet chocolate cake sesame snaps soufflé
            topping. Gummies topping bonbon chocolate pudding cookie. Wafer
            icing cake pastry. Gummies candy dessert chupa chups lemon drops.
            Soufflé marshmallow oat cake chocolate jelly-o caramels pie marzipan
            jelly beans. Cheesecake liquorice donut jujubes halvah ice cream
            cotton candy cupcake sugar plum. Ice cream ice cream sweet roll
            fruitcake icing. Muffin candy canes bonbon croissant gummies lemon
            drops pie danish. Oat cake chocolate toffee cake jelly tart
            caramels. Sweet donut cheesecake pastry pie sweet. Bonbon lollipop
            brownie. Soufflé pudding macaroon cotton candy gingerbread. Biscuit
            macaroon gummi bears candy canes chocolate cake lemon drops
            marshmallow. Chocolate cake cotton candy marshmallow cake sweet
            tootsie roll bonbon carrot cake sugar plum.
          </p>
        </div>
      </Container>
    </div>
  )
}

Blog.Layout = Layout
