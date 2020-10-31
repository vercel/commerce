import { FC } from 'react'

const CartSkeleton: FC = () => {
  return (
    <div className="grid lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="flex-1">
          <div className="border-t border-accents-2 mt-10 pt-16 sm:pt-10">
            <div className="animate-cart-pulse flex">
              <div className="w-16 h-16 bg-gray-300" />
              <div className="ml-8 w-1/6 flex flex-col">
                <div className="w-full h-7 bg-gray-300" />
                <div className="w-1/2 h-5 bg-gray-300 mt-4" />
              </div>
              <div className="ml-auto w-24 flex flex-col items-end">
                <div className="w-full h-7 bg-gray-300" />
                <div className="w-1/2 h-5 bg-gray-300 mt-4" />
              </div>
            </div>
          </div>
          <div className="sm:border-t border-accents-2 mt-12 sm:mt-10 pt-12 sm:pt-10 ">
            <div
              className="animate-cart-pulse flex"
              style={{
                animationFillMode: 'backwards',
                animationDelay: '225ms',
              }}
            >
              <div className="w-16 h-16 bg-gray-300" />
              <div className="ml-8 w-1/6 flex flex-col">
                <div className="w-full h-7 bg-gray-300" />
                <div className="w-1/2 h-5 bg-gray-300 mt-4" />
              </div>
              <div className="ml-auto w-24 flex flex-col items-end">
                <div className="w-full h-7 bg-gray-300" />
                <div className="w-1/2 h-5 bg-gray-300 mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="flex-shrink-0 pt-16 sm:pt-10 sm:pl-16">
          <div className="border-t border-accents-2">
            <ul className="pt-6 pb-7 animate-cart-pulse">
              <li className="flex justify-between">
                <span className="w-16 h-5 bg-gray-300" />
                <span className="w-20 h-5 bg-gray-300" />
              </li>
              <li className="flex justify-between mt-4">
                <span className="w-12 h-5 bg-gray-300" />
                <span className="w-24 h-5 bg-gray-300" />
              </li>
              <li className="flex justify-between mt-4">
                <span className="w-36 h-5 bg-gray-300" />
                <span className="w-12 h-5 bg-gray-300" />
              </li>
            </ul>
            <div className="border-t border-accents-2 font-bold pt-8 mb-10">
              <div
                className="flex justify-between animate-cart-pulse"
                style={{
                  animationFillMode: 'backwards',
                  animationDelay: '225ms',
                }}
              >
                <div className="w-12 h-5 bg-gray-300" />
                <div className="w-24 h-5 bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartSkeleton
