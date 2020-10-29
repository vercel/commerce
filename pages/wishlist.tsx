import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import useWishlist from '@bigcommerce/storefront-data-hooks/wishlist/use-wishlist'
import { Layout } from '@components/common'
import { Heart } from '@components/icons'
import { Container, Text } from '@components/ui'
import { WishlistCard } from '@components/wishlist'
import { Transition } from '@headlessui/react'

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

export default function Wishlist() {
  const { data, isEmpty } = useWishlist({ includeProducts: true })

  return (
    <Container>
      <div className="mt-3 mb-20">
        <Text variant="pageHeading">My Wishlist</Text>
        <div className="group flex flex-col">
          {isEmpty ? (
            <Transition show>
              <Transition.Child
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
                  <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
                    <Heart className="absolute" />
                  </span>
                  <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                    Your wishlist is empty
                  </h2>
                  <p className="text-accents-6 px-10 text-center pt-2">
                    Biscuit oat cake wafer icing ice cream tiramisu pudding
                    cupcake.
                  </p>
                </div>
              </Transition.Child>
            </Transition>
          ) : (
            <Transition show>
              {data &&
                data.items?.map((item) => (
                  <Transition.Child
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <WishlistCard key={item.id} item={item} />
                  </Transition.Child>
                ))}
            </Transition>
          )}
        </div>
      </div>
    </Container>
  )
}

Wishlist.Layout = Layout
