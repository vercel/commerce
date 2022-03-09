import { FC } from 'react'
import s from './ShippingWidget.module.css'
import { useUI } from '@components/ui/context'
import { ChevronRight, MapPin, Check } from '@components/icons'

interface ComponentProps {
  onClick?: () => any
  isValid?: boolean
}

const ShippingWidget: FC<ComponentProps> = ({ onClick, isValid }) => {
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
      <div>{isValid ? <Check /> : <ChevronRight />}</div>
    </div>
  )
}

export default ShippingWidget
