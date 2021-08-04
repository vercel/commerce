import { FC } from 'react'
import s from './ShippingWidget.module.css'
import { ChevronRight, MapPin } from '@components/icons'
import { useUI } from '@components/ui/context'

interface ComponentProps {
  onClick?: () => any
}

const ShippingWidget: FC<ComponentProps> = ({ onClick }) => {
  const { shippingAddress } = useUI()

  const isAddressKnown = shippingAddress.addressLine1 !== '' && shippingAddress.city !== '' && shippingAddress.countryOrRegion !== ''

  /* Shipping Address
  Only available with checkout set to true -
  This means that the provider does offer checkout functionality. */
  return (
    <div onClick={onClick} className={s.root}>
      <div className="flex flex-1 items-center">
        <MapPin className="w-5 flex" />
        <div className="ml-5 text-sm text-left font-medium">
          {isAddressKnown ?
            <span>
              {shippingAddress.addressLine1}<br/>
              {shippingAddress.city}, {shippingAddress.countryOrRegion}
            </span>
            :
            <span>
              Add Shipping Address
            </span>
          }
        </div>
      </div>
      <div>
        <ChevronRight />
      </div>
    </div>
  )
}

export default ShippingWidget
