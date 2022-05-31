import useCart from '@framework/cart/use-cart'
import useUpdateUpdateAddress from '@framework/customer/address/use-update-item'
import SidebarLayout from '@components/common/SidebarLayout'
import { useUI } from '@components/ui/context'
import { Button } from '@components/ui'
import useCheckout from '@framework/checkout/use-checkout'
import { useCheckoutContext } from '../context'

type FulfillmentOption = {
  fulfillmentMethod?: {
    _id: string
    displayName: string
  }
  price: {
    displayAmount: string
  }
}

const ShippingMethod = () => {
  const { setSidebarView } = useUI()

  const { data: cart } = useCart()
  const { addressFields } = useCheckoutContext()

  const updateShippingMethod = useUpdateUpdateAddress()
  const { data: checkoutData } = useCheckout()

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    await updateShippingMethod({
      id: cart!.id,
      ...addressFields,
      shippingMethodId: event.target.shippingMethod.value,
    })

    setSidebarView('CHECKOUT_VIEW')
  }

  return checkoutData.shippingGroup ? (
    <form className="h-full" onSubmit={handleSubmit}>
      <SidebarLayout handleBack={() => setSidebarView('CHECKOUT_VIEW')}>
        <div className="px-4 sm:px-6 flex-1">
          <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
            Shipping Methods
          </h2>
          <div>
            {checkoutData.shippingGroup.availableFulfillmentOptions?.map(
              (option: FulfillmentOption) => (
                <div
                  className="flex flex-row my-3 items-center justify-between"
                  key={option?.fulfillmentMethod?._id}
                >
                  <fieldset className="flex flex-row items-center">
                    <input
                      name="shippingMethod"
                      className="bg-black"
                      type="radio"
                      value={option?.fulfillmentMethod?._id}
                      defaultChecked={
                        checkoutData.shippingGroup.selectedFulfillmentOption
                          ?.fulfillmentMethod?._id ===
                        option?.fulfillmentMethod?._id
                      }
                    />
                    <span className="ml-3 text-sm">
                      {option?.fulfillmentMethod?.displayName ||
                        'Shipping Method'}
                    </span>
                  </fieldset>
                  <span>{option?.price.displayAmount}</span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
          <Button type="submit" width="100%" variant="ghost">
            Continue
          </Button>
        </div>
      </SidebarLayout>
    </form>
  ) : null
}

export default ShippingMethod
